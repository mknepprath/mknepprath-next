// Totally borrowed from a react-spring demo: https://codesandbox.io/embed/j0y0vpz59

import React, { useState } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";

import styles from "./photo-stack.css";

// TODO: Could eventually get these from Instagram? :\
const photos = [
  "/static/about-1.jpg",
  "/static/about-2.jpg",
  "/static/about-3.jpg",
  "/static/about-4.jpg",
  "/static/about-5.jpg",
  "/static/about-6.jpg"
];

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});
// The `i` is required. I'm not sure why.
// https://spectrum.chat/react-spring/general/how-to-add-delay-to-each-property~de080776-bbe9-4bf7-8bf5-980c87f5cdd0
const from = i => ({ x: 0, rot: 0, scale: 1.5, y: -1000 }); //  eslint-disable-line no-unused-vars
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(20deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

function PhotoStack() {
  const [gone] = useState(() => new Set()); // The set flags all the photos that are flicked out
  const [props, set] = useSprings(photos.length, i => ({
    ...to(i),
    from: from(i)
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the photo to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the photo ready to fly out
      set(i => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a photo is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the photo tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active photos lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });
      if (!down && gone.size === photos.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return props.map(({ x, y, rot, scale }, i) => (
    <animated.div
      className={styles.stack}
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
      {/* This is the photo itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      {/* TODO: Not loving that these aren't images - MK */}
      <animated.div
        {...bind(i)}
        className={styles.photo}
        style={{
          transform: interpolate([rot, scale], trans),
          backgroundImage: `url(${photos[i]})`
        }}
      />
    </animated.div>
  ));
}

export default PhotoStack;
