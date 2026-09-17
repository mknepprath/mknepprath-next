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

const MAX_AGE_DAYS = 60;
const MIN_POSTS = 24;
const MAX_PHOTOS = 20;
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
    get<PostListItem>("/api/v1/activity?max_results=90&min_rating=0"),
    get<Toot>("/api/v1/photos?limit=24"),
    get<Shot>("/api/v1/dribbble"),
  ]);

  const recent = activity
    .filter((post) => post.type !== "PHOTO")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  // Anchored to the newest item rather than the clock, so the window is stable
  // for as long as the response is cached.
  const newest = recent[0] ? +new Date(recent[0].date) : 0;
  const cutoff = newest - MAX_AGE_DAYS * 86400000;
  const fresh = recent.filter((post) => +new Date(post.date) > cutoff);
  const posts = (fresh.length >= MIN_POSTS ? fresh : recent.slice(0, MIN_POSTS)).filter(
    (post) => post.type !== "REPO" || !AUTOMATED.test(`${post.title} ${post.summary || ""}`),
  );

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
