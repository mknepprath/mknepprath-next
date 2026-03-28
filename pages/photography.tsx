import { useState } from "react";
import Footer from "@core/footer";
import Head from "@core/head";
import Lightbox from "@core/lightbox";
import Nav from "@core/nav";
import Image from "next/image";
import { GetStaticProps } from "next";

import styles from "./photography.module.css";

interface Photo {
  id: string;
  date: string;
  caption: string;
  url: string;
  image: string;
  width: number;
  height: number;
  alt: string;
}

interface Props {
  photos: Photo[];
}

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

export default function Photography({ photos }: Props): React.ReactNode {
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
            // Frame number from last 3 digits of ID
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  let photos: Photo[] = [];

  try {
    const res = await fetch(`${BASE_URL}/api/v1/photography`);
    if (res.ok) photos = await res.json();
  } catch {
    // Will show empty state
  }

  return {
    props: { photos },
    revalidate: 300,
  };
};
