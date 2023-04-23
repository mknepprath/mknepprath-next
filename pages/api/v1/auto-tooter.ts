import { NextApiRequest, NextApiResponse } from "next";

// activity endpoint returns a list of recent activity as posts. only post new
// activity to Mastodon that hasn't already been posted.

const ACTIVITY_API = `https://mknepprath.com/api/v1/activity&max_results=3`;

// Create a social media status generator based on the type of post
function genStatus(post: PostListItem): string {
  switch (post.type) {
    case "BOOK":
      return `I finished reading ${post.title} by ${post.summary}. ${post.url}`;
    case "FILM":
      return `I ${post.action?.toLowerCase()} ${
        post.title
      }. My review: ${post.summary?.replace(/<[^>]*>/g, "").trim()} ${
        post.url
      }`;
    case "REPO":
      return `I pushed an update to ${post.title}: ${post.summary} ${post.url}`;
    case "MUSIC":
      return `I added ${post.title} by ${post.summary} to my Music library.${
        post.url ? ` ${post.url}` : ""
      }`;
    case "POST":
      return `✍️New blog post: ${post.title} https://mknepprath.com${post.url}`;
    default:
      return `${post.summary?.replace(/<[^>]*>/g, "").trim()} ${post.url}`;
  }
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const allActivity: PostListItem[] = await fetch(ACTIVITY_API).then(
    (response) => response.json()
  );
  const activity = allActivity.filter(
    (activity) => activity.type !== "TOOT" && activity.url
  );

  // get mastodon posts
  const toots: Toot[] = await fetch(
    `https://mastodon.social/api/v1/accounts/231610/statuses?limit=20&exclude_replies=1`
  ).then((response) => response.json());

  // Return the index of the latest item in `activity` that was posted to Mastodon
  const lastPostedIndex = activity.findIndex((post) =>
    toots.find((toot) =>
      toot.content.includes(post.summary?.replace(/<[^>]*>/g, "").trim() || "")
    )
  );

  // slice at last posted index
  const newActivity = activity.slice(0, lastPostedIndex);

  // post new activity to Mastodon
  const response = await Promise.all(
    newActivity.map(async (post) => {
      return await fetch("https://mastodon.social/api/v1/statuses", {
        body: JSON.stringify({
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
    })
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV === "production")
    res.setHeader(
      "Cache-Control",
      "max-age=0, s-maxage=1, stale-while-revalidate"
    );
  res.end(JSON.stringify(response));
};
