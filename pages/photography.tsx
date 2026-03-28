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

            return (
              <button
                key={photo.id}
                className={styles.frame}
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
                    sizes="(max-width: 632px) 100vw, (max-width: 960px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.frameOverlay} />
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
