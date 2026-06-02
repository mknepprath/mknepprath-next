import ActivityCard from "@core/activity-card";
import { format, parseISO } from "date-fns";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const ChessPost = ({
  action,
  date,
  id,
  index = 0,
  summary,
  title,
  url,
}: PostProps) => {
  const parts: Record<string, string> = {};
  if (summary) {
    summary.split(" · ").forEach((part) => {
      const [key, ...rest] = part.split(": ");
      if (key && rest.length) parts[key.trim()] = rest.join(":").trim();
    });
  }

  let circleHash = 0;
  for (let i = 0; i < id.length; i++) circleHash = ((circleHash << 5) + circleHash + id.charCodeAt(i)) | 0;
  const circleRotate = (Math.abs(circleHash) % 20) - 10;

  const isWin = action?.startsWith("Won");
  const isLoss = action?.startsWith("Lost");
  const resultClass = isWin
    ? styles.chessWin
    : isLoss
      ? styles.chessLoss
      : styles.chessDraw;

  return (
    <ActivityCard id={id} type="CHESS" index={index}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={`${styles.chessCard} ${resultClass}`}
      >
        <div className={styles.chessHeader}>
          <div className={styles.chessHeaderLeft}>
            <span className={styles.chessPiece}>♚</span>
            <span className={styles.chessTimeClass}>
              {parts["Rating"] ? `RATED ${parts["Rating"]}` : "CHESS"}
            </span>
          </div>
          <span className={styles.chessDate}>
            {format(parseISO(date), "MMM d, yyyy")}
          </span>
        </div>

        <div className={styles.chessRule} />

        <div className={styles.chessMatch}>
          <span className={`${styles.chessPlayer} ${isWin ? styles.chessCircled : ""}`}>
            mknepprath
            {isWin && (
              <svg
                className={styles.chessCircleSvg}
                viewBox="0 0 200 80"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `rotate(${circleRotate}deg)` }}
              >
                <path
                  className={styles.chessCircle}
                  d="M 40 12 C 70 4, 140 2, 170 14 C 192 24, 196 42, 178 56 C 156 70, 110 76, 60 68 C 24 62, 6 44, 12 28 C 16 18, 28 13, 44 14"
                  fill="none"
                />
              </svg>
            )}
          </span>
          <div className={styles.chessCenter}>
            <span className={styles.chessResult}>
              {isWin ? "WIN" : isLoss ? "LOSS" : "DRAW"}
            </span>
            <div className={styles.chessMeta}>
              {parts["Accuracy"] && (
                <span>{parts["Accuracy"]} acc</span>
              )}
              {parts["Accuracy"] && <span>·</span>}
              <span>{summary?.split(" · ").pop()}</span>
            </div>
          </div>
          <span className={`${styles.chessPlayer} ${styles.chessOpponent} ${isLoss ? styles.chessCircled : ""}`}>
            {title}
            {isLoss && (
              <svg
                className={styles.chessCircleSvg}
                viewBox="0 0 200 80"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `rotate(${circleRotate}deg)` }}
              >
                <path
                  className={styles.chessCircle}
                  d="M 40 12 C 70 4, 140 2, 170 14 C 192 24, 196 42, 178 56 C 156 70, 110 76, 60 68 C 24 62, 6 44, 12 28 C 16 18, 28 13, 44 14"
                  fill="none"
                />
              </svg>
            )}
          </span>
        </div>
      </a>
    </ActivityCard>
  );
};

export default ChessPost;
