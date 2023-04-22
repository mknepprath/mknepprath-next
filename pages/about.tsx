import A from "@core/a";
import Card from "@core/card";
import Page from "@core/page";
import PhotoStack from "@core/photo-stack";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import useSWR from "swr";

import styles from "./about.module.css";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

export default function About(): React.ReactNode {
  const { data: books } = useSWR<Book[]>(`/api/v1/books`, fetcher);
  const { data: films } = useSWR<Film[]>(`/api/v1/films?min_rating=2`, fetcher);
  const { data: music } = useSWR<Music[]>(`/api/v1/music`, fetcher);
  return (
    <Page className={styles.pageContainer} title="About Michael Knepprath">
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
          on side projects related to technology, design, film, video games,{" "}
          <Link href="/activity">and so on</Link>.
        </p>

        <p>
          This website is featured on Egghead.io&apos;s list of{" "}
          <A href="https://egghead.io/portfolios">Great Developer Portfolios</A>
          .
        </p>

        <h2>Contact</h2>
        <p>
          You can contact him via{" "}
          <a href="mailto:mknepprath@gmail.com">email</a> or send a message on{" "}
          <a
            href="https://mastodon.social/@mknepprath"
            rel="noopener noreferrer"
            target="_blank"
          >
            Mastodon
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
            {music.map((m) => {
              // Titlecase the kind of media this is.
              const kind = m.attributes.playParams.kind.replace(
                /([A-Z])/g,
                " $1"
              );
              return (
                <Card
                  description={kind.charAt(0).toUpperCase() + kind.slice(1)}
                  href={
                    m.attributes.playParams.globalId
                      ? `https://music.apple.com/us/${m.attributes.playParams.kind}/${m.attributes.playParams.globalId}`
                      : "#"
                  }
                  imgSrc={m.attributes.artwork?.url // Artwork isn't always available.
                    .replace("{w}", "200")
                    .replace("{h}", "200")}
                  key={m.id}
                  title={m.attributes.name}
                />
              );
            })}
          </div>
        </>
      ) : null}
    </Page>
  );
}
