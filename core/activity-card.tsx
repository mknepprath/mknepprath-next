import { useSpring, animated } from "react-spring";
import { useCallback, useEffect, useRef, useState } from "react";
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

const STYLED_TYPES = new Set(["RUN", "FILM", "REPO", "MUSIC", "TOOT", "POST", "BOOK", "PHOTO", "CHESS", "ROBOT"]);
const GLOSSY_TYPES = new Set(["MUSIC", "PHOTO"]);

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
  CHESS: styles.chess,
  ROBOT: styles.robot,
};

export default function ActivityCard({
  id,
  type,
  index,
  children,
}: ActivityCardProps) {
  const isStyled = type ? STYLED_TYPES.has(type) : false;
  const isGlossy = type ? GLOSSY_TYPES.has(type) : false;
  const baseRotation = isStyled ? hashToRotation(id) : 0;
  const slideFrom = index % 2 === 0 ? -60 : 60;
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [glossPos, setGlossPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Gyroscope for mobile glossy effect
  useEffect(() => {
    if (!isGlossy || !("ontouchstart" in window)) return;

    const handler = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const x = Math.max(0, Math.min(100, 50 + e.gamma * 1.5));
      const y = Math.max(0, Math.min(100, 50 + (e.beta - 45) * 1.5));
      setGlossPos({ x, y });
    };

    const doe = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof doe.requestPermission === "function") {
      const req = () => {
        doe.requestPermission!().then((r) => {
          if (r === "granted") {
            window.addEventListener("deviceorientation", handler, { passive: true });
          }
        });
        window.removeEventListener("touchstart", req);
      };
      window.addEventListener("touchstart", req, { once: true });
    } else if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handler, { passive: true });
    }

    return () => window.removeEventListener("deviceorientation", handler);
  }, [isGlossy]);

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
  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    if (isGlossy) setGlossPos({ x: 50, y: 50 });
  }, [isGlossy]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isGlossy) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setGlossPos({ x, y });
    },
    [isGlossy],
  );

  const typeClass = type ? typeClassMap[type] || "" : "";

  return (
    <animated.div
      className={`${styles.card} ${typeClass} ${isGlossy ? styles.glossy : ""}`}
      ref={ref}
      style={isStyled ? spring : undefined}
      onMouseEnter={isStyled ? handleMouseEnter : undefined}
      onMouseLeave={isStyled ? handleMouseLeave : undefined}
      onMouseMove={isGlossy ? handleMouseMove : undefined}
    >
      {children}
      {isGlossy && (
        <div
          className={styles.glossHighlight}
          style={{
            background: `radial-gradient(circle at ${glossPos.x}% ${glossPos.y}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 30%, transparent 60%)`,
          }}
        />
      )}
    </animated.div>
  );
}
