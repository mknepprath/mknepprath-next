import type { NextApiResponse } from "next";

export function setCacheControl(
  res: NextApiResponse,
  maxAge: number,
  swr: number = maxAge * 5,
) {
  res.setHeader(
    "Cache-Control",
    `s-maxage=${maxAge}, stale-while-revalidate=${swr}`,
  );
}
