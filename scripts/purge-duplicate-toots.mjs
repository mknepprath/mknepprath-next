#!/usr/bin/env node
//
// Delete duplicate toots left behind by the auto-tooter repost loop.
//
// Dry run by default. Prints what it would delete and exits.
//   node scripts/purge-duplicate-toots.mjs
//   node scripts/purge-duplicate-toots.mjs --apply
//   node scripts/purge-duplicate-toots.mjs --days=90        # widen the window
//   node scripts/purge-duplicate-toots.mjs --days=all       # whole history
//
// Requires MASTODON_ACCESS_TOKEN with `write:statuses` scope. Reads .env.local
// if the variable is not already in the environment.
//
// What counts as a duplicate: toots are grouped by the `?i=<id>` activity id in
// their link. Within a group, the OLDEST toot is kept and every newer copy is
// deleted, so the original post and its boosts/replies/favourites survive and
// the reposts go. A toot with no `?i=` id is never touched.
//
// Deletion is permanent. Mastodon has no undelete.

import { readFileSync } from "node:fs";

const ACCOUNT_ID = "231610";
const HOST = "https://mastodon.social";
const APPLY = process.argv.includes("--apply");

// Default to the last 30 days. The whole history is a lot of pages for a problem
// that started yesterday, and a narrow window is a narrower blast radius.
const daysArg = process.argv.find((a) => a.startsWith("--days="))?.slice(7) ?? "30";
const SINCE = daysArg === "all" ? 0 : Date.now() - Number(daysArg) * 86_400_000;
if (Number.isNaN(SINCE)) {
  console.error(`--days must be a number or "all"`);
  process.exit(1);
}

function token() {
  if (process.env.MASTODON_ACCESS_TOKEN) return process.env.MASTODON_ACCESS_TOKEN;
  for (const file of [".env.local", ".env"]) {
    try {
      const line = readFileSync(new URL(`../${file}`, import.meta.url), "utf8")
        .split("\n")
        .find((l) => l.startsWith("MASTODON_ACCESS_TOKEN="));
      if (line) return line.slice("MASTODON_ACCESS_TOKEN=".length).trim().replace(/^["']|["']$/g, "");
    } catch {}
  }
  console.error("MASTODON_ACCESS_TOKEN is not set and not in .env.local");
  process.exit(1);
}

const AUTH = { Authorization: `Bearer ${token()}` };

// `Accept-Encoding: identity` deliberately: the gzip variant of these URLs is a
// separate CDN cache key that serves hours-stale responses. Same bug that caused
// the mess this script cleans up.
const HEADERS = { ...AUTH, "Accept-Encoding": "identity" };

async function api(path, init = {}) {
  const res = await fetch(`${HOST}${path}`, {
    cache: "no-store",
    ...init,
    headers: { ...HEADERS, ...(init.headers ?? {}) },
  });
  if (res.status === 429) {
    const reset = res.headers.get("x-ratelimit-reset");
    const wait = reset ? Math.max(1000, new Date(reset) - Date.now() + 1000) : 60_000;
    console.error(`rate limited, waiting ${Math.round(wait / 1000)}s`);
    await new Promise((r) => setTimeout(r, wait));
    return api(path, init);
  }
  if (!res.ok) throw new Error(`${init.method ?? "GET"} ${path} -> ${res.status} ${await res.text()}`);
  return res.status === 200 ? res.json() : null;
}

// Walk the whole timeline, not just the first page.
async function allStatuses() {
  const out = [];
  let maxId;
  for (;;) {
    const page = await api(
      `/api/v1/accounts/${ACCOUNT_ID}/statuses?limit=40&exclude_replies=1&exclude_reblogs=1` +
        (maxId ? `&max_id=${maxId}` : ""),
    );
    if (!Array.isArray(page) || page.length === 0) break;
    out.push(...page.filter((s) => new Date(s.created_at).getTime() >= SINCE));
    maxId = page[page.length - 1].id;
    process.stderr.write(`\rread ${out.length} statuses`);
    if (new Date(page[page.length - 1].created_at).getTime() < SINCE) break;
  }
  process.stderr.write("\n");
  return out;
}

const activityId = (content) => content.match(/\?i=([A-Za-z0-9-]+)/)?.[1] ?? null;
const plain = (content) => content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

console.log(
  daysArg === "all"
    ? "Scanning the whole timeline."
    : `Scanning the last ${daysArg} days (since ${new Date(SINCE).toISOString().slice(0, 10)}).`,
);

const statuses = await allStatuses();

const groups = new Map();
for (const status of statuses) {
  const id = activityId(status.content);
  if (!id) continue;
  if (!groups.has(id)) groups.set(id, []);
  groups.get(id).push(status);
}

// Oldest first within each group; everything after the first is a repost.
const doomed = [];
for (const [id, group] of groups) {
  if (group.length < 2) continue;
  group.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  const [keep, ...rest] = group;
  console.log(`\n${id}  ${group.length} copies`);
  console.log(`  keep   ${keep.created_at}  ${keep.url}`);
  console.log(`  delete ${rest.length}: ${rest[0].created_at} .. ${rest[rest.length - 1].created_at}`);
  console.log(`  text   ${plain(keep.content).slice(0, 100)}`);
  doomed.push(...rest);
}

console.log(
  `\n${statuses.length} statuses scanned, ${groups.size} activity ids, ` +
    `${doomed.length} duplicates to delete.`,
);

if (doomed.length === 0) process.exit(0);

if (!APPLY) {
  console.log("\nDry run. Re-run with --apply to delete.");
  process.exit(0);
}

// Serial, with a gap. Mastodon's delete limit is 30 per 30 minutes on some
// instances; the 429 handler above waits it out rather than dropping work.
let done = 0;
for (const status of doomed) {
  await api(`/api/v1/statuses/${status.id}`, { method: "DELETE" });
  done += 1;
  console.log(`deleted ${done}/${doomed.length}  ${status.created_at}  ${status.id}`);
  await new Promise((r) => setTimeout(r, 1500));
}
console.log(`\nDeleted ${done}.`);
