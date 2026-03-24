import { useSpring, animated } from "react-spring";
import { useCallback, useEffect, useRef, useState } from "react";
import { playPop } from "@lib/sounds";
import styles from "./activity-card.module.css";

interface ActivityCardProps {
  id: string;
  type?: string;
  index: number;
  children: React.ReactNode;
}

function hashToRotation(id: string): number {
  let hash = 5381;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) + hash + id.charCodeAt(i)) | 0;
  }
  return ((Math.abs(hash) % 1000) / 1000) * 3 - 1.5;
}

const STYLED_TYPES = new Set(["RUN", "FILM", "REPO", "MUSIC", "TOOT", "POST", "BOOK", "PHOTO"]);

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
  const slideFrom = index % 2 === 0 ? -60 : 60;
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (isStyled) playPop();
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const spring = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible
      ? hovered
        ? `translateX(0px) rotate(0deg) translateY(-2px)`
        : `translateX(0px) rotate(${baseRotation}deg) translateY(0px)`
      : `translateX(${slideFrom}px) rotate(${baseRotation * 3}deg) translateY(10px)`,
    config: { mass: 1, tension: 200, friction: 24 },
  });

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  const typeClass = type ? typeClassMap[type] || "" : "";

  return (
    <animated.div
      className={`${styles.card} ${typeClass}`}
      ref={ref}
      style={isStyled ? spring : undefined}
      onMouseEnter={isStyled ? handleMouseEnter : undefined}
      onMouseLeave={isStyled ? handleMouseLeave : undefined}
    >
      {children}
    </animated.div>
  );
}
