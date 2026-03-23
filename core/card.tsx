import React, { useRef, useCallback, useEffect, useState } from "react";
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
const GYRO_TILT_MAX = 6;

// Clamp a value between -max and max
function clamp(val: number, max: number) {
  return Math.max(-max, Math.min(max, val));
}

// Shared gyroscope state — one listener for all cards
let gyroListenerAttached = false;
let gyroX = 0; // front-back tilt mapped to rotateX
let gyroY = 0; // left-right tilt mapped to rotateY
const gyroSubscribers = new Set<() => void>();

function initGyro() {
  if (gyroListenerAttached) return;
  gyroListenerAttached = true;

  window.addEventListener(
    "deviceorientation",
    (e) => {
      if (e.beta == null || e.gamma == null) return;
      // beta: front-back tilt (-180 to 180), gamma: left-right (-90 to 90)
      // Normalize assuming phone held ~upright (beta ~60-90)
      gyroX = clamp((e.beta - 45) * 0.15, GYRO_TILT_MAX);
      gyroY = clamp(e.gamma * 0.15, GYRO_TILT_MAX);
      gyroSubscribers.forEach((fn) => fn());
    },
    { passive: true },
  );
}

function useGyroTilt() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    // Only use gyro on touch devices
    if (!("ontouchstart" in window)) return;

    // iOS 13+ requires permission
    const doe = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<string>;
    };
    if (typeof doe.requestPermission === "function") {
      // Permission will be requested on first user interaction
      const requestOnTouch = () => {
        doe.requestPermission!().then((result) => {
          if (result === "granted") {
            initGyro();
            setSupported(true);
          }
        });
        window.removeEventListener("touchstart", requestOnTouch);
      };
      window.addEventListener("touchstart", requestOnTouch, { once: true });
    } else if ("DeviceOrientationEvent" in window) {
      initGyro();
      setSupported(true);
    }
  }, []);

  return supported;
}

export default function Card({
  description,
  href,
  imgSrc,
  title,
}: Props): React.JSX.Element {
  const ref = useRef<HTMLAnchorElement>(null);
  const gyroSupported = useGyroTilt();

  const [spring, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    shadow: 2,
    config: { mass: 1, tension: 350, friction: 20 },
  }));

  // Subscribe to gyroscope updates
  useEffect(() => {
    if (!gyroSupported) return;

    const update = () => {
      api.start({ rotateX: gyroX, rotateY: gyroY });
    };

    gyroSubscribers.add(update);
    return () => {
      gyroSubscribers.delete(update);
    };
  }, [gyroSupported, api]);

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
