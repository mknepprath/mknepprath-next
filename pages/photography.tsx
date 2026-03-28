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

interface PhotoGroup {
  label: string;
  photos: Photo[];
}

function groupByDay(photos: Photo[]): PhotoGroup[] {
  const groups: PhotoGroup[] = [];
  let current: PhotoGroup | null = null;

  for (const photo of photos) {
    const day = format(parseISO(photo.date), "yyyy-MM-dd");
    const label = format(parseISO(photo.date), "MMMM yyyy");

    if (!current || format(parseISO(current.photos[0].date), "yyyy-MM-dd") !== day) {
      current = { label, photos: [] };
      groups.push(current);
    }
    current.photos.push(photo);
  }

  return groups;
}

export default function Photography(): React.ReactNode {
  const { data: photos = [] } = useSWR<Photo[]>("/api/v1/photos?limit=80", fetcher);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const groups = useMemo(() => groupByDay(photos), [photos]);
  const flatPhotos = useMemo(() => groups.flatMap((g) => g.photos), [groups]);

  function getGlobalIndex(photo: Photo): number {
    return flatPhotos.findIndex((p) => p.id === photo.id);
  }

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

        {groups.map((group, gi) => {
          const showLabel =
            gi === 0 || groups[gi - 1].label !== group.label;

          return (
            <section key={`group-${gi}`} className={styles.group}>
              {showLabel && (
                <span className={styles.groupLabel}>{group.label}</span>
              )}

              <div className={styles.grid}>
                {group.photos.map((photo) => (
                  <button
                    key={photo.id}
                    className={styles.cell}
                    onClick={() => setLightboxIndex(getGlobalIndex(photo))}
                    aria-label={`View photo: ${photo.caption || photo.alt || "untitled"}`}
                  >
                    <Image
                      alt={photo.alt || photo.caption || "photo"}
                      src={photo.image}
                      fill
                      sizes="(max-width: 632px) 50vw, 440px"
                      style={{ objectFit: "cover" }}
                    />
                    {photo.caption && photo.caption !== "Untitled" && (
                      <span className={styles.cellCaption}>{photo.caption}</span>
                    )}
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Footer className="container" />

      {lightboxIndex !== null && (
        <Lightbox
          photos={flatPhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={setLightboxIndex}
        />
      )}
    </>
  );
}
