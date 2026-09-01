import { NextApiRequest, NextApiResponse } from "next";
import { setCacheControl } from "@lib/api";

const READWISE_HEADERS = {
  Authorization: `Token ${process.env.READWISE_ACCESS_TOKEN}`,
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const highlightsRes = await fetch(
    "https://readwise.io/api/v2/highlights/",
    { headers: READWISE_HEADERS },
  );
  if (!highlightsRes.ok) {
    res.status(highlightsRes.status).json({ error: "Failed to fetch highlights" });
    return;
  }
  const { results } = await highlightsRes.json();

  const bookIds = results.map((h: Highlight) => h.book_id).join(",");
  const booksRes = await fetch(
    `https://readwise.io/api/v2/books/?ids=${bookIds}`,
    { headers: READWISE_HEADERS },
  );
  if (!booksRes.ok) {
    res.status(booksRes.status).json({ error: "Failed to fetch books" });
    return;
  }
  const { results: bookData } = await booksRes.json();

  const hydratedResults = results.map((highlight: Highlight) => ({
    ...highlight,
    book: bookData.find((book: HighlightBook) => book.id === highlight.book_id),
  }));

  if (process.env.NODE_ENV === "production")
    setCacheControl(res, 300, 600);
  res.status(200).json(hydratedResults);
};
