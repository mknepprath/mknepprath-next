import React, { useEffect, useRef } from "react";

import styles from "./reading-progress.module.css";

export default function ReadingProgress(): React.JSX.Element {
  const barRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const el = barRef.current;
        if (!el) return;
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        el.style.width = `${progress}%`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <div ref={barRef} className={styles.bar} />;
}
