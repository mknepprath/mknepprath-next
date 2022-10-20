import classnames from "classnames";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

import A from "@core/a";
import Card from "@core/card";
import Page from "@core/page";
import PhotoStack from "@core/photo-stack";

import styles from "./about.module.css";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

export default function About(): React.ReactNode {
  const { data: books } = useSWR<Book[]>(`/api/v1/books`, fetcher);
  const { data: films } = useSWR<Film[]>(`/api/v1/films?min_rating=2`, fetcher);
  const { data: music } = useSWR<Playlist[]>(`/api/v1/music`, fetcher);

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
          Michael Knepprath is a Staff Software Engineer at{" "}
          <A href="https://www.walmartlabs.com">Walmart</A> (prev.{" "}
          <A href="https://hyper.online">Hyper</A>,{" "}
          <A href="https://whcc.com">WHCC</A>). He loves his family and working
          on side projects related to technology, design, film, video games, and
          so on.
        </p>

        <h2>Contact</h2>
        <p>
          You can contact him via{" "}
          <a href="mailto:mknepprath@gmail.com">email</a> or send a message on{" "}
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
            <h2>Recent Books</h2>
            <div className={styles.cardContainer}>
              {books.map((book) => (
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
            <h2>Recent Films</h2>
            <div className={styles.cardContainer}>
              {films.map((film) => (
                <Card
                  description={film.year}
                  href={film.link}
                  imgSrc={film.image_url}
                  key={film.link}
                  title={film.title}
                />
              ))}
            </div>
          </>
        ) : null}
      </article>

      {music?.length ? (
        <>
          <h2>Recent Music</h2>
          <div className={styles.cardContainer}>
            {music.map((playlist) => {
              // Titlecase the kind of media this is.
              const kind = playlist.attributes.playParams.kind.replace(
                /([A-Z])/g,
                " $1"
              );
              return (
                <Card
                  description={kind.charAt(0).toUpperCase() + kind.slice(1)}
                  href={
                    playlist.attributes.url ||
                    `https://music.apple.com/us/${playlist.attributes.playParams.kind}/${playlist.attributes.playParams.globalId}`
                  }
                  imgSrc={playlist.attributes.artwork.url
                    .replace("{w}", "200")
                    .replace("{h}", "200")}
                  key={playlist.id}
                  title={playlist.attributes.name}
                />
              );
            })}
          </div>
        </>
      ) : null}
    </Page>
  );
}
