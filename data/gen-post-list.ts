const fs = require("fs");
const path = require("path");
const posts = require("./get-blog-posts");

const OUT_DIR = path.join(process.cwd(), "out");

interface Post {
  publishedAt: string;
  id: string;
  image?: string;
  summary?: string;
  title: string;
}

const postList = posts.map((post: Post) => ({
  date: post.publishedAt,
  id: post.id,
  title: post.title,
}));

function generatePostList(dir = OUT_DIR) {
  console.log("generating post list:", postList);
  console.log("path:", dir);
  fs.writeFileSync(
    path.join(dir, "posts.ts"),
    `const posts: PostListItem[] = ${JSON.stringify(postList)};
export default posts;`
  );
}

generatePostList(`${process.cwd()}/data`);

export {};
