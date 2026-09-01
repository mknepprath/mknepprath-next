import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

const STEAM_API = "https://api.steampowered.com";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_USER_ID;

  if (!apiKey || !steamId) {
    return res.status(200).json([]);
  }

  try {
    const response = await fetch(
      `${STEAM_API}/IPlayerService/GetRecentlyPlayedGames/v1/?key=${apiKey}&steamid=${steamId}&format=json`,
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data from Steam" });
    }

    const data = await response.json();
    const games: Steam[] = data.response?.games || [];

    res.status(200).json(
      games.map((game) => ({
        appid: game.appid,
        name: game.name,
        playtime_2weeks: game.playtime_2weeks,
        img_icon_url: game.img_icon_url,
      })),
    );
  } catch (error) {
    console.error("Error fetching Steam data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
