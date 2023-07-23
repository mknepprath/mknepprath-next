import fs, { PathLike } from "fs";
import path from "path";

const META = /export\s+const\s+meta:\sMeta\s+=\s+(\{(\r\n|\n|.)*?(\r\n|\n)\})/;

const POSTS_DIR: PathLike = path.join(process.cwd(), "/pages/writing/");

function getFiles(dir: PathLike) {
  return fs
    .readdirSync(dir)
    .filter((file: string) => file.endsWith(".tsx") && file !== "latest.tsx");
}

interface Post {
  image?: string;
  published: boolean;
  publishedAt: string;
  summary?: string;
  title: string;
}

function getContentFromFiles(postsArray: string[], dir: string) {
  const posts = postsArray
    .map((file, index) => {
      const name = path.join(dir, file);
      const contents = fs.readFileSync(name, "utf-8");
      const match = META.exec(contents);

      // TODO: Can I extract post content from `contents` and assign that to
      // `content_text`... :\

      if (!match || typeof match[1] !== "string") {
        throw new Error(`${name} needs to export const meta = {}`);
      }

      const meta = eval("(" + match[1] + ")");
      const id = file.replace(/\.tsx?$/, "");

      return {
        ...meta,
        id,
        path: dir.replace(process.cwd() + "/pages", "") + id,
        index,
      };
    })
    .filter((meta: Post) => meta.published);

  posts.sort(
    (a: Post, b: Post) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );

  return posts;
}

const postsArray = getFiles(POSTS_DIR);

const posts = getContentFromFiles(postsArray, POSTS_DIR);

module.exports = posts;

export default posts;
