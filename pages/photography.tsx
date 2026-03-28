import { useState } from "react";
import Footer from "@core/footer";
import Head from "@core/head";
import Lightbox from "@core/lightbox";
import Nav from "@core/nav";
import { Photo } from "@lib/photography";
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

// Hand-drawn circle paths — each one slightly different for variety
const CIRCLE_PATHS = [
  "M 30 18 C 65 4, 160 2, 195 20 C 218 38, 220 72, 198 88 C 168 108, 100 114, 45 100 C 14 90, 2 66, 8 42 C 12 26, 24 18, 36 20",
  "M 38 14 C 80 2, 150 6, 190 22 C 216 36, 222 68, 200 90 C 172 112, 95 116, 40 102 C 10 92, -2 62, 6 38 C 12 20, 28 12, 42 16",
  "M 26 22 C 58 6, 155 -2, 198 18 C 224 32, 226 70, 204 92 C 178 114, 108 120, 48 106 C 16 96, 0 68, 4 44 C 8 24, 20 16, 32 22",
  "M 34 16 C 72 0, 148 4, 192 24 C 220 40, 218 74, 196 94 C 166 112, 98 118, 42 104 C 12 94, -4 64, 6 40 C 14 22, 26 14, 38 18",
];

// Repeating layout cycle: hero, standard, tall, standard, wide, standard, wide, standard
// This creates rhythm: big → small → tall → small → wide → small → wide → small → repeat
const LAYOUT_CYCLE = [
  "frameHero",   // 4×2 — big hero select
  "frameTall",   // 2×2 — portrait
  "frame",       // 2×1 — standard
  "frame",       // 2×1 — standard
  "frameWide",   // 3×1 — wide
  "frameWide",   // 3×1 — wide
  "frame",       // 2×1 — standard
  "frame",       // 2×1 — standard
  "frame",       // 2×1 — standard
] as const;

function getLayoutClass(index: number): string {
  const slot = LAYOUT_CYCLE[index % LAYOUT_CYCLE.length];
  if (slot === "frame") return styles.frame;
  return `${styles.frame} ${styles[slot]}`;
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

        <div className={styles.contactSheet}>
          {photos.map((photo, i) => {
            const frameNum = String(
              parseInt(photo.id.slice(-4)) % 36,
            ).padStart(2, "0");
            const circlePath = CIRCLE_PATHS[i % CIRCLE_PATHS.length];
            // Slight rotation per circle for variety
            let hash = 0;
            for (let c = 0; c < photo.id.length; c++)
              hash = ((hash << 5) + hash + photo.id.charCodeAt(c)) | 0;
            const rotate = (Math.abs(hash) % 16) - 8;

            return (
              <button
                key={photo.id}
                className={getLayoutClass(i)}
                onClick={() => setLightboxIndex(i)}
                aria-label={`View photo: ${photo.caption || photo.alt || "untitled"}`}
              >
                <div className={styles.sprocketRow}>
                  <div className={styles.sprocket} />
                  <div className={styles.sprocket} />
                  <div className={styles.sprocket} />
                  <div className={styles.sprocket} />
                </div>

                <div className={styles.frameImage}>
                  <Image
                    alt={photo.alt || photo.caption || "photo"}
                    src={photo.image}
                    fill
                    sizes="(max-width: 520px) 100vw, (max-width: 860px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
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
                </div>

                <div className={styles.sprocketRow}>
                  <div className={styles.sprocket} />
                  <div className={styles.sprocket} />
                  <div className={styles.sprocket} />
                  <div className={styles.sprocket} />
                </div>

                <span className={styles.frameNumber}>{frameNum}A</span>
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
