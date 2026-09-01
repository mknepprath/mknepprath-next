/**
 * PSN trophy fetcher.
 *
 * Pulls recently earned trophies from Sony's own API (via psn-api) and writes
 * them to data/trophies.json for the activity feed to import. Run on a schedule
 * by .github/workflows/update-trophies.yml.
 *
 * Deliberately not a serverless route: collecting the feed takes dozens of API
 * calls, well past the 8s budget activity.ts allows each endpoint.
 *
 * Usage: npx tsx scripts/update-trophies.ts
 * Env: PSN_NPSSO — the npsso value from
 *      https://ca.account.sony.com/api/v1/ssocookie while signed in to
 *      playstation.com. Expires roughly every two months.
 */

import fs from "fs";
import path from "path";

import {
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  getTitleTrophies,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  type AuthTokensResponse,
} from "psn-api";

const OUT_FILE = path.join(process.cwd(), "data/trophies.json");

// How many trophies to keep, and how many recently-played titles to walk. The
// feed only ever shows the newest handful, so there is no point paging through
// a decade of back catalogue on every run.
const MAX_TROPHIES = 40;
const MAX_TITLES = 25;

const MAX_ATTEMPTS = 5;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * PSN rate-limits fairly aggressively when walking many titles, so give any
 * failure a few chances before letting the run fail.
 */
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

// Sony's npsso is good for roughly 60 days from issue and the window does not
// slide — presenting it back to the endpoint returns the same token with the
// clock already ticked down, and the OAuth refresh token expires sooner (10
// days, also absolute). So the credential genuinely has to be replaced by hand.
// The one thing worth automating is knowing before it dies rather than after.
const NPSSO_WARN_DAYS = 14;

async function reportNpssoExpiry(npsso: string): Promise<void> {
  try {
    const res = await fetch("https://ca.account.sony.com/api/v1/ssocookie", {
      headers: { Cookie: `npsso=${npsso}` },
    });
    if (!res.ok) return;

    const { expires_in: expiresIn } = (await res.json()) as { expires_in?: number };
    if (typeof expiresIn !== "number") return;

    const days = Math.floor(expiresIn / 86400);
    console.log(`PSN_NPSSO expires in ${days} days.`);

    if (days <= NPSSO_WARN_DAYS) {
      // GitHub renders this as an annotation on the run.
      console.log(
        `::warning title=PSN_NPSSO expiring::PSN_NPSSO expires in ${days} days. ` +
          `Replace it from https://ca.account.sony.com/api/v1/ssocookie while signed in to playstation.com, ` +
          `then update the repo secret.`,
      );
    }
    // Hand the day count to the workflow so it can open an issue.
    if (process.env.GITHUB_OUTPUT) {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `npsso_days=${days}\n`);
    }
  } catch {
    // Expiry reporting is a convenience — never let it fail the trophy update.
  }
}

interface Trophy {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  game: string;
  type: string;
  rarity: string;
}

async function main() {
  const npsso = process.env.PSN_NPSSO;
  if (!npsso) throw new Error("PSN_NPSSO not set");

  const auth: AuthTokensResponse = await withRetry("PSN auth", async () =>
    exchangeCodeForAccessToken(await exchangeNpssoForCode(npsso)),
  );
  console.log("Authenticated with PSN.");

  await reportNpssoExpiry(npsso);

  const { trophyTitles } = await withRetry("getUserTitles", () =>
    getUserTitles(auth, "me", { limit: MAX_TITLES }),
  );

  // Titles are returned newest-played first. Skip the ones where nothing has
  // been earned — started-but-untouched games are common and cost two calls each.
  const played = trophyTitles.filter((title) => {
    const { bronze, silver, gold, platinum } = title.earnedTrophies;
    return bronze + silver + gold + platinum > 0;
  });
  console.log(`${played.length} of ${trophyTitles.length} recent titles have earned trophies.`);

  const trophies: Trophy[] = [];

  for (const title of played) {
    // PS5 titles use the default service; older ones must ask for "trophy".
    const options = title.trophyTitlePlatform.includes("PS5")
      ? {}
      : { npServiceName: "trophy" as const };

    try {
      const [earned, defs] = await Promise.all([
        withRetry(`earned:${title.trophyTitleName}`, () =>
          getUserTrophiesEarnedForTitle(auth, "me", title.npCommunicationId, "all", options),
        ),
        withRetry(`defs:${title.trophyTitleName}`, () =>
          getTitleTrophies(auth, title.npCommunicationId, "all", options),
        ),
      ]);

      const byId = new Map(defs.trophies.map((d) => [d.trophyId, d]));

      for (const t of earned.trophies) {
        const def = byId.get(t.trophyId);
        if (!t.earned || !t.earnedDateTime || !def?.trophyName) continue;

        trophies.push({
          id: `t${title.npCommunicationId}-${t.trophyId}`,
          title: def.trophyName,
          summary: def.trophyDetail ?? "",
          image: def.trophyIconUrl ?? "",
          date: t.earnedDateTime,
          game: title.trophyTitleName,
          type: def.trophyType ?? "",
          rarity: t.trophyEarnedRate ?? "",
        });
      }
    } catch (error) {
      // One bad title shouldn't lose the whole feed.
      console.error(`Skipping ${title.trophyTitleName}: ${String(error)}`);
    }
  }

  trophies.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const recent = trophies.slice(0, MAX_TROPHIES);

  const previous = fs.existsSync(OUT_FILE) ? fs.readFileSync(OUT_FILE, "utf-8") : "";
  const next = `${JSON.stringify(recent, null, 2)}\n`;

  if (previous === next) {
    console.log(`No changes. ${recent.length} trophies.`);
    return;
  }

  fs.writeFileSync(OUT_FILE, next);
  console.log(`Wrote ${recent.length} trophies, newest ${recent[0]?.date ?? "—"}.`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
