import { projectLinks } from "@data/links";
import { setCacheControl } from "@lib/api";
import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

/*
 * The composed list the homepage renders. `/api/v1/activity` stays the raw
 * chronological feed that the Mastodon poster and the other pages read; this
 * route is the homepage's own view of the world, so the page itself only has
 * to decide how a tile looks, never what belongs in the grid or in what order.
 */

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

/*
 * Relevance, not just recency. Age decays rather than falling off a cliff, so
 * a piece of writing from months ago can still outrank yesterday's walk, and
 * how much of a person is in a thing counts: a review outranks a bare rating,
 * a commit message outranks nothing at all.
 */
const RECENCY_WEIGHT = 90;
const RECENCY_FALLOFF = 45;
const OLDEST_DAYS = 365;
// A tile has to be earned: without a floor the slots outnumber the candidates
// and everything gets in regardless of how it scored.
const MIN_SCORE = 60;
const MAX_POSTS = 42;
const MAX_PER_TYPE = 8;
const MAX_PHOTOS = 20;

// Only some summaries are written by a person; a chess tile's "Rating · Accuracy"
// or a run's distance line is generated, and should earn no credit for prose.
const AUTHORED = new Set(["FILM", "BOOK", "POST", "HIGHLIGHT"]);
const TEXT_POSTS = new Set(["TOOT", "SKEET", "ROBOT"]);

const TYPE_WEIGHT: Record<string, number> = {
  POST: 100,
  TROPHY: 42,
  FILM: 50,
  BOOK: 50,
  SKEET: 36,
  MUSIC: 40,
  GAME: 40,
  HIGHLIGHT: 38,
  TOOT: 36,
  ROBOT: 32,
  REPO: 30,
  RUN: 26,
  CHESS: 20,
};
const MAX_SHOTS = 4;
const PHOTO_EVERY = 3;
const SHOT_EVERY = 7;
// Commits nobody wrote are not activity.
const AUTOMATED = /\b(automated|dependabot|renovate)\b/i;

type HomeItem =
  | { kind: "activity"; post: PostListItem }
  | { kind: "photo"; photo: Toot; fill?: boolean }
  | { kind: "shot"; shot: Shot }
  | { kind: "project"; project: (typeof projectLinks)[number] };

const get = async <T>(path: string): Promise<T[]> => {
  try {
    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

export default async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const [activity, photoData, shotData] = await Promise.all([
    // Reach well back; the scoring decides what is worth a tile, not the slice.
    get<PostListItem>("/api/v1/activity?max_results=200&min_rating=0"),
    get<Toot>("/api/v1/photos?limit=24"),
    get<Shot>("/api/v1/dribbble"),
  ]);

  const recent = activity
    .filter((post) => post.type !== "PHOTO")
    .filter(
      (post) => post.type !== "REPO" || !AUTOMATED.test(`${post.title} ${post.summary || ""}`),
    )
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  // Anchored to the newest item rather than the clock, so a cached response
  // stays internally consistent.
  const newest = recent[0] ? +new Date(recent[0].date) : Date.now();
  const floor = newest - OLDEST_DAYS * 86400000;
  const seen = new Map<string, number>();

  const scored = recent
    .filter((post) => +new Date(post.date) > floor)
    .map((post) => {
      const type = post.type || "POST";
      const ageDays = Math.max(0, (newest - +new Date(post.date)) / 86400000);
      const summary = post.summary || "";

      // Counted newest first, so it is the repeats further down that are
      // damped rather than the freshest example of a kind.
      const repeat = seen.get(type) || 0;
      seen.set(type, repeat + 1);

      const substance = AUTHORED.has(type)
        ? summary.length > 60
          ? 20
          : summary.length > 20
            ? 8
            : 0
        : TEXT_POSTS.has(type) && (post.title || "").length > 80
          ? 12
          : 0;

      const score =
        (TYPE_WEIGHT[type] ?? 30) +
        RECENCY_WEIGHT * Math.exp(-ageDays / RECENCY_FALLOFF) +
        substance +
        (post.image ? 12 : 0) -
        repeat * 7;

      return { post, score, repeat, type };
    })
    .filter(({ repeat, score }) => repeat < MAX_PER_TYPE && score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_POSTS);

  /*
   * Chosen by score, but read as a stream: back to date order, then nudged so
   * two of the same kind never sit next to each other.
   */
  const queue = scored
    .map(({ post, type }) => ({ post, type }))
    .sort((a, b) => +new Date(b.post.date) - +new Date(a.post.date));

  const posts: PostListItem[] = [];
  let lastType = "";
  while (queue.length) {
    const next = queue.findIndex((item) => item.type !== lastType);
    const [taken] = queue.splice(next === -1 ? 0 : next, 1);
    posts.push(taken.post);
    lastType = taken.type;
  }

  const photos = photoData
    .filter((photo) => photo.media_attachments?.[0]?.type === "image")
    .slice(0, MAX_PHOTOS);
  const shots = shotData.filter((shot) => shot.images?.normal).slice(0, MAX_SHOTS);

  // A project whose repo is already in the stream is being represented by its
  // own commits, so only the quiet ones need a tile.
  const liveRepos = new Set(
    posts.filter((post) => post.type === "REPO").map((post) => post.title),
  );
  const projects = projectLinks.filter(
    (project) => !project.githubRepo || !liveRepos.has(project.githubRepo.split("/")[1]),
  );

  const items: HomeItem[] = [];
  let p = 1;
  let s = 0;
  let j = 0;
  // Projects are evergreen, so they are spaced evenly across the whole stream
  // instead of riding a fixed cadence that leaves a remainder at the end.
  const projectStep = projects.length ? posts.length / (projects.length + 1) : 0;

  if (photos[0]) items.push({ kind: "photo", photo: photos[0] });

  posts.forEach((post, n) => {
    if (n > 0 && n % PHOTO_EVERY === 0 && p < photos.length) {
      items.push({ kind: "photo", photo: photos[p] });
      p++;
    }
    if (n > 0 && n % SHOT_EVERY === 0 && s < shots.length) {
      items.push({ kind: "shot", shot: shots[s] });
      s++;
    }
    while (projectStep && j < projects.length && n >= projectStep * (j + 1)) {
      items.push({ kind: "project", project: projects[j] });
      j++;
    }
    items.push({ kind: "activity", post });
  });

  // Anything the cadences did not reach still belongs on the page. These go in
  // last as single squares, which lets the grid pack them into leftover gaps.
  while (p < photos.length) items.push({ kind: "photo", photo: photos[p++], fill: true });
  while (j < projects.length) items.push({ kind: "project", project: projects[j++] });

  setCacheControl(res, 300);
  res.status(200).json({ items, latest: recent[0]?.date ?? null });
};
