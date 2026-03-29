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

interface MonthGroup {
  label: string;
  photos: Photo[];
}

function groupByMonth(photos: Photo[]): MonthGroup[] {
  const groups: MonthGroup[] = [];
  let current: MonthGroup | null = null;

  for (const photo of photos) {
    const label = format(parseISO(photo.date), "MMMM yyyy");
    if (!current || current.label !== label) {
      current = { label, photos: [] };
      groups.push(current);
    }
    current.photos.push(photo);
  }

  return groups;
}

export default function Photography(): React.ReactNode {
  // Fetch first page fast, then backfill with more
  const { data: firstPage = [] } = useSWR<Photo[]>("/api/v1/photos?limit=24", fetcher);
  const { data: allPhotos } = useSWR<Photo[]>(
    firstPage.length > 0 ? "/api/v1/photos?limit=80" : null,
    fetcher,
  );
  const photos = allPhotos || firstPage;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const groups = useMemo(() => groupByMonth(photos), [photos]);

  function getGlobalIndex(photo: Photo): number {
    return photos.findIndex((p) => p.id === photo.id);
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

        {groups.map((group) => (
          <section key={group.label} className={styles.group}>
            <h2 className={styles.monthLabel}>{group.label}</h2>
            <div className={styles.masonry}>
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
                    width={photo.width || 600}
                    height={photo.height || 400}
                    sizes="(max-width: 632px) 50vw, 440px"
                    className={styles.cellImg}
                  />
                  {photo.caption && photo.caption !== "Untitled" && (
                    <span className={styles.cellCaption}>{photo.caption}</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        ))}
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
