import posts from "@data/posts";
import { parseISO } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

// Generic function to fetch and normalize data from different sources
const fetchData = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error(`Failed to fetch from ${endpoint}`);
  return response.json();
};

// Function to standardize the data into the common Post structure
const formatPost = ({
  action,
  date,
  id,
  title,
  summary,
  type,
  image = "",
  url = "",
}: Partial<PostListItem>): PostListItem => ({
  action: action || "Posted",
  date: new Date(date || Date.now()).toISOString(),
  id: id || "",
  title: title || "Untitled",
  summary: summary || "",
  type: type || "POST",
  image,
  url,
});

// Function to process data from specific endpoints
const processEndpointData = async (
  endpoint: string,
  type: PostListItem["type"],
  formatFn: (data: any) => Partial<PostListItem>[], // eslint-disable-line @typescript-eslint/no-explicit-any
): Promise<PostListItem[]> => {
  try {
    const data = await fetchData(endpoint);
    return formatFn(data).map((post) => formatPost({ ...post, type }));
  } catch (error) {
    console.error(`Error processing data from ${endpoint}:`, error);
    return [];
  }
};

// Formatting functions for each data source
const formatFilmData = (films: Film[]): Partial<PostListItem>[] =>
  films.map((film) => ({
    action: film.rewatched ? "Rewatched" : "Watched",
    date: film.published_at,
    id: `f${film.id}`,
    title: film.title,
    summary: film.review,
    image: film.image_url,
    url: film.link,
  }));

const formatBookData = (books: Book[]): Partial<PostListItem>[] =>
  books.map((book) => ({
    action: "Read",
    date: book.date_finished,
    id: `b${book.isbn}`,
    title: book.title,
    summary: book.review,
    image: book.large_image_url,
    url: book.link,
  }));

const runTypeMap: { [type: string]: string } = {
  AlpineSki: "Skied",
  BackcountrySki: "Skied",
  Badminton: "Badminton",
  Canoeing: "Canoed",
  Crossfit: "Worked out",
  EBikeRide: "EBiked",
  Elliptical: "Elliptical",
  EMountainBikeRide: "Biked",
  Golf: "Golfed",
  GravelRide: "Biked",
  Handcycle: "Handcycled",
  HighIntensityIntervalTraining: "Worked out",
  Hike: "Hiked",
  IceSkate: "Skated",
  InlineSkate: "Skated",
  Kayaking: "Kayaked",
  Kitesurf: "Kitesurfed",
  MountainBikeRide: "Biked",
  NordicSki: "Skied",
  Pickleball: "Played",
  Pilates: "Worked out",
  Racquetball: "Played",
  Ride: "Biked",
  RockClimbing: "Climbed",
  RollerSki: "Skied",
  Rowing: "Rowed",
  Run: "Ran",
  Sail: "Sailed",
  Skateboard: "Skateboarded",
  Snowboard: "Snowboarded",
  Snowshoe: "Snowshoed",
  Soccer: "Played",
  Squash: "Played",
  StairStepper: "Worked out",
  StandUpPaddling: "Paddled",
  Surfing: "Surfing",
  Swim: "Swam",
  TableTennis: "Played",
  Tennis: "Played",
  TrailRun: "Ran",
  Velomobile: "Biked",
  VirtualRide: "Biked",
  VirtualRow: "Rowed",
  VirtualRun: "Ran",
  Walk: "Walked",
  WeightTraining: "Worked out",
  Wheelchair: "Wheelchaired",
  Windsurf: "Windsurfed",
  Workout: "Worked out",
  Yoga: "Did yoga",
};

const formatRunData = (runs: Run[]): Partial<PostListItem>[] =>
  runs.map((run) => ({
    action: runTypeMap[run.type] || "Worked out",
    date: run.start_date_local,
    id: `ru${run.id}`,
    title: run.name,
    summary: `Distance: ${Math.round((run.distance / 1609.34) * 100) / 100} mi, Time: ${Math.floor(run.moving_time / 60)} min, Elevation: ${Math.round(
      run.total_elevation_gain * 3.281,
    )} ft`,
    image: run.map?.summary_polyline,
    url: `https://www.strava.com/activities/${run.id}`,
  }));

const formatRepoData = (repos: Repo[]): Partial<PostListItem>[] =>
  repos.map((repo) => ({
    action: "Updated",
    date: repo.pushed_at,
    id: `r${repo.id}`,
    title: repo.name,
    summary: repo.description,
    url: repo.homepage || `https://github.com/mknepprath/${repo.name}`,
  }));

