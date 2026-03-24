import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

const CHESS_API = "https://api.chess.com/pub";
const USERNAME = "mknepprath";

const FETCH_OPTIONS = {
  headers: { "User-Agent": "mknepprath.com" },
};

const parseResult = (
  result: string,
): "win" | "loss" | "draw" => {
  if (result === "win") return "win";
  if (
    result === "agreed" ||
    result === "stalemate" ||
    result === "repetition" ||
    result === "insufficient" ||
    result === "50move" ||
    result === "timevsinsufficient"
  ) {
    return "draw";
  }
  return "loss";
};

const parseOpening = (eco: string): string => {
  if (!eco) return "Unknown Opening";
  // eco URL looks like: https://www.chess.com/openings/Kings-Pawn-Opening
  const parts = eco.split("/");
  const slug = parts[parts.length - 1] || "Unknown-Opening";
  return slug.replace(/-/g, " ").replace(/\.\.\./g, "");
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const archivesResponse = await fetch(
      `${CHESS_API}/player/${USERNAME}/games/archives`,
      FETCH_OPTIONS,
    );

    if (!archivesResponse.ok) {
      return res
        .status(archivesResponse.status)
        .json({ error: "Failed to fetch archives from Chess.com" });
    }

    const { archives } = await archivesResponse.json();

    if (!archives || archives.length === 0) {
      return res.status(200).json([]);
    }

    // Take the last 3 monthly archives
    const recentArchives = archives.slice(-3);

    const archiveResults = await Promise.all(
      recentArchives.map(async (url: string) => {
        const response = await fetch(url, FETCH_OPTIONS);
        if (!response.ok) return [];
        const data = await response.json();
        return data.games || [];
      }),
    );

    const allGames = archiveResults.flat();

    // Process games into our Chess interface
    const games: Chess[] = allGames
      .filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (game: any) => game.rules === "chess",
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((game: any) => {
        const isWhite =
          game.white.username.toLowerCase() === USERNAME.toLowerCase();
        const player = isWhite ? game.white : game.black;
        const opponent = isWhite ? game.black : game.white;

        return {
          url: game.url,
          result: parseResult(player.result),
          opponent: opponent.username,
          rating: player.rating,
          accuracy:
            game.accuracies?.[isWhite ? "white" : "black"] ?? 0,
          timeClass: game.time_class,
          opening: parseOpening(game.eco),
          endTime: game.end_time,
        };
      })
      .sort((a: Chess, b: Chess) => b.endTime - a.endTime)
      .slice(0, 10);

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching Chess.com data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
