import React, { useEffect } from "react";
import Link from "next/link";

import BlogPage from "core/blog-page";
import PxBrush from "core/pxbrush";

const GRID_SCALE = 8;

export const meta = {
  image: "/assets/pxbrush.png",
  published: true,
  publishedAt: "2020-06-25",
  summary: "Recreating a project from my high school years.",
  title: "Life, Art, Nostalgia",
};

export default function Life() {
  // Position the brush in the center of where a hero image would normally be.
  const [centerpoint, setCenterpoint] = React.useState<Array<number>>();
  const brushEl = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (brushEl.current) {
      var rect = brushEl.current.getBoundingClientRect();

      const centerX = rect.left + (rect.right - rect.left) / 2;
      const centerY = rect.top + (rect.bottom - rect.top) / 2;

      const xToScaleGrid = centerX - (centerX % GRID_SCALE);
      const yToScaleGrid = centerY - (centerY % GRID_SCALE);

      setCenterpoint(() => [xToScaleGrid, yToScaleGrid]);
    }
  }, []);

  const [centerpoint2, setCenterpoint2] = React.useState<Array<number>>();
  const brushEl2 = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (brushEl2.current) {
      var rect = brushEl2.current.getBoundingClientRect();

      const centerX = rect.left + (rect.right - rect.left) / 2;
      const centerY = rect.top + (rect.bottom - rect.top) / 2;

      const xToScaleGrid = centerX - (centerX % GRID_SCALE);
      const yToScaleGrid = centerY - (centerY % GRID_SCALE);

      setCenterpoint2(() => [xToScaleGrid, yToScaleGrid]);
    }
  }, []);

  const [centerpoint3, setCenterpoint3] = React.useState<Array<number>>();
  const brushEl3 = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (brushEl3.current) {
      var rect = brushEl3.current.getBoundingClientRect();

      const centerX = rect.left + (rect.right - rect.left) / 2;
      const centerY = rect.top + (rect.bottom - rect.top) / 2;

      const xToScaleGrid = centerX - (centerX % GRID_SCALE);
      const yToScaleGrid = centerY - (centerY % GRID_SCALE);

      setCenterpoint3(() => [xToScaleGrid, yToScaleGrid]);
    }
  }, []);

  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      highlightCode
      ogImage={meta.image}
      title={meta.title}
    >
      <div ref={brushEl} style={{ height: 400, width: "100%" }} />
      {centerpoint && (
        <PxBrush
          colors={[
            ...new Array(32).fill("var(--black)"),
            ...new Array(32).fill("var(--primaryColor)"),
            "var(--selectedColor)",
          ]}
          coordinates={centerpoint}
          increment={GRID_SCALE}
          length={5000}
          style={{
            borderBottom: `${GRID_SCALE * 2}px solid var(--black)`,
            borderLeft: `${GRID_SCALE * 2}px solid var(--black)`,
          }}
        />
      )}

      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        While panning for gold in all of my earthly belongings during a move
        last year, I found a notebook full of handwritten BASIC code.
      </p>
      <p>
        This transported me back to memories of myself in high school
        programming on my TI-83. While I had forgotten my rudimentary
        programming methods, I do remember seeing classmates sharing cool
        calculator games they'd found with each other, searching the Internet to
        download some to play myself, and eventually feeling brave enough to try
        to create my own.
      </p>
      <p>
        Most of the programs I wrote were variants of{" "}
        <a
          href="http://www.menet.umn.edu/~dockt036/snake.html"
          rel="noopener noreferrer"
          target="_blank"
        >
          Snake
        </a>
        . Some were playable, but my favorite was a randomized line-drawer that
        would move up, down, left, or right, and leave a trail behind it. I
        enjoyed tweaking the values and seeing how interesting the new output
        would be.
      </p>
      <p>
        I took a few programming classes after this, the last one being during
        my freshman year of college. I never really felt like I "got it" and
        ended up barely passing with a D-. I didn't touch capital-P Programming
        for a decade.
      </p>
      <div ref={brushEl2} style={{ height: 400, width: "100%" }} />
      {centerpoint2 && (
        <PxBrush
          colors={[
            ...new Array(95).fill("var(--black)"),
            "var(--selectedColor)",
          ]}
          coordinates={centerpoint2}
          increment={GRID_SCALE * 4}
          length={10}
        />
      )}
      <p>
        I spent the rest of my college years focused on design, art, film,
        motion graphics, animation... And I did eventually make my way back
        around during my career; graphic design → web design → frontend
        development → JavaScript/React, Python, etc. I'm grateful for all of it.
      </p>
      <p>
        Over the past few days, I've been playing with that old randomized
        drawing idea, but in React. There are a few in this blog post -{" "}
        <a style={{ cursor: "pointer" }} onClick={() => window.scrollTo(0, 0)}>
          scroll back up
        </a>{" "}
        to see the progress!
      </p>
      <p>
        I also created a page dedicated to this project with a couple of
        properties you can configure using query strings:
      </p>
      <ul>
        <li>
          <Link href="/pxbrush">
            <a>Default</a>
          </Link>
        </li>
      </ul>
      <img
        alt="Pixel brush example 1"
        className="blog-image"
        src="/assets/pxbrush-1.png"
      />
      <ul>
        <li>
          <Link href="/pxbrush?scale=16">
            <a>Scale: 16</a>
          </Link>
        </li>
      </ul>
      <img
        alt="Pixel brush example 2"
        className="blog-image"
        src="/assets/pxbrush-2.png"
      />
      <ul>
        <li>
          <Link href="/pxbrush?scale=32&quantity=8">
            <a>Scale: 32, Quantity: 8</a>
          </Link>
        </li>
      </ul>
      <img
        alt="Pixel brush example 3"
        className="blog-image"
        src="/assets/pxbrush-3.png"
      />
      <ul>
        <li>
          <Link href="/pxbrush?scale=16&quantity=16">
            <a>Scale: 16, Quantity: 16</a>
          </Link>
        </li>
      </ul>
      <img
        alt="Pixel brush example 4"
        className="blog-image"
        src="/assets/pxbrush-4.png"
      />

      <p>
        If you see any cool randomized drawings, please share a screenshot with
        me on{" "}
        <a
          href="https://twitter.com/mknepprath"
          rel="noopener noreferrer"
          target="_blank"
        >
          Twitter
        </a>
        . I'd love to see them. Thanks for reading! 👋
      </p>

      <div ref={brushEl3} style={{ height: 200, width: "100%" }} />
      {centerpoint3 && (
        <PxBrush
          colors={["var(--primaryColor)", "var(--selectedColor)"]}
          coordinates={centerpoint3}
          increment={4}
          length={1000}
          style={{
            borderRadius: 2,
          }}
        />
      )}
    </BlogPage>
  );
}
