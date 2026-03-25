import Card from "@core/card";
import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
import Parallax from "@core/parallax";
import {
  BookPost,
  ChessPost,
  FilmPost,
  HighlightPost,
  MusicPost,
  PhotoPost,
  Post,
  RepoPost,
  RobotPost,
  RunPost,
  TootPost,
  TrophyPost,
  TweetPost,
} from "@core/post";
import Shot from "@core/shot";
import { projectLinks } from "@data/links";
import classnames from "classnames";
import { format, parseISO } from "date-fns";
import fetch from "isomorphic-unfetch";
import { GetStaticProps } from "next";
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
    { fallbackData: initialActivity },
  );
  const { data: shots = initialShots } = useSWR<Shot[]>(
    `/api/v1/dribbble`,
    fetcher,
    { fallbackData: initialShots },
  );

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
            switch (post.type) {
              case "FILM":
                return <FilmPost key={post.id} {...post} index={index} />;
              case "TWEET":
                return <TweetPost key={post.id} {...post} index={index} />;
              case "REPO":
                return <RepoPost key={post.id} {...post} index={index} />;
              case "BOOK":
                return <BookPost key={post.id} {...post} index={index} />;
              case "HIGHLIGHT":
                return <HighlightPost key={post.id} {...post} index={index} />;
              case "TOOT":
                return <TootPost key={post.id} {...post} index={index} />;
              case "PHOTO":
                return <PhotoPost key={post.id} {...post} index={index} />;
              case "MUSIC":
                return <MusicPost key={post.id} {...post} index={index} />;
              case "TROPHY":
                return <TrophyPost key={post.id} {...post} index={index} />;
              case "RUN":
                return <RunPost key={post.id} {...post} index={index} />;
              case "CHESS":
                return <ChessPost key={post.id} {...post} index={index} />;
              case "ROBOT":
                return <RobotPost key={post.id} {...post} index={index} />;
              case "SKEET":
                return <TootPost key={post.id} {...post} index={index} />;
              default:
                return <Post key={post.id} {...post} index={index} />;
            }
          })}

        {!activity.length && <div>What have I been up to...</div>}

        <div className={styles.projectContainer} id="projects">
          <h2>Projects</h2>
          <div className={styles.cardContainer}>
            {projectLinks.map(({ description, href, imgSrc, title }) => (
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

