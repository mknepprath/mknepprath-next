import ActivityCard from "@core/activity-card";
import StravaMap from "@core/strava-map";
import { format, parseISO } from "date-fns";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const RunPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  title,
  url,
}: PostProps) => {
  const stats: Record<string, string> = {};
  if (summary) {
    summary.split(", ").forEach((part) => {
      const [key, val] = part.split(": ");
      if (key && val) stats[key.trim()] = val.trim();
    });
  }

  const distance = parseFloat(stats["Distance"] || "0");
  const elevation = parseFloat(stats["Elevation"] || "0");
  let variant = styles.runVariantDefault;
  if (action === "Hiked" || action === "Walked") {
    variant = styles.runVariantHike;
  } else if (distance >= 10) {
    variant = styles.runVariantLong;
  } else if (elevation >= 300) {
    variant = styles.runVariantHilly;
  }

  return (
    <ActivityCard id={id} type="RUN" index={index}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`${styles.runSticker} ${variant}`}
      >
        <div className={styles.runInner}>
          <div className={styles.runLayout}>
            <div className={styles.runInfoCol}>
              <div className={styles.runTop}>
                <div className={styles.runDot} />
                <div className={styles.runLabel}>
                  <span className={styles.runAction}>{action}</span>
                </div>
              </div>

              <h3 className={styles.runTitle}>{title}</h3>

              <div className={styles.runStats}>
                {stats["Distance"] && (
                  <div className={styles.runStat}>
                    <span className={styles.runStatValue}>{stats["Distance"]}</span>
                  </div>
                )}
                {stats["Time"] && (
                  <div className={styles.runStat}>
                    <span className={styles.runStatValue}>{stats["Time"]}</span>
                  </div>
                )}
                {stats["Elevation"] && (
                  <div className={styles.runStat}>
                    <span className={styles.runStatValue}>{stats["Elevation"]}</span>
                  </div>
                )}
              </div>

              <div className={styles.runDate}>
                {format(parseISO(date), "MMM d, yyyy")}
              </div>
            </div>

            {image ? (
              <div className={styles.runMapCol}>
                <StravaMap polyline={image} />
              </div>
            ) : null}
          </div>
        </div>
      </a>
    </ActivityCard>
  );
};

export default RunPost;
