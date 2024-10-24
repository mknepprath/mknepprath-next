import getMusicToken from "@lib/getMusicToken";
import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { offset = 0, limit = 6 },
  } = req;

  try {
    // Get the Developer Token
    const developerToken = getMusicToken();

    // Music User Token should come from environment variables or another source
    const musicUserToken = process.env.MUSIC_USER_TOKEN;

    if (!musicUserToken) {
      return res.status(401).json({ error: "Music User Token is missing" });
    }

    // Prepare the request headers
    const headers = {
      Authorization: `Bearer ${developerToken}`,
      "Music-User-Token": musicUserToken,
    };

    // Make the API request to Apple Music
    const response = await fetch(
      `https://api.music.apple.com/v1/me/library/recently-added?limit=${limit}&offset=${offset}`,
      {
        method: "GET",
        headers: headers,
      },
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data from Apple Music" });
    }

    // Parse and send the response
    const data = await response.json();
    res.status(200).json(data.data);
  } catch (error) {
    console.error("Error fetching Apple Music data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
