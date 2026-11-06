import ActivityCard from "@core/activity-card";
import Image from "next/image";
import { formatUTC } from "@lib/date";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const PhotoPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  title,
  url,
}: PostProps) => (
  <ActivityCard id={id} type="PHOTO" index={index}>
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={styles.polaroid}
    >
      <div className={styles.polaroidFrame}>
        {image && (
          <Image
            alt={title || "photo"}
            src={image}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className={styles.polaroidCaption}>
        {title && title !== "Untitled" && (
          <span className={styles.polaroidText}>{title}</span>
        )}
        <span className={styles.polaroidDate}>
          {action} · {formatUTC(date, "MMM d")}
        </span>
      </div>
    </a>
  </ActivityCard>
);

export default PhotoPost;
