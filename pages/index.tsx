import { projectLinks } from "@data/links";
import type { HomeTheme, HomeVideo } from "./api/v1/home";
import Head from "@core/head";
import { decodePolyline } from "@core/strava-map";
import { fetcher } from "@lib/fetcher";
import fetch from "isomorphic-unfetch";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useSWR from "swr";

import styles from "./index.module.css";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

const HOME_URL = "/api/v1/home";

const LINKS = [
  { label: "Writing", href: "/writing" },
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
  { label: "GitHub", href: "https://github.com/mknepprath" },
];

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

const isExternal = (href: string) => /^https?:\/\//.test(href);

/*
 * Whether a click should be caught by the closeup rather than followed.
 * Next's Link navigates from inside its own click handler, so a tile has to
 * cancel the event itself — a handler further up the tree runs too late.
 */
const opensCloseup = (e: React.MouseEvent) =>
  !e.metaKey &&
  !e.ctrlKey &&
  !e.shiftKey &&
  !e.altKey &&
  e.button === 0 &&
  typeof window !== "undefined" &&
  !window.matchMedia("(max-width: 639px)").matches;

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

/**
 * Tracks which card is on screen in the phone pager, so the counter reads
 * like a position in a stack rather than a scrollbar.
 */
function useSwipePosition(total: number, active: boolean) {
  const [at, setAt] = useState(1);

  useEffect(() => {
    if (!active || !window.matchMedia("(max-width: 639px)").matches) return;
    const cells = Array.from(document.querySelectorAll<HTMLElement>(`.${styles.cell}`));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setAt(cells.indexOf(entry.target as HTMLElement) + 1);
        }
      },
      { threshold: 0.6 },
    );
    cells.forEach((cell) => observer.observe(cell));
    return () => observer.disconnect();
  }, [total, active]);

  return at;
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

      // A block that was bare colour in the miniature gets its contents as it
      // lands. Photographs were already on screen, so they ride along instead
      // of blanking out and fading back in.
      if (anchor) {
        Array.from(cell.children).forEach((child) => {
          const kid = child as HTMLElement;
          if (kid.querySelector("img") || kid.tagName === "IMG") return;
          animations.push(
            kid.animate([{ opacity: 0 }, { opacity: 0, offset: 0.4 }, { opacity: 1 }], {
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
            {LINKS.map(({ label, href }) =>
              isExternal(href) ? (
                <a href={href} key={label} rel="noopener noreferrer" target="_blank">
                  {label}
                </a>
              ) : (
                <Link href={href} key={label}>
                  {label}
                </Link>
              ),
            )}
          </div>
        </div>

        <button
          aria-label="See what I've been up to"
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
            <span className={styles.hatchCta}>What I&apos;ve been up to ↗</span>
          </span>
        </button>
      </div>
    </div>
  );
}


/** Counts a distance up from zero the first time its tile scrolls into view. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseFloat(value);
    if (!Number.isFinite(target)) return;
    const decimals = (value.split(".")[1] || "").length;

    // Starts counting the moment the tile appears, so the number is never
    // shown settled and then reset.
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const started = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - started) / 700, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(t < 1 ? (target * eased).toFixed(decimals) : value);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

const GLYPHS = "▚▞░▒▓#%&@$*+=-<>/\\";

/** Shuffles a bot's words into place on hover, left to right. */
function Scramble({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  const run = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const chars = Array.from(text);
    const frames = 60;
    // Each unresolved slot holds its glyph for a few frames; churning every
    // frame just reads as noise.
    const held: string[] = new Array(chars.length).fill("");
    let frame = 0;
    const step = () => {
      const settled = Math.floor((frame / frames) * chars.length);
      setDisplay(
        chars
          .map((char, i) => {
            if (i < settled || char === " " || char === "\n") return char;
            if (!held[i] || (frame + i) % 4 === 0) {
              held[i] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            return held[i];
          })
          .join(""),
      );
      if (frame++ < frames) raf.current = requestAnimationFrame(step);
      else setDisplay(text);
    };
    raf.current = requestAnimationFrame(step);
  }, [text]);

  /*
   * Hovering anywhere on the card sets it off. In the phone pager there is no
   * hover, so the card scrambles as it swipes into view instead — and again
   * each time you come back to it.
   */
  useEffect(() => {
    const tile = ref.current?.closest("a");
    if (!tile) return;
    // A touch browser fires mouseenter on tap, which would scramble the text
    // mid-swipe; those cards are handled by the observer below instead.
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (canHover) tile.addEventListener("mouseenter", run);

    let observer: IntersectionObserver | undefined;
    if (window.matchMedia("(max-width: 639px)").matches) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) run();
        },
        { threshold: 0.65 },
      );
      observer.observe(tile);
    }

    return () => {
      if (canHover) tile.removeEventListener("mouseenter", run);
      observer?.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [run]);

  return <span ref={ref}>{display}</span>;
}

interface TileProps {
  anchor?: string;
  href: string;
  i: number;
  item?: number;
  className: string;
  children: React.ReactNode;
}

function Tile({ anchor, href, i, item, className, children }: TileProps) {
  const style: CSSVars = { "--i": i };
  const external = isExternal(href);

  /*
   * A plain anchor rather than next/link. Link navigates from inside its own
   * click handler, which made cancelling it to open the closeup unreliable;
   * with a real anchor the browser's default action is cancelled the ordinary
   * way. These are exit points, so losing client-side routing costs nothing.
   */
  return (
    <a
      className={className}
      data-anchor={anchor}
      data-item={item}
      href={href}
      onClick={(e) => {
        if (item !== undefined && opensCloseup(e)) e.preventDefault();
      }}
      rel={external ? "noopener noreferrer" : undefined}
      style={style}
      target={external ? "_blank" : undefined}
    >
      {children}
    </a>
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
  item,
  photo,
  size,
}: {
  anchor?: string;
  i: number;
  item?: number;
  photo: Toot;
  size: "hero" | "feature" | "portrait" | "landscape" | "small";
}) {
  const media = photo.media_attachments[0];
  const { width = 1, height = 1 } = media.meta?.original || {};
  // Which way the crop hides the picture decides which way it travels.
  const pan = width > height ? styles.panX : styles.panY;
  const alt =
    media.description || stripTags(photo.content) || "Photograph by Michael Knepprath";
  const sizeClass = {
    hero: styles.photoHero,
    feature: styles.photoFeature,
    portrait: styles.photoPortrait,
    landscape: styles.photoLandscape,
    small: undefined,
  }[size];
  /*
   * On a phone every card is full screen and object-fit: cover scales the
   * picture to fill it, so the painted width is larger than the viewport —
   * much larger for a wide shot, which is sized by the card's height. The
   * grid hints (50vw, 25vw, 17vw) were leaving photos visibly soft.
   */
  const onPhone = width > height ? "(max-width: 640px) 1400px, " : "(max-width: 640px) 800px, ";
  const sizes =
    onPhone +
    {
      hero: "(max-width: 1024px) 50vw, 33vw",
      feature: "50vw",
      portrait: "(max-width: 1024px) 25vw, 33vw",
      landscape: "50vw",
      small: "(max-width: 1024px) 25vw, 17vw",
    }[size];

  return (
    <Tile
      anchor={anchor}
      className={cx(styles.cell, styles.photo, pan, sizeClass)}
      href="/photography"
      i={i}
      item={item}
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
function ShotTile({ i, item, shot }: { i: number; item?: number; shot: Shot }) {
  const year = shot.published_at?.slice(0, 4);
  return (
    <Tile className={cx(styles.cell, styles.shot)} href={shot.html_url} i={i} item={item}>
      <div className={styles.shotArt}>
        <Image
          alt={shot.title}
          fill
          sizes="(max-width: 640px) 900px, (max-width: 1024px) 25vw, 33vw"
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

/**
 * A project is evergreen, so it carries a label instead of a date and is
 * spread through the stream rather than placed by time.
 */
function ProjectTile({
  i,
  item,
  project,
}: {
  i: number;
  item?: number;
  project: (typeof projectLinks)[number];
}) {
  return (
    <Tile className={cx(styles.cell, styles.project)} href={project.href} i={i} item={item}>
      <Meta label="Project" />
      {project.imgSrc ? (
        <div className={styles.projectArt}>
          <Image
            alt=""
            fill
            sizes="(max-width: 640px) 40vw, 12vw"
            src={project.imgSrc}
            style={{ objectFit: "contain", objectPosition: "left center" }}
          />
        </div>
      ) : null}
      <div>
        <h3 className={cx(styles.title, styles.tSm, lenClass(project.title), styles.clamp2)}>
          {project.title}
        </h3>
        {fits(project.description, 46) ? (
          <p className={styles.summary}>{project.description}</p>
        ) : null}
      </div>
    </Tile>
  );
}

/**
 * YouTube's player API, loaded once and only when a clip actually needs it.
 */
let youTubeApi: Promise<void> | undefined;

function loadYouTubeApi(): Promise<void> {
  if (youTubeApi) return youTubeApi;
  youTubeApi = new Promise((resolve) => {
    const w = window as unknown as { YT?: { Player?: unknown }; onYouTubeIframeAPIReady?: () => void };
    if (w.YT?.Player) return resolve();
    w.onYouTubeIframeAPIReady = () => resolve();
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return youTubeApi;
}

/**
 * Film work. On a phone the clip plays in place once the card is on screen —
 * muted and looping, which is the only kind of autoplay a browser allows — and
 * is torn down again when it scrolls away.
 */
function VideoTile({ i, item, video }: { i: number; item?: number; video: HomeVideo }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const player = useRef<unknown>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const isYouTube = video.embed.includes("youtube.com");

  /*
   * Restart the clip from the player rather than letting it end. YouTube's own
   * loop parameter re-queues the video, which tears the player down and flashes
   * every cycle; reaching the end at all raises the "more videos" screen.
   */
  useEffect(() => {
    if (!playing || !isYouTube) return;
    let cancelled = false;

    loadYouTubeApi().then(() => {
      const el = frame.current;
      if (cancelled || !el) return;
      const YT = (window as unknown as { YT: { Player: new (el: Element, o: unknown) => unknown } }).YT;
      player.current = new YT.Player(el, {
        events: {
          onStateChange: (event: { data: number; target: { seekTo: (n: number) => void; playVideo: () => void } }) => {
            // 0 is ENDED
            if (event.data === 0) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      player.current = null;
    };
  }, [playing, isYouTube]);

  useEffect(() => {
    const art = ref.current;
    if (!art || !window.matchMedia("(max-width: 639px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPlaying(entry.isIntersecting);
        // The next mount is a fresh player, so it has to prove itself again.
        if (!entry.isIntersecting) setReady(false);
      },
      { threshold: 0.75 },
    );
    observer.observe(art);
    return () => observer.disconnect();
  }, []);

  return (
    <Tile
      className={cx(styles.cell, styles.shot, styles.w2)}
      href={video.url}
      i={i}
      item={item}
    >
      <div className={styles.shotArt} ref={ref}>
        <Image
          alt={video.title}
          fill
          sizes="(max-width: 640px) 900px, 34vw"
          src={video.thumbnail}
          style={{ objectFit: "cover" }}
        />
        {/*
          The player paints white while it boots, so it stays hidden until it
          has loaded and the still frame shows through until then. Otherwise a
          visitor gets a blank rectangle and assumes it is broken.
        */}
        {playing ? (
          <iframe
            allow="autoplay; encrypted-media; picture-in-picture"
            className={cx(styles.videoEmbed, ready && styles.videoReady)}
            onLoad={() => setReady(true)}
            ref={frame}
            src={video.embed}
            tabIndex={-1}
            title={video.title}
          />
        ) : null}
      </div>
      <div className={styles.shotLabel}>
        <div className={styles.meta}>
          <span>Video{video.year ? ` · ${video.year}` : ""}</span>
          <span aria-hidden className={styles.arrow}>
            ↗
          </span>
        </div>
        <h3 className={cx(styles.title, styles.tSm, lenClass(video.title), styles.clamp2)}>
          {video.title}
        </h3>
      </div>
    </Tile>
  );
}

/** A theme is a claim about a stretch of time, so it reads as a chapter. */
function ThemeTile({ i, item, theme }: { i: number; item?: number; theme: HomeTheme }) {
  return (
    <Tile
      className={cx(styles.cell, styles.theme, styles.w2)}
      href={`/themes/${theme.slug}`}
      i={i}
      item={item}
    >
      <Meta label={`Theme · ${theme.count} things`} />
      <div>
        <h3 className={cx(styles.title, styles.tSplit, lenClass(theme.title))}>
          {theme.title}
        </h3>
        <p className={cx(styles.summary, styles.clamp3)}>{theme.description}</p>
      </div>
    </Tile>
  );
}

function ActivityTile({ i, item, post }: { i: number; item?: number; post: PostListItem }) {
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
          item={item}
        >
          {image ? (
            <div className={styles.poster}>
              <Image
                alt=""
                fill
                sizes="(max-width: 640px) 500px, 12vw"
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
          item={item}
        >
          <Meta date={date} label={action} />
          {hasRoute ? <Route polyline={image} /> : null}
          <div>
            <p className={cx(styles.stat, !hasRoute && styles.statXl)}>
              {miles ? <CountUp value={miles} /> : "—"}
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
        <Tile className={cx(styles.cell, styles.repo)} href={url} i={i} item={item}>
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
          item={item}
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
            {type === "ROBOT" ? <Scramble text={text} /> : text}
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
          item={item}
        >
          {image ? (
            <div className={styles.postImage}>
              <Image
                alt=""
                fill
                sizes="(max-width: 640px) 900px, (max-width: 1024px) 50vw, 34vw"
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
        <Tile className={cx(styles.cell, styles.chess)} href={url} i={i} item={item}>
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
        <Tile className={cx(styles.cell, styles.trophy)} href={url} i={i} item={item}>
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
          item={item}
        >
          {image ? (
            <div className={styles.media}>
              <Image
                alt=""
                fill
                sizes="(max-width: 640px) 900px, 34vw"
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
          item={item}
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
        <Tile className={cx(styles.cell, styles.repo)} href={url} i={i} item={item}>
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

interface HomeItem {
  kind: "activity" | "photo" | "shot" | "project" | "video" | "theme";
  video?: HomeVideo;
  theme?: HomeTheme;
  post?: PostListItem;
  photo?: Toot;
  fill?: boolean;
  shot?: Shot;
  project?: (typeof projectLinks)[number];
}

interface HomeFeed {
  items: HomeItem[];
  latest: string | null;
}

/**
 * The closeup. Every tile is otherwise a one-way exit off the site, and the
 * grid has to truncate to keep its shape — so this is where an item is shown
 * whole: the picture large, the review untruncated, and the link out offered
 * rather than taken for you.
 */
function Closeup({
  at,
  items,
  onClose,
  onStep,
}: {
  at: number;
  items: HomeItem[];
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const item = items[at];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") onStep(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  if (!item) return null;

  const post = item.post;
  const shot = item.shot;
  const video = item.video;
  const photo = item.photo;
  const project = item.project;
  const theme = item.theme;

  const image =
    photo?.media_attachments?.[0]?.url ||
    shot?.images?.normal ||
    video?.thumbnail ||
    project?.imgSrc ||
    (post?.type === "RUN" ? undefined : post?.image);

  const label =
    (photo && "Photograph") ||
    (shot && "Illustration") ||
    (video && "Video") ||
    (project && "Project") ||
    (theme && "Theme") ||
    post?.action ||
    post?.type ||
    "";

  const title =
    photo?.media_attachments?.[0]?.description ||
    shot?.title ||
    video?.title ||
    project?.title ||
    theme?.title ||
    (post ? stripTags(post.title) : "");

  const body =
    project?.description ||
    theme?.description ||
    (post?.type === "TOOT" || post?.type === "ROBOT"
      ? htmlToText(post.summary || post.title)
      : post
        ? stripTags(post.summary)
        : "") ||
    (photo ? stripTags(photo.content) : "");

  const href =
    photo?.url ||
    shot?.html_url ||
    video?.url ||
    project?.href ||
    (theme ? `/themes/${theme.slug}` : "") ||
    post?.url ||
    "";

  const date = photo?.created_at || post?.date;
  const route = post?.type === "RUN" && post.image ? post.image : undefined;

  return (
    <div className={styles.closeup} onClick={onClose} role="presentation">
      <div
        className={styles.closeupPanel}
        onClick={(e) => e.stopPropagation()}
        role="presentation"
      >
        {image ? (
          <div className={styles.closeupArt}>
            <Image
              alt={title || ""}
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
              src={image}
              style={{ objectFit: "contain" }}
            />
          </div>
        ) : null}
        {route ? (
          <div className={styles.closeupRoute}>
            <Route polyline={route} />
          </div>
        ) : null}

        <div className={styles.closeupBody}>
          <div className={styles.meta}>
            <span>
              {label}
              {date ? ` · ${shortDate(date)}` : ""}
            </span>
            <span>
              {at + 1} / {items.length}
            </span>
          </div>

          {title ? <h2 className={styles.closeupTitle}>{title}</h2> : null}
          {body ? <p className={styles.closeupText}>{body}</p> : null}

          <div className={styles.closeupActions}>
            {href ? (
              isExternal(href) ? (
                <a
                  className={styles.closeupLink}
                  href={href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open ↗
                </a>
              ) : (
                <Link className={styles.closeupLink} href={href}>
                  Open →
                </Link>
              )
            ) : null}
            <button className={styles.closeupStep} onClick={() => onStep(-1)} type="button">
              ←
            </button>
            <button className={styles.closeupStep} onClick={() => onStep(1)} type="button">
              →
            </button>
            <button className={styles.closeupStep} onClick={onClose} type="button">
              Close ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  initialFeed: HomeFeed;
}

export default function GridHome({ initialFeed }: Props): React.ReactNode {
  const { close, exiting, flying, open, openGrid, rects, setFlying } = useHatch();

  const { data: feed = initialFeed } = useSWR<HomeFeed>(HOME_URL, fetcher, {
    fallbackData: initialFeed,
    revalidateOnFocus: false,
  });

  const items = Array.isArray(feed?.items) ? feed.items : [];
  const photos = items
    .filter((item) => item.kind === "photo" && item.photo)
    .map((item) => item.photo as Toot);
  const latest = feed?.latest
    ? ({ date: feed.latest, id: "latest", title: "" } as PostListItem)
    : undefined;

  const landed = useCallback(() => setFlying(false), [setFlying]);
  const [closeup, setCloseup] = useState<number | null>(null);

  const photoSize = (photo: Toot, n: number, fill?: boolean) => {
    if (fill) return "small" as const;
    if (n === 0) return "hero" as const;
    if (n % 5 === 0) return "feature" as const;
    if (n % 3 === 0) return "small" as const;
    const { width = 1, height = 1 } = photo.media_attachments[0].meta?.original || {};
    return height > width ? ("portrait" as const) : ("landscape" as const);
  };

  const tiles: React.ReactNode[] = [];
  let i = 0;
  let photoIndex = 0;

  tiles.push(<Identity i={i++} key="identity" latest={latest} />);
  tiles.push(<Links i={i++} key="links" />);

  items.forEach((item, at) => {
    if (item.kind === "photo" && item.photo) {
      const n = photoIndex++;
      tiles.push(
        <PhotoTile
          anchor={n === 0 ? "photo0" : n === 1 ? "photo1" : undefined}
          i={i++}
          item={at}
          key={item.photo.id}
          photo={item.photo}
          size={photoSize(item.photo, n, item.fill)}
        />,
      );
    } else if (item.kind === "theme" && item.theme) {
      tiles.push(
        <ThemeTile i={i++} item={at} key={item.theme.slug} theme={item.theme} />,
      );
    } else if (item.kind === "video" && item.video) {
      tiles.push(<VideoTile i={i++} item={at} key={item.video.id} video={item.video} />);
    } else if (item.kind === "shot" && item.shot) {
      tiles.push(<ShotTile i={i++} item={at} key={item.shot.id} shot={item.shot} />);
    } else if (item.kind === "project" && item.project) {
      tiles.push(
        <ProjectTile i={i++} item={at} key={item.project.title} project={item.project} />,
      );
    } else if (item.post) {
      tiles.push(<ActivityTile i={i++} item={at} key={item.post.id} post={item.post} />);
    }
  });

  tiles.push(<Footer i={i++} key="footer" />);
  // Swiping past the end of the pager is how you get back out.
  tiles.push(
    <div className={styles.endCap} key="endcap">
      <span className={styles.mono}>↑ Back to the start</span>
    </div>,
  );

  /*
   * One delegated handler rather than a callback threaded through ten tile
   * components. Modified clicks are left alone so a middle-click or cmd-click
   * still opens the source in a new tab.
   */
  const onGridClick = (e: React.MouseEvent) => {
    // The phone pager already shows a card full screen, so a modal on top of it
    // is the same view twice; there a tap just follows the link.
    if (!opensCloseup(e)) return;
    const tile = (e.target as HTMLElement).closest("[data-item]");
    const n = Number(tile?.getAttribute("data-item"));
    if (!tile || !Number.isFinite(n) || !items[n]) return;
    e.preventDefault();
    setCloseup(n);
  };

  const stepCloseup = (delta: number) =>
    setCloseup((previous) =>
      previous === null ? null : (previous + delta + items.length) % items.length,
    );

  const closeCloseup = () => setCloseup(null);

  const at = useSwipePosition(tiles.length, open);

  // Reaching the strip below the last card closes the pager.
  useEffect(() => {
    if (!open || !window.matchMedia("(max-width: 639px)").matches) return;
    const cap = document.querySelector(`.${styles.endCap}`);
    if (!cap) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) close();
      },
      { threshold: 0.6 },
    );
    observer.observe(cap);
    return () => observer.disconnect();
  }, [open, close]);
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
            <div className={styles.grid} onClick={onGridClick} role="presentation">
              {tiles}
            </div>
            <div className={styles.swipeBar}>
              {at} / {tiles.length}
              {/* Snapped cards leave no sliver of the next one showing, so say
                  it once on the opening card and never again. */}
              {at === 1 ? <span className={styles.swipeHint}> · swipe</span> : null}
            </div>
          </>
        ) : null}
        {closeup !== null ? (
          <Closeup
            at={closeup}
            items={items}
            onClose={closeCloseup}
            onStep={stepCloseup}
          />
        ) : null}
        {open && !exiting ? null : (
          <Landing
            exiting={exiting}
            latest={latest}
            onOpen={openGrid}
            photos={photos.slice(0, 2)}
          />
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  let initialFeed: HomeFeed = { items: [], latest: null };

  try {
    const response = await fetch(`${BASE_URL}${HOME_URL}`);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data?.items)) initialFeed = data;
    }
  } catch {
    // SWR refetches client-side
  }

  return { props: { initialFeed }, revalidate: 300 };
};
