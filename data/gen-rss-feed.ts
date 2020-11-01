// Fixed a ts-node issue with https://github.com/TypeStrong/ts-node/issues/436#issuecomment-624328557

require("colors");
const fs = require("fs");
const jsdiff = require("diff");
const posts = require("./get-blog-posts");

const FEED_FILE = `${process.cwd()}/public/feed.json`;

interface Post {
  publishedAt: string;
  id: string;
  image?: string;
  summary?: string;
  title: string;
}

// https://jsonfeed.org/version/1
const feed = {
  version: "https://jsonfeed.org/version/1",
  title: "M. Knepprath",
  home_page_url: "https://mknepprath.com",
  feed_url: "https://mknepprath.com/feed.json",
  description: "Michael Knepprath is a Software Engineer at Walmart Labs.",
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
  console.log("generating feed...");
  console.log("path:", FEED_FILE);

  const prevPosts = fs.readFileSync(FEED_FILE, "utf-8");
  const nextPosts = JSON.stringify(feed, null, "  ");

  fs.writeFileSync(FEED_FILE, nextPosts);

  fs.writeFileSync(FEED_FILE, nextPosts);

  const diff = jsdiff.diffLines(prevPosts, nextPosts);
  diff.forEach(function (part: {
    added: string;
    removed: string;
    value: string;
  }) {
    // green for additions, red for deletions
    // grey for common parts
    const color = part.added ? "green" : part.removed ? "red" : "grey";
    process.stderr.write(part.value[color as any]);
  });
  console.log();
}

generateRSSFeed();

export { };
