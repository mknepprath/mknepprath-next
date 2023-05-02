import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";
import xml2js from "xml2js";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { shelf = "read", min_rating = 3 } = req.query;
  let books: Book[] = [];
  await fetch(
    `https://www.goodreads.com/review/list_rss/${process.env.GOODREADS_ID}?key=${process.env.GOODREADS_KEY}&shelf=${shelf}&sort=date_read`
  )
    .then((response) => response.text())
    .then((body) => {
      xml2js.parseString(body, function (error, response) {
        if (error) console.error(error);
        const bookList = response.rss.channel[0].item;
        for (let i = 0; i < bookList.length; i++) {
          books.push({
            title: bookList[i].title[0],
            author: bookList[i].author_name[0],
            isbn: bookList[i].isbn[0],
            image_url: bookList[i].book_image_url[0],
            small_image_url: bookList[i].book_small_image_url[0],
            large_image_url: bookList[i].book_large_image_url[0],
            link: bookList[i].link[0],
            date_started: bookList[i].user_date_added[0],
            date_finished: bookList[i].user_read_at[0],
            rating: bookList[i].user_rating[0],
          });
        }
      });
    })
    .catch((error) => console.error(error));

  if (shelf !== "desk")
    books = books.filter((book) => +book.rating >= +min_rating).slice(0, 6);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV === "production")
    res.setHeader(
      "Cache-Control",
      "max-age=0, s-maxage=1, stale-while-revalidate"
    );
  res.end(JSON.stringify(books));
};
