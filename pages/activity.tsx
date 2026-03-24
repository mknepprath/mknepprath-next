import Page from "@core/page";
import {
  BookPost,
  FilmPost,
  HighlightPost,
  MusicPost,
  PhotoPost,
  Post,
  RepoPost,
  RunPost,
  TootPost,
  TrophyPost,
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
              default:
                return <Post key={post.id} {...post} index={index} />;
            }
          })}

        {!activity.length && <div>What have I been up to...</div>}
      </article>
    </Page>
  );
}
