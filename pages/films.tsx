import { useMemo } from "react";
import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
import posts from "@data/posts";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import styles from "./films.module.css";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const REVIEW_THRESHOLD = 200;

const FILM_PALETTE = [
  { bg: "#e8833a", text: "#2a1400", accent: "#ffecd6" },
  { bg: "#c9b896", text: "#2a2014", accent: "#f0e8d8" },
  { bg: "#b898c0", text: "#2a1430", accent: "#f0e0f4" },
  { bg: "#7ea888", text: "#0a2014", accent: "#d8f0e0" },
  { bg: "#8abcc8", text: "#0a2030", accent: "#d0eaf0" },
  { bg: "#d4a04a", text: "#2a1a00", accent: "#f8ecd0" },
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function getColors(id: string) {
  return FILM_PALETTE[hashString(id) % FILM_PALETTE.length];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

const filmPosts = posts
  .filter((p) => p.tags?.includes("film"))
  .sort((a, b) => +new Date(b.date) - +new Date(a.date));

interface MergedItem {
  kind: "essay" | "review" | "stub";
  date: string;
  id?: string;
  title: string;
  summary?: string;
  image?: string;
  film?: Film;
  reviewText?: string;
  colors?: { bg: string; text: string; accent: string };
}

export default function Films(): React.ReactNode {
  const { data: films = [] } = useSWR<Film[]>(
    "/api/v1/films?max_results=60&min_rating=0",
    fetcher,
  );

  const { essays, reviews, stubs } = useMemo(() => {
    const essays: MergedItem[] = filmPosts.map((post) => ({
      kind: "essay" as const,
      date: post.date,
      id: post.id,
      title: post.title,
      summary: post.summary,
      image: post.image,
    }));

    const reviews: MergedItem[] = [];
    const stubs: MergedItem[] = [];

    for (const film of films) {
      const plainReview = stripHtml(film.review || "");
      const item: MergedItem = {
        kind: plainReview.length >= REVIEW_THRESHOLD ? "review" : "stub",
        date: film.published_at,
        title: film.title,
        film,
        reviewText: plainReview,
        colors: getColors(film.id),
      };
      if (item.kind === "review") reviews.push(item);
      else stubs.push(item);
    }

    return { essays, reviews, stubs };
  }, [films]);

  // Build the stream: essay → stubs → reviews → essay → stubs → reviews...
  // This ensures essays punctuate the flow and lead the page.
  const rendered: React.ReactNode[] = [];
  let reviewIdx = 0;
  let stubIdx = 0;
  let ticketCount = 0;

  function renderEssay(item: MergedItem) {
    rendered.push(
      <Link
        key={`essay-${item.id}`}
        href={`/writing/${item.id}`}
        className={styles.playbill}
      >
        {item.image && (
          <div className={styles.playbillImage}>
            <Image
              alt={`cover for ${item.title}`}
              src={item.image}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div className={styles.playbillBody}>
          <h3 className={styles.playbillTitle}>{item.title}</h3>
          {item.summary && (
            <p className={styles.playbillSummary}>{item.summary}</p>
          )}
          <span className={styles.playbillDate}>
            {format(parseISO(item.date), "MMMM d, yyyy")}
          </span>
        </div>
      </Link>,
    );
  }

  function renderStubCluster(count: number) {
    const cluster = stubs.slice(stubIdx, stubIdx + count);
    if (cluster.length === 0) return;
    stubIdx += cluster.length;
    rendered.push(
      <div key={`stubs-${stubIdx}`} className={styles.stubRow}>
        {cluster.map((item) => {
          const colors = item.colors!;
          const film = item.film!;
          return (
            <a
              key={film.id}
              href={film.link}
              target="_blank"
              rel="noreferrer"
              className={styles.stub}
              style={{ background: colors.bg, color: colors.text }}
            >
              <span className={styles.stubTitle}>{film.title}</span>
              {film.rating && (
                <span className={styles.stubRating} style={{ color: colors.accent }}>
                  {"★".repeat(Math.round(+film.rating))}
                </span>
              )}
            </a>
          );
        })}
      </div>,
    );
  }

  function renderReviews(count: number) {
    const batch = reviews.slice(reviewIdx, reviewIdx + count);
    reviewIdx += batch.length;
    for (const item of batch) {
      const film = item.film!;
      const colors = item.colors!;
      const rotate = (hashString(film.id) % 8) - 4;
      const side = ticketCount % 2 === 0 ? "left" : "right";
      ticketCount++;

      rendered.push(
        <a
          key={`review-${film.id}`}
          href={film.link}
          target="_blank"
          rel="noreferrer"
          className={`${styles.ticket} ${side === "right" ? styles.ticketRight : styles.ticketLeft}`}
          style={{
            background: colors.bg,
            transform: `rotate(${rotate}deg)`,
          }}
        >
          <div className={styles.ticketEdge} style={{ color: colors.accent }}>
            {film.id.replace(/\D/g, "").slice(0, 6).split("").join(" ")}
          </div>
          <div className={styles.ticketBody}>
            <div className={styles.ticketTop}>
              <span className={styles.ticketAdmit} style={{ color: colors.accent }}>
                {film.rewatched ? "Return Visit" : "Admit One"}
              </span>
              {film.image_url && (
                <Image
                  alt={`poster for ${film.title}`}
                  src={film.image_url}
                  width={44}
                  height={66}
                  className="corner-radius-4"
                />
              )}
            </div>
            <h3 className={styles.ticketTitle} style={{ color: colors.text }}>
              {film.title}
              {film.year && (
                <span className={styles.ticketYear}> ({film.year})</span>
              )}
            </h3>
            {item.reviewText && (
              <p className={styles.ticketReview} style={{ color: colors.text }}>
                {item.reviewText}
              </p>
            )}
            <div className={styles.ticketDate} style={{ color: colors.accent }}>
              {format(new Date(film.published_at), "MMM d, yyyy")}
            </div>
          </div>
          <div className={styles.ticketEdge} style={{ color: colors.accent }}>
            {film.id.replace(/\D/g, "").slice(0, 6).split("").join(" ")}
          </div>
        </a>,
      );
    }
  }

  // Layout rhythm: essay → reviews → stubs → essay → reviews → stubs...
  for (let i = 0; i < essays.length; i++) {
    renderEssay(essays[i]);
    renderReviews(2);
    renderStubCluster(5);
  }

  // Remaining reviews and stubs
  while (reviewIdx < reviews.length || stubIdx < stubs.length) {
    renderReviews(3);
    renderStubCluster(5);
  }

  return (
    <>
      <Head
        title="Michael Knepprath, Film Critic"
        description="Film reviews and essays by Michael Knepprath"
      />
      <Nav className="container" />

      <div className={styles.page} data-page="films">
        <header className={styles.header}>
          <h1 className={styles.title}>Films</h1>
        </header>

        <div className={styles.stream}>
          {rendered}
        </div>
      </div>

      <Footer className="container" />
    </>
  );
}
