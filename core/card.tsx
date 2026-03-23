import React, { useRef, useCallback } from "react";
import { useSpring, animated, to } from "react-spring";
import styles from "./card.module.css";

interface Props {
  description: string;
  href: string;
  imgSrc?: string;
  title: string;
}

const TILT_MAX = 8; // degrees
const SCALE_HOVER = 1.02;
const SHADOW_HOVER = 12;

export default function Card({
  description,
  href,
  imgSrc,
  title,
}: Props): React.JSX.Element {
  const ref = useRef<HTMLAnchorElement>(null);

  const [spring, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    shadow: 2,
    config: { mass: 1, tension: 350, friction: 20 },
  }));

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0-1
      const y = (e.clientY - rect.top) / rect.height; // 0-1
      api.start({
        rotateX: (0.5 - y) * TILT_MAX,
        rotateY: (x - 0.5) * TILT_MAX,
        scale: SCALE_HOVER,
        shadow: SHADOW_HOVER,
      });
    },
    [api],
  );

  const handleMouseLeave = useCallback(() => {
    api.start({ rotateX: 0, rotateY: 0, scale: 1, shadow: 2 });
  }, [api]);

  return (
    <animated.a
      className={styles.card}
      href={href}
      key={title}
      ref={ref}
      rel="noopener noreferrer"
      target="_blank"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: to(
          [spring.rotateX, spring.rotateY, spring.scale],
          (rx, ry, s) =>
            `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`,
        ),
        boxShadow: spring.shadow.to(
          (s) => `0px ${s}px ${s * 2}px rgba(0, 0, 0, ${0.08 + s * 0.005})`,
        ),
      }}
    >
      {imgSrc ? <img alt={title} className={styles.img} src={imgSrc} /> : null}
      <div>
        <h3>
          <span dangerouslySetInnerHTML={{ __html: title }} />{" "}
          <span className={styles.arrow}>&rarr;</span>
        </h3>
        <p>{description}</p>
      </div>
    </animated.a>
  );
}
