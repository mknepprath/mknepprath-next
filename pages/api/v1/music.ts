import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

const STATSFM_API = "https://api.stats.fm/api/v1";
const USERNAME = "mknepprath";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { limit = 6 },
  } = req;

  try {
    const response = await fetch(
      `${STATSFM_API}/users/${USERNAME}/streams/recent?limit=${limit}`,
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data from stats.fm" });
    }

    const data = await response.json();
    res.status(200).json(data.items);
  } catch (error) {
    console.error("Error fetching stats.fm data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
