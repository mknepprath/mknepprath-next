import { startTransition, useEffect, useState } from "react";
import ActivityCard from "@core/activity-card";
import { format, parseISO } from "date-fns";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const RobotPost = ({
  date,
  id,
  index = 0,
  summary,
  url,
}: PostProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { startTransition(() => setMounted(true)); }, []);

  return (
    <ActivityCard id={id} type="ROBOT" index={index}>
      <a
        href={url || "#"}
        target="_blank"
        rel="noreferrer"
        className={styles.robotCard}
      >
        <div className={styles.robotHeader}>
          <span className={styles.robotIcon}>🤖</span>
          <span className={styles.robotName}>robot_mk</span>
        </div>
        {mounted ? (
          <div
            className={styles.robotText}
            dangerouslySetInnerHTML={{ __html: summary || "" }}
          />
        ) : (
          <div className={styles.robotText} />
        )}
        <div className={styles.robotDate}>
          {format(parseISO(date), "MMM d, h:mm a")}
        </div>
      </a>
    </ActivityCard>
  );
};

export default RobotPost;
