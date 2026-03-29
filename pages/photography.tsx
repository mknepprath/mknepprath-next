import { useMemo, useState } from "react";
import Footer from "@core/footer";
import Head from "@core/head";
import Lightbox from "@core/lightbox";
import Nav from "@core/nav";
import { Photo } from "@lib/photography";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import useSWR from "swr";

import styles from "./photography.module.css";

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data: Toot[]) => {
      if (!Array.isArray(data)) return [];
      return data
        .filter(
          (photo) =>
            photo.media_attachments.length > 0 &&
            photo.media_attachments[0].type === "image" &&
            !photo.content?.startsWith(
              `<p><span class="h-card"><a href="`,
            ) &&
            !photo.content?.includes("?i="),
        )
        .map((photo) => ({
          id: photo.id,
          date: photo.created_at,
          caption: photo.content.replace(/<[^>]+>/g, "").trim(),
          url: photo.url,
          image: photo.media_attachments[0].url,
          width: photo.media_attachments[0].meta?.original?.width || 0,
          height: photo.media_attachments[0].meta?.original?.height || 0,
          alt: photo.media_attachments[0].description || "",
        }));
    });

export default function Photography(): React.ReactNode {
  const { data: photos = [] } = useSWR<Photo[]>("/api/v1/photos?limit=80", fetcher);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Track which month labels we've shown
  const shownMonths = useMemo(() => new Set<string>(), [photos]);

  return (
    <>
      <Head
        title="Michael Knepprath, Photographer"
        description="Photography by Michael Knepprath"
      />
      <Nav className="container" />

      <div className={styles.page} data-page="photography">
        <header className={styles.header}>
          <h1 className={styles.title}>Photography</h1>
        </header>

        <div className={styles.masonry}>
          {photos.map((photo, i) => {
            const month = format(parseISO(photo.date), "MMMM yyyy");
            const showMonth = !shownMonths.has(month);
            if (showMonth) shownMonths.add(month);

            return (
              <div key={photo.id} className={styles.item}>
                {showMonth && (
                  <span className={styles.monthLabel}>{month}</span>
                )}
                <button
                  className={styles.cell}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View photo: ${photo.caption || photo.alt || "untitled"}`}
                >
                  <Image
                    alt={photo.alt || photo.caption || "photo"}
                    src={photo.image}
                    width={photo.width || 600}
                    height={photo.height || 400}
                    sizes="(max-width: 632px) 50vw, 440px"
                    className={styles.cellImg}
                  />
                </button>
                {photo.caption && photo.caption !== "Untitled" && (
                  <span className={styles.cellCaption}>{photo.caption}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer className="container" />

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={setLightboxIndex}
        />
      )}
    </>
  );
}
