import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";
import { setCacheControl } from "@lib/api";

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
        if (process.env.NODE_ENV === "production")
          setCacheControl(res, 60);
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
