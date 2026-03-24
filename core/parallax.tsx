import React, { useCallback, useEffect, useRef, useState } from "react";
import Hero from "@core/hero";
import Layer from "@core/layer";

import layerStyles from "./layer.module.css";
import styles from "./parallax.module.css";

const CAT_INDEX = 7; // index of layer "5" (the cat) in LAYERS

const LAYERS = [
  { id: "0", speed: 0.02 },
  { id: "1", speed: 0.11 },
  { id: "2", speed: 0.26 },
  { id: "3b", speed: 0.39 },
  { id: "3", speed: 0.49 },
  { id: "7", speed: 0.49 },
  { id: "4", speed: 0.69 },
  { id: "5", speed: 0.79 },
] as const;

const MOBILE_QUERY = "(max-width: 632px)";

export default function Parallax(): React.JSX.Element {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef(0);
  const [catPhase, setCatPhase] = useState<"hidden" | "animating" | "done" | "scrolledAway" | "returning">(
    "hidden",
  );

  const setLayerRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      layerRefs.current[index] = el;
    },
    [],
  );

  const handleTypingComplete = useCallback(() => {
    setTimeout(() => setCatPhase("animating"), 400);
  }, []);


  const CAT_HIDE_THRESHOLD = 150;

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    if (mq.matches) return;

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const y = window.pageYOffset;
        for (let i = 0; i < LAYERS.length; i++) {
          if (i === CAT_INDEX && catPhase !== "done") continue;
          const el = layerRefs.current[i];
          if (el) {
            el.style.transform = `translate3d(0px,${y * -LAYERS[i].speed}px,0px)`;
          }
        }

        // Hide cat when scrolled down, show when back near top
        if (catPhase === "done" && y > CAT_HIDE_THRESHOLD) {
          setCatPhase("scrolledAway");
        } else if (catPhase === "scrolledAway" && y <= 20) {
          setCatPhase("returning");
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [catPhase]);

  return (
    <div className={styles.keyart} id="parallax">
      {LAYERS.map((layer, i) => (
        <Layer
          key={layer.id}
          id={layer.id}
          ref={setLayerRef(i)}
          className={
            i === CAT_INDEX
              ? catPhase === "hidden"
                ? styles.catHidden
                : catPhase === "animating" || catPhase === "returning"
                  ? styles.catVisible
                  : catPhase === "scrolledAway"
                    ? styles.catHiding
                    : undefined
              : undefined
          }
          onAnimationEnd={
            i === CAT_INDEX
              ? () => {
                  if (catPhase === "animating" || catPhase === "returning") {
                    setCatPhase("done");
                  }
                }
              : undefined
          }
        >
          {layer.id === "7" ? (
            <Hero className={styles.hero} onComplete={handleTypingComplete} />
          ) : undefined}
        </Layer>
      ))}
      <div className={layerStyles.keyartLayer} id="keyart-6" />
    </div>
  );
}
