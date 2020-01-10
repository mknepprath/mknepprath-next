const fs = require("fs");
const path = require("path");
const { posts } = require("./get-blog-posts");

const OUT_DIR = path.join(process.cwd(), "out");

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
    avatar: "https://mknepprath.com/assets/memoji.png"
  },
  items: posts.map(post => ({
    id: `https://mknepprath.com/writing/${post.id}`,
    url: `https://mknepprath.com/writing/${post.id}`,
    title: post.title,
    content_text: post.content_text,
    summary: post.summary,
    image: post.image ? `https://mknepprath.com/${post.image}` : undefined,
    date_published: `${post.publishedAt}T15:00:00Z`
  }))
};

function generateRSSFeed(dir = OUT_DIR) {
  console.log("generating feed:", feed);
  console.log("path:", dir);
  fs.writeFileSync(path.join(dir, "feed.json"), JSON.stringify(feed));
}

generateRSSFeed(`${process.cwd()}/public`);
