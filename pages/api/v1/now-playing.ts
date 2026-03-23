import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

const STATSFM_API = "https://api.stats.fm/api/v1";
const USERNAME = "mknepprath";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      `${STATSFM_API}/users/${USERNAME}/streams/current`,
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data from stats.fm" });
    }

    const data = await response.json();

    // Cache for 15 seconds to avoid hammering the upstream API
    res.setHeader("Cache-Control", "s-maxage=15, stale-while-revalidate=30");
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching now playing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
