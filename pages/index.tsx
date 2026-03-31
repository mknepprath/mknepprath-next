import Card from "@core/card";
import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
import Parallax from "@core/parallax";
import { Post, POST_MAP } from "@core/post";
import Shot from "@core/shot";
import { projectLinks } from "@data/links";
import classnames from "classnames";
import { format, parseISO } from "date-fns";
import fetch from "isomorphic-unfetch";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import styles from "./index.module.css";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

interface Props {
  initialActivity: PostListItem[];
  initialShots: Shot[];
}

export default function Home({ initialActivity, initialShots }: Props): React.ReactNode {
  const { data: activity = initialActivity } = useSWR<PostListItem[]>(
    `/api/v1/activity`,
    fetcher,
    { fallbackData: initialActivity, revalidateOnFocus: false },
  );
  const { data: shots = initialShots } = useSWR<Shot[]>(
    `/api/v1/dribbble`,
    fetcher,
    { fallbackData: initialShots, revalidateOnFocus: false },
  );

  const githubRepos = projectLinks
    .filter((p) => p.githubRepo)
    .map((p) => p.githubRepo)
    .join(",");
  const { data: repoData } = useSWR<Record<string, { pushedAt: string }>>(
    githubRepos ? `/api/v1/github/projects?repos=${githubRepos}` : null,
    fetcher,
  );

  const { data: photoData } = useSWR<Toot[]>(
    "/api/v1/photos?limit=24",
    fetcher,
  );
  const photos = (Array.isArray(photoData) ? photoData : [])
    .filter(
      (p: Toot) =>
        p.media_attachments?.length > 0 &&
        p.media_attachments[0].type === "image",
    )
    .slice(0, 4);

  const sortedProjects = [...projectLinks].sort((a, b) => {
    const aDate = a.githubRepo && repoData?.[a.githubRepo]?.pushedAt;
    const bDate = b.githubRepo && repoData?.[b.githubRepo]?.pushedAt;
    if (aDate && bDate) return +new Date(bDate) - +new Date(aDate);
    if (aDate) return -1;
    if (bDate) return 1;
    return 0;
  });

  return (
    <>
      <Head />
      <Nav className={classnames("container", styles.nav)} />

      <Parallax />

      <div className={classnames("container", styles.container)}>
        <h2 className={styles.activityHeading}>Activity</h2>
        {activity
          .sort((a, b) => +parseISO(b.date) - +parseISO(a.date))
          .map((post, index) => {
            const PostComponent = (post.type && POST_MAP[post.type]) || Post;
            return <PostComponent key={post.id} {...post} index={index} />;
          })}

        {!activity.length && <div>What have I been up to...</div>}

        {photos.length > 0 && (
          <div className={styles.projectContainer}>
            <h2>
              <Link href="/photography" className={styles.sectionLink}>Photography</Link>
            </h2>
            <div className={styles.photoGrid}>
              {photos.map((photo: Toot) => (
                <Link key={photo.id} href="/photography" className={styles.photoCell}>
                  <Image
                    alt={
                      photo.media_attachments[0].description ||
                      photo.content?.replace(/<[^>]+>/g, "") ||
                      "photo"
                    }
                    src={photo.media_attachments[0].url}
                    width={photo.media_attachments[0].meta?.original?.width || 400}
                    height={photo.media_attachments[0].meta?.original?.height || 300}
                    sizes="(max-width: 632px) 50vw, 300px"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className={styles.projectContainer} id="projects">
          <h2>Projects</h2>
          <div className={styles.cardContainer}>
            {sortedProjects.map(({ description, href, imgSrc, title }) => (
              <Card
                description={description}
                href={href}
                imgSrc={imgSrc}
                key={title}
                title={title}
              />
            ))}
          </div>
        </div>

        {shots?.length ? (
          <div className={styles.projectContainer}>
            <h2>Illustrations</h2>
            <div className={styles.cardContainer}>
              {shots?.map(({ html_url, images, published_at, title }) => (
                <Shot
                  description={format(parseISO(published_at), "MMMM d, yyyy")}
                  href={html_url}
                  imgSrc={images.normal}
                  key={title}
                  title={title}
                />
              ))}
            </div>
            {/* TODO: Make this look good. */}
            {/* <A href="https://dribbble.com/mknepprath">See more</A> */}
          </div>
        ) : null}

        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  let initialActivity: PostListItem[] = [];
  let initialShots: Shot[] = [];

  try {
    const [activityRes, shotsRes] = await Promise.all([
      fetch(`${BASE_URL}/api/v1/activity`),
      fetch(`${BASE_URL}/api/v1/dribbble`),
    ]);
    if (activityRes.ok) {
      const data = await activityRes.json();
      if (Array.isArray(data)) initialActivity = data;
    }
    if (shotsRes.ok) {
      const data = await shotsRes.json();
      if (Array.isArray(data)) initialShots = data;
    }
  } catch {
    // Fall back to empty arrays — SWR will retry client-side
  }

  return {
    props: { initialActivity, initialShots },
    revalidate: 300, // Regenerate every 5 minutes
  };
};

