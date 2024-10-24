import Page from "@core/page";
import {
  BookPost,
  FilmPost,
  HighlightPost,
  MusicPost,
  Post,
  RepoPost,
  TootPost,
  TweetPost,
} from "@core/post";
import { parseISO } from "date-fns";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

export default function Home(): React.ReactNode {
  const { data: activity = [] } = useSWR<PostListItem[]>(
    `/api/v1/activity?max_results=100&min_rating=0`,
    fetcher,
  );

  return (
    <Page title="Activity">
      <article data-cy="activity-page">
        <header>
          <h1>Activity</h1>
        </header>

        {activity
          // The `sort` method can be conveniently used with function expressions:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
          .sort((a, b) => +parseISO(b.date) - +parseISO(a.date))
          .map((post) => {
            switch (post.type) {
              case "FILM":
                return <FilmPost key={post.id} {...post} />;
              case "TWEET":
                return <TweetPost key={post.id} {...post} />;
              case "REPO":
                return <RepoPost key={post.id} {...post} />;
              case "BOOK":
                return <BookPost key={post.id} {...post} />;
              case "HIGHLIGHT":
                return <HighlightPost key={post.id} {...post} />;
              case "TOOT":
                return <TootPost key={post.id} {...post} />;
              case "MUSIC":
                return <MusicPost key={post.id} {...post} />;
              default:
                return <Post key={post.id} {...post} />;
            }
          })}

        {!activity.length && <div>What have I been up to...</div>}
      </article>
    </Page>
  );
}
