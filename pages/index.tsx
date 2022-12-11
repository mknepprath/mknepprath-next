import classnames from "classnames";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import fetch from "isomorphic-unfetch";
import { GetServerSideProps } from "next";
import Image from "next/legacy/image";
import Link from "next/link";
import useSWR from "swr";

import A from "@core/a";
import Card from "@core/card";
import Footer from "@core/footer";
import Head from "@core/head";
import Hero from "@core/hero";
import Nav from "@core/nav";
import Parallax from "@core/parallax";
import Shot from "@core/shot";
import { projectLinks } from "@data/links";

import styles from "./index.module.css";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

interface Props {
  isDesktop: boolean;
}

export default function Home(props: Props): React.ReactNode {
  const { data: activity = [] } = useSWR<PostListItem[]>(
    `/api/v1/activity`,
    fetcher
  );
  const { data: shots = [] } = useSWR<Shot[]>(`/api/v1/dribbble`, fetcher);

  return (
    <>
      <Head />
      <Nav
        className={classnames("container", {
          [styles.nav]: props.isDesktop,
        })}
      />

      {props.isDesktop ? <Parallax /> : <Hero />}

      <div className={classnames("container", styles.container)}>
        <h2 className={styles.activityHeading}>Activity</h2>
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
              case "TOOT":
                return <TootPost key={post.id} {...post} />;
              default:
                return <Post key={post.id} {...post} />;
            }
          })}

        {!activity.length && <div>What have I been up to...</div>}

        <div className={styles.projectContainer}>
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
          <div className={styles.projectContainer}>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgent = context.req.headers["user-agent"] || "";
  return {
    props: {
      isDesktop: isDesktop(userAgent),
    },
  };
};

function isDesktop(userAgent: string) {
  const ua = userAgent.toLowerCase();
  return ua.includes("macintosh") || ua.includes("windows");
}
