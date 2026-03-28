import { useState } from "react";
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
          caption: photo.content.replace(/<[^>]+>/g, ""),
          url: photo.url,
          image: photo.media_attachments[0].url,
          width: photo.media_attachments[0].meta?.original?.width || 0,
          height: photo.media_attachments[0].meta?.original?.height || 0,
          alt: photo.media_attachments[0].description || "",
        }));
    });


function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++)
    h = ((h << 5) + h + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export default function Photography(): React.ReactNode {
  const { data: photos = [] } = useSWR<Photo[]>("/api/v1/photos", fetcher);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <Head
        title="Michael Knepprath, Photographer"
        description="Photography by Michael Knepprath"
      />
      <Nav className="container" />

      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Photography</h1>
        </header>

        <div className={styles.masonry}>
          {photos.map((photo, i) => {
            const hash = hashId(photo.id);
            const frameNum = String(hash % 36).padStart(2, "0");
            const rotate = (hash % 10) - 5;

            return (
              <button
                key={photo.id}
                className={styles.print}
                onClick={() => setLightboxIndex(i)}
                aria-label={`View photo: ${photo.caption || photo.alt || "untitled"}`}
              >
                <div className={styles.printImage}>
                  <Image
                    alt={photo.alt || photo.caption || "photo"}
                    src={photo.image}
                    width={photo.width || 900}
                    height={photo.height || 600}
                    sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 33vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <span className={styles.frameNumber}>{frameNum}A</span>
                </div>
                <svg
                  className={styles.greasePencil}
                  viewBox="0 0 200 200"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: `rotate(${rotate}deg)` }}
                >
                  <ellipse
                    className={styles.greasePencilPath}
                    cx="100" cy="100"
                    rx="88" ry="90"
                  />
                </svg>

                <div className={styles.printCaption}>
                  {photo.caption && photo.caption !== "Untitled" && (
                    <span className={styles.printText}>{photo.caption}</span>
                  )}
                  <span className={styles.printDate}>
                    {format(parseISO(photo.date), "MMM d, yyyy")}
                  </span>
                </div>
              </button>
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
