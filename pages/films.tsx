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

// Review length threshold for "real review" vs "one-liner"
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

// Film blog posts tagged with "film"
const filmPosts = posts.filter((p) => p.tags?.includes("film"));

interface MergedItem {
  kind: "essay" | "review" | "stub";
  date: string;
  // Essay fields
  id?: string;
  title: string;
  summary?: string;
  image?: string;
  // Film fields
  film?: Film;
  reviewText?: string;
  colors?: { bg: string; text: string; accent: string };
}

export default function Films(): React.ReactNode {
  const { data: films = [] } = useSWR<Film[]>(
    "/api/v1/films?max_results=60&min_rating=0",
    fetcher,
  );

  const items = useMemo(() => {
    const merged: MergedItem[] = [];

    // Add film blog posts as essays
    for (const post of filmPosts) {
      merged.push({
        kind: "essay",
        date: post.date,
        id: post.id,
        title: post.title,
        summary: post.summary,
        image: post.image,
      });
    }

    // Add Letterboxd films as reviews or stubs
    for (const film of films) {
      const plainReview = stripHtml(film.review || "");
      const isReal = plainReview.length >= REVIEW_THRESHOLD;
      merged.push({
        kind: isReal ? "review" : "stub",
        date: film.published_at,
        title: film.title,
        film,
        reviewText: plainReview,
        colors: getColors(film.id),
      });
    }

    // Sort chronologically, newest first
    merged.sort((a, b) => +new Date(b.date) - +new Date(a.date));

    return merged;
  }, [films]);

  // Group stubs into clusters
  const rendered: React.ReactNode[] = [];
  let stubBuffer: MergedItem[] = [];

  function flushStubs() {
    if (stubBuffer.length === 0) return;
    rendered.push(
      <div key={`stubs-${stubBuffer[0].date}`} className={styles.stubRow}>
        {stubBuffer.map((item) => {
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
    stubBuffer = [];
  }

  for (const item of items) {
    if (item.kind === "stub") {
      stubBuffer.push(item);
      // Flush every 4-6 stubs
      if (stubBuffer.length >= 5) flushStubs();
      continue;
    }

    // Flush any pending stubs before a feature item
    flushStubs();

    if (item.kind === "essay") {
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
    } else if (item.kind === "review") {
      const film = item.film!;
      const colors = item.colors!;
      const rotate = (hashString(film.id) % 6) - 3;

      rendered.push(
        <a
          key={`review-${film.id}`}
          href={film.link}
          target="_blank"
          rel="noreferrer"
          className={styles.ticket}
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

  // Flush remaining stubs
  flushStubs();

  return (
    <>
      <Head
        title="Tardy Critic — Michael Knepprath"
        description="Film reviews and essays by Michael Knepprath"
      />
      <Nav className="container" />

      <div className={styles.page} data-page="films">
        <header className={styles.header}>
          <h1 className={styles.title}>Tardy Critic</h1>
          <p className={styles.subtitle}>Reviews, usually about a decade late.</p>
        </header>

        <div className={styles.stream}>
          {rendered}
        </div>
      </div>

      <Footer className="container" />
    </>
  );
}
