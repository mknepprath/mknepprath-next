// https://matthewelsom.com/blog/display-shots-on-webpage-with-dribbble-v2-api.html

import { NextApiRequest, NextApiResponse } from "next";

const DRIBBBLE_API = `https://api.dribbble.com/v2/user/shots?access_token=${process.env.DRIBBBLE_ACCESS_TOKEN}`;

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const shots: Shot[] = await fetch(DRIBBBLE_API).then((response) =>
    response.json()
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV !== "development")
    res.setHeader("Cache-Control", "max-age=86400");
  res.end(JSON.stringify(shots));
};
