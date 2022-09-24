import classnames from "classnames";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import fetch from "isomorphic-unfetch";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import useSWR from "swr";

import Card from "@core/card";
import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
import Shot from "@core/shot";
import { projectLinks } from "@data/links";
import posts from "@data/posts";

import styles from "./index.module.css";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

export default function Home(): ReactNode {
  const { data: films = [] } = useSWR<Film[]>(`/api/v1/films`, fetcher);
  const { data: shots = [] } = useSWR<Shot[]>(`/api/v1/dribbble`, fetcher);
  const { data: tweets } = useSWR<Tweets>(`/api/v1/timeline/15332057`, fetcher);
  const { data: repos = [] } = useSWR<Repo[]>(`/api/v1/github/repos`, fetcher);

  const filmPosts: PostListItem[] = useMemo(
    () =>
      films?.map((film) => ({
        date: new Date(film.published_at).toISOString(),
        id: `${film.title.split(" ").join("_")}_${film.year}`,
        image: film.image_url,
        summary: film.review,
        title: film.title,
        type: "FILM",
        url: film.link,
      })),
    [films]
  );

  // filter out tweets without likes

  const tweetPosts: PostListItem[] = useMemo(
    () =>
      (tweets?.data || [])
        ?.filter(
          (tweet) =>
            !tweet?.entities?.urls?.length &&
            tweet?.public_metrics?.like_count > 0
        )
        .map((tweet) => {
          const media = tweets?.includes.media.find(
            (m) => m.media_key === tweet.attachments?.media_keys[0]
          );
          return {
            date: new Date(tweet.created_at).toISOString(),
            id: tweet.id,
            image: media?.preview_image_url || media?.url,
            summary: tweet.text,
            title: tweet.text,
            type: "TWEET",
          };
        }),
    [tweets]
  );

  const repoPosts: PostListItem[] = useMemo(
    () =>
      repos
        ?.filter((repo) => repo.name !== "mknepprath-next")
        .map((repo) => ({
          date: repo.pushed_at,
          id: repo.id,
          summary: repo.description,
          title: repo.name,
          type: "REPO",
          url: repo.homepage,
        })),
    [repos]
  );

  return (
    <>
      <Head />
      <Nav className="container" />

      <div className={classnames("container", styles.hero)}>
        <h1 className={styles.greeting}>
          <a
            href="https://youtu.be/5-CEGCXDVgI"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Hello!</span>
          </a>
          <br />I design & develop things for the internet.
        </h1>
      </div>

      <div className="container">
        <h2>Activity</h2>
        {[...posts, ...filmPosts, ...tweetPosts, ...repoPosts]
          // The `sort` method can be conveniently used with function expressions:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
          .sort((a, b) => +parseISO(b.date) - +parseISO(a.date))
          // Only display first 6 posts.
          .slice(0, 6)
          .map((post) => {
            switch (post.type) {
              case "FILM":
                return <FilmPost key={post.id} {...post} />;
              case "TWEET":
                return <TweetPost key={post.id} {...post} />;
              case "REPO":
                return <RepoPost key={post.id} {...post} />;
              default:
                return <Post key={post.id} {...post} />;
            }
          })}
      </div>

      <div className={classnames("container", styles.projectContainer)}>
        <h2>Projects</h2>
        <div className={styles.cardContainer}>
          {projectLinks.map(({ description, href, imgSrc, title }) => (
            <Card
              description={description}
              href={href}
              imgSrc={imgSrc}
              key={title}
              title={title}
            />
          ))}
        </div>
      </div>

      {shots?.length ? (
        <div className={classnames("container", styles.projectContainer)}>
          <h2>Illustrations</h2>
          <div className={styles.cardContainer}>
            {shots?.map(({ html_url, images, published_at, title }) => (
              <Shot
                description={format(parseISO(published_at), "MMMM d, yyyy")}
                href={html_url}
                imgSrc={images.normal}
                key={title}
                title={title}
              />
            ))}
          </div>
          {/* TODO: Make this look good. */}
          {/* <A href="https://dribbble.com/mknepprath">See more</A> */}
        </div>
      ) : null}

      <Footer className="container" />
    </>
  );
}

const Post = ({ date, id, image, title }: PostListItem) => (
  <article key={id}>
    <header>
      <Link href={`/writing/${id}`}>
        <a>
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
        </a>
      </Link>{" "}
      <small>{format(parseISO(date), "MMMM d, yyyy")}</small>
    </header>
  </article>
);

const FilmPost = ({ date, id, image, summary, title, url }: PostListItem) => (
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
            height={150}
            src={image}
            width={100}
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
        <small>Watched on {format(parseISO(date), "MMMM d, yyyy")}</small>
      </div>
    </header>
  </article>
);

const RepoPost = ({ date, id, summary, title, url }: PostListItem) => (
  <article key={id}>
    <header>
      <a
        href={url || `https://github.com/mknepprath/${title}`}
        target="_blank"
        rel="noreferrer"
      >
        <h3 className={styles.title}>
          {url?.replace("https://", "") || (
            <>
              <span style={{ fontWeight: 300 }}>mknepprath /</span> {title}
            </>
          )}
        </h3>
      </a>{" "}
      <p style={{ margin: "0.4em 0 0.2em" }}>{summary}</p>
      <small>Updated on {format(parseISO(date), "MMMM d, yyyy")}</small>
    </header>
  </article>
);

const TweetPost = ({ date, id, image, title }: PostListItem) => (
  <article key={id}>
    <header>
      <a
        href={`https://twitter.com/mknepprath/status/${id}`}
        target="_blank"
        rel="noreferrer"
      >
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
        <h3 className={styles.tweet}>
          <em>“{title}”</em>
        </h3>
      </a>{" "}
      <small>Tweeted on {format(parseISO(date), "MMMM d, yyyy")}</small>
    </header>
  </article>
);
