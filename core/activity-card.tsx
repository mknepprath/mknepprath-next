import { useSpring, animated } from "react-spring";
import { useCallback, useState } from "react";
import styles from "./activity-card.module.css";

interface ActivityCardProps {
  id: string;
  type?: string;
  index: number;
  children: React.ReactNode;
}

/**
 * Simple deterministic hash from a string to a number in [-1, 1].
 * Used to derive a stable rotation per card without Math.random().
 */
function hashToRotation(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  // Map to [-3, 3] degrees
  return ((hash % 600) / 600) * 6 - 3;
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
  id,
  type,
  index,
  children,
}: ActivityCardProps) {
  const baseRotation = hashToRotation(id);
  const [hovered, setHovered] = useState(false);

  const spring = useSpring({
    from: { opacity: 0, transform: `rotate(${baseRotation * 2}deg) translateY(20px)` },
    to: {
      opacity: 1,
      transform: hovered
        ? `rotate(0deg) translateY(-2px)`
        : `rotate(${baseRotation}deg) translateY(0px)`,
    },
    delay: Math.min(index * 50, 400),
    config: { mass: 1, tension: 280, friction: 22 },
  });

  const shadowSpring = useSpring({
    shadow: hovered ? 14 : 4,
    config: { mass: 1, tension: 300, friction: 20 },
  });

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  const typeClass = type ? typeClassMap[type] || "" : "";

  return (
    <animated.div
      className={`${styles.card} ${typeClass}`}
      style={{
        ...spring,
        boxShadow: shadowSpring.shadow.to(
          (s) =>
            `1px ${s * 0.5}px ${s}px rgba(0, 0, 0, ${0.08 + s * 0.004})`,
        ),
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </animated.div>
  );
}
