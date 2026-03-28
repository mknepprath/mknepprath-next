import { useState } from "react";
import Footer from "@core/footer";
import Head from "@core/head";
import Lightbox from "@core/lightbox";
import Nav from "@core/nav";
import { Photo } from "@lib/photography";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import useSWR from "swr";

// Hand-drawn circle paths in a 200x200 viewBox — wobbly, imperfect ovals
const CIRCLE_PATHS = [
  "M 22 80 C 18 40, 50 10, 100 8 C 150 6, 186 30, 190 70 C 194 110, 170 180, 110 192 C 50 204, 16 160, 14 120 C 12 100, 18 86, 26 82",
  "M 28 70 C 32 30, 65 6, 110 10 C 155 14, 192 45, 188 90 C 184 135, 158 186, 95 194 C 32 202, 8 150, 12 105 C 14 80, 22 68, 32 72",
  "M 18 90 C 10 48, 55 8, 105 12 C 155 16, 195 50, 192 95 C 189 140, 160 190, 100 196 C 40 202, 6 155, 10 110 C 12 88, 16 82, 24 88",
  "M 30 75 C 38 32, 70 4, 115 10 C 160 16, 190 55, 186 100 C 182 145, 150 192, 90 196 C 30 200, 4 148, 10 100 C 14 72, 24 65, 34 74",
];


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
            const circlePath = CIRCLE_PATHS[hash % CIRCLE_PATHS.length];
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
                  <path
                    className={styles.greasePencilPath}
                    d={circlePath}
                    vectorEffect="non-scaling-stroke"
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
