import Head from "@core/head";
import { decodePolyline } from "@core/strava-map";
import { fetcher } from "@lib/fetcher";
import fetch from "isomorphic-unfetch";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useSWR from "swr";

import styles from "./home.module.css";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

const ACTIVITY_URL = "/api/v1/activity?max_results=90&min_rating=0";
const PHOTOS_URL = "/api/v1/photos?limit=24";
const SHOTS_URL = "/api/v1/dribbble";
const PHOTO_EVERY = 3;
const SHOT_EVERY = 7;
const MAX_SHOTS = 4;
// Keep the stream recent, but never let a quiet stretch empty the grid.
const MAX_AGE_DAYS = 60;
const MIN_POSTS = 24;

const LINKS = [
  { label: "Writing", href: "/writing" },
  { label: "Photography", href: "/photography" },
  { label: "Films", href: "/films" },
  { label: "About", href: "/about" },
  { label: "GitHub", href: "https://github.com/mknepprath" },
];

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

const isExternal = (href: string) => /^https?:\/\//.test(href);

// Long titles step down a size instead of being cut off mid-word.
const lenClass = (text = "") =>
  text.length > 80
    ? styles.len4
    : text.length > 48
      ? styles.len3
      : text.length > 24
        ? styles.len2
        : undefined;

// Secondary copy is dropped rather than shown truncated.
const fits = (text = "", max = 110) => text.length > 0 && text.length <= max;

// Ends on a full sentence so the copy reads as finished, never cut off.
// A review that is one long sentence keeps its whole text if it fits the box.
const toSentence = (html = "", max = 190) => {
  const text = stripTags(html);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  return end > 40 ? cut.slice(0, end + 1) : "";
};

// Formatted in UTC so server and client render the same string.
const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

const decode = (text: string) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

