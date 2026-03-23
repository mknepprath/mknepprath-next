import React, { useEffect, useState } from "react";
import Page from "@core/page";
import posts from "@data/posts";
import { format, parseISO } from "date-fns";
import Link from "next/link";

import styles from "./writing.module.css";

const HEADING = "Writing";
const CHAR_DELAY = 35;
const POST_STAGGER = 60; // ms between each post appearing
const POST_START_AFTER = 3; // start showing posts after N chars typed

const sortedPosts = [...posts].sort(
  (a, b) => +parseISO(b.date) - +parseISO(a.date),
);

export default function Writing(): React.ReactNode {
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (charCount < HEADING.length) {
      const t = setTimeout(() => setCharCount(charCount + 1), CHAR_DELAY);
      return () => clearTimeout(t);
    }
    setDone(true);
  }, [charCount]);

  // How many posts are visible based on typing progress
  const charsAfterStart = Math.max(0, charCount - POST_START_AFTER);
  const visiblePosts = done
    ? sortedPosts.length
    : Math.floor(charsAfterStart / (POST_STAGGER / CHAR_DELAY));

  return (
    <Page title="Michael Knepprath, Occasional Writer" className={styles.page}>
      <header data-cy="writing-page">
        <h1 className={styles.heading}>
          {HEADING.slice(0, charCount)}
          {!done && <span className={styles.cursor} />}
        </h1>
      </header>

      <>
        {sortedPosts.map((post, i) => (
          <article
            key={post.id}
            className={styles.post}
            style={{
              opacity: i < visiblePosts ? 1 : 0,
              transform:
                i < visiblePosts ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <header>
              <Link href={`/writing/${post.id}`}>
                <h2 className={styles.title}>{post.title}</h2>
              </Link>{" "}
              <small>{format(parseISO(post.date), "MMMM d, yyyy")}</small>
            </header>
          </article>
        ))}
      </>
    </Page>
  );
}
