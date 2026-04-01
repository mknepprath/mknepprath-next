import { NextApiRequest, NextApiResponse } from "next";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch(
      "https://vimeo.com/api/v2/mknepprath/videos.json",
    );
    if (!response.ok) throw new Error(`Vimeo API returned ${response.status}`);
    const data = await response.json();

    if (process.env.NODE_ENV === "production") {
      res.setHeader(
        "Cache-Control",
        "max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      );
    }

    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch Vimeo videos" });
  }
};
