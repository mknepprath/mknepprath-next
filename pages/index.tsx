import classnames from "classnames";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import fetch from "isomorphic-unfetch";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useSWR from "swr";

import Card from "@core/card";
import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
import Shot from "@core/shot";
import { projectLinks } from "@data/links";
import useScrollPosition from "@hooks/useScrollPosition";

import styles from "./index.module.css";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

export default function Home(): ReactNode {
  const { data: activity = [] } = useSWR<PostListItem[]>(
    `/api/v1/activity`,
    fetcher
  );
  const { data: shots = [] } = useSWR<Shot[]>(`/api/v1/dribbble`, fetcher);

  const scrollPosition = useScrollPosition();

  return (
    <>
      <Head />
      <Nav
        className="container"
        style={{ position: "absolute", left: 0, right: 0, zIndex: 200 }}
      />

      {/* <div className={classnames("container", styles.hero)}>
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
      </div> */}

      <div className="keyart" id="parallax">
        <div
          className="keyart_layer parallax"
          id="keyart-0"
          data-speed="2"
          style={{
            transform: `translate3d(0px, ${scrollPosition * -0.02}px, 0px)`,
          }}
        />
        {/* <div
          className="keyart_layer parallax"
          id="keyart-1"
          data-speed="5"
          style={{ transform: `translate3d(0px, ${scrollPosition}px, 0px)` }}
        /> */}
        <div
          className="keyart_layer parallax"
          id="keyart-1"
          data-speed="11"
          style={{
            transform: `translate3d(0px, ${scrollPosition * -0.11}px, 0px)`,
          }}
        />
        {/* <div
          className="keyart_layer parallax"
          id="keyart-3"
          data-speed="16"
          style={{ transform: `translate3d(0px, ${scrollPosition}px, 0px)` }}
        /> */}
        <div
          className="keyart_layer parallax"
          id="keyart-2"
          data-speed="26"
          style={{
            transform: `translate3d(0px, ${scrollPosition * -0.26}px, 0px)`,
          }}
        />
        {/* <div
          className="keyart_layer parallax"
          id="keyart-5"
          data-speed="36"
          style={{ transform: `translate3d(0px, ${scrollPosition}px, 0px)` }}
        /> */}
        <div
          className="keyart_layer parallax"
          id="keyart-3b"
          data-speed="49"
          style={{
            transform: `translate3d(0px, ${scrollPosition * -0.49}px, 0px)`,
            opacity: 0.6, // `${0.6 - scrollPosition * 0.001}`,
          }}
        />
        <div
          className="keyart_layer parallax"
          id="keyart-3"
          data-speed="49"
          style={{
            transform: `translate3d(0px, ${scrollPosition * -0.49}px, 0px)`,
          }}
        />
        <div className="keyart_layer" id="keyart-scrim" />
        <div
          className="keyart_layer parallax"
          id="keyart-7"
          data-speed="69"
          style={{
            transform: `translate3d(0px, ${scrollPosition * -0.69}px, 0px)`,
          }}
        >
          <div
            className={classnames("container", styles.hero)}
            style={{ marginTop: 200 }}
          >
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
        </div>
        <div
          className="keyart_layer parallax"
          id="keyart-4"
          data-speed="59"
          style={{
            transform: `translate3d(0px, ${scrollPosition * -0.59}px, 0px)`,
          }}
        />
        <div className="keyart_layer" id="keyart-5" data-speed="100" />
      </div>

      <div
        className="container"
        style={{
          background: "#ffffff",
          paddingTop: "2.4rem",
          position: "relative",
          zIndex: 200,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Activity</h2>
        {activity
          // The `sort` method can be conveniently used with function expressions:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
          .sort((a, b) => +parseISO(b.date) - +parseISO(a.date))
          .map((post) => {
            switch (post.type) {
              case "FILM":
                return <FilmPost key={post.id} {...post} />;
              case "TWEET":
                return <TweetPost key={post.id} {...post} />;
              case "REPO":
                return <RepoPost key={post.id} {...post} />;
              case "BOOK":
                return <BookPost key={post.id} {...post} />;
              default:
                return <Post key={post.id} {...post} />;
            }
          })}

        {!activity.length && <div>What have I been up to...</div>}

        <div
          className={styles.projectContainer}
          style={{ position: "relative", zIndex: 200 }}
        >
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
          <div
            className={styles.projectContainer}
            style={{ position: "relative", zIndex: 200 }}
          >
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

        <Footer />
      </div>
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
        <small>Watched on {format(parseISO(date), "MMMM d, yyyy")}</small>
      </div>
    </header>
  </article>
);

const BookPost = ({ date, id, image, summary, title, url }: PostListItem) => (
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
        <small>Read on {format(parseISO(date), "MMMM d, yyyy")}</small>
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
      <small>Updated on {format(parseISO(date), "MMMM d, yyyy")}</small>
    </header>
  </article>
);

const TweetPost = ({ date, id, image, summary, title }: PostListItem) => (
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
      <small>Tweeted on {format(parseISO(date), "MMMM d, yyyy")}</small>
    </header>
  </article>
);
