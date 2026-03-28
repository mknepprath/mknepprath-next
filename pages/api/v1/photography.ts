import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    const response = await fetch(
      `https://pixelfed.social/api/pixelfed/v1/accounts/677260415239635730/statuses?limit=40&only_media=true&min_id=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PIXELFED_ACCESS_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Pixelfed API returned ${response.status}`);
    }

    const data: Toot[] = await response.json();

    // Filter to only posts with images, strip replies
    const photos = data
      .filter(
        (photo) =>
          photo.media_attachments.length > 0 &&
          photo.media_attachments[0].type === "image" &&
          !photo.content?.startsWith(`<p><span class="h-card"><a href="`) &&
          !photo.content?.includes("?i="),
      )
      .map((photo) => ({
        id: photo.id,
        date: photo.created_at,
        caption: photo.content.replace(/<[^>]+>/g, ""),
        url: photo.url,
        image: photo.media_attachments[0].url,
        width: photo.media_attachments[0].meta?.original?.width || 0,
        height: photo.media_attachments[0].meta?.original?.height || 0,
        blurhash: photo.media_attachments[0].blurhash || "",
        alt: photo.media_attachments[0].description || "",
      }));

    res.status(200).json(photos);

    if (process.env.NODE_ENV === "production") {
      res.setHeader(
        "Cache-Control",
        "max-age=0, s-maxage=60, stale-while-revalidate=300",
      );
    }
  } catch (error) {
    console.error("Error fetching photography data:", error);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
};
