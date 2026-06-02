import ActivityCard from "@core/activity-card";
import { format, parseISO } from "date-fns";
import Image from "next/image";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

// FIXME: Fix case when no link is available.
const MusicPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  title,
  url,
}: PostProps) => (
  <ActivityCard id={id} type="MUSIC" index={index}>
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={styles.musicCard}
    >
      {image && (
        <div
          className={styles.musicBg}
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className={styles.musicContent}>
        {image && (
          <div className={styles.musicArt}>
            <Image
              alt={`album art for ${title}`}
              src={image}
              width={80}
              height={80}
              className="corner-radius-8"
            />
          </div>
        )}
        <div className={styles.musicInfo}>
          <h3 className={styles.musicTitle}>{title}</h3>
          {summary && <p className={styles.musicArtist}>{summary}</p>}
          <small className={styles.musicDate}>
            {action} · {format(parseISO(date), "MMM d, yyyy")}
          </small>
        </div>
      </div>
    </a>
  </ActivityCard>
);

export default MusicPost;
