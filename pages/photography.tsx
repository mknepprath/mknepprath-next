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

// Hand-drawn circle paths — wobbly ovals, each unique
const CIRCLE_PATHS = [
  "M 30 18 C 65 4, 160 2, 195 20 C 218 38, 220 72, 198 88 C 168 108, 100 114, 45 100 C 14 90, 2 66, 8 42 C 12 26, 24 18, 36 20",
  "M 38 14 C 80 2, 150 6, 190 22 C 216 36, 222 68, 200 90 C 172 112, 95 116, 40 102 C 10 92, -2 62, 6 38 C 12 20, 28 12, 42 16",
  "M 26 22 C 58 6, 155 -2, 198 18 C 224 32, 226 70, 204 92 C 178 114, 108 120, 48 106 C 16 96, 0 68, 4 44 C 8 24, 20 16, 32 22",
  "M 34 16 C 72 0, 148 4, 192 24 C 220 40, 218 74, 196 94 C 166 112, 98 118, 42 104 C 12 94, -4 64, 6 40 C 14 22, 26 14, 38 18",
];

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
            const circlePath = CIRCLE_PATHS[i % CIRCLE_PATHS.length];
            const rotate = (hash % 14) - 7;

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
                  <svg
                    className={styles.greasePencil}
                    viewBox="0 0 224 120"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: `rotate(${rotate}deg)` }}
                  >
                    <path
                      className={styles.greasePencilPath}
                      d={circlePath}
                    />
                  </svg>
                  <span className={styles.frameNumber}>{frameNum}A</span>
                </div>

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
