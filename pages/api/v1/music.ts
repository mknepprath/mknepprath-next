import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

const STATSFM_API = "https://api.stats.fm/api/v1";
const USERNAME = "mknepprath";

// When streams/recent is empty (e.g. Apple Music sync disconnected), fall back
// to top/albums for the past week. Returns two synthetic stream entries per
// album so activity.ts's "2+ unique tracks" grouping filter still passes.
const topAlbumsAsSyntheticStreams = async (limit: number): Promise<Music[]> => {
  const response = await fetch(
    `${STATSFM_API}/users/${USERNAME}/top/albums?range=weeks&limit=${limit}`,
  );
  if (!response.ok) return [];
  const data = await response.json();
  const now = Date.now();

  return (data.items || []).flatMap(
    (
      item: {
        album: {
          id: number;
          name: string;
          image: string;
          artists: { id: number; name: string; image: string }[];
        };
      },
      i: number,
    ): Music[] => {
      const { album } = item;
      const albumEntry = { id: album.id, image: album.image, name: album.name };
      // Space albums 6 hours apart; two synthetic tracks 1 minute apart per album
      const baseMs = now - i * 6 * 60 * 60 * 1000;
      return [
        {
          streamId: `a${album.id}-1`,
          endTime: new Date(baseMs).toISOString(),
          platform: "apple_music",
          track: {
            id: album.id * 1000 + 1,
            name: album.name,
            durationMs: 0,
            explicit: false,
            externalIds: {},
            albums: [albumEntry],
            artists: album.artists,
          },
        },
        {
          streamId: `a${album.id}-2`,
          endTime: new Date(baseMs - 60_000).toISOString(),
          platform: "apple_music",
          track: {
            id: album.id * 1000 + 2,
            name: album.name,
            durationMs: 0,
            explicit: false,
            externalIds: {},
            albums: [albumEntry],
            artists: album.artists,
          },
        },
      ];
    },
  );
};

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
      if (data.items.length > 0) {
        return res.status(200).json(data.items);
      }
      // streams/recent is empty — fall back to top albums for the week
      const fallback = await topAlbumsAsSyntheticStreams(max);
      return res.status(200).json(fallback);
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
