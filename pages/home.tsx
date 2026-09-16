import Head from "@core/head";
import { decodePolyline } from "@core/strava-map";
import { fetcher } from "@lib/fetcher";
import fetch from "isomorphic-unfetch";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import styles from "./home.module.css";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

const ACTIVITY_URL = "/api/v1/activity?max_results=50&min_rating=0";
const PHOTOS_URL = "/api/v1/photos?limit=18";
const PHOTO_EVERY = 4;

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

// Formatted in UTC so server and client render the same string.
const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

const stripTags = (html = "") =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/(https?:\/\/|www\.)\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();

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
  size: "hero" | "feature" | "portrait" | "landscape";
}) {
  const media = photo.media_attachments[0];
  const alt =
    media.description || stripTags(photo.content) || "Photograph by Michael Knepprath";
  const sizeClass = {
    hero: cx(styles.w2md, styles.h2),
    feature: cx(styles.w2, styles.h2),
    portrait: styles.h2,
    landscape: styles.w2,
  }[size];
  const sizes = {
    hero: "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 34vw",
    feature: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw",
    portrait: "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw",
    landscape: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw",
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
              <h3 className={cx(styles.title, styles.tSplit, styles.clamp3)}>
                {mainTitle || title}
              </h3>
              {series ? <span className={cx(styles.mono, styles.series)}>{series}</span> : null}
              {!series && summary ? (
                <p className={cx(styles.summary, styles.clamp2)}>{stripTags(summary)}</p>
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
            {summary ? (
              <p className={cx(styles.summary, styles.clamp2)}>{summary}</p>
            ) : null}
          </div>
        </Tile>
      );

    case "ROBOT":
    case "TOOT":
    case "SKEET": {
      const kind = { ROBOT: styles.robot, TOOT: styles.toot, SKEET: styles.skeet }[type];
      const label = { ROBOT: "Robot MK", TOOT: "Mastodon", SKEET: "Bluesky" }[type];
      return (
        <Tile className={cx(styles.cell, styles.w2, kind)} href={url} i={i}>
          <Meta date={date} label={label} />
          <h3 className={styles.quote}>{stripTags(title)}</h3>
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
            <h2 className={cx(styles.title, styles.tLg, styles.clamp3)}>{title}</h2>
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
          <h3 className={cx(styles.title, styles.tSm, styles.clamp2)}>{title}</h3>
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
            <Meta date={date} label={type === "MUSIC" ? "Listening" : "Playing"} />
            <h3 className={cx(styles.title, styles.tSm, styles.clamp2)}>{title}</h3>
          </div>
        </Tile>
      );

    case "HIGHLIGHT":
      return (
        <Tile className={cx(styles.cell, styles.highlight, styles.w2)} href={url} i={i}>
          <Meta date={date} label="Highlight" />
          <div>
            <p className={styles.excerpt}>“{title}”</p>
            <span className={cx(styles.mono, styles.sub)}>{summary}</span>
          </div>
        </Tile>
      );

    default:
      return (
        <Tile className={cx(styles.cell, styles.repo)} href={url} i={i}>
          <Meta date={date} label={action || type || "Update"} />
          <h3 className={cx(styles.title, styles.tSm, styles.clamp3)}>{stripTags(title)}</h3>
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

  const posts = (Array.isArray(activity) ? activity : [])
    .filter((post) => post.type !== "PHOTO")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const photos = (Array.isArray(photoData) ? photoData : [])
    .filter((p) => p.media_attachments?.[0]?.type === "image")
    .slice(0, 12);

  const photoSize = (photo: Toot, n: number) => {
    if (n % 3 === 0) return "feature" as const;
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

  tiles.push(<Footer i={i++} key="footer" />);

  return (
    <>
      <Head title="Michael Knepprath" />
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
