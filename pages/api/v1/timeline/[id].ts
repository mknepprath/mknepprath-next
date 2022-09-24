import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
  } = req;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.TWITTER_AUTH_TOKEN}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return new Promise((resolve) => {
    fetch(
      `https://api.twitter.com/2/users/${id}/tweets?tweet.fields=created_at,entities,public_metrics&exclude=replies,retweets&expansions=attachments.media_keys&media.fields=type,url,preview_image_url,width,height&max_results=100`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "max-age=86400");
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
