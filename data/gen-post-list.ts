import "colors";
import fs from "fs";
import posts from "./get-blog-posts";

const Diff = require("diff"); // eslint-disable-line @typescript-eslint/no-var-requires

const POSTS_FILE = `${process.cwd()}/data/posts.ts`;

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

const postList = posts.map((post: Post) => ({
  date: post.publishedAt,
  id: post.id,
  image: post.image,
  summary: post.summary,
  title: post.title,
}));

function generatePostList() {
  console.info("Generating post list...", POSTS_FILE);

  const prevPosts = fs.readFileSync(POSTS_FILE, "utf-8");
  const nextPosts = `const posts: PostListItem[] = ${JSON.stringify(
    postList,
    null,
    "  ",
  )};
export default posts;`;

  fs.writeFileSync(POSTS_FILE, nextPosts);

  const diff = Diff.diffLines(prevPosts, nextPosts);

  if (diff.length === 1) {
    console.info("No change\n");
  } else {
    diff.forEach(function (part: {
      added?: boolean;
      removed?: boolean;
      value: { [key: string]: string };
    }) {
      // green for additions, red for deletions
      // grey for common parts
      const color = part.added
        ? Color.Green
        : part.removed
        ? Color.Red
        : Color.Grey;

      if (color === Color.Grey) {
        const lines = part.value[color].match(/[^\r\n]+/g);
        if (!lines) return;

        if (lines.length < 4) {
          process.stderr.write(part.value[color]);
        } else {
          process.stderr.write(`${lines[0]}\n.......\n${lines.reverse()[1]}\n`); // index 1, because every part seems to include an empty line at the end.
        }
      } else {
        process.stderr.write(part.value[color]);
      }
    });
    process.stderr.write("\x1b[0m");
    console.info();

    process.exit();
  }
}

generatePostList();

export {};
