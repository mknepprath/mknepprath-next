import React, { useEffect } from "react";

import BlogPage from "core/blog-page";

import styles from "./life.module.css";

const INC = 6;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const meta = {
  // image: "/assets/twitter-likes-illustration-1.jpg",
  // published: true,
  publishedAt: "2020-06-21",
  summary: "Life, the universe, and everything.",
  title: "The Game of Life",
};

export default function Life() {
  const [coordinates, setCoordinates] = React.useState([
    { x: 150, y: 200, color: "rgba(51, 51, 51, 1)" },
  ]);

  useEffect(() => {
    let id = setInterval(() => {
      setCoordinates((prevCoordinates) => [
        ...prevCoordinates,
        {
          x:
            prevCoordinates[prevCoordinates.length - 1].x +
            [-INC, 0, INC][getRandomInt(3)],
          y:
            prevCoordinates[prevCoordinates.length - 1].y +
            [-INC, 0, INC][getRandomInt(3)],
          color: [
            "rgba(120, 159, 177, .4)",
            "rgba(99, 91, 137, .4)",
            "rgba(226, 135, 164, .4)",
            "rgba(255, 207, 186, .4)",
            "rgba(51, 51, 51, 1)",
          ][getRandomInt(5)],
        },
      ]);
    }, 1);
    return () => clearInterval(id);
  });

  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      highlightCode
      // ogImage={meta.image}
      title={meta.title}
    >
      {/* <img
        alt="Likes header illustration"
        className="blog-image"
        src="/assets/twitter-likes-illustration-1.jpg"
      /> */}
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>I highly recommend you do NOT leave this page open</p>
      {coordinates.map(({ x, y, color }, index) => (
        <div
          className={styles.px}
          key={index}
          style={{
            // borderRadius: INC / 2,
            backgroundColor: color,
            height: INC,
            left: x,
            width: INC,
            top: y,
          }}
        />
      ))}
    </BlogPage>
  );
}
