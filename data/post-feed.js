const fs = require("fs");
const path = require("path");
const { posts } = require("./get-blog-posts");

const OUT_DIR = path.join(process.cwd(), "out");

// https://jsonfeed.org/version/1
const postList = posts.map(post => ({
  date: post.publishedAt,
  id: post.id,
  title: post.title
}));

function generateRSSFeed(dir = OUT_DIR) {
  console.log("generating post list:", postList);
  console.log("path:", dir);
  fs.writeFileSync(
    path.join(dir, "posts.js"),
    `export default ${JSON.stringify(postList)};`
  );
}

generateRSSFeed(`${process.cwd()}/data`);
