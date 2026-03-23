import Page from "@core/page";
import fetch from "isomorphic-unfetch";
import { GetStaticProps } from "next";
import useSWR from "swr";

import styles from "./now.module.css";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

interface NowPlayingResponse {
  item?: Music;
}

interface Props {
  books: Book[];
  films: Film[];
  music: Music[];
  games: Steam[];
  runs: Run[];
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
}

function formatDistance(meters: number): string {
  const miles = meters / 1609.34;
  return `${miles.toFixed(1)} mi`;
}

function formatPlaytime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hrs = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
}

function steamIconUrl(appid: number, hash: string): string {
  return `https://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`;
}

export default function Now({
  books,
  films,
  music,
  games,
  runs,
}: Props): React.ReactNode {
  const { data: nowPlaying } = useSWR<NowPlayingResponse>(
    `/api/v1/now-playing`,
    fetcher,
    { refreshInterval: 30000 },
  );

  const currentTrack = nowPlaying?.item;

  return (
    <Page title="Now - Michael Knepprath">
      <article>
        <header>
          <h1>Now</h1>
        </header>

        <p className={styles.intro}>
          What I&apos;m up to right now. This page auto-updates every few
          minutes.
        </p>

        {currentTrack ? (
          <section className={styles.section}>
            <h2>Now Playing</h2>
            <div className={styles.nowPlaying}>
              <span className={styles.pulse} />
              <span>Live from stats.fm</span>
            </div>
            <div className={styles.item}>
              {currentTrack.track.albums[0]?.image ? (
                <img
                  alt={currentTrack.track.name}
                  className={styles.thumbnail}
                  src={currentTrack.track.albums[0].image}
                />
              ) : null}
              <div className={styles.itemText}>
                <p className={styles.itemTitle}>{currentTrack.track.name}</p>
                <p className={styles.itemSubtitle}>
                  {currentTrack.track.artists.map((a) => a.name).join(", ")}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {books.length > 0 ? (
          <section className={styles.section}>
            <h2>Reading</h2>
            {books.map((book) => (
              <a
                className={styles.item}
                href={book.link}
                key={book.isbn}
                rel="noopener noreferrer"
                target="_blank"
              >
                {book.image_url ? (
                  <img
                    alt={book.title}
                    className={styles.thumbnail}
                    src={book.image_url}
                  />
                ) : null}
                <div className={styles.itemText}>
                  <p className={styles.itemTitle}>{book.title}</p>
                  <p className={styles.itemSubtitle}>{book.author}</p>
                </div>
              </a>
            ))}
          </section>
        ) : null}

        {films.length > 0 ? (
          <section className={styles.section}>
            <h2>Watching</h2>
            {films.map((film) => (
              <a
                className={styles.item}
                href={film.link}
                key={film.id}
                rel="noopener noreferrer"
                target="_blank"
              >
                {film.image_url ? (
                  <img
                    alt={film.title}
                    className={styles.thumbnail}
                    src={film.image_url}
                  />
                ) : null}
                <div className={styles.itemText}>
                  <p className={styles.itemTitle}>{film.title}</p>
                  <p className={styles.itemSubtitle}>
                    {film.year}
                    {film.rating ? ` \u2014 ${"\u2605".repeat(parseInt(film.rating))}` : ""}
                  </p>
                </div>
              </a>
            ))}
          </section>
        ) : null}

        {music.length > 0 ? (
          <section className={styles.section}>
            <h2>Listening</h2>
            {music.map((m) => (
              <a
                className={styles.item}
                href={
                  m.track.externalIds.spotify?.[0]
                    ? `https://open.spotify.com/track/${m.track.externalIds.spotify[0]}`
                    : `https://stats.fm/track/${m.track.id}`
                }
                key={m.streamId}
                rel="noopener noreferrer"
                target="_blank"
              >
                {m.track.albums[0]?.image ? (
                  <img
                    alt={m.track.name}
                    className={styles.thumbnail}
                    src={m.track.albums[0].image}
                  />
                ) : null}
                <div className={styles.itemText}>
                  <p className={styles.itemTitle}>{m.track.name}</p>
                  <p className={styles.itemSubtitle}>
                    {m.track.artists.map((a) => a.name).join(", ")}
                  </p>
                </div>
              </a>
            ))}
          </section>
        ) : null}

        {games.length > 0 ? (
          <section className={styles.section}>
            <h2>Playing</h2>
            {games.map((game) => (
              <a
                className={styles.item}
                href={`https://store.steampowered.com/app/${game.appid}`}
                key={game.appid}
                rel="noopener noreferrer"
                target="_blank"
              >
                {game.img_icon_url ? (
                  <img
                    alt={game.name}
                    className={styles.thumbnail}
                    src={steamIconUrl(game.appid, game.img_icon_url)}
                  />
                ) : null}
                <div className={styles.itemText}>
                  <p className={styles.itemTitle}>{game.name}</p>
                  <p className={styles.itemSubtitle}>
                    {formatPlaytime(game.playtime_2weeks)} past 2 weeks
                  </p>
                </div>
              </a>
            ))}
          </section>
        ) : null}

        {runs.length > 0 ? (
          <section className={styles.section}>
            <h2>Moving</h2>
            {runs.map((run) => (
              <div className={styles.item} key={run.id}>
                <div className={styles.itemText}>
                  <p className={styles.itemTitle}>{run.name}</p>
                  <p className={styles.itemSubtitle}>
                    {formatDistance(run.distance)} &middot;{" "}
                    {formatDuration(run.moving_time)} &middot; {run.sport_type}
                  </p>
                </div>
              </div>
            ))}
          </section>
        ) : null}
      </article>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const fetchJson = async <T,>(url: string, fallback: T): Promise<T> => {
    try {
      const res = await fetch(`${BASE_URL}${url}`);
      if (!res.ok) return fallback;
      return (await res.json()) as T;
    } catch {
      return fallback;
    }
  };

  const [books, films, music, games, runs] = await Promise.all([
    fetchJson<Book[]>("/api/v1/books", []),
    fetchJson<Film[]>("/api/v1/films?min_rating=2", []),
    fetchJson<Music[]>("/api/v1/music?limit=3", []),
    fetchJson<Steam[]>("/api/v1/steam", []),
    fetchJson<Run[]>("/api/v1/runs?minMiles=0", []),
  ]);

  return {
    props: {
      books: books.slice(0, 2),
      films: films.slice(0, 2),
      music: music.slice(0, 3),
      games,
      runs: runs.slice(0, 3),
    },
    revalidate: 300,
  };
};
