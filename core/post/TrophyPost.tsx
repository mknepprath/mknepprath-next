import ActivityCard from "@core/activity-card";
import { format, parseISO } from "date-fns";
import Image from "next/image";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const TrophyPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  title,
  url,
}: PostProps) => (
  <ActivityCard id={id} type="TROPHY" index={index}>
    <article key={id}>
      <header className={styles.filmPostHeader}>
        {image ? (
          <a
            className={styles.filmPoster}
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              alt={`cover image for ${title}`}
              className="bordered-image corner-radius-8"
              height={90}
              src={image}
              width={90}
            />
          </a>
        ) : null}
        <div>
          <a href={url} target="_blank" rel="noreferrer">
            <h3 className={styles.filmTitle}>{title}</h3>
          </a>
          <p style={{ margin: "0.4em 0px 0.2em" }}>{summary}</p>
          <small>
            {action} on {format(parseISO(date), "MMMM d, yyyy")}
          </small>
        </div>
      </header>
    </article>
  </ActivityCard>
);

export default TrophyPost;
