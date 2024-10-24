import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  return new Promise((resolve) => {
    fetch(
      `https://pixelfed.social/api/pixelfed/v1/accounts/677260415239635730/statuses?limit=9&only_media=true&min_id=1`,
    )
      .then((response) => response.text())
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader(
          "Authorization",
          `Bearer ${process.env.PIXELFED_ACCESS_TOKEN}`,
        );
        if (process.env.NODE_ENV === "production")
          res.setHeader(
            "Cache-Control",
            "max-age=0, s-maxage=1, stale-while-revalidate",
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
