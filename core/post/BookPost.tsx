import ActivityCard from "@core/activity-card";
import { format, parseISO } from "date-fns";
import Image from "next/image";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const BookPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  title,
  url,
}: PostProps) => (
  <ActivityCard id={id} type="BOOK" index={index}>
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={styles.catalogCard}
    >
      <div className={styles.catalogRedLine} />
      <div className={styles.catalogBody}>
        {image ? (
          <div className={styles.catalogCover}>
            <Image
              alt={`cover for ${title}`}
              src={image}
              width={70}
              height={105}
              className="corner-radius-4"
            />
          </div>
        ) : null}
        <div className={styles.catalogInfo}>
          <h3 className={styles.catalogTitle}>{title}</h3>
          {summary && (
            <div className={styles.catalogAuthor}>{summary}</div>
          )}
        </div>
      </div>
      <div className={styles.catalogFooter}>
        {action} · {format(parseISO(date), "MMM d, yyyy")}
      </div>
    </a>
  </ActivityCard>
);

export default BookPost;
