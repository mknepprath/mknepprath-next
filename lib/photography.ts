export interface Photo {
  id: string;
  date: string;
  caption: string;
  url: string;
  image: string;
  width: number;
  height: number;
  alt: string;
}

export async function fetchPhotos(): Promise<Photo[]> {
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

  return data
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
      alt: photo.media_attachments[0].description || "",
    }));
}
