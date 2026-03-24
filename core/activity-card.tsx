import styles from "./activity-card.module.css";

interface ActivityCardProps {
  id: string;
  type?: string;
  index: number;
  children: React.ReactNode;
}

const typeClassMap: Record<string, string> = {
  FILM: styles.film,
  BOOK: styles.book,
  MUSIC: styles.music,
  TOOT: styles.toot,
  REPO: styles.repo,
  HIGHLIGHT: styles.highlight,
  PHOTO: styles.photo,
  TROPHY: styles.trophy,
  TWEET: styles.tweet,
  POST: styles.post,
  RUN: styles.run,
  GAME: styles.game,
};

export default function ActivityCard({
  type,
  children,
}: ActivityCardProps) {
  const typeClass = type ? typeClassMap[type] || "" : "";

  return (
    <div className={`${styles.card} ${typeClass}`}>
      {children}
    </div>
  );
}
