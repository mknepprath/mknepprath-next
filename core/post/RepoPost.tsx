import { useEffect, useRef, useState } from "react";
import ActivityCard from "@core/activity-card";
import { format, parseISO } from "date-fns";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const RepoPost = ({
  action,
  date,
  id,
  index = 0,
  summary,
  title,
  url,
}: PostProps) => {
  const text = summary || "";
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  // Start typing when the card scrolls into view
  useEffect(() => {
    if (!ref.current || started) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || charCount >= text.length) return;
    const t = setTimeout(() => setCharCount(charCount + 1), 25);
    return () => clearTimeout(t);
  }, [started, charCount, text]);

  return (
    <ActivityCard id={id} type="REPO" index={index}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={styles.receipt}
        ref={ref}
      >
        <div className={styles.receiptRepo}>
          mknepprath / {title}
        </div>
        <div className={styles.receiptMessage}>
          {text.slice(0, charCount)}
          {started && charCount < text.length && (
            <span className={styles.receiptCursor} />
          )}
        </div>
        <div className={styles.receiptFooter}>
          {action} · {format(parseISO(date), "MMM d, yyyy")}
        </div>
      </a>
    </ActivityCard>
  );
};

export default RepoPost;
