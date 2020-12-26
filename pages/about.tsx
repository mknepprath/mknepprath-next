import classnames from "classnames";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

import Card from "core/card";
import Page from "core/page";
import PhotoStack from "core/photo-stack";

import styles from "./about.module.css";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

export default function About() {
  const { data: books } = useSWR(`/api/v1/books`, fetcher);
  const { data: films } = useSWR(`/api/v1/films`, fetcher);

  return (
    <Page
      className={classnames("container", styles.pageContainer)}
      title="About Michael Knepprath"
    >
      <article data-cy="about-page">
        <header>
          <h1>About</h1>
        </header>

        <div className={styles.photoStackContainer}>
          <PhotoStack />
        </div>

        <p>
          Michael Knepprath is a Senior Software Engineer at{" "}
          <a
            href="https://www.walmartlabs.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Walmart Labs
          </a>
          . He loves his family and working on side projects related to
          technology, design, film, video games, and so on.
        </p>

        <h2>Contact</h2>
        <p>
          You can contact him via{" "}
          <a href="mailto:michael@mknepprath.com">email</a> or send a message on{" "}
          <a
            href="https://twitter.com/mknepprath"
            rel="noopener noreferrer"
            target="_blank"
          >
            Twitter
          </a>
          .
        </p>

        {books?.length ? (
          <>
            <h2>Books I've Read</h2>
            <div className={styles.cardContainer}>
              {books?.map((book: Book) => (
                <Card
                  description={book.author}
                  href={book.link}
                  imgSrc={book.image_url}
                  key={book.link}
                  title={book.title}
                />
              ))}
            </div>
          </>
        ) : null}

        {films?.length ? (
          <>
            <h2>Films I've Watched</h2>
            <div className={styles.cardContainer}>
              {films?.map((film: Film) => (
                <Card
                  description={film.year}
                  href={film.link}
                  imgSrc={film.image_url.split('"')[1]}
                  key={film.link}
                  title={film.title}
                />
              ))}
            </div>
          </>
        ) : null}
      </article>
    </Page>
  );
}
