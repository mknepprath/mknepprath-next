import { useCallback, useEffect, useRef, useState } from "react";
import Page from "@core/page";
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
import { parseISO } from "date-fns";
import fetch from "isomorphic-unfetch";
import { GetStaticProps } from "next";
import useSWR from "swr";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://mknepprath.com"
    : "http://localhost:3000";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

const PAGE_SIZE = 30;

const POST_MAP: Record<string, React.ComponentType<PostListItem & { index?: number }>> = {
  FILM: FilmPost,
  TWEET: TweetPost,
  REPO: RepoPost,
  BOOK: BookPost,
  HIGHLIGHT: HighlightPost,
  TOOT: TootPost,
  SKEET: TootPost,
  PHOTO: PhotoPost,
  MUSIC: MusicPost,
  TROPHY: TrophyPost,
  RUN: RunPost,
  CHESS: ChessPost,
  ROBOT: RobotPost,
};

interface Props {
  initialActivity: PostListItem[];
}

export default function Home({ initialActivity }: Props): React.ReactNode {
  const { data: activity = initialActivity } = useSWR<PostListItem[]>(
    `/api/v1/activity?max_results=100&min_rating=0`,
    fetcher,
    { fallbackData: initialActivity },
  );

  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const sorted = activity
    .sort((a, b) => +parseISO(b.date) - +parseISO(a.date));

  const loadMore = useCallback(() => {
    setVisible((v) => Math.min(v + PAGE_SIZE, sorted.length));
  }, [sorted.length]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <Page title="Activity">
      <article data-cy="activity-page">
        <header>
          <h1>Activity</h1>
        </header>

        {sorted.slice(0, visible).map((post, index) => {
          const PostComponent = (post.type && POST_MAP[post.type]) || Post;
          return <PostComponent key={post.id} {...post} index={index} />;
        })}

        {!activity.length && <div>What have I been up to...</div>}

        {visible < sorted.length && (
          <div ref={sentinelRef} style={{ height: 1 }} />
        )}
      </article>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  let initialActivity: PostListItem[] = [];

  try {
    const res = await fetch(
      `${BASE_URL}/api/v1/activity?max_results=100&min_rating=0`,
    );
    if (res.ok) initialActivity = await res.json();
  } catch {
    // SWR will retry client-side
  }

  return {
    props: { initialActivity },
    revalidate: 300,
  };
};
