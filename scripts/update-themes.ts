/**
 * Theme detection and curation script.
 *
 * Fetches activity feed, compares against existing themes,
 * uses Claude to detect new themes and assign items.
 * Snapshots full item data into themes.json.
 *
 * Usage: npx ts-node -O '{"module":"commonjs"}' scripts/update-themes.ts
 * Env: ANTHROPIC_API_KEY
 */

import fs from "fs";
import path from "path";

const THEMES_FILE = path.join(process.cwd(), "data/themes.json");
const ACTIVITY_URL =
  "https://mknepprath.com/api/v1/activity?max_results=100&min_rating=0";

async function fetchJSON(url: string): Promise<unknown> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${url} (${res.status})`);
  return res.json();
}

async function callClaude(system: string, prompt: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Claude API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || "";
}

interface ActivityItem {
  id: string;
  type: string;
  title: string;
  date: string;
  image?: string;
  url?: string;
  summary?: string;
  action?: string;
}

interface ThemeData {
  title: string;
  slug: string;
  description: string;
  items: ActivityItem[];
  createdAt: string;
  updatedAt: string;
}

async function main() {
  console.log("Fetching activity feed...");
  const activity = (await fetchJSON(ACTIVITY_URL)) as ActivityItem[];
  if (!Array.isArray(activity) || activity.length === 0) {
    console.log("No activity data. Exiting.");
    return;
  }
  console.log(`Got ${activity.length} activity items.`);

  // Read existing themes
  let themes: Record<string, ThemeData> = {};
  try {
    const raw = fs.readFileSync(THEMES_FILE, "utf-8");
    themes = JSON.parse(raw);
  } catch {
    themes = {};
  }

  // Build a set of IDs already in themes to find new items
  const existingIds = new Set<string>();
  for (const theme of Object.values(themes)) {
    for (const item of theme.items) {
      existingIds.add(item.id);
    }
  }

  const newItems = activity.filter((item) => !existingIds.has(item.id));
  console.log(`${newItems.length} new items since last run.`);

  if (newItems.length === 0 && Object.keys(themes).length > 0) {
    console.log("No new items. Exiting.");
    return;
  }

  // Prepare existing themes summary for the prompt
  const themeSummary = Object.values(themes)
    .map(
      (t) =>
        `- "${t.title}" (slug: ${t.slug}, ${t.items.length} items): ${t.description}`,
    )
    .join("\n");

  // Prepare new items for the prompt (compact format)
  const itemsForPrompt = newItems
    .map(
      (item) =>
        `[${item.type}] id:${item.id} "${item.title}" (${item.date})${item.summary ? ` — ${item.summary.slice(0, 100)}` : ""}`,
    )
    .join("\n");

  const system = `You are a curator identifying recurring themes in someone's activity feed.
A theme is a topic, subject, or interest that appears across multiple content types (films, books, posts, music, photos, social posts, etc.).

Rules:
- A theme needs at least 3 items across at least 2 different content types to be viable.
- Themes should be specific and interesting, not generic ("movies" is too broad, "Hitchcock" is good).
- Each item can belong to at most one theme (pick the best fit).
- Not every item needs a theme — most won't have one.
- Theme slugs should be lowercase, hyphenated, URL-safe.
- Theme descriptions should be 1-2 sentences, written in third person about Michael.
- Be conservative — it's better to have fewer strong themes than many weak ones.

Respond with ONLY valid JSON in this exact format:
{
  "themes": {
    "slug": {
      "title": "Theme Title",
      "slug": "slug",
      "description": "One or two sentence description.",
      "newItemIds": ["id1", "id2"]
    }
  }
}

Include existing theme slugs if new items should be added to them.
Only include themes that have new items to add.
If no themes are detected, respond with: {"themes": {}}`;

  const prompt = `${themeSummary ? `EXISTING THEMES:\n${themeSummary}\n\n` : ""}NEW ACTIVITY ITEMS:\n${itemsForPrompt}`;

  console.log("Calling Claude for theme detection...");
  const response = await callClaude(system, prompt);

  // Extract JSON from response (Claude sometimes wraps in markdown)
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.log("No valid JSON in response. Exiting.");
    console.log("Response:", response);
    return;
  }

  let result: {
    themes: Record<
      string,
      { title: string; slug: string; description: string; newItemIds: string[] }
    >;
  };
  try {
    result = JSON.parse(jsonMatch[0]);
  } catch {
    console.log("Failed to parse Claude response as JSON.");
    console.log("Response:", response);
    return;
  }

  if (
    !result.themes ||
    Object.keys(result.themes).length === 0
  ) {
    console.log("No themes detected. Exiting.");
    return;
  }

  // Build a lookup of all activity items by ID (both new and existing in themes)
  const itemLookup = new Map<string, ActivityItem>();
  for (const item of activity) {
    itemLookup.set(item.id, item);
  }

  const now = new Date().toISOString();
  let changed = false;

  for (const [slug, themeUpdate] of Object.entries(result.themes)) {
    if (!themeUpdate.newItemIds || themeUpdate.newItemIds.length === 0) continue;

    // Snapshot the full item data for new items
    const newSnapshotItems: ActivityItem[] = [];
    for (const id of themeUpdate.newItemIds) {
      const item = itemLookup.get(id);
      if (item) {
        newSnapshotItems.push({
          id: item.id,
          type: item.type,
          title: item.title,
          date: item.date,
          image: item.image,
          url: item.url,
          summary: item.summary,
          action: item.action,
        });
      }
    }

    if (newSnapshotItems.length === 0) continue;

    if (themes[slug]) {
      // Update existing theme
      themes[slug].items.push(...newSnapshotItems);
      themes[slug].updatedAt = now;
      // Update description if provided
      if (themeUpdate.description) {
        themes[slug].description = themeUpdate.description;
      }
      console.log(
        `Updated theme "${themes[slug].title}" with ${newSnapshotItems.length} new items (total: ${themes[slug].items.length})`,
      );
    } else {
      // Validate: need 3+ items across 2+ types
      const types = new Set(newSnapshotItems.map((i) => i.type));
      if (newSnapshotItems.length < 3 || types.size < 2) {
        console.log(
          `Skipping theme "${themeUpdate.title}" — needs 3+ items across 2+ types (got ${newSnapshotItems.length} items, ${types.size} types)`,
        );
        continue;
      }

      // Create new theme
      themes[slug] = {
        title: themeUpdate.title,
        slug,
        description: themeUpdate.description,
        items: newSnapshotItems,
        createdAt: now,
        updatedAt: now,
      };
      console.log(
        `Created theme "${themeUpdate.title}" with ${newSnapshotItems.length} items`,
      );
    }

    changed = true;
  }

  if (changed) {
    // Sort items within each theme by date
    for (const theme of Object.values(themes)) {
      theme.items.sort(
        (a, b) => +new Date(b.date) - +new Date(a.date),
      );
    }

    fs.writeFileSync(THEMES_FILE, JSON.stringify(themes, null, 2) + "\n");
    console.log("Wrote updated themes.json");
  } else {
    console.log("No changes to themes.");
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
