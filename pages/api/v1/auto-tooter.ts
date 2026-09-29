import { convert } from "html-to-text";
import { NextApiRequest, NextApiResponse } from "next";

// activity endpoint returns a list of recent activity as posts. only post new
// activity to Mastodon that hasn't already been posted.

const ACTIVITY_API = `https://mknepprath.com/api/v1/activity?max_results=3`;

// Create a social media status generator based on the type of post
function genStatus(post: PostListItem): string | null {
  const { action, id, summary = "", title, type, url } = post;
  const link = url + "?i=" + id;
  switch (type) {
    case "BOOK":
      return `Finished reading ${title}. ${summary}. ${link}`;
    case "HIGHLIGHT":
      return `"${title}"\n\n${summary} ${link}`;
    case "FILM":
      return `${action} ${title}. ${convert(summary, {
        preserveNewlines: true,
        wordwrap: false,
      })} ${link}`;
    case "RUN":
      return `${summary} ${link}`;
    case "REPO":
    case "CHESS":
    case "TROPHY":
    case "GAME":
      // skip — these are noisy and don't make good social posts
      return null;
    case "MUSIC":
      return `Listening to ${title} by ${summary}. ${link}`;
    case "POST":
      return `✍️ New blog post: ${title} https://mknepprath.com${link}`;
    default:
      return null;
  }
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const allActivity: PostListItem[] = await fetch(ACTIVITY_API).then(
    (response) => response.json(),
  );
  const skipTypes = new Set(["TOOT", "SKEET", "ROBOT", "REPO", "CHESS", "TROPHY", "GAME"]);
  const activity = allActivity.filter(
    (activity) => !skipTypes.has(activity.type || "") && activity.url,
  );

  // get mastodon posts.
  //
  // `Accept-Encoding: identity` is not cosmetic. mastodon.social sends
  // `Vary: Accept-Encoding` with `stale-if-error=86400`, so the gzip variant of this URL
  // is a separate CDN cache key, and because this is the only thing that ever requests
  // it, that key went stale and stayed stale. It served a 14-hour-old timeline while the
  // identity variant was 28 seconds old. A dedupe check against a stale timeline is a
  // dedupe check that always misses.
  const toots: Toot[] = await fetch(
    `https://mastodon.social/api/v1/accounts/231610/statuses?limit=40&exclude_replies=1`,
    { cache: "no-store", headers: { "Accept-Encoding": "identity" } },
  ).then((response) => response.json());

  // No timeline, no way to know what has been posted. Do nothing.
  if (!Array.isArray(toots) || toots.length === 0) {
    res.statusCode = 503;
    res.end(JSON.stringify({ error: "could not read the Mastodon timeline" }));
    return;
  }

  // Return the index of the latest item in `activity` that was posted to Mastodon.
  // Matched on `?i=<id>` rather than the bare id, which is a loose substring.
  const lastPostedIndex = activity.findIndex((post) =>
    toots.some((toot) => toot.content.includes(`?i=${post.id}`)),
  );

  // -1 means nothing in `activity` appears in the timeline, so there is no floor to slice
  // at. `slice(0, -1)` dropped the *last* element and posted the rest, which turned every
  // dedupe miss into a repost of the newest item, once per cron run, indefinitely. Post
  // nothing instead: a skipped post is recoverable, forty duplicates are not.
  const newActivity =
    lastPostedIndex === -1 ? [] : activity.slice(0, lastPostedIndex);

  // post new activity to Mastodon
  const response = await Promise.all(
    newActivity.filter((post) => genStatus(post) !== null).map(async (post) => {
      return await fetch("https://mastodon.social/api/v1/statuses", {
        body: JSON.stringify({
          spoiler_text: post.summary?.includes("contain spoilers")
            ? `${post.action} ${post.title}. This review may contain spoilers.`
            : "",
          status: genStatus(post) as string,
          visibility: "public",
        }),
        headers: {
          Authorization: `Bearer ${process.env.MASTODON_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          return result;
        })
        .catch((error) => {
          console.error("Error:", error);
          return error;
        });
    }),
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV === "production")
    res.setHeader(
      "Cache-Control",
      "max-age=0, s-maxage=1, stale-while-revalidate",
    );
  res.end(JSON.stringify(response));
};