const formatBlueskyData = (skeets: Skeet[]): Partial<PostListItem>[] =>
  skeets
    .filter((skeet) => skeet.text)
    .map((skeet) => ({
      action: "Posted",
      date: skeet.created_at,
      id: `sk${skeet.id}`,
      title: skeet.text,
      summary: skeet.text,
      image: skeet.image || "",
      url: skeet.url,
    }));

const formatRobotData = (toots: Toot[]): Partial<PostListItem>[] =>
  toots
    .filter(
      (toot) =>
        !!(toot.content || toot.media_attachments[0]?.url) &&
        !toot.content.startsWith(`<p><span class="h-card"><a href="`),
    )
    .map((toot) => ({
      action: "Computed",
      date: toot.created_at,
      id: `bot${toot.id}`,
      title: toot.content.replace(/<[^>]+>/g, ""),
      summary: toot.content,
      image:
        toot.media_attachments.length > 0 ? toot.media_attachments[0].url : "",
      url: toot.url,
    }));

const formatTootData = (toots: Toot[]): Partial<PostListItem>[] =>
  toots
    .filter(
      (toot) =>
        !!(toot.content || toot.media_attachments[0]?.url) &&
        !toot.content.startsWith(`<p><span class="h-card"><a href="`) &&
        !toot.content.includes("?i="),
    )
    .map((toot) => ({
      action: "Tooted",
      date: toot.created_at,
      id: `t${toot.id}`,
      title: toot.content.replace(/<[^>]+>/g, ""), // Stripping HTML tags from Mastodon content
      summary: toot.content,
      image:
        toot.media_attachments.length > 0 ? toot.media_attachments[0].url : "",
      url: toot.url,
    }));

const formatPhotoData = (photos: Toot[]): Partial<PostListItem>[] =>
  photos
    .filter(
      (photo) =>
        !!(photo.content || photo.media_attachments[0]?.url) &&
        !photo.content?.startsWith(`<p><span class="h-card"><a href="`) &&
        !photo.content?.includes("?i="),
    )
    .map((photo) => ({
      action: "Captured",
      date: photo.created_at,
      id: `ph${photo.id}`,
      title: photo.content.replace(/<[^>]+>/g, ""),
      summary: photo.content,
      image:
        photo.media_attachments.length > 0
          ? photo.media_attachments[0].url
          : "",
      url: photo.url,
    }));

const formatHighlightData = (
  highlights: Highlight[],
): Partial<PostListItem>[] =>
  highlights
    .filter((highlight) => highlight.highlighted_at && highlight.book)
    .map((highlight) => ({
      action: "Highlighted",
      date: highlight.highlighted_at,
      id: `h${highlight.id}`,
      title: highlight.text,
      summary: `From ${highlight.book.title} by ${highlight.book.author}`,
      image: highlight.book.cover_image_url,
      url: highlight.book.source_url.replace(/=$/, ""),
    }));

const formatMusicData = (music: Music[]): Partial<PostListItem>[] => {
  // Group by album, counting unique tracks per album
  const albumTracks = new Map<string, { tracks: Set<number>; latest: Music }>();
  for (const m of music) {
    const albumName = m.track.albums[0]?.name;
    if (!albumName) continue;
    const entry = albumTracks.get(albumName);
    if (entry) {
      entry.tracks.add(m.track.id);
      if (m.endTime > entry.latest.endTime) entry.latest = m;
    } else {
      albumTracks.set(albumName, {
        tracks: new Set([m.track.id]),
        latest: m,
      });
    }
  }

  // Only include albums with 2+ unique tracks — filters out playlist noise
  return Array.from(albumTracks.values())
    .filter((entry) => entry.tracks.size >= 2)
    .map(({ latest: m }) => ({
      action: "Listened to",
      date: m.endTime,
      id: `m${m.track.albums[0]?.id}`,
      title: m.track.albums[0]?.name || m.track.name,
      summary: m.track.artists.map((a) => a.name).join(", "),
      image: m.track.albums[0]?.image || "",
      url: `https://stats.fm/album/${m.track.albums[0]?.id}`,
    }));
};

