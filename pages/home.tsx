import Head from "@core/head";
import Nav from "@core/nav";
import { Post, POST_MAP } from "@core/post";
import { fetcher } from "@lib/fetcher";
import { parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import styles from "./home.module.css";

const LINKS = [
  { label: "Writing", href: "/writing" },
  { label: "Photography", href: "/photography" },
  { label: "Films", href: "/films" },
  { label: "GitHub", href: "https://github.com/mknepprath" },
  { label: "Bluesky", href: "https://bsky.app/profile/mknepprath.com" },
  { label: "Mastodon", href: "https://mastodon.social/@mknepprath" },
  { label: "Letterboxd", href: "https://letterboxd.com/mknepprath" },
  { label: "Stats.fm", href: "https://stats.fm/mknepprath" },
];

export default function Home(): React.ReactNode {
  const { data: activity = [] } = useSWR<PostListItem[]>(
    `/api/v1/activity?max_results=50&min_rating=0`,
    fetcher,
  );

  const { data: photoData } = useSWR<Toot[]>("/api/v1/photos?limit=18", fetcher);
  const photos = (Array.isArray(photoData) ? photoData : [])
    .filter(
      (p) =>
        p.media_attachments?.length > 0 &&
        p.media_attachments[0].type === "image",
    )
    .slice(0, 9);

  const sorted = [...activity].sort(
    (a, b) => +parseISO(b.date) - +parseISO(a.date),
  );

  return (
    <>
      <Head title="mknepprath" />
      <Nav className={styles.nav} />

      <div className={styles.grid}>
        {/* Pinned: Identity */}
        <div className={`${styles.pinnedCard} ${styles.identityCard}`}>
          <div className={styles.identityName}>Michael Knepprath</div>
          <p className={styles.identityBio}>
            Designer &amp; developer. I make games, apps, and tools from
            Cleveland, OH.
          </p>
          <Link href="/about" className={styles.identityLink}>
            About me →
          </Link>
        </div>

        {/* Pinned: Links */}
        <div className={`${styles.pinnedCard} ${styles.linksCard}`}>
          <div className={styles.linksLabel}>Find me on</div>
          <div className={styles.linksList}>
            {LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={styles.linkItem}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Photography highlight — full-width strip */}
        {photos.length > 0 && (
          <div className={styles.photoStrip}>
            <div className={styles.photoStripHeader}>
              <span className={styles.photoStripLabel}>Photography</span>
              <Link href="/photography" className={styles.photoStripLink}>
                See all →
              </Link>
            </div>
            <div className={styles.photoMosaic}>
              {photos.map((photo) => {
                const attachment = photo.media_attachments[0];
                return (
                  <Link
                    key={photo.id}
                    href="/photography"
                    className={styles.photoCell}
                  >
                    <Image
                      alt={
                        attachment.description ||
                        photo.content?.replace(/<[^>]+>/g, "") ||
                        "photo"
                      }
                      src={attachment.url}
                      width={attachment.meta?.original?.width || 600}
                      height={attachment.meta?.original?.height || 600}
                      sizes="(max-width: 632px) 33vw, 200px"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Activity stream */}
        {sorted.map((post, index) => {
          const PostComponent = (post.type && POST_MAP[post.type]) || Post;
          return <PostComponent key={post.id} {...post} index={index} />;
        })}
      </div>
    </>
  );
}
