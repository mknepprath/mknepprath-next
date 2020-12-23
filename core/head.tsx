import React from "react";
import NextHead from "next/head";
import { useRouter } from "next/router";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "https://mknepprath.com";

interface Props {
  children?: React.ReactNode;
  description?: string;
  ogImage?: string;
  title?: string;
}

export default function Head({
  children,
  title = "Michael Knepprath, Developer & Designer",
  description = "Michael Knepprath is a Software Engineer & Designer. He loves the point at which technology and art converge: technology, design, film, video games, and so on.",
  ogImage = "/assets/og-image.jpg",
}: Props) {
  const router = useRouter();

  React.useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    script.setAttribute("async", "true");
    document.head.appendChild(script);
  }, []);

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="manifest" href="/manifest.json" />
      <link
        rel="icon"
        sizes="192x192"
        href="/assets/android-chrome-192x192.png"
      />
      <link
        rel="apple-touch-icon"
        href="/assets/apple-touch-icon-152x152.png"
      />
      <link rel="mask-icon" href="/assets/favicon-mask.svg" color="#6ABD9D" />
      <link rel="icon" href="/assets/favicon.ico" />
      <meta name="theme-color" content="#6ABD9D" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#FFFFFF" />

      <meta property="og:url" content={`${BASE_URL}${router.pathname}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:site" content={`${BASE_URL}${router.pathname}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={`${BASE_URL}${ogImage}`} />
      <meta property="og:image" content={`${BASE_URL}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="pinterest" content="nopin" />
      {children}
    </NextHead>
  );
}
