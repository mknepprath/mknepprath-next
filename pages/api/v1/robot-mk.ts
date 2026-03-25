import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const response = await fetch(
      `https://mastodon.social/api/v1/accounts/109795650318013893/statuses?limit=10&exclude_replies=true`
    );

    if (!response.ok) {
      throw new Error(`Mastodon API error: ${response.statusText}`);
    }

    const data = await response.json();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (process.env.NODE_ENV === "production")
      res.setHeader(
        "Cache-Control",
        "max-age=0, s-maxage=1, stale-while-revalidate"
      );
    res.json(data);
  } catch (error) {
    console.error("Error fetching robot_mk posts:", error);
    res.status(500).json([]);
  }
};
