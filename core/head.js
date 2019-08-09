import NextHead from "next/head";
import PropTypes from "prop-types";

function Head({ title, description, ogImage, url }) {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="manifest" href="/static/manifest.json" />
      <link
        rel="icon"
        sizes="192x192"
        href="/static/android-chrome-192x192.png"
      />
      <link
        rel="apple-touch-icon"
        href="/static/apple-touch-icon-152x152.png"
      />
      <link rel="mask-icon" href="/static/favicon-mask.svg" color="#6ABD9D" />
      <link rel="icon" href="/static/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="/static/css/global.css" />
      {/* TODO: prism.css is only used in blog posts, yet is being included globally. */}
      <link rel="stylesheet" type="text/css" href="/static/css/prism.css" />
      <meta name="theme-color" content="#6ABD9D" />

      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:site" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="pinterest" content="nopin" />

      <script src="/static/js/clipboard.js" />
    </NextHead>
  );
}

Head.defaultProps = {
  description:
    "Michael Knepprath is a Software Engineer & Designer. He loves the point at which technology and art converge: technology, design, film, video games, and so on.",
  ogImage: "",
  title: "Michael Knepprath, Developer & Designer",
  url: ""
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  ogImage: PropTypes.string
};

export default Head;
