import ActivityCard from "@core/activity-card";
import { getFilmColors, hashString, stripHtml } from "@lib/utils";
import { format, parseISO } from "date-fns";
import Image from "next/image";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const FilmPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  title,
  url,
}: PostProps) => {
  const colors = getFilmColors(id);
  const numericId = id.replace(/\D/g, "").slice(0, 6) || String(hashString(id)).slice(0, 6);

  return (
    <ActivityCard id={id} type="FILM" index={index}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={styles.ticket}
        style={{ background: colors.bg }}
      >
        <div className={styles.ticketEdge} style={{ color: colors.accent }}>
          {numericId.split("").join(" ")}
        </div>

        <div className={styles.ticketBody}>
          <div className={styles.ticketTop}>
            <span
              className={styles.ticketAdmit}
              style={{ color: colors.accent }}
            >
              {action === "Rewatched" ? "Return Visit" : "Admit One"}
            </span>
            {image ? (
              <Image
                alt={`poster for ${title}`}
                className="corner-radius-4"
                src={image}
                width={44}
                height={66}
              />
            ) : null}
          </div>

          <h3 className={styles.ticketTitle} style={{ color: colors.text }}>
            {title}
          </h3>

          {summary ? (
            <p
              className={styles.ticketReview}
              style={{ color: colors.text }}
            >
              {stripHtml(summary)}
            </p>
          ) : null}

          <div
            className={styles.ticketDate}
            style={{ color: colors.accent }}
          >
            {format(parseISO(date), "MMM d, yyyy")} · {action}
          </div>
        </div>

        <div className={styles.ticketEdge} style={{ color: colors.accent }}>
          {numericId.split("").join(" ")}
        </div>
      </a>
    </ActivityCard>
  );
};

export default FilmPost;
