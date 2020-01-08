const fs = require("fs");
const path = require("path");

const META = /export\s+const\s+meta\s+=\s+(\{(\r\n|\n|.)*?(\r\n|\n)\})/;

const POSTS_DIR = path.join(process.cwd(), "/pages/writing/");

function getFiles(dir) {
  return fs.readdirSync(dir).filter(file => file.endsWith(".js"));
}

function getContentFromFiles(arr, dir) {
  return arr
    .map((file, index) => {
      const name = path.join(dir, file);
      const contents = fs.readFileSync(name, "utf-8");
      const match = META.exec(contents);

      if (!match || typeof match[1] !== "string") return {};

      if (!match || typeof match[1] !== "string") {
        throw new Error(`${name} needs to export const meta = {}`);
      }

      const meta = eval("(" + match[1] + ")");
      const id = file.replace(/\.js?$/, "");

      return {
        ...meta,
        id,
        path: dir.replace(process.cwd() + "/pages", "") + id,
        index
      };
    })
    .filter(meta => meta.published)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

const arrOfPosts = getFiles(POSTS_DIR);

const posts = getContentFromFiles(arrOfPosts, POSTS_DIR);

module.exports = {
  posts
};
