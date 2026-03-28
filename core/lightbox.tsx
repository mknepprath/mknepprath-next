import { useCallback, useEffect } from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Photo } from "@lib/photography";

import styles from "./lightbox.module.css";

interface Props {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNav: (index: number) => void;
}

export default function Lightbox({
  photos,
  index,
  onClose,
  onNav,
}: Props): React.JSX.Element {
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNav(index - 1);
      if (e.key === "ArrowRight" && hasNext) onNav(index + 1);
    },
    [onClose, onNav, index, hasPrev, hasNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close">
          &times;
        </button>

        <div className={styles.imageWrap}>
          {hasPrev && (
            <button
              className={`${styles.navBtn} ${styles.navPrev}`}
              onClick={() => onNav(index - 1)}
              aria-label="Previous photo"
            >
              &#8249;
            </button>
          )}

          <div className={styles.imageContainer}>
            <Image
              alt={photo.alt || photo.caption || "photo"}
              src={photo.image}
              width={photo.width || 1200}
              height={photo.height || 800}
              className={styles.image}
              priority
            />
          </div>

          {hasNext && (
            <button
              className={`${styles.navBtn} ${styles.navNext}`}
              onClick={() => onNav(index + 1)}
              aria-label="Next photo"
            >
              &#8250;
            </button>
          )}
        </div>

        <div className={styles.caption}>
          {photo.caption && photo.caption !== "Untitled" && (
            <span className={styles.captionText}>{photo.caption}</span>
          )}
          <span className={styles.captionDate}>
            {format(parseISO(photo.date), "MMMM d, yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
}
