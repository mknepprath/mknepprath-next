import Head from "@core/head";
import { decodePolyline } from "@core/strava-map";
import { fetcher } from "@lib/fetcher";
import fetch from "isomorphic-unfetch";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";

import styles from "./home.module.css";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

const ACTIVITY_URL = "/api/v1/activity?max_results=90&min_rating=0";
const PHOTOS_URL = "/api/v1/photos?limit=18";
const PHOTO_EVERY = 3;
// Keep the stream recent, but never let a quiet stretch empty the grid.
const MAX_AGE_DAYS = 60;
const MIN_POSTS = 24;

const LINKS = [
  { label: "Writing", href: "/writing" },
  { label: "Photography", href: "/photography" },
  { label: "Films", href: "/films" },
  { label: "About", href: "/about" },
  { label: "GitHub", href: "https://github.com/mknepprath" },
  { label: "Bluesky", href: "https://bsky.app/profile/mknepprath.com" },
  { label: "Mastodon", href: "https://mastodon.social/@mknepprath" },
  { label: "Letterboxd", href: "https://letterboxd.com/mknepprath" },
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
const toSentence = (html = "", max = 150) => {
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

interface TileProps {
  href: string;
  i: number;
  className: string;
  children: React.ReactNode;
}

function Tile({ href, i, className, children }: TileProps) {
  const style: CSSVars = { "--i": i };
  if (isExternal(href)) {
    return (
      <a
        className={className}
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
    <Link className={className} href={href} style={style}>
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
    <div className={cx(styles.cell, styles.identity, styles.w3, styles.h2)} style={style}>
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
    <nav className={cx(styles.cell, styles.links, styles.h2)} style={style}>
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
  i,
  photo,
  size,
}: {
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
    <Tile className={cx(styles.cell, styles.photo, sizeClass)} href="/photography" i={i}>
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
        <Link href="/activity">All activity</Link>
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
}

export default function GridHome({ initialActivity, initialPhotos }: Props): React.ReactNode {
  const { data: activity = initialActivity } = useSWR<PostListItem[]>(ACTIVITY_URL, fetcher, {
    fallbackData: initialActivity,
    revalidateOnFocus: false,
  });
  const { data: photoData = initialPhotos } = useSWR<Toot[]>(PHOTOS_URL, fetcher, {
    fallbackData: initialPhotos,
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
    .slice(0, 16);

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
    tiles.push(<PhotoTile i={i++} key={photos[0].id} photo={photos[0]} size="hero" />);
  }

  let p = 1;
  posts.forEach((post, n) => {
    if (n > 0 && n % PHOTO_EVERY === 0 && p < photos.length) {
      tiles.push(
        <PhotoTile i={i++} key={photos[p].id} photo={photos[p]} size={photoSize(photos[p], p)} />,
      );
      p++;
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

  useReveal(tiles.length);

  return (
    <>
      <Head title="Michael Knepprath" />
      <noscript>
        <style>{`.${styles.cell}{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <div className={styles.shell} data-page="grid">
        <div className={styles.grid}>{tiles}</div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  let initialActivity: PostListItem[] = [];
  let initialPhotos: Toot[] = [];

  try {
    const [activityRes, photosRes] = await Promise.all([
      fetch(`${BASE_URL}${ACTIVITY_URL}`),
      fetch(`${BASE_URL}${PHOTOS_URL}`),
    ]);
    if (activityRes.ok) {
      const data = await activityRes.json();
      if (Array.isArray(data)) initialActivity = data;
    }
    if (photosRes.ok) {
      const data = await photosRes.json();
      if (Array.isArray(data)) initialPhotos = data;
    }
  } catch {
    // SWR refetches client-side
  }

  return { props: { initialActivity, initialPhotos }, revalidate: 300 };
};
