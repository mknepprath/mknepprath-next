import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  return new Promise((resolve) => {
    fetch(`https://readwise.io/api/v2/highlights/`, {
      headers: {
        Authorization: `Token ${process.env.READWISE_ACCESS_TOKEN}`,
      },
    })
      .then((response) => response.text())
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        if (process.env.NODE_ENV === "production")
          res.setHeader(
            "Cache-Control",
            "max-age=0, s-maxage=1, stale-while-revalidate"
          );
        // hydrate results with book data
        const results = JSON.parse(result).results;
        const bookIds = results.map((result: Highlight) => result.book_id);
        const bookIdsString = bookIds.join(",");
        const bookData = fetch(
          `https://readwise.io/api/v2/books/?ids=${bookIdsString}`,
          {
            headers: {
              Authorization: `Token ${process.env.READWISE_ACCESS_TOKEN}`,
            },
          }
        );
        bookData
          .then((response) => response.text())
          .then((result) => {
            const bookData = JSON.parse(result).results;
            const hydratedResults = results.map((result: Highlight) => {
              const book = bookData.find(
                (book: HighlightBook) => book.id === result.book_id
              );
              return {
                ...result,
                book,
              };
            });
            res.end(JSON.stringify(hydratedResults));
            resolve();
          });

        // res.end(JSON.stringify(JSON.parse(result).results));
        // resolve();
      })
      .catch((error) => {
        res.json(error);
        res.status(404).end();
        return resolve();
      });
  });
};
