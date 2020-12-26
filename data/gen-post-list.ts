require("colors");
const fs = require("fs");
const jsdiff = require("diff");
const posts = require("./get-blog-posts");

const POSTS_FILE = `${process.cwd()}/data/posts.ts`;

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
  image: post.image,
  title: post.title,
}));

function generatePostList() {
  console.info("generating post list...");
  console.info("path:", POSTS_FILE);

  const prevPosts = fs.readFileSync(POSTS_FILE, "utf-8");
  const nextPosts = `const posts: PostListItem[] = ${JSON.stringify(
    postList,
    null,
    "  "
  )};
  export default posts;`;

  fs.writeFileSync(POSTS_FILE, nextPosts);

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
  console.info();
}

generatePostList();

export {};
