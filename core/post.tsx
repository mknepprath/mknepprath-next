import { format, parseISO } from "date-fns";
import Image from "next/legacy/image";
import Link from "next/link";

import A from "@core/a";

import styles from "./post.module.css";

const Post = ({ date, id, image, title }: PostListItem) => (
  <article key={id}>
    <header>
      <Link href={`/writing/${id}`}>
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
      <small>{format(parseISO(date), "MMMM d, yyyy")}</small>
    </header>
  </article>
);

const FilmPost = ({
  action,
  date,
  id,
  image,
  summary,
  title,
  url,
}: PostListItem) => (
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
);

const BookPost = ({
  action,
  date,
  id,
  image,
  summary,
  title,
  url,
}: PostListItem) => (
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
);

const RepoPost = ({ action, date, id, summary, title, url }: PostListItem) => (
  <article key={id}>
    <header>
      <a
        href={url || `https://github.com/mknepprath/${title}`}
        target="_blank"
        rel="noreferrer"
      >
        <h3 className={styles.title}>
          {url
            ?.replace("https://twitter.com/", "@")
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
);

const TweetPost = ({
  action,
  date,
  id,
  image,
  summary,
  title,
  url,
}: PostListItem) => (
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
);

const TootPost = ({
  action,
  date,
  id,
  image,
  summary,
  title,
  url,
}: PostListItem) => (
  <article key={id}>
    <header>
      <A href={url || ""}>
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
            <em
              className={styles.filmReview}
              dangerouslySetInnerHTML={{ __html: summary || "" }}
            />
          </h3>
        ) : (
          <p className={styles.tweet} style={{ margin: "0.4em 0 0.2em" }}>
            <em
              className={styles.filmReview}
              dangerouslySetInnerHTML={{ __html: summary || "" }}
            />
          </p>
        )}
      </A>
      <small>
        {action} on {format(parseISO(date), "MMMM d, yyyy")}
      </small>
    </header>
  </article>
);

// FIXME: Fix case when no link is available.
const MusicPost = ({
  action,
  date,
  id,
  image,
  summary,
  title,
  url,
}: PostListItem) => (
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
);

export { Post, BookPost, FilmPost, RepoPost, TweetPost, TootPost, MusicPost };
