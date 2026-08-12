import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

const STATSFM_API = "https://api.stats.fm/api/v1";
const USERNAME = "mknepprath";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { limit = 6, raw },
  } = req;

  const max = parseInt(limit as string) || 6;
  const isRaw = raw === "1";

  try {
    const fetchLimit = isRaw ? max : max * 5;
    const response = await fetch(
      `${STATSFM_API}/users/${USERNAME}/streams/recent?limit=${fetchLimit}`,
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data from stats.fm" });
    }

    const data = await response.json();

    if (isRaw) {
      // Return raw streams (for activity feed album grouping)
      return res.status(200).json(data.items);
    }

    // Dedupe by track ID, keep most recent stream per track
    const seen = new Set<number>();
    const unique = (data.items as Music[]).filter((m) => {
      if (seen.has(m.track.id)) return false;
      seen.add(m.track.id);
      return true;
    });

    res.status(200).json(unique.slice(0, max));
  } catch (error) {
    console.error("Error fetching stats.fm data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
