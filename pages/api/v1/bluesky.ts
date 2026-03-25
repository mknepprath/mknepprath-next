import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const response = await fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=mknepprath.com&limit=20&filter=posts_no_replies`
    );

    if (!response.ok) {
      throw new Error(`Bluesky API error: ${response.statusText}`);
    }

    const data = await response.json();

    const posts = data.feed
      .filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => !item.reason // exclude reposts
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((item: any) => ({
        id: item.post.uri,
        created_at: item.post.record.createdAt,
        text: item.post.record.text,
        like_count: item.post.likeCount || 0,
        image:
          item.post.embed?.images?.[0]?.thumb ||
          item.post.embed?.media?.images?.[0]?.thumb ||
          "",
        url: `https://bsky.app/profile/mknepprath.com/post/${item.post.uri.split("/").pop()}`,
      }));

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (process.env.NODE_ENV === "production")
      res.setHeader(
        "Cache-Control",
        "max-age=0, s-maxage=1, stale-while-revalidate"
      );
    res.json(posts);
  } catch (error) {
    console.error("Error fetching Bluesky posts:", error);
    res.status(500).json([]);
  }
};
