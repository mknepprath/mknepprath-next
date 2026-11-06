/**
 * Goodreads shelf reader.
 *
 * Goodreads retired its shelf RSS feeds around 2026-10-28: /review/list_rss
 * 404s for every user id, and the HTML shelf pages redirect to sign-in. The
 * public bookshelf widgets are the only anonymous surface left, so this reads
 * those. Both answer with a JavaScript file wrapping an HTML string.
 *
 * It takes two of them, because neither is enough alone:
 *  - custom_widget serves the 20 most recently read books with author, rating
 *    and review, but ignores `shelf` and `num_books`.
 *  - grid_widget honours `shelf` and `num_books` but carries only the title,
 *    cover and review link.
 *
 * Neither carries a read date. scripts/update-books.ts keeps those.
 */

import fetch from "isomorphic-unfetch";

const WIDGET_BASE = "https://www.goodreads.com/review";

const decodeEntities = (value: string): string =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(+code))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const toText = (html: string): string =>
  decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

// The widget response is `var widget_code = '<html>'`, escaped for JavaScript.
const unwrap = (body: string): string =>
  body
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, "\n")
    .replace(/\\\//g, "/");

// Covers arrive as thumbnails (._SX50_, ._SY75_, ._SX98_); dropping the size
// segment gives the full-resolution file.
const fullSize = (url: string): string => url.replace(/\._S[XY]\d+_(?=\.)/, "");

const reviewId = (href: string): string =>
  href.match(/review\/show\/(\d+)/)?.[1] ?? "";

const toBook = (fields: {
  id: string;
  title: string;
  link: string;
  cover: string;
  author?: string;
  rating?: string;
  review?: string;
}): Book => ({
  author: fields.author,
  id: fields.id,
  image_url: fullSize(fields.cover),
  large_image_url: fullSize(fields.cover),
  link: fields.link,
  rating: fields.rating,
  review: fields.review,
  small_image_url: fields.cover,
  title: fields.title,
});

async function fetchWidget(path: string): Promise<string> {
  const res = await fetch(`${WIDGET_BASE}/${path}`);
  if (!res.ok) throw new Error(`Goodreads widget ${path} returned ${res.status}`);
  return unwrap(await res.text());
}

/**
 * The 20 most recently read books, with everything the widgets expose. The
 * shelf and count are fixed by Goodreads, whatever is asked for.
 */
export async function fetchRecentlyRead(userId: string): Promise<Book[]> {
  const code = await fetchWidget(
    `custom_widget/${userId}?cover_size=medium&num_books=20&order=d` +
      `&shelf=read&sort=date_read&widget_id=1&widget_width=medium`,
  );

  return code
    .split(/class="gr_custom_each_container_\w*"/)
    .slice(1)
    .map((block) => {
      const field = (name: string) =>
        block.match(new RegExp(`class="gr_custom_${name}_\\w*"[^>]*>([\\s\\S]*?)</div>`))?.[1] ??
        "";
      const href = block.match(/href="([^"]*review\/show\/\d+[^"]*)"/)?.[1] ?? "";
      const review = toText(field("review"));
      const author = toText(field("author")).replace(/^by\s+/, "");

      return toBook({
        id: reviewId(href),
        title: toText(field("title")),
        link: `https://www.goodreads.com/review/show/${reviewId(href)}`,
        cover: block.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? "",
        author: author || undefined,
        // Goodreads draws the rating as five images, the filled ones marked.
        rating: String((field("rating").match(/star_active/g) || []).length),
        review: review || undefined,
      });
    })
    .filter((book) => book.id && book.title);
}

/** Any shelf by name, newest first, without ratings, reviews or authors. */
export async function fetchShelf(
  userId: string,
  shelf: string,
  limit = 100,
): Promise<Book[]> {
  const code = await fetchWidget(
    `grid_widget/${userId}?cover_size=medium&num_books=${limit}&order=d` +
      `&shelf=${encodeURIComponent(shelf)}&sort=date_added&widget_id=1&v=2`,
  );

  return code
    .split(/class="gr_grid_book_container"/)
    .slice(1)
    .map((block) => {
      const href = block.match(/href="([^"]*review\/show\/\d+[^"]*)"/)?.[1] ?? "";
      return toBook({
        id: reviewId(href),
        // The anchor title carries the full name, series and all; the image alt
        // is truncated.
        title: decodeEntities(block.match(/title="([^"]+)"/)?.[1] ?? ""),
        link: `https://www.goodreads.com/review/show/${reviewId(href)}`,
        cover: block.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? "",
      });
    })
    .filter((book) => book.id && book.title);
}
