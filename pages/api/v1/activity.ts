import posts from "@data/posts";
import parseISO from "date-fns/parseISO";
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

const formatRunData = (runs: Run[]): Partial<PostListItem>[] =>
  runs.map((run) => ({
    action: run.type === "Run" ? "Ran" : "Walked",
    date: run.start_date_local,
    id: `ru${run.id}`,
    title: run.name,
    summary: `Distance: ${Math.round((run.distance / 1609.34) * 100) / 100} mi, Time: ${Math.floor(run.moving_time / 60)} min, Elevation: ${Math.round(
      run.total_elevation_gain * 3.281,
    )} ft`,
    // image: run.map?.summary_polyline,
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

const formatMusicData = (music: Music[]): Partial<PostListItem>[] =>
  music.map((m) => ({
    action: "Added",
    date: m.attributes.dateAdded,
    id: `m${m.id}`,
    title: m.attributes.name,
    summary: m.attributes.artistName,
    image:
      m.attributes.artwork?.url.replace("{w}", "500").replace("{h}", "500") ||
      "",
    url: m.attributes.playParams.globalId
      ? `https://music.apple.com/us/${m.attributes.playParams.kind}/${m.attributes.playParams.globalId}`
      : undefined,
  }));

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
      url: `/api/v1/music?limit=20`,
      type: "MUSIC" as PostListItem["type"],
      format: formatMusicData,
    },
    {
      url: `/api/v1/psn?username=mknepprath`,
      type: "TROPHY" as PostListItem["type"],
      format: formatTrophyData,
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
