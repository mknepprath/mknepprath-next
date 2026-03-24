import { useSpring, animated } from "react-spring";
import { useCallback, useState } from "react";
import styles from "./activity-card.module.css";

interface ActivityCardProps {
  id: string;
  type?: string;
  index: number;
  children: React.ReactNode;
}

function hashToRotation(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return ((hash % 600) / 600) * 3 - 1.5;
}

const STYLED_TYPES = new Set(["RUN", "FILM"]);

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
  id,
  type,
  index,
  children,
}: ActivityCardProps) {
  const isStyled = type ? STYLED_TYPES.has(type) : false;
  const baseRotation = isStyled ? hashToRotation(id) : 0;
  const [hovered, setHovered] = useState(false);

  const spring = useSpring({
    from: isStyled
      ? { opacity: 0, transform: `rotate(${baseRotation * 2}deg) translateY(16px)` }
      : { opacity: 1, transform: "none" },
    to: {
      opacity: 1,
      transform: isStyled
        ? hovered
          ? "rotate(0deg) translateY(-2px)"
          : `rotate(${baseRotation}deg) translateY(0px)`
        : "none",
    },
    delay: isStyled ? Math.min(index * 60, 400) : 0,
    config: { mass: 1, tension: 280, friction: 22 },
  });

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  const typeClass = type ? typeClassMap[type] || "" : "";

  return (
    <animated.div
      className={`${styles.card} ${typeClass}`}
      style={isStyled ? spring : undefined}
      onMouseEnter={isStyled ? handleMouseEnter : undefined}
      onMouseLeave={isStyled ? handleMouseLeave : undefined}
    >
      {children}
    </animated.div>
  );
}