const formatTrophyData = (trophies: Trophy[]): Partial<PostListItem>[] =>
  trophies.map((trophy) => ({
    action: "Earned",
    date: trophy.earnedTimestamp,
    id: `t${trophy.trophyTitle}`,
    title: trophy.trophyTitle,
    summary: trophy.trophyDesc,
    image: trophy.gameImg,
    url: trophy.trophyUrl,
  }));

const formatChessData = (games: Chess[]): Partial<PostListItem>[] =>
  games.map((game) => {
    const actionMap: Record<string, string> = {
      win: "Won against",
      loss: "Lost to",
      draw: "Drew with",
    };
    return {
      action: actionMap[game.result] || "Played",
      date: new Date(game.endTime * 1000).toISOString(),
      id: `ch${game.endTime}`,
      title: game.opponent,
      summary: `Rating: ${game.rating} · Accuracy: ${game.accuracy}% · ${game.opening}`,
      url: game.url,
    };
  });

const formatSteamData = (games: Steam[]): Partial<PostListItem>[] =>
  games.map((game) => ({
    action: "Played",
    date: new Date().toISOString(),
    id: `s${game.appid}`,
    title: game.name,
    summary: `${Math.round((game.playtime_2weeks / 60) * 10) / 10} hours in the last 2 weeks`,
    image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`,
    url: `https://store.steampowered.com/app/${game.appid}`,
  }));

// Main handler function for the API route
export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { max_results, min_rating = "4" } = req.query;
  const rating = parseInt(min_rating as string);
  const maxResults = max_results ? parseInt(max_results as string) : 10;

  // Define all endpoints and their corresponding formatting functions
  const endpoints = [
    {
      url: `/api/v1/films?min_rating=${rating}`,
      type: "FILM" as PostListItem["type"],
      format: formatFilmData,
    },
    {
      url: `/api/v1/books?min_rating=${rating}`,
      type: "BOOK" as PostListItem["type"],
      format: formatBookData,
    },
    {
      url: `/api/v1/runs?minMiles=${rating}`,
      type: "RUN" as PostListItem["type"],
      format: formatRunData,
    },
    {
      url: `/api/v1/github/repos`,
      type: "REPO" as PostListItem["type"],
      format: formatRepoData,
    },
    {
      url: `/api/v1/mastodon`,
      type: "TOOT" as PostListItem["type"],
      format: formatTootData,
    },
    {
      url: `/api/v1/robot-mk`,
      type: "ROBOT" as PostListItem["type"],
      format: formatRobotData,
    },
    {
      url: `/api/v1/bluesky`,
      type: "SKEET" as PostListItem["type"],
      format: formatBlueskyData,
    },
    {
      url: `/api/v1/photos`,
      type: "PHOTO" as PostListItem["type"],
      format: formatPhotoData,
    },
    {
      url: `/api/v1/highlights`,
      type: "HIGHLIGHT" as PostListItem["type"],
      format: formatHighlightData,
    },
    {
      url: `/api/v1/music?limit=200&raw=1`,
      type: "MUSIC" as PostListItem["type"],
      format: formatMusicData,
    },
    {
      url: `/api/v1/psn?username=mknepprath`,
      type: "TROPHY" as PostListItem["type"],
      format: formatTrophyData,
    },
    {
      url: `/api/v1/steam`,
      type: "GAME" as PostListItem["type"],
      format: formatSteamData,
    },
    {
      url: `/api/v1/chess`,
      type: "CHESS" as PostListItem["type"],
      format: formatChessData,
    },
  ];

  try {
    // Fetch and format posts from all endpoints
    const externalPosts = (
      await Promise.all(
        endpoints.map((endpoint) =>
          processEndpointData(endpoint.url, endpoint.type, endpoint.format),
        ),
      )
    ).flat();

    const typedPosts = posts.map(
      (post) =>
        ({
          ...post,
          id: `p${post.id}`,
          url: `/writing/${post.id}`,
          type: "POST",
        }) as PostListItem,
    );

    const allPosts = [...externalPosts, ...typedPosts];

    // If none of the posts are of type "POST", add one that is.
    if (allPosts.every((post) => post.type !== "POST")) {
      allPosts.pop();
      allPosts.push(typedPosts[0]);
      allPosts.sort((a, b) => +parseISO(b.date) - +parseISO(a.date));
    }

    // Sort and limit the posts
    const sortedPosts = allPosts
      .sort((a, b) => +parseISO(b.date) - +parseISO(a.date))
      .slice(0, maxResults);

    res.status(200).json(sortedPosts);
  } catch (error) {
    console.error("Error fetching and processing posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
