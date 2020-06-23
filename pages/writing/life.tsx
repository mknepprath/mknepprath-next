import React, { useEffect } from "react";
import Link from "next/link";

import BlogPage from "core/blog-page";
import PxBrush from "core/pxbrush";

export const meta = {
  image: "/assets/pxbrush.png",
  published: true,
  publishedAt: "2020-06-23",
  summary: "Recreating a project from my high school years.",
  title: "Life, Art, Nostalgia",
};

export default function Life() {
  const [centerpoint, setCenterpoint] = React.useState<Array<number>>();

  const brushEl = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (brushEl.current) {
      var rect = brushEl.current.getBoundingClientRect();

      const centerX = rect.left + (rect.right - rect.left) / 2;
      const centerY = rect.top + (rect.bottom - rect.top) / 2;

      const xToScaleGrid = centerX - (centerX % 16);
      const yToScaleGrid = centerY - (centerY % 16);

      setCenterpoint(() => [xToScaleGrid, yToScaleGrid]);
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
      <div ref={brushEl} style={{ height: 300, width: "100%" }} />
      {centerpoint && <PxBrush coordinates={centerpoint} increment={16} />}

      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>I highly recommend you do NOT leave this page open.</p>
      <Link href="/pxbrush?scale=30&quantity=1">
        <a>Scale 30</a>
      </Link>
    </BlogPage>
  );
}

// /pxbrush?scale=6&quantity=10
