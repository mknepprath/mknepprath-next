import fs, { PathLike } from "fs";
import path from "path";

// The regex matches export const meta: Meta = { ... } inside a TS file ignoring
//  whitespace. Note: The `\}` is necessary despite the WebStorm warning.
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

// Extract the JSX body from a blog post file and convert it to HTML.
function extractContentHtml(
  fileContents: string,
  meta: { title?: string; summary?: string },
): string {
  // Grab everything between <BlogPage ...> and </BlogPage>
  const bodyMatch = fileContents.match(
    /<BlogPage[^>]*>([\s\S]*)<\/BlogPage>/,
  );
  if (!bodyMatch) return "";

  let html = bodyMatch[1];

  // Replace {meta.title} and {meta.summary} with actual values
  html = html.replace(/\{meta\.title\}/g, meta.title || "");
  html = html.replace(/\{meta\.summary\}/g, meta.summary || "");

  // Replace {" "} with a space
  html = html.replace(/\{"\s*"\}/g, " ");

  // Replace template literal expressions {`...`} with their content (used in code blocks)
  html = html.replace(/\{`([\s\S]*?)`\}/g, "$1");

  // Convert <A href="...">...</A> to <a href="...">...</a>
  html = html.replace(/<A\s+href=/g, "<a href=");
  html = html.replace(/<\/A>/g, "</a>");

  // Convert <Image> components to <img> tags
  html = html.replace(
    /<Image\s+([^>]*?)\s*\/>/g,
    (_match: string, attrs: string) => {
      const src = attrs.match(/src="([^"]+)"/)?.[1] || "";
      const alt = attrs.match(/alt="([^"]+)"/)?.[1] || "";
      const fullSrc = src.startsWith("/")
        ? `https://mknepprath.com${src}`
        : src;
      return `<img src="${fullSrc}" alt="${alt}" />`;
    },
  );

  // Convert className to class
  html = html.replace(/className=/g, "class=");

  // Strip remaining JSX expressions we can't convert (e.g. {someVar})
  // but keep the content of simple string expressions
  html = html.replace(/\{([^{}]+)\}/g, (_match: string, inner: string) => {
    const trimmed = inner.trim();
    // If it's a quoted string, extract it
    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
      return trimmed.slice(1, -1);
    }
    return "";
  });

  return html.trim();
}

function getContentFromFiles(postsArray: string[], dir: string) {
  const posts = postsArray
    .map((file, index) => {
      const name = path.join(dir, file);
      const contents = fs.readFileSync(name, "utf-8");
      const match = META.exec(contents);

      if (!match || typeof match[1] !== "string") {
        throw new Error(`${name} needs to export const meta = {}`);
      }

      const meta = eval("(" + match[1] + ")");
      const id = file.replace(/\.tsx?$/, "");
      const contentHtml = extractContentHtml(contents, meta);

      return {
        ...meta,
        id,
        contentHtml,
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
