import { useEffect, useRef, useState } from "react";
import ActivityCard from "@core/activity-card";
import StravaMap from "@core/strava-map";
import { format, parseISO } from "date-fns";
import Image from "next/legacy/image";
import Link from "next/link";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const Post = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  title,
  type,
  url,
}: PostProps) => (
  <ActivityCard id={id} type={type || "POST"} index={index}>
    <article key={id}>
      <header>
        <Link href={`${url}`}>
          {image ? (
            <div className="fill-image bordered-image" style={{ height: 200 }}>
              <Image
                alt={`cover image for ${title}`}
                className="corner-radius-8"
                src={image}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ) : null}
          <h3 className={styles.title}>{title}</h3>
        </Link>{" "}
        {summary ? <p style={{ margin: "0.4em 0 0.2em" }}>{summary}</p> : null}
        <small>
          {action || "Published"} on {format(parseISO(date), "MMMM d, yyyy")}
        </small>
      </header>
    </article>
  </ActivityCard>
);

const FilmPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  title,
  url,
}: PostProps) => (
  (() => {
    // Rotating color palette — each film gets a color based on its id
    const palette = [
      { bg: "#e8833a", text: "#2a1400", accent: "#ffecd6" },  // orange
      { bg: "#c9b896", text: "#2a2014", accent: "#f0e8d8" },  // tan
      { bg: "#b898c0", text: "#2a1430", accent: "#f0e0f4" },  // lavender
      { bg: "#7ea888", text: "#0a2014", accent: "#d8f0e0" },  // green
      { bg: "#8abcc8", text: "#0a2030", accent: "#d0eaf0" },  // blue
      { bg: "#d4a04a", text: "#2a1a00", accent: "#f8ecd0" },  // gold
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
    const colors = palette[Math.abs(hash) % palette.length];

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
            {id.replace(/\D/g, "").slice(0, 6).split("").join(" ")}
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
              <div
                className={styles.ticketReview}
                style={{ color: colors.text }}
                dangerouslySetInnerHTML={{ __html: summary }}
              />
            ) : null}

            <div
              className={styles.ticketDate}
              style={{ color: colors.accent }}
            >
              {format(parseISO(date), "MMM d, yyyy")} · {action}
            </div>
          </div>

          <div className={styles.ticketEdge} style={{ color: colors.accent }}>
            {id.replace(/\D/g, "").slice(0, 6).split("").join(" ")}
          </div>
        </a>
      </ActivityCard>
    );
  })()
);

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
              alt={`cover for ${title}`}
              className="bordered-image corner-radius-8"
              height={135}
              objectFit="cover"
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

const HighlightPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  title,
  url,
}: PostProps) => (
  <ActivityCard id={id} type="HIGHLIGHT" index={index}>
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
              alt={`cover for ${title}`}
              className="bordered-image corner-radius-8"
              height={90}
              objectFit="cover"
              src={image}
              width={90}
            />
          </a>
        ) : null}
        <div>
          <a href={url} target="_blank" rel="noreferrer">
            <h3 className={styles.filmTitle}>
              <p
                style={{
                  display: "inline-block",
                  margin: 0,
                  transform: "rotate(-1.5deg)",
                }}
              >
                <em
                  style={{
                    background: "#fdff32",
                    padding: "0 0.6rem",
                  }}
                >
                  &ldquo;{title}&rdquo;
                </em>
              </p>
            </h3>
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

const PhotoPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  title,
  url,
}: PostProps) => (
  <ActivityCard id={id} type="PHOTO" index={index}>
    <article key={id}>
      <header>
        <Link href={`${url}`}>
          <div
            className="fill-image bordered-image"
            style={{ height: `calc(100vw / 2)`, maxHeight: 420 }}
          >
            <Image
              alt={`cover image for ${title}`}
              className="corner-radius-8"
              src={image || ""}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Link>{" "}
        <small>
          {action} on {format(parseISO(date), "MMMM d, yyyy")}
        </small>
      </header>
    </article>
  </ActivityCard>
);

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
                layout="fill"
                objectFit="cover"
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

const TootPost = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  url,
}: PostProps) => (
  <ActivityCard id={id} type="TOOT" index={index}>
    <div className={styles.stickyNote}>
      {image ? (
        <div className={styles.stickyImage}>
          <Image
            alt="attached image"
            src={image}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ) : null}
      <div
        className={styles.stickyText}
        dangerouslySetInnerHTML={{ __html: summary || "" }}
      />
      <a
        href={url || "#"}
        target="_blank"
        rel="noreferrer"
        className={styles.stickyDate}
      >
        {action} · {format(parseISO(date), "MMM d")}
      </a>
    </div>
  </ActivityCard>
);

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
  // Parse "Distance: 3.2 mi, Time: 28 min, Elevation: 45 ft"
  const stats: Record<string, string> = {};
  if (summary) {
    summary.split(", ").forEach((part) => {
      const [key, val] = part.split(": ");
      if (key && val) stats[key.trim()] = val.trim();
    });
  }

  // Variant based on distance and activity type
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

export {
  Post,
  BookPost,
  HighlightPost,
  FilmPost,
  RepoPost,
  RunPost,
  TweetPost,
  TootPost,
  TrophyPost,
  PhotoPost,
  MusicPost,
};
