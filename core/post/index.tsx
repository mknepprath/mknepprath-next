import ActivityCard from "@core/activity-card";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import BookPost from "./BookPost";
import ChessPost from "./ChessPost";
import FilmPost from "./FilmPost";
import HighlightPost from "./HighlightPost";
import MusicPost from "./MusicPost";
import PhotoPost from "./PhotoPost";
import RepoPost from "./RepoPost";
import RobotPost from "./RobotPost";
import RunPost from "./RunPost";
import SkeetPost from "./SkeetPost";
import TootPost from "./TootPost";
import TrophyPost from "./TrophyPost";
import TweetPost from "./TweetPost";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const Post = ({
  action,
  date,
  id,
  image,
  index = 0,
  summary,
  title,
  type,
  url,
}: PostProps) => (
  <ActivityCard id={id} type={type || "POST"} index={index}>
    <Link href={`${url}`} className={styles.clipping}>
      {image ? (
        <div className={styles.clippingImage}>
          <Image
            alt={`cover image for ${title}`}
            src={image}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : null}
      <div className={styles.clippingBody}>
        <h3 className={styles.clippingHeadline}>{title}</h3>
        <div className={styles.clippingRule} />
        {summary ? (
          <p className={styles.clippingSummary}>{summary}</p>
        ) : null}
        <div className={styles.clippingDateline}>
          {action || "Published"} · {format(parseISO(date), "MMM d, yyyy")}
        </div>
      </div>
    </Link>
  </ActivityCard>
);

const POST_MAP: Record<string, React.ComponentType<PostListItem & { index?: number }>> = {
  FILM: FilmPost,
  TWEET: TweetPost,
  REPO: RepoPost,
  BOOK: BookPost,
  HIGHLIGHT: HighlightPost,
  TOOT: TootPost,
  SKEET: SkeetPost,
  PHOTO: PhotoPost,
  MUSIC: MusicPost,
  TROPHY: TrophyPost,
  RUN: RunPost,
  CHESS: ChessPost,
  ROBOT: RobotPost,
};

export {
  Post,
  POST_MAP,
  BookPost,
  ChessPost,
  FilmPost,
  HighlightPost,
  MusicPost,
  PhotoPost,
  RepoPost,
  RobotPost,
  RunPost,
  SkeetPost,
  TootPost,
  TrophyPost,
  TweetPost,
};
