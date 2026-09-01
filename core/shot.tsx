import React, { useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./shot.module.css";

interface Props {
  description: string;
  href: string;
  imgSrc?: string;
  title: string;
}

export default function Shot({
  description,
  href,
  imgSrc,
  title,
}: Props): React.JSX.Element {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    el.style.setProperty("--rx", `${(x - 50) / 50 * 8}deg`);
    el.style.setProperty("--ry", `${(y - 50) / 50 * -8}deg`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <a
      className={styles.card}
      href={href}
      key={title}
      ref={ref}
      rel="noopener noreferrer"
      target="_blank"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {imgSrc ? (
        <Image
          alt={title}
          className={styles.img}
          src={imgSrc}
          width={400}
          height={300}
          style={{ width: "100%", height: "auto" }}
        />
      ) : null}
      <div className={styles.shine} />
      <div className={styles.body}>
        <h3>
          {title} <span className={styles.arrow}>&rarr;</span>
        </h3>
        <p>{description}</p>
      </div>
    </a>
  );
}
