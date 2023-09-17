import { convert } from "html-to-text";
import { NextApiRequest, NextApiResponse } from "next";

// activity endpoint returns a list of recent activity as posts. only post new
// activity to Mastodon that hasn't already been posted.

const ACTIVITY_API = `https://mknepprath.com/api/v1/activity?max_results=3`;

// Create a social media status generator based on the type of post
function genStatus(post: PostListItem): string {
  const { action, id, summary = "", title, type, url } = post;
  const link = url + "?i=" + id;
  switch (type) {
    case "BOOK":
      return `Finished reading ${title}. ${summary}. ${link}`;
    case "HIGHLIGHT":
      return `“${title}”\n\n${summary} ${link}`;
    case "FILM":
      return `${action} ${title}. ${convert(summary, {
        preserveNewlines: true,
        wordwrap: false,
      })} ${link}`;
    case "REPO":
      return `I pushed an update to ${title}: ${summary} ${link}`;
    case "MUSIC":
      return `I added ${title} by ${summary} to my Music library. ${link}`;
    case "POST":
      return `✍️New blog post: ${title} https://mknepprath.com${link}`;
    default:
      return `${convert(summary)} ${link}`;
  }
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const allActivity: PostListItem[] = await fetch(ACTIVITY_API).then(
    (response) => response.json(),
  );
  const activity = allActivity.filter(
    (activity) => activity.type !== "TOOT" && activity.url,
  );

  // get mastodon posts
  const toots: Toot[] = await fetch(
    `https://mastodon.social/api/v1/accounts/231610/statuses?limit=20&exclude_replies=1`,
  ).then((response) => response.json());

  // Return the index of the latest item in `activity` that was posted to Mastodon
  const lastPostedIndex = activity.findIndex((post) =>
    toots.find((toot) => toot.content.includes(post.id)),
  );

  // slice at last posted index
  const newActivity = activity.slice(0, lastPostedIndex);

  // post new activity to Mastodon
  const response = await Promise.all(
    newActivity.map(async (post) => {
      return await fetch("https://mastodon.social/api/v1/statuses", {
        body: JSON.stringify({
          spoiler_text: post.summary?.includes("contain spoilers")
            ? `${post.action} ${post.title}. This review may contain spoilers.`
            : "",
          status: genStatus(post),
          visibility: "unlisted",
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
