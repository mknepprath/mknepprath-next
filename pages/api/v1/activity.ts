import parseISO from "date-fns/parseISO";
import { NextApiRequest, NextApiResponse } from "next";

import posts from "@data/posts";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://mknepprath.com";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { max_results } = req.query;

  const [films, books, tweets, repos, toots]: [
    Film[],
    Book[],
    Tweets,
    Repo[],
    Toot[]
  ] = await Promise.all([
    fetch(`${BASE_URL}/api/v1/films`).then((response) => response.json()),
    fetch(`${BASE_URL}/api/v1/books`).then((response) => response.json()),
    fetch(`${BASE_URL}/api/v1/timeline/15332057`).then((response) =>
      response.json()
    ),
    fetch(`${BASE_URL}/api/v1/github/repos`).then((response) =>
      response.json()
    ),
    fetch(`${BASE_URL}/api/v1/toots`).then((response) => response.json()),
  ]);

  const filmPosts = films?.map((film) => ({
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
        tweet?.public_metrics?.like_count > 3
    )
    .map((tweet) => {
      const media = tweets?.includes.media.find(
        (m) => m.media_key === tweet.attachments?.media_keys[0]
      );
      const text = tweet.text.replace(tweet.entities.urls[0].url, "").trim();
      return {
        date: new Date(tweet.created_at).toISOString(),
        id: `tweet-${tweet.id}`,
        image: media?.preview_image_url || media?.url,
        summary: text,
        title: text,
        type: "TWEET" as PostListItem["type"],
      };
    });

  const repoPosts = repos
    // ?.filter((repo) => repo.name !== "mknepprath-next")
    ?.map((repo) => ({
      date: repo.pushed_at,
      id: `repo-${repo.id}`,
      summary: repo.description,
      title: repo.name,
      type: "REPO" as PostListItem["type"],
      url: repo.homepage,
    }));

  const bookPosts = books?.map((book) => ({
    date: new Date(book.date_finished).toISOString(),
    id: `book-${book.isbn}`,
    image: book.large_image_url,
    summary: book.author,
    title: book.title,
    type: "BOOK" as PostListItem["type"],
    url: book.link,
  }));

  const tootPosts = toots?.map((toot) => ({
    date: new Date(toot.published_at).toISOString(),
    id: `toot-${toot.id}`,
    image: toot.image,
    summary: toot.description,
    title: toot.description,
    type: "TOOT" as PostListItem["type"],
    url: toot.id,
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
    ...repoPosts,
    ...bookPosts,
    ...tootPosts,
    ...typedPosts,
  ] // The `sort` method can be conveniently used with function expressions:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    .sort((a, b) => +parseISO(b.date) - +parseISO(a.date))
    .slice(0, max_results ? parseInt(max_results as string) : 8);

  // If none of the posts are of type "POST", add one that is.
  if (allPosts.every((post) => post.type !== "POST")) {
    allPosts.pop();
    allPosts.push(typedPosts[0]);
    allPosts.sort((a, b) => +parseISO(b.date) - +parseISO(a.date));
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV === "production")
    res.setHeader("Cache-Control", "max-age=86400");
  res.end(JSON.stringify(allPosts));
};
