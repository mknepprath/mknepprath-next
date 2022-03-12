import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { offset = 0, limit = 6 },
  } = req;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `${process.env.MUSICKIT_TOKEN}`);
  myHeaders.append("Music-User-Token", `${process.env.MUSIC_USER_TOKEN}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return new Promise((resolve) => {
    fetch(
      `https://api.music.apple.com/v1/me/recent/played?limit=${limit}&offset=${offset}`, // `https://api.music.apple.com/v1/me/history/heavy-rotation?limit=6`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(JSON.parse(result).data));
        resolve();
      })
      .catch((error) => {
        res.json(error);
        res.status(404).end();
        return resolve();
      });
  });
};
