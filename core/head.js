import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";

const defaultDescription = "Developer & Designer";
const defaultOGURL = "";
const defaultOGImage = "";

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ""}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="manifest" href="/static/manifest.json" />
    <link
      rel="icon"
      sizes="192x192"
      href="/static/android-chrome-192x192.png"
    />
    <link rel="apple-touch-icon" href="/static/apple-touch-icon-152x152.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#6ABD9D" />
    <link rel="icon" href="/static/favicon.ico" />
    <meta name="theme-color" content="#6ABD9D" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ""} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta name="pinterest" content="nopin" />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <script src="/static/js/clipboard.js" />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Head;
