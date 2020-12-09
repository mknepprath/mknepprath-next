import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import xml2js from "xml2js";

const GOODREADS_API = `https://www.goodreads.com/review/list?v=2&id=${process.env.GOODREADS_ID}&shelf=read&key=${process.env.GOODREADS_KEY}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let books: Book[] = [];
  await fetch(GOODREADS_API)
    .then((response) => response.text())
    .then((body) => {
      xml2js.parseString(body, function (error, response) {
        if (error) console.error(error);
        console.info("Getting Book List from GoodReads API");

        let bookList = response.GoodreadsResponse.reviews[0].review;
        for (let i = 0; i < bookList.length; i++) {
          books.push({
            title: bookList[i].book[0].title_without_series[0],
            author: bookList[i].book[0].authors[0].author[0].name[0],
            isbn: bookList[i].book[0].isbn[0],
            image_url: bookList[i].book[0].image_url[0],
            small_image_url: bookList[i].book[0].image_url[0],
            large_image_url: bookList[i].book[0].large_image_url[0],
            link: bookList[i].book[0].link[0],
            date_started: bookList[i].date_added[0],
            date_finished: bookList[i].read_at[0],
            rating: bookList[i].rating[0],
          });
        }
      });
    })
    .catch((error) => console.error(error));

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=86400");
  res.end(JSON.stringify(books.filter((film) => +film.rating > 3).slice(0, 6)));
};
