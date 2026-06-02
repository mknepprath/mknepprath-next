import ActivityCard from "@core/activity-card";
import { format, parseISO } from "date-fns";
import Image from "next/image";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const TweetPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  title,
  url,
}: PostProps) => (
  <ActivityCard id={id} type="TWEET" index={index}>
    <article key={id}>
      <header>
        <a href={url} target="_blank" rel="noreferrer">
          {image ? (
            <div className="fill-image bordered-image" style={{ height: 200 }}>
              <Image
                alt={`cover image for ${title}`}
                className="corner-radius-8"
                src={image}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null}
          {!image ? (
            <h3 className={styles.tweet}>
              <em>{title}</em>
            </h3>
          ) : (
            <p className={styles.tweet} style={{ margin: "0.4em 0 0.2em" }}>
              <em>{summary}</em>
            </p>
          )}
        </a>
        <small>
          {action} on {format(parseISO(date), "MMMM d, yyyy")}
        </small>
      </header>
    </article>
  </ActivityCard>
);

export default TweetPost;
