import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  return new Promise((resolve) => {
    fetch(
      `https://mastodon.social/api/v1/accounts/231610/statuses?limit=20&exclude_replies=1`
    )
      .then((response) => response.text())
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        if (process.env.NODE_ENV !== "development")
          res.setHeader(
            "Cache-Control",
            "max-age=0, s-maxage=1, stale-while-revalidate"
          );
        res.end(result);
        resolve();
      })
      .catch((error) => {
        res.json(error);
        res.status(404).end();
        return resolve();
      });
  });
};
