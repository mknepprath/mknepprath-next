import { fetchPhotos } from "@lib/photography";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const photos = await fetchPhotos();

    if (process.env.NODE_ENV === "production") {
      res.setHeader(
        "Cache-Control",
        "max-age=0, s-maxage=60, stale-while-revalidate=300",
      );
    }

    res.status(200).json(photos);
  } catch (error) {
    console.error("Error fetching photography data:", error);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
};
