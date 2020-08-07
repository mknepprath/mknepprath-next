// Totally borrowed from a react-spring demo: https://codesandbox.io/embed/j0y0vpz59
import React from "react";
import { useSprings, animated, to } from "react-spring";
import { useDrag } from "react-use-gesture";

import styles from "./photo-stack.module.css";

// TODO: Could eventually get these from Instagram.
const photos = [
  "/assets/about-1.jpg",
  "/assets/about-2.jpg",
  "/assets/about-3.jpg",
  "/assets/about-4.jpg",
  "/assets/about-5.jpg",
  "/assets/about-6.jpg",
];

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const into = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 }); //  eslint-disable-line no-unused-vars
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const transform = (r: number, s: number) =>
  `perspective(1500px) rotateX(20deg) rotateY(${
  r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

function PhotoStack() {
  const [gone] = React.useState(() => new Set()); // The set flags all the photos that are flicked out
  const [props, set] = useSprings(photos.length, (i) => ({
    ...into(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, movement (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [dx], velocity }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the photo to fly out
      const dir = dx < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the photo ready to fly out
      // @ts-ignore
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a photo is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the photo tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active photos lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === photos.length) {
        // @ts-ignore
        setTimeout(() => gone.clear() || set((i: number) => into(i)), 600);
      }
    }
  );

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div
          className={styles.stack}
          key={i}
          style={{
            transform: to(
              [x, y],
              (x: number, y: number) => `translate3d(${x}px,${y}px,0)`
            ),
          }}
        >
          {/* This is the photo itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          {/* TODO: Not loving that these aren't images - MK */}
          <animated.div
            {...bind(i)}
            className={styles.photo}
            style={{
              transform: to([rot, scale], transform),
              background: `url(${photos[i]})`,
            }}
          />
        </animated.div>
      ))}
    </>
  );
}

export default PhotoStack;
