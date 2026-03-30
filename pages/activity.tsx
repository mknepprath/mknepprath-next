import { useCallback, useEffect, useRef, useState } from "react";
import Page from "@core/page";
import { Post, POST_MAP } from "@core/post";
import { parseISO } from "date-fns";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((response) => response.json());

const PAGE_SIZE = 30;

export default function Activity(): React.ReactNode {
  const { data: activity = [] } = useSWR<PostListItem[]>(
    `/api/v1/activity?max_results=100&min_rating=0`,
    fetcher,
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
