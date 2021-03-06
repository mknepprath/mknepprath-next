import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import xml2js from "xml2js";

const GOODREADS_API = `https://www.goodreads.com/review/list_rss/${process.env.GOODREADS_ID}?key=${process.env.GOODREADS_KEY}&shelf=read`;

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const books: Book[] = [];
  await fetch(GOODREADS_API)
    .then((response) => response.text())
    .then((body) => {
      xml2js.parseString(body, function (error, response) {
        if (error) console.error(error);
        console.info("Getting Book List from GoodReads API");
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

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=86400");
  res.end(JSON.stringify(books.filter((book) => +book.rating > 3).slice(0, 6)));
};
