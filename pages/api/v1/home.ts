import { projectLinks } from "@data/links";
import themeData from "@data/themes.json";
import youtubeVideos from "@data/youtube-videos";
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
const MAX_VIDEOS = 6;
const MAX_THEMES = 2;
const PHOTO_EVERY = 3;
const SHOT_EVERY = 7;
// Commits nobody wrote are not activity.
const AUTOMATED = /\b(automated|dependabot|renovate)\b/i;

export interface HomeVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  year: string;
  /** Muted, looping embed used to play the clip in place on a phone. */
  embed: string;
}

export interface HomeTheme {
  title: string;
  slug: string;
  description: string;
  count: number;
}

type HomeItem =
  | { kind: "activity"; post: PostListItem }
  | { kind: "video"; video: HomeVideo }
  | { kind: "theme"; theme: HomeTheme }
  | { kind: "photo"; photo: Toot; fill?: boolean }
  | { kind: "shot"; shot: Shot }
  | { kind: "project"; project: (typeof projectLinks)[number] };

interface VimeoVideo {
  id: number;
  title: string;
  url: string;
  thumbnail_large: string;
  upload_date: string;
}

/** YouTube's oEmbed gives a title and thumbnail without needing an API key. */
const youtube = async (id: string): Promise<HomeVideo | null> => {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    return {
      id,
      title: data.title,
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      year: "",
      /*
       * No loop: YouTube implements it by re-queuing the video as a one-item
       * playlist, which tears the player down and rebuilds it every cycle — a
       * visible flash, and relentless on a clip only seconds long. It plays
       * once and holds, and plays again if you scroll back to it.
       */
      embed: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&playsinline=1&modestbranding=1&rel=0`,
    };
  } catch {
    return null;
  }
};

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
  const [activity, photoData, shotData, videoData] = await Promise.all([
    // Reach well back; the scoring decides what is worth a tile, not the slice.
    get<PostListItem>("/api/v1/activity?max_results=200&min_rating=0"),
    get<Toot>("/api/v1/photos?limit=24"),
    get<Shot>("/api/v1/dribbble"),
    get<VimeoVideo>("/api/v1/vimeo"),
  ]);

  // Both places the work lives, newest first, so the mix is not all one host.
  const fromYouTube = (
    await Promise.all(youtubeVideos.slice(0, MAX_VIDEOS).map(youtube))
  ).filter((video): video is HomeVideo => !!video);

  const fromVimeo: HomeVideo[] = videoData
    .filter((video) => video.thumbnail_large)
    .map((video) => ({
      id: String(video.id),
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail_large,
      year: (video.upload_date || "").slice(0, 4),
      embed: `https://player.vimeo.com/video/${video.id}?background=1&autoplay=1&loop=1&muted=1`,
    }));

  const videos: HomeVideo[] = [];
  for (let n = 0; n < Math.max(fromYouTube.length, fromVimeo.length); n++) {
    if (fromYouTube[n]) videos.push(fromYouTube[n]);
    if (fromVimeo[n]) videos.push(fromVimeo[n]);
  }
  videos.length = Math.min(videos.length, MAX_VIDEOS);

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

  /*
   * Themes are written from the activity itself, so they say something no
   * single tile can. They rotate by the day rather than always leading with
   * the same one.
   */
  const allThemes = Object.values(themeData as Record<string, {
    title: string;
    slug: string;
    description: string;
    items: unknown[];
  }>);
  const turn = Math.floor(Date.now() / 86400000) % Math.max(allThemes.length, 1);
  const themes: HomeTheme[] = allThemes
    .slice(turn)
    .concat(allThemes.slice(0, turn))
    .slice(0, MAX_THEMES)
    .map((theme) => ({
      title: theme.title,
      slug: theme.slug,
      description: theme.description,
      count: theme.items?.length ?? 0,
    }));

  const items: HomeItem[] = [];
  let p = 1;
  let s = 0;
  let j = 0;
  let v = 0;
  let t = 0;
  // Evergreen things are spaced evenly across the whole stream; a fixed cadence
  // places only as many as the stream is long and leaves the rest in a heap at
  // the end.
  const projectStep = projects.length ? posts.length / (projects.length + 1) : 0;
  const videoStep = videos.length ? posts.length / (videos.length + 1) : 0;
  const themeStep = themes.length ? posts.length / (themes.length + 1) : 0;

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
    while (themeStep && t < themes.length && n >= themeStep * (t + 1)) {
      items.push({ kind: "theme", theme: themes[t] });
      t++;
    }
    while (videoStep && v < videos.length && n >= videoStep * (v + 1)) {
      items.push({ kind: "video", video: videos[v] });
      v++;
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
  while (v < videos.length) items.push({ kind: "video", video: videos[v++] });
  while (t < themes.length) items.push({ kind: "theme", theme: themes[t++] });
  while (j < projects.length) items.push({ kind: "project", project: projects[j++] });

  setCacheControl(res, 300);
  res.status(200).json({ items, latest: recent[0]?.date ?? null });
};
