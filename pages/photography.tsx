import { useState } from "react";
import Footer from "@core/footer";
import Head from "@core/head";
import Lightbox from "@core/lightbox";
import Nav from "@core/nav";
import { fetchPhotos, Photo } from "@lib/photography";
import Image from "next/image";
import { GetStaticProps } from "next";
import useSWR from "swr";

import styles from "./photography.module.css";

interface Props {
  photos: Photo[];
}

const fetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((d) => (Array.isArray(d) ? d : []));

export default function Photography({ photos: initialPhotos }: Props): React.ReactNode {
  const { data: photos = initialPhotos } = useSWR<Photo[]>(
    "/api/v1/photography",
    fetcher,
    { fallbackData: initialPhotos },
  );
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
    photos = await fetchPhotos();
  } catch {
    // SWR will retry client-side
  }

  return {
    props: { photos },
    revalidate: 300,
  };
};
