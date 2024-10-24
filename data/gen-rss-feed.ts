// Fixed a ts-node issue with https://github.com/TypeStrong/ts-node/issues/436#issuecomment-624328557

import "colors";
import { diffLines } from "diff";
import fs from "fs";

import posts from "./get-blog-posts";

const FEED_FILE = `${process.cwd()}/public/feed.json`;

interface Post {
  publishedAt: string;
  id: string;
  image?: string;
  summary?: string;
  title: string;
}

enum Color {
  Red = "red",
  Green = "green",
  Grey = "grey",
}

// https://jsonfeed.org/version/1
const feed = {
  version: "https://jsonfeed.org/version/1",
  title: "M. Knepprath",
  home_page_url: "https://mknepprath.com",
  feed_url: "https://mknepprath.com/feed.json",
  description: "Michael Knepprath is a Staff Software Engineer at Walmart.",
  icon: "https://mknepprath.com/assets/apple-touch-icon-152x152.png",
  favicon: "https://mknepprath.com/assets/favicon.ico",
  author: {
    name: "Michael Knepprath",
    url: "https://mknepprath.com",
    avatar: "https://mknepprath.com/assets/memoji.png",
  },
  items: posts.map((post: Post) => ({
    id: `https://mknepprath.com/writing/${post.id}`,
    url: `https://mknepprath.com/writing/${post.id}`,
    title: post.title,
    content_text: `${
      post.summary ? post.summary + " • " : ""
    }https://mknepprath.com/writing/${post.id}`,
    summary: post.summary,
    image: post.image ? `https://mknepprath.com${post.image}` : undefined,
    date_published: `${post.publishedAt}T15:00:00Z`,
  })),
};

function generateRSSFeed() {
  console.info("Generating feed...", FEED_FILE);

  const prevPosts = fs.readFileSync(FEED_FILE, "utf-8");
  const nextPosts = JSON.stringify(feed, null, "  ");

  fs.writeFileSync(FEED_FILE, nextPosts);

  fs.writeFileSync(FEED_FILE, nextPosts);

  const diff = diffLines(prevPosts, nextPosts);

  if (diff.length === 1) {
    console.info("No change\n");
  } else {
    diff.forEach(function (part: {
      added?: boolean;
      removed?: boolean;
      value: string;
    }) {
      // green for additions, red for deletions
      // grey for common parts
      const color = part.added
        ? Color.Green
        : part.removed
          ? Color.Red
          : Color.Grey;
      if (color === Color.Grey) {
        const lines = part.value.match(/[^\r\n]+/g);
        if (!lines) return;

        if (lines.length < 4) {
          process.stderr.write(part.value);
        } else {
          process.stderr.write(`${lines[0]}\n.......\n${lines.reverse()[1]}\n`); // index 1, because every part seems to include an empty line at the end.
        }
      } else {
        process.stderr.write(part.value);
      }
    });
    process.stderr.write("\x1b[0m");
    console.info();
  }
}

generateRSSFeed();

export {};
