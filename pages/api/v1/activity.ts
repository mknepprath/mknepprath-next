import posts from "@data/posts";
import parseISO from "date-fns/parseISO";
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { max_results, min_rating = "4" } = req.query;
  const rating = parseInt(min_rating as string);

  const [
    films,
    books,
    tweets,
    games,
    repos,
    toots,
    highlights, // music
  ]: [
    Film[],
    Book[],
    Tweets,
    Tweets,
    Repo[],
    Toot[],
    Highlight[]
    // Music[]
  ] = await Promise.all([
    fetch(`${BASE_URL}/api/v1/films?min_rating=${rating}`).then((response) =>
      response.json()
    ),
    fetch(`${BASE_URL}/api/v1/books?min_rating=${rating}`).then((response) =>
      response.json()
    ),
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
    fetch(`${BASE_URL}/api/v1/highlights`).then((response) => response.json()),
    // fetch(`${BASE_URL}/api/v1/music?limit=20`).then((response) =>
    //   response.json()
    // ),
  ]);

  const highlightPosts = highlights
    ?.filter((highlight) => highlight.highlighted_at)
    .map((highlight) => ({
      action: "Highlighted",
      date: new Date(highlight.highlighted_at).toISOString(),
      id: `h${highlight.id}`,
      image: highlight.book.cover_image_url.includes("daringfireball.net")
        ? highlight.book.cover_image_url
        : "",
      summary: `From ${highlight.book.title
        // remove busted links like "httpst.coVS2psPjLqr" from Daring Fireball
        .replace(/httpst\.co\w+/g, "")
        .trim()} by ${highlight.book.author}`,
      title: highlight.text,
      type: "HIGHLIGHT" as PostListItem["type"],
      url: highlight.book.source_url,
    }));

  // const musicPosts = music?.map((m) => ({
  //   action: "Added",
  //   date: new Date(m.attributes.dateAdded).toISOString(),
  //   id: `m${m.id}`,
  //   image:
  //     m.attributes.artwork?.url.replace("{w}", "500").replace("{h}", "500") ||
  //     "",
  //   summary: m.attributes.artistName,
  //   title: m.attributes.name,
  //   type: "MUSIC" as PostListItem["type"],
  //   url: m.attributes.playParams.globalId
  //     ? `https://music.apple.com/us/${m.attributes.playParams.kind}/${m.attributes.playParams.globalId}`
  //     : undefined,
  // }));

  const filmPosts = films?.map((film) => ({
    action: film.rewatched ? "Rewatched" : "Watched",
    date: new Date(film.published_at).toISOString(),
    id: `f${film.id}`,
    image: film.image_url,
    summary: film.review,
    title: film.title,
    type: "FILM" as PostListItem["type"],
    url: film.link,
  }));

  const tweetPosts = (tweets?.data || [])
    ?.filter(
      (tweet) =>
        // If the tweet has no URLs...
        (tweet?.entities?.urls === undefined ||
          // ...or one URL and a media key...
          (tweet?.entities?.urls?.length === 1 &&
            !!tweet?.entities?.urls[0].media_key)) &&
        // ...and at least min_rating likes.
        tweet.public_metrics.like_count >= rating
    )
    .map((tweet) => {
      // Find the media object that matches the media key.
      const media = tweets?.includes.media.find(
        (m) => m.media_key === tweet.attachments?.media_keys[0]
      );
      // If the tweet has a URL for the media object, remove it from the text.
      const text = media
        ? tweet.text.replace(tweet.entities.urls[0].url, "").trim()
        : tweet.text;
      return {
        action: "Tweeted",
        date: new Date(tweet.created_at).toISOString(),
        id: `tw${tweet.id}`,
        image: media?.preview_image_url || media?.url,
        summary: text,
        title: text,
        type: "TWEET" as PostListItem["type"],
        url: `https://twitter.com/mknepprath/status/${tweet.id}`,
      };
    });

  const gamePosts = (games?.data || [])
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
        id: `tw${tweet.id}`,
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
      id: `r${repo.id}`,
      summary: repo.description,
      title: repo.name,
      type: "REPO" as PostListItem["type"],
      url: repo.homepage || `https://github.com/mknepprath/${repo.name}`,
    }));

  const bookPosts = books?.map((book) => ({
    action: "Read",
    date: new Date(book.date_finished).toISOString(),
    id: `b${book.isbn}`,
    image: book.large_image_url,
    summary: book.author,
    title: book.title,
    type: "BOOK" as PostListItem["type"],
    url: book.link,
  }));

  const tootPosts = toots
    ?.filter(
      (toot) =>
        // Has at least half min_rating likes...
        toot.favourites_count >= rating &&
        // ...and has content...
        !!(toot.content || toot.media_attachments[0]?.url) &&
        // ...and doesn't start with a link, because this might indicate a
        // message to another user.
        !toot.content.startsWith(`<p><span class="h-card"><a href="`) &&
        // ...and doesn't include "?i=" in the URL, because this indicates an
        //  auto-toot.
        !toot.content.includes("?i=")
    )
    .map((toot) => ({
      action: "Tooted",
      date: new Date(toot.created_at).toISOString(),
      id: `t${toot.id}`,
      image:
        toot.media_attachments.length > 0
          ? toot.media_attachments[0].type === "image"
            ? toot.media_attachments[0]?.url // For GIFs or videos.
            : toot.media_attachments[0]?.preview_url
          : null,
      summary: toot.content,
      title: toot.content,
      type: "TOOT" as PostListItem["type"],
      url: toot.url,
    }));

  const typedPosts = posts
    .map(
      (post) =>
        ({
          ...post,
          id: `p${post.id}`,
          url: `/writing/${post.id}`,
          type: "POST",
        } as PostListItem)
    )
    // The `sort` method can be conveniently used with function expressions:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    .sort((a, b) => +parseISO(b.date) - +parseISO(a.date));

  const allPosts = [
    ...highlightPosts,
    // ...musicPosts,
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
