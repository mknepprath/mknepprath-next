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

  // Readwise calls every source a "book", but these are mostly saved articles.
  // The list endpoint ignores ?ids=, so it was returning an unrelated first page
  // and nothing ever matched — every highlight came back unhydrated. A hundred
  // highlights only span a handful of sources, so fetch each one directly.
  const sourceIds = [...new Set(results.map((h: Highlight) => h.book_id))];

  const sources = await Promise.all(
    sourceIds.map(async (id) => {
      try {
        const r = await fetch(`https://readwise.io/api/v2/books/${id}/`, {
          headers: READWISE_HEADERS,
        });
        return r.ok ? ((await r.json()) as HighlightBook) : null;
      } catch {
        return null;
      }
    }),
  );

  const sourcesById = new Map(
    sources.filter((b): b is HighlightBook => Boolean(b)).map((b) => [b.id, b]),
  );

  const hydratedResults = results.map((highlight: Highlight) => ({
    ...highlight,
    book: sourcesById.get(highlight.book_id),
  }));

  if (process.env.NODE_ENV === "production")
    setCacheControl(res, 300, 600);
  res.status(200).json(hydratedResults);
};
