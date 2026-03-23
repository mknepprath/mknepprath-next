import React, { useEffect, useState } from "react";
import classnames from "classnames";

import styles from "./hero.module.css";

const HELLO = "Hello!";
const BODY = "I design & develop things for the internet.";
const CHAR_DELAY = 50;
const PAUSE_AFTER_HELLO = 300;

interface Props {
  className?: string;
  onComplete?: () => void;
}

export default function Hero({ className, onComplete }: Props): React.JSX.Element {
  const [helloLen, setHelloLen] = useState(0);
  const [bodyLen, setBodyLen] = useState(0);
  const [phase, setPhase] = useState<"hello" | "pause" | "body" | "done">("hello");

  useEffect(() => {
    if (phase === "hello") {
      if (helloLen < HELLO.length) {
        const t = setTimeout(() => setHelloLen(helloLen + 1), CHAR_DELAY);
        return () => clearTimeout(t);
      }
      setPhase("pause");
    } else if (phase === "pause") {
      const t = setTimeout(() => setPhase("body"), PAUSE_AFTER_HELLO);
      return () => clearTimeout(t);
    } else if (phase === "body") {
      if (bodyLen < BODY.length) {
        const t = setTimeout(() => setBodyLen(bodyLen + 1), CHAR_DELAY);
        return () => clearTimeout(t);
      }
      setPhase("done");
      onComplete?.();
    }
  }, [phase, helloLen, bodyLen, onComplete]);

  return (
    <div className={classnames("container", styles.hero, className)}>
      <h1 className={styles.greeting}>
        <a
          className={styles.link}
          href="https://youtu.be/5-CEGCXDVgI"
          rel="noopener noreferrer"
          target="_blank"
        >
          {HELLO.slice(0, helloLen)}
        </a>
        {phase !== "hello" && (
          <>
            <br />
            {BODY.slice(0, bodyLen)}
          </>
        )}
        <span className={styles.cursor} />
      </h1>
    </div>
  );
}
