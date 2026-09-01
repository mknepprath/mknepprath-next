import ActivityCard from "@core/activity-card";
import { format, parseISO } from "date-fns";
import Image from "next/image";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const SkeetPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  url,
}: PostProps) => (
  <ActivityCard id={id} type="SKEET" index={index}>
    <div className={`${styles.stickyNote} ${styles.stickyBlue}`}>
      {image ? (
        <div className={styles.stickyImage}>
          <Image
            alt="attached image"
            src={image}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : null}
      <div
        className={`${styles.stickyText} ${styles.stickyBlueText}`}
        dangerouslySetInnerHTML={{ __html: summary || "" }}
      />
      <a
        href={url || "#"}
        target="_blank"
        rel="noreferrer"
        className={`${styles.stickyDate} ${styles.stickyBlueDate}`}
      >
        {action} · {format(parseISO(date), "MMM d")}
      </a>
    </div>
  </ActivityCard>
);

export default SkeetPost;
