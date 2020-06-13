import NextHead from "next/head";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "https://mknepprath.com";

function Head({ title, description, ogImage }) {
  const router = useRouter();

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

      <script src="/js/clipboard.js" />
    </NextHead>
  );
}

Head.defaultProps = {
  description:
    "Michael Knepprath is a Software Engineer & Designer. He loves the point at which technology and art converge: technology, design, film, video games, and so on.",
  ogImage: "/assets/og-image.jpg",
  title: "Michael Knepprath, Developer & Designer",
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ogImage: PropTypes.string,
};

export default Head;