const stripTags = (html = "") =>
  decode(html.replace(/<[^>]+>/g, " "))
    .replace(/(https?:\/\/|www\.)\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();

// Paragraphs and <br>s carry meaning in posts (Wordle grids, poems, lists),
// so turn them into real newlines instead of flattening to one line.
const htmlToText = (html = "") =>
  decode(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>\s*/gi, "\n\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/(https?:\/\/|www\.)\S+/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

/**
 * Reveals tiles as they scroll in, staggering each batch so a row lands
 * left-to-right instead of the whole page animating at once on load.
 */
function useReveal(count: number) {
  useEffect(() => {
    const cells = Array.from(document.querySelectorAll<HTMLElement>(`.${styles.cell}`));
    const observer = new IntersectionObserver(
      (entries) => {
        let n = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const cell = entry.target as HTMLElement;
          cell.style.transitionDelay = `${Math.min(n++, 8) * 45}ms`;
          cell.classList.add(styles.in);
          observer.unobserve(cell);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    );
    cells.forEach((cell) => {
      if (!cell.classList.contains(styles.in)) observer.observe(cell);
    });
    return () => observer.disconnect();
  }, [count]);
}

const OPEN_HASH = "#grid";
// One envelope for the whole opening: everything starts together and settles
// inside this window, rather than running as separate beats.
const FLIGHT_MS = 720;
const EASE = "cubic-bezier(0.22, 0.65, 0.2, 1)";

type Rects = Record<string, DOMRect>;

/**
 * The landing sits in front of the grid until the hatch is opened. The state
 * lives in the URL hash so the grid is linkable and the back button closes it.
 */
function useHatch() {
  const [open, setOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [flying, setFlying] = useState(false);
  const rects = useRef<Rects>({});

  useEffect(() => {
    const sync = () => {
      const next = window.location.hash === OPEN_HASH;
      setOpen(next);
      if (!next) {
        setExiting(false);
        setFlying(false);
      }
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const openGrid = useCallback(() => {
    history.pushState(null, "", OPEN_HASH);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(true);
      return;
    }
    // Measure the miniature now so the real tiles can take over in the very
    // same frame; the landing stays only long enough for its text to leave.
    const found: Rects = {};
    document.querySelectorAll<HTMLElement>("[data-mini]").forEach((el) => {
      if (el.dataset.mini) found[el.dataset.mini] = el.getBoundingClientRect();
    });
    rects.current = found;
    setFlying(true);
    setOpen(true);
    setExiting(true);
    setTimeout(() => setExiting(false), 260);
  }, []);

  const close = useCallback(() => {
    history.pushState(null, "", window.location.pathname);
    setOpen(false);
    setFlying(false);
    setExiting(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return { close, exiting, flying, open, openGrid, rects, setFlying };
}

/**
 * Flies the four blocks of the hatch miniature to the exact position and size
 * of the real tiles they stand for, so the thing you clicked becomes the thing
 * you land on. Tile contents fade in once the geometry has settled.
 */
function useFoldIn(active: boolean, rects: React.RefObject<Rects>, done: () => void) {
  useLayoutEffect(() => {
    if (!active) return;

    const from = rects.current || {};
    const identity = document.querySelector<HTMLElement>('[data-anchor="identity"]');
    const cells = Array.from(document.querySelectorAll<HTMLElement>(`.${styles.cell}`));
    const reveal = () => cells.forEach((cell) => cell.classList.add(styles.in));

    // Without a measured miniature there is nothing to grow from.
    if (!identity || !from.identity) {
      reveal();
      done();
      return;
    }

    const idLast = identity.getBoundingClientRect();
    if (!idLast.width) {
      reveal();
      done();
      return;
    }

    /*
     * The grid starts as one scaled-down copy pinned to the miniature and
     * expands to full size, so everything moves together. The four blocks the
     * miniature actually showed get their own exact start rect; the rest are
     * placed by the same transform, which is what makes it read as one object.
     *
     * Driven by the Web Animations API rather than inline styles: a two-step
     * style flip depends on a reflow landing between the frames, and when it
     * does not the tiles simply appear without moving.
     */
    const scale = from.identity.width / idLast.width;
    const animations: Animation[] = [];
    const inView = (r: DOMRect) => r.top < window.innerHeight * 1.15 && r.bottom > -40;

    cells.forEach((cell) => {
      const r = cell.getBoundingClientRect();
      if (!r.width || !inView(r)) return;

      const anchor = cell.dataset.anchor ? from[cell.dataset.anchor] : undefined;
      const startX = anchor ? anchor.left : from.identity.left + (r.left - idLast.left) * scale;
      const startY = anchor ? anchor.top : from.identity.top + (r.top - idLast.top) * scale;
      const sx = anchor ? anchor.width / r.width : scale;
      const sy = anchor ? anchor.height / r.height : scale;

      cell.style.transformOrigin = "top left";
      animations.push(
        cell.animate(
          [
            {
              transform: `translate(${startX - r.left}px, ${startY - r.top}px) scale(${sx}, ${sy})`,
              opacity: anchor ? 1 : 0,
            },
            { opacity: 1, offset: anchor ? 0 : 0.42 },
            { transform: "none", opacity: 1 },
          ],
          { duration: FLIGHT_MS, easing: EASE, fill: "both" },
        ),
      );

      // A block in the miniature was bare colour, so its contents arrive as it
      // lands rather than riding along stretched.
      if (anchor) {
        Array.from(cell.children).forEach((kid) => {
          animations.push(
            (kid as HTMLElement).animate([{ opacity: 0 }, { opacity: 0, offset: 0.4 }, { opacity: 1 }], {
              duration: FLIGHT_MS,
              easing: "ease",
              fill: "both",
            }),
          );
        });
      }
    });

    reveal();

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      animations.forEach((animation) => animation.cancel());
      cells.forEach((cell) => {
        cell.style.transformOrigin = "";
      });
      done();
    };

    const timer = setTimeout(finish, FLIGHT_MS + 60);
    return () => {
      clearTimeout(timer);
      finish();
    };
  }, [active, rects, done]);
}

// A 4x4 miniature of the real grid: identity block, index, a photo, then the
// colour blocks the feed is made of.
const HATCH_CELLS: { bg?: string; mini?: string; photo?: 0 | 1; span?: string }[] = [
  { bg: "var(--lime)", mini: "identity", span: "m2x2" },
  { bg: "var(--paper)", mini: "links", span: "m1x2" },
  { photo: 0, mini: "photo0", span: "m1x2" },
  { photo: 1, mini: "photo1", span: "m2x1" },
  { bg: "var(--tomato)" },
  { bg: "var(--blue)" },
  { bg: "var(--yellow)" },
  { bg: "var(--violet)" },
  { bg: "var(--sky)" },
  { bg: "var(--mint)" },
];

function Landing({
  exiting,
  latest,
  onOpen,
  photos,
}: {
  exiting: boolean;
  latest?: PostListItem;
  onOpen: () => void;
  photos: Toot[];
}) {
  return (
    <div className={cx(styles.landing, exiting && styles.landingOut)}>
      <div className={styles.landingInner}>
        <div className={styles.landingText}>
          <div className={cx(styles.meta, styles.landingMeta)}>
            <span>mknepprath.com</span>
          </div>
          <h1 className={styles.landingName}>
            Michael
            <br />
            Knepprath
          </h1>
          <p className={styles.landingBio}>
            Staff Software Engineer at Walmart. I make games, apps, and tools,
            and write about design, film, and video games.
          </p>
          <div className={styles.landingLinks}>
            <Link href="/writing">Writing</Link>
            <Link href="/photography">Photography</Link>
            <a href="https://github.com/mknepprath" rel="noopener noreferrer" target="_blank">
              GitHub
            </a>
            <a href="mailto:mknepprath@gmail.com">Email</a>
          </div>
        </div>

        <button
          aria-label="Open the activity grid"
          className={styles.hatch}
          onClick={onOpen}
          type="button"
        >
          <span className={styles.hatchMosaic} aria-hidden>
            {HATCH_CELLS.map((cell, n) => {
              const photo = cell.photo !== undefined ? photos[cell.photo] : undefined;
              return (
                <span
                  className={cell.span ? styles[cell.span] : undefined}
                  data-mini={cell.mini}
                  key={n}
                  style={{ background: cell.bg || "var(--ink2)" }}
                >
                  {photo ? (
                    <Image
                      alt=""
                      fill
                      sizes="160px"
                      src={photo.media_attachments[0].url}
                      style={{ objectFit: "cover" }}
                    />
                  ) : null}
                </span>
              );
            })}
          </span>
          <span className={styles.hatchLabel}>
            <span className={styles.mono}>
              {latest ? `Active ${shortDate(latest.date)}` : "Live"}
            </span>
            <span className={styles.hatchCta}>Open the grid ⤢</span>
          </span>
        </button>
      </div>
    </div>
  );
}

interface TileProps {
  anchor?: string;
  href: string;
  i: number;
  className: string;
  children: React.ReactNode;
}

function Tile({ anchor, href, i, className, children }: TileProps) {
  const style: CSSVars = { "--i": i };
  if (isExternal(href)) {
    return (
      <a
        className={className}
        data-anchor={anchor}
        href={href}
        rel="noopener noreferrer"
        style={style}
        target="_blank"
      >
        {children}
      </a>
    );
  }
  return (
    <Link className={className} data-anchor={anchor} href={href} style={style}>
      {children}
    </Link>
  );
}

function Meta({ label, date }: { label: string; date?: string }) {
  return (
    <div className={styles.meta}>
      <span>
        {label}
        {date ? ` · ${shortDate(date)}` : ""}
      </span>
      <span aria-hidden className={styles.arrow}>
        ↗
      </span>
    </div>
  );
}

function Route({ polyline }: { polyline: string }) {
  const points = decodePolyline(polyline);
  if (points.length < 2) return null;

  const lats = points.map((p) => p[0]);
  const midLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const k = Math.cos((midLat * Math.PI) / 180);
  const xs = points.map((p) => p[1] * k);
  const ys = points.map((p) => -p[0]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const w = Math.max(...xs) - minX || 1e-4;
  const h = Math.max(...ys) - minY || 1e-4;
  const scale = 100 / Math.max(w, h);

  const d = points
    .map(
      (_, j) =>
        `${j ? "L" : "M"}${((xs[j] - minX) * scale).toFixed(2)},${((ys[j] - minY) * scale).toFixed(2)}`,
    )
    .join("");

  return (
    <svg
      aria-hidden
      className={styles.route}
      preserveAspectRatio="xMidYMid meet"
      viewBox={`-4 -4 ${(w * scale + 8).toFixed(2)} ${(h * scale + 8).toFixed(2)}`}
    >
      <path d={d} pathLength={1} />
    </svg>
  );
}

function Identity({ i, latest }: { i: number; latest?: PostListItem }) {
  const style: CSSVars = { "--i": i };
  return (
    <div
      className={cx(styles.cell, styles.identity, styles.w3, styles.h2)}
      data-anchor="identity"
      style={style}
    >
      <div className={styles.meta}>
        <span>mknepprath.com</span>
        {latest ? (
          <span>
            <i aria-hidden className={styles.dot} />
            Active {shortDate(latest.date)}
          </span>
        ) : null}
      </div>
      <div>
        <h1 className={styles.name}>
          Michael
          <br />
          Knepprath
        </h1>
        <p className={styles.bio}>
          Staff Software Engineer at Walmart. Side projects in design, film,
          video games, and so on.
        </p>
      </div>
    </div>
  );
}

function Links({ i }: { i: number }) {
  const style: CSSVars = { "--i": i };
  return (
    <nav
      className={cx(styles.cell, styles.links, styles.h2)}
      data-anchor="links"
      style={style}
    >
      <div className={styles.meta}>
        <span>Index</span>
      </div>
      <ul className={styles.linkList}>
        {LINKS.map(({ label, href }, n) => {
          const external = isExternal(href);
          const inner = (
            <>
              <span className={styles.num}>{String(n + 1).padStart(2, "0")}</span>
              {label}
              {external ? <span className={styles.ext}>↗</span> : null}
            </>
          );
          return (
            <li key={label}>
              {external ? (
                <a href={href} rel="noopener noreferrer" target="_blank">
                  {inner}
                </a>
              ) : (
                <Link href={href}>{inner}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function PhotoTile({
  anchor,
  i,
  photo,
  size,
}: {
  anchor?: string;
  i: number;
  photo: Toot;
  size: "hero" | "feature" | "portrait" | "landscape" | "small";
}) {
  const media = photo.media_attachments[0];
  const alt =
    media.description || stripTags(photo.content) || "Photograph by Michael Knepprath";
  const sizeClass = {
    hero: styles.photoHero,
    feature: styles.photoFeature,
    portrait: styles.photoPortrait,
    landscape: styles.photoLandscape,
    small: undefined,
  }[size];
  const sizes = {
    hero: "(max-width: 1024px) 50vw, 33vw",
    feature: "(max-width: 640px) 100vw, 50vw",
    portrait: "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 33vw",
    landscape: "(max-width: 640px) 100vw, 50vw",
    small: "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw",
  }[size];

  return (
    <Tile
      anchor={anchor}
      className={cx(styles.cell, styles.photo, sizeClass)}
      href="/photography"
      i={i}
    >
      <div className={styles.media}>
        <Image
          alt={alt}
          fill
          priority={size === "hero"}
          sizes={sizes}
          src={media.url}
          style={{ objectFit: "cover" }}
        />
      </div>
      {size === "hero" ? (
        <div className={styles.slab}>
          <span className={styles.mono}>Photography ↗</span>
          <span className={styles.slabTitle}>Out with the camera</span>
        </div>
      ) : (
        <span className={styles.chip}>{shortDate(photo.created_at)}</span>
      )}
    </Tile>
  );
}

/**
 * Illustrations live outside the activity feed and are years old, so they are
 * mixed in on their own cadence and labelled with the year rather than a date.
 */
function ShotTile({ i, shot }: { i: number; shot: Shot }) {
  const year = shot.published_at?.slice(0, 4);
  return (
    <Tile className={cx(styles.cell, styles.shot)} href={shot.html_url} i={i}>
      <div className={styles.shotArt}>
        <Image
          alt={shot.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 33vw"
          src={shot.images.normal}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.shotLabel}>
        <div className={styles.meta}>
          <span>Illustration{year ? ` · ${year}` : ""}</span>
          <span aria-hidden className={styles.arrow}>
            ↗
          </span>
        </div>
        <h3 className={cx(styles.title, styles.tSm, lenClass(shot.title), styles.clamp2)}>
          {shot.title}
        </h3>
      </div>
    </Tile>
  );
}

function ActivityTile({ i, post }: { i: number; post: PostListItem }) {
  const { action = "", date, image, summary = "", title, type, url = "#" } = post;

  switch (type) {
    case "FILM":
    case "BOOK": {
      const [, mainTitle, series] =
        type === "BOOK" ? title.match(/^(.*?)\s*\((.+)\)$/) || [] : [];
      return (
        <Tile
          className={cx(styles.cell, styles.split, styles.w2, type === "FILM" ? styles.film : styles.book)}
          href={url}
          i={i}
        >
          {image ? (
            <div className={styles.poster}>
              <Image
                alt=""
                fill
                sizes="(max-width: 640px) 34vw, 12vw"
                src={image}
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null}
          <div className={styles.body}>
            <Meta date={date} label={action} />
            <div>
              <h3
                className={cx(
                  styles.title,
                  styles.tSplit,
                  lenClass(mainTitle || title),
                  styles.clamp4,
                )}
              >
                {mainTitle || title}
              </h3>
              {series ? <span className={cx(styles.mono, styles.series)}>{series}</span> : null}
              {!series && toSentence(summary) ? (
                <p className={styles.summary}>{toSentence(summary)}</p>
              ) : null}
            </div>
          </div>
        </Tile>
      );
    }

    case "RUN": {
      const miles = summary.match(/Distance: ([\d.]+) mi/)?.[1];
      const minutes = summary.match(/Time: (\d+) min/)?.[1];
      const hasRoute = !!image && image.length > 10;
      return (
        <Tile
          className={cx(styles.cell, action === "Ran" ? styles.run : styles.walk)}
          href={url}
          i={i}
        >
          <Meta date={date} label={action} />
          {hasRoute ? <Route polyline={image} /> : null}
          <div>
            <p className={cx(styles.stat, !hasRoute && styles.statXl)}>
              {miles || "—"}
              <span className={styles.unit}>mi</span>
            </p>
            <span className={cx(styles.mono, styles.sub)}>
              {title}
              {minutes ? ` · ${minutes} min` : ""}
            </span>
          </div>
        </Tile>
      );
    }

    case "REPO":
      return (
        <Tile className={cx(styles.cell, styles.repo)} href={url} i={i}>
          <Meta date={date} label="Commit" />
          <div>
            <h3 className={styles.repoName}>{title}</h3>
            {fits(summary, 90) ? <p className={styles.summary}>{summary}</p> : null}
          </div>
        </Tile>
      );

    case "ROBOT":
    case "TOOT":
    case "SKEET": {
      const kind = { ROBOT: styles.robot, TOOT: styles.toot, SKEET: styles.skeet }[type];
      const label = { ROBOT: "Robot MK", TOOT: "Mastodon", SKEET: "Bluesky" }[type];
      // Bluesky hands us plain text; Mastodon and the bot hand us HTML.
      const text = type === "SKEET" ? htmlToText(title) : htmlToText(summary || title);
      // Posts shaped like a grid (Wordle, lists) need room for their rows.
      const dense = (text.match(/\n/g) || []).length >= 2;
      // A long post earns a taller box instead of being cut off; a short one
      // takes a single square, which gives the grid small pieces to pack with.
      const tall = text.length > 180;
      const short = !dense && text.length <= 70;
      return (
        <Tile
          className={cx(styles.cell, !short && styles.w2, tall && styles.h2, kind)}
          href={url}
          i={i}
        >
          <Meta date={date} label={label} />
          <h3
            className={cx(
              styles.quote,
              short && styles.quoteSm,
              dense && styles.quoteDense,
              tall && styles.quoteTall,
              !dense && !short && lenClass(text),
            )}
          >
            {text}
          </h3>
        </Tile>
      );
    }

    case "POST":
      return (
        <Tile
          className={cx(styles.cell, styles.post, styles.w2, image && styles.h2)}
          href={url}
          i={i}
        >
          {image ? (
            <div className={styles.postImage}>
              <Image
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw"
                src={image}
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null}
          <div className={styles.body}>
            <Meta date={date} label="Writing" />
            <h2 className={cx(styles.title, styles.tLg, lenClass(title), styles.clamp4)}>
              {title}
            </h2>
          </div>
        </Tile>
      );

    case "CHESS": {
      const result = action.startsWith("Won") ? "W" : action.startsWith("Lost") ? "L" : "D";
      return (
        <Tile className={cx(styles.cell, styles.chess)} href={url} i={i}>
          <Meta date={date} label="Chess" />
          <span aria-hidden className={styles.result}>
            {result}
          </span>
          <span className={styles.mono}>
            {action} {title}
          </span>
        </Tile>
      );
    }

    case "TROPHY":
      return (
        <Tile className={cx(styles.cell, styles.trophy)} href={url} i={i}>
          <Meta date={date} label="Trophy" />
          {image ? (
            <div className={styles.icon}>
              <Image alt="" fill sizes="96px" src={image} style={{ objectFit: "cover" }} />
            </div>
          ) : null}
          <h3 className={cx(styles.title, styles.tSm, lenClass(title), styles.clamp3)}>
            {title}
          </h3>
        </Tile>
      );

    case "MUSIC":
    case "GAME":
      return (
        <Tile
          className={cx(styles.cell, styles.bleed, type === "GAME" && styles.w2)}
          href={url}
          i={i}
        >
          {image ? (
            <div className={styles.media}>
              <Image
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 34vw"
                src={image}
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : null}
          <div className={styles.bleedSlab}>
            <Meta date={date} label={type === "MUSIC" ? "On repeat" : "Playing"} />
            <h3 className={cx(styles.title, styles.tSm, lenClass(title), styles.clamp3)}>
              {title}
            </h3>
            {fits(summary, 60) ? <span className={styles.mono}>{summary}</span> : null}
          </div>
        </Tile>
      );

    case "HIGHLIGHT":
      return (
        <Tile
          className={cx(
            styles.cell,
            styles.highlight,
            styles.w2,
            title.length > 180 && styles.h2,
          )}
          href={url}
          i={i}
        >
          <Meta date={date} label="Highlight" />
          <div>
            <p className={cx(styles.excerpt, lenClass(title))}>“{title}”</p>
            {fits(summary, 70) ? (
              <span className={cx(styles.mono, styles.sub)}>{summary}</span>
            ) : null}
          </div>
        </Tile>
      );

    default:
      return (
        <Tile className={cx(styles.cell, styles.repo)} href={url} i={i}>
          <Meta date={date} label={action || type || "Update"} />
          <h3 className={cx(styles.title, styles.tSm, lenClass(title), styles.clamp4)}>
            {stripTags(title)}
          </h3>
        </Tile>
      );
  }
}

function Footer({ i }: { i: number }) {
  const style: CSSVars = { "--i": i };
  return (
    <footer className={cx(styles.cell, styles.footer)} style={style}>
      <div className={styles.meta}>
        <span>Say hello</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
      <a className={styles.footerMail} href="mailto:mknepprath@gmail.com">
        mknepprath@gmail.com
      </a>
      <div className={styles.footerRow}>
        <Link href="/writing">Writing</Link>
        <a href="/feed.json">Feed</a>
        <a href="https://github.com/mknepprath/mknepprath-next" rel="noopener noreferrer" target="_blank">
          Source ↗
        </a>
      </div>
    </footer>
  );
}

interface Props {
  initialActivity: PostListItem[];
  initialPhotos: Toot[];
  initialShots: Shot[];
}

export default function GridHome({
  initialActivity,
  initialPhotos,
  initialShots,
}: Props): React.ReactNode {
  const { close, exiting, flying, open, openGrid, rects, setFlying } = useHatch();
  const landed = useCallback(() => setFlying(false), [setFlying]);

  const { data: activity = initialActivity } = useSWR<PostListItem[]>(ACTIVITY_URL, fetcher, {
    fallbackData: initialActivity,
    revalidateOnFocus: false,
  });
  const { data: photoData = initialPhotos } = useSWR<Toot[]>(PHOTOS_URL, fetcher, {
    fallbackData: initialPhotos,
    revalidateOnFocus: false,
  });
  const { data: shotData = initialShots } = useSWR<Shot[]>(SHOTS_URL, fetcher, {
    fallbackData: initialShots,
    revalidateOnFocus: false,
  });

  const recent = (Array.isArray(activity) ? activity : [])
    .filter((post) => post.type !== "PHOTO")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  // Anchored to the newest item, not the clock, so server and client agree.
  const newest = recent[0] ? +new Date(recent[0].date) : 0;
  const cutoff = newest - MAX_AGE_DAYS * 86400000;
  const fresh = recent.filter((post) => +new Date(post.date) > cutoff);
  const posts = fresh.length >= MIN_POSTS ? fresh : recent.slice(0, MIN_POSTS);

  const photos = (Array.isArray(photoData) ? photoData : [])
    .filter((p) => p.media_attachments?.[0]?.type === "image")
    .slice(0, 20);

  const shots = (Array.isArray(shotData) ? shotData : [])
    .filter((shot) => shot.images?.normal)
    .slice(0, MAX_SHOTS);

  // Mixing in single-square shots gives the packer small pieces to fill
  // around the big ones, so the grid stays tight instead of gapping.
  const photoSize = (photo: Toot, n: number) => {
    if (n % 5 === 0) return "feature" as const;
    if (n % 3 === 0) return "small" as const;
    const { width = 1, height = 1 } = photo.media_attachments[0].meta?.original || {};
    return height > width ? ("portrait" as const) : ("landscape" as const);
  };

  const tiles: React.ReactNode[] = [];
  let i = 0;

  tiles.push(<Identity i={i++} key="identity" latest={posts[0]} />);
  tiles.push(<Links i={i++} key="links" />);
  if (photos[0]) {
    tiles.push(
      <PhotoTile anchor="photo0" i={i++} key={photos[0].id} photo={photos[0]} size="hero" />,
    );
  }

  let p = 1;
  let s = 0;
  posts.forEach((post, n) => {
    if (n > 0 && n % PHOTO_EVERY === 0 && p < photos.length) {
      tiles.push(
        <PhotoTile
          anchor={p === 1 ? "photo1" : undefined}
          i={i++}
          key={photos[p].id}
          photo={photos[p]}
          size={photoSize(photos[p], p)}
        />,
      );
      p++;
    }
    if (n > 0 && n % SHOT_EVERY === 0 && s < shots.length) {
      tiles.push(<ShotTile i={i++} key={shots[s].id} shot={shots[s]} />);
      s++;
    }
    tiles.push(<ActivityTile i={i++} key={post.id} post={post} />);
  });

  // Any photos left over go in last as single squares. Dense packing pulls
  // them back up into gaps left by the larger tiles; with no gaps they simply
  // land at the end.
  while (p < photos.length) {
    tiles.push(<PhotoTile i={i++} key={photos[p].id} photo={photos[p]} size="small" />);
    p++;
  }

  tiles.push(<Footer i={i++} key="footer" />);

  useFoldIn(open && flying, rects, landed);
  // Hold the cascade until the blocks have landed, so the two don't compete.
  useReveal(open && !flying ? tiles.length : 0);

  return (
    <>
      <Head title="Michael Knepprath" />
      <noscript>
        <style>{`.${styles.cell}{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <div className={styles.shell} data-page="grid">
        {open ? (
          <>
            <button className={styles.close} onClick={close} type="button">
              Close ✕
            </button>
            <div className={styles.grid}>{tiles}</div>
          </>
        ) : null}
        {open && !exiting ? null : (
          <Landing
            exiting={exiting}
            latest={posts[0]}
            onOpen={openGrid}
            photos={photos.slice(0, 2)}
          />
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  let initialActivity: PostListItem[] = [];
  let initialPhotos: Toot[] = [];
  let initialShots: Shot[] = [];

  try {
    const [activityRes, photosRes, shotsRes] = await Promise.all([
      fetch(`${BASE_URL}${ACTIVITY_URL}`),
      fetch(`${BASE_URL}${PHOTOS_URL}`),
      fetch(`${BASE_URL}${SHOTS_URL}`),
    ]);
    if (activityRes.ok) {
      const data = await activityRes.json();
      if (Array.isArray(data)) initialActivity = data;
    }
    if (photosRes.ok) {
      const data = await photosRes.json();
      if (Array.isArray(data)) initialPhotos = data;
    }
    if (shotsRes.ok) {
      const data = await shotsRes.json();
      if (Array.isArray(data)) initialShots = data;
    }
  } catch {
    // SWR refetches client-side
  }

  return { props: { initialActivity, initialPhotos, initialShots }, revalidate: 300 };
};
