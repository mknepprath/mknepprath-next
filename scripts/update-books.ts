/**
 * Goodreads read-date keeper.
 *
 * The bookshelf widgets that replaced Goodreads' retired RSS feeds carry no
 * dates, and the review pages that would have them need a sign-in. So this
 * records when each book first shows up on the read shelf and writes it to
 * data/books.json, which the books API reads back as date_finished. Run on a
 * schedule by .github/workflows/update-books.yml.
 *
 * The first run seeds every book already on the shelf with a null date: their
 * real read dates are gone, and stamping today's would dump the whole back
 * catalogue into the activity feed at once. Books shelved from then on get the
 * date the run first saw them, which is accurate to within a day.
 *
 * To recover the real dates for the back catalogue, export the library from
 * goodreads.com/review/import ("Export Library"), save the CSV as
 * data/goodreads-export.csv, run this script locally and commit the result. A
 * run that finds the file fills in dates by title; it only ever fills a date
 * that is missing. The CSV itself does not need committing — the dates live in
 * data/books.json once written.
 *
 * Usage: npx tsx scripts/update-books.ts
 * Env: GOODREADS_ID — the numeric user id, as in goodreads.com/user/show/<id>.
 */

import fs from "fs";
import path from "path";

import { fetchShelf } from "../lib/goodreads";

const OUT_FILE = path.join(process.cwd(), "data/books.json");
const EXPORT_FILE = path.join(process.cwd(), "data/goodreads-export.csv");

const MAX_ATTEMPTS = 5;

interface BookRecord {
  title: string;
  finished: string | null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function withRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  let lastError: unknown;

  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i === MAX_ATTEMPTS) break;
      const backoff = 2 ** (i - 1) * 1000 + Math.floor(Math.random() * 500);
      console.log(`${label} attempt ${i}/${MAX_ATTEMPTS} failed, retrying in ${backoff}ms`);
      await sleep(backoff);
    }
  }

  throw new Error(`${label} failed after ${MAX_ATTEMPTS} attempts: ${String(lastError)}`);
}

function readExisting(): Record<string, BookRecord> {
  try {
    return JSON.parse(fs.readFileSync(OUT_FILE, "utf-8"));
  } catch {
    return {};
  }
}

// Titles differ between the export and the widgets — the widgets append the
// series ("Platform Decay (The Murderbot Diaries, #8)") and use typographic
// punctuation — so compare on the part before any bracket, letters only.
const titleKey = (title: string): string =>
  title
    .split(/[([]/)[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

/** Minimal CSV reader: Goodreads quotes any field holding a comma. */
function parseCSV(body: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < body.length; i++) {
    const char = body[i];
    if (quoted) {
      if (char === '"' && body[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') quoted = false;
      else field += char;
      continue;
    }
    if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else field += char;
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const [header = [], ...body_] = rows;
  return body_
    .filter((cells) => cells.length === header.length)
    .map((cells) => Object.fromEntries(header.map((name, i) => [name, cells[i]])));
}

/** Read dates from a Goodreads library export, keyed by normalized title. */
function exportedDates(): Map<string, string> {
  const dates = new Map<string, string>();
  if (!fs.existsSync(EXPORT_FILE)) return dates;

  for (const row of parseCSV(fs.readFileSync(EXPORT_FILE, "utf-8"))) {
    const read = row["Date Read"] || row["Date Added"];
    const title = row["Title"];
    if (!read || !title) continue;
    // Goodreads writes dates as 2026/11/02.
    const date = new Date(`${read.trim().replace(/\//g, "-")}T00:00:00Z`);
    if (Number.isNaN(+date)) continue;
    dates.set(titleKey(title), date.toISOString());
  }

  console.log(`Read ${dates.size} dates from ${path.basename(EXPORT_FILE)}.`);
  return dates;
}

async function main() {
  const userId = process.env.GOODREADS_ID;
  if (!userId) throw new Error("GOODREADS_ID not set");

  const existing = readExisting();
  const seeding = Object.keys(existing).length === 0;
  const now = new Date().toISOString();

  const shelf = await withRetry("Goodreads read shelf", () =>
    fetchShelf(userId, "read"),
  );
  if (shelf.length === 0) throw new Error("Read shelf came back empty");
  console.log(`Read shelf has ${shelf.length} books.`);

  const exported = exportedDates();
  const next: Record<string, BookRecord> = { ...existing };
  let added = 0;
  let backfilled = 0;

  for (const book of shelf) {
    const fromExport = exported.get(titleKey(book.title));

    if (next[book.id]) {
      // Keep the recorded date; only the title can drift (series renames). An
      // export fills in a date that was never known, but never replaces one.
      if (!next[book.id].finished && fromExport) backfilled += 1;
      next[book.id] = {
        title: book.title,
        finished: next[book.id].finished ?? fromExport ?? null,
      };
      continue;
    }

    next[book.id] = {
      title: book.title,
      finished: fromExport ?? (seeding ? null : now),
    };
    added += 1;
  }

  if (backfilled) console.log(`Backfilled ${backfilled} dates from the export.`);

  // Newest first, undated back catalogue last, so the file reads like the feed.
  const sorted = Object.fromEntries(
    Object.entries(next).sort(([, a], [, b]) => {
      if (a.finished && b.finished) return b.finished.localeCompare(a.finished);
      if (a.finished) return -1;
      if (b.finished) return 1;
      return 0;
    }),
  );

  const body = JSON.stringify(sorted, null, 2) + "\n";
  if (body === (fs.existsSync(OUT_FILE) ? fs.readFileSync(OUT_FILE, "utf-8") : "")) {
    console.log("No changes.");
    return;
  }

  fs.writeFileSync(OUT_FILE, body);
  if (seeding) console.log(`Seeded ${added} books with no date.`);
  else if (added) console.log(`Added ${added} book${added === 1 ? "" : "s"} dated ${now}.`);
  else console.log("No new books.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
