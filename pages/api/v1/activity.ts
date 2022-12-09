import parseISO from "date-fns/parseISO";
import { NextApiRequest, NextApiResponse } from "next";

import posts from "@data/posts";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { max_results } = req.query;

  const [films, books, tweets, games, repos, toots]: [
    Film[],
    Book[],
    Tweets,
    Tweets,
    Repo[],
    Toot[]
  ] = await Promise.all([
    fetch(`${BASE_URL}/api/v1/films`).then((response) => response.json()),
    fetch(`${BASE_URL}/api/v1/books`).then((response) => response.json()),
    fetch(`${BASE_URL}/api/v1/timeline/15332057?max_results=20`).then(
      (response) => response.json()
    ),
    fetch(`${BASE_URL}/api/v1/timeline/2634106687?max_results=5`).then(
      (response) => response.json()
    ),
    fetch(`${BASE_URL}/api/v1/github/repos`).then((response) =>
      response.json()
    ),
    fetch(`${BASE_URL}/api/v1/mastodon`).then((response) => response.json()),
  ]);

  const filmPosts = films?.map((film) => ({
    action: film.rewatched ? "Rewatched" : "Watched",
    date: new Date(film.published_at).toISOString(),
    id: `film-${film.title.split(" ").join("_")}_${film.year}`,
    image: film.image_url,
    summary: film.review,
    title: film.title,
    type: "FILM" as PostListItem["type"],
    url: film.link,
  }));

  const tweetPosts = (tweets?.data || [])
    ?.filter(
      (tweet) =>
        tweet?.entities?.urls?.length <= 1 &&
        !!tweet?.entities?.urls[0].media_key &&
        tweet?.public_metrics?.like_count > 2
    )
    .map((tweet) => {
      const media = tweets?.includes.media.find(
        (m) => m.media_key === tweet.attachments?.media_keys[0]
      );
      const text = tweet.text.replace(tweet.entities.urls[0].url, "").trim();
      return {
        action: "Tweeted",
        date: new Date(tweet.created_at).toISOString(),
        id: `tweet-${tweet.id}`,
        image: media?.preview_image_url || media?.url,
        summary: text,
        title: text,
        type: "TWEET" as PostListItem["type"],
        url: `https://twitter.com/mknepprath/status/${tweet.id}`,
      };
    });

  const gamePosts = games?.data
    ?.filter(
      (tweet) =>
        tweet?.entities?.urls?.length <= 1 &&
        !!tweet?.entities?.urls[0].media_key
    )
    .map((tweet) => {
      const media = games?.includes.media.find(
        (m) => m.media_key === tweet.attachments?.media_keys[0]
      );
      const text = tweet.text.replace(tweet.entities.urls[0].url, "").trim();
      return {
        action: "Played",
        date: new Date(tweet.created_at).toISOString(),
        id: `tweet-${tweet.id}`,
        image: media?.preview_image_url || media?.url,
        summary: text,
        title: text,
        type: "TWEET" as PostListItem["type"],
        url: `https://twitter.com/MKPlaysSwitch/status/${tweet.id}`,
      };
    });

  const repoPosts = repos
    // ?.filter((repo) => repo.name !== "mknepprath-next")
    ?.map((repo) => ({
      action: "Updated",
      date: repo.pushed_at,
      id: `repo-${repo.id}`,
      summary: repo.description,
      title: repo.name,
      type: "REPO" as PostListItem["type"],
      url: repo.homepage,
    }));

  const bookPosts = books?.map((book) => ({
    action: "Read",
    date: new Date(book.date_finished).toISOString(),
    id: `book-${book.isbn}`,
    image: book.large_image_url,
    summary: book.author,
    title: book.title,
    type: "BOOK" as PostListItem["type"],
    url: book.link,
  }));

  const tootPosts = toots
    ?.filter((toot) => toot.favourites_count > 2)
    .map((toot) => ({
      action: "Tooted",
      date: new Date(toot.created_at).toISOString(),
      id: `toot-${toot.id}`,
      image: toot.media_attachments[0]?.url,
      summary: toot.content,
      title: toot.content,
      type: "TOOT" as PostListItem["type"],
      url: toot.url,
    }));

  const typedPosts = posts
    .map(
      (post) =>
        ({ ...post, id: `post-${post.id}`, type: "POST" } as PostListItem)
    )
    // The `sort` method can be conveniently used with function expressions:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    .sort((a, b) => +parseISO(b.date) - +parseISO(a.date));

  const allPosts = [
    ...filmPosts,
    ...tweetPosts,
    ...gamePosts,
    ...repoPosts,
    ...bookPosts,
    ...tootPosts,
    ...typedPosts,
  ] // The `sort` method can be conveniently used with function expressions:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    .sort((a, b) => +parseISO(b.date) - +parseISO(a.date))
    .slice(0, max_results ? parseInt(max_results as string) : 10);

  // If none of the posts are of type "POST", add one that is.
  if (allPosts.every((post) => post.type !== "POST")) {
    allPosts.pop();
    allPosts.push(typedPosts[0]);
    allPosts.sort((a, b) => +parseISO(b.date) - +parseISO(a.date));
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV === "production")
    res.setHeader(
      "Cache-Control",
      "max-age=0, s-maxage=1, stale-while-revalidate"
    );
  res.end(JSON.stringify(allPosts));
};
