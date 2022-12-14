import fetch from "isomorphic-unfetch";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { offset = 0, limit = 6 },
  } = req;

  const jwtToken = jwt.sign({}, `${process.env.MUSIC_PRIVATE_KEY}`, {
    algorithm: "ES256",
    expiresIn: "180d",
    issuer: process.env.MUSIC_TEAM_ID,
    header: {
      alg: "ES256",
      kid: process.env.MUSIC_KEY_ID,
    },
  });

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${jwtToken}`);
  myHeaders.append("Music-User-Token", `${process.env.MUSIC_USER_TOKEN}`);

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return new Promise((resolve) => {
    fetch(
      `https://api.music.apple.com/v1/me/library/recently-added?limit=${limit}&offset=${offset}`, // `https://api.music.apple.com/v1/me/history/heavy-rotation?limit=6`,
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
