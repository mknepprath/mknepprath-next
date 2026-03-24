import A from "@core/a";
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
  <ActivityCard id={id} type="FILM" index={index}>
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
              height={135}
              src={image}
              width={90}
            />
          </a>
        ) : null}
        <div>
          <a href={url} target="_blank" rel="noreferrer">
            <h3 className={styles.filmTitle}>{title}</h3>
          </a>
          {summary ? (
            <div
              className={styles.filmReview}
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          ) : null}
          <small>
            {action} on {format(parseISO(date), "MMMM d, yyyy")}
          </small>
        </div>
      </header>
    </article>
  </ActivityCard>
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
}: PostProps) => (
  <ActivityCard id={id} type="REPO" index={index}>
    <article key={id}>
      <header>
        <a href={url} target="_blank" rel="noreferrer">
          <h3 className={styles.title}>
            {url
              ?.replace("https://twitter.com/", "@")
              ?.replace("https://mastodon.social/", "")
              ?.replace("https://botsin.space/", "")
              ?.replace("https://", "") || (
              <>
                <span style={{ fontWeight: 300 }}>mknepprath /</span> {title}
              </>
            )}
          </h3>
        </a>{" "}
        <p style={{ margin: "0.4em 0 0.2em" }}>{summary}</p>
        <small>
          {action} on {format(parseISO(date), "MMMM d, yyyy")}
        </small>
      </header>
    </article>
  </ActivityCard>
);

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
  title,
  url,
}: PostProps) => (
  <ActivityCard id={id} type="TOOT" index={index}>
    <article key={id}>
      <header>
        {image ? (
          <A href={url || ""}>
            <div className="fill-image bordered-image" style={{ height: 200 }}>
              <Image
                alt={`cover image for ${title}`}
                className="corner-radius-8"
                src={image}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </A>
        ) : null}
        <div
          className={styles.tweet}
          dangerouslySetInnerHTML={{ __html: summary || "" }}
        />
        <small>
          <A href={url || ""}>
            {action} on {format(parseISO(date), "MMMM d, yyyy")}
          </A>
        </small>
      </header>
    </article>
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
              alt={`album art for ${title}`}
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
          {summary ? (
            <div className={styles.filmReview}>
              <p>{summary}</p>
            </div>
          ) : null}
          <small>
            {action} on {format(parseISO(date), "MMMM d, yyyy")}
          </small>
        </div>
      </header>
    </article>
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

  return (
    <ActivityCard id={id} type="RUN" index={index}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={styles.runSticker}
      >
        <div className={styles.runInner}>
          <div className={styles.runTop}>
            <div className={styles.runDot} />
            <div className={styles.runLabel}>
              <span className={styles.runAction}>{action}</span>
            </div>
          </div>

          <h3 className={styles.runTitle}>{title}</h3>

          {image ? (
            <div className={styles.runMap}>
              <StravaMap polyline={image} />
            </div>
          ) : null}

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
