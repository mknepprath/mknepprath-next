import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

const PIXELFED_URL =
  "https://pixelfed.social/api/pixelfed/v1/accounts/677260415239635730/statuses";
const PAGE_SIZE = 24;

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const requestedLimit = Math.min(
    parseInt(req.query.limit as string) || 9,
    100,
  );

  try {
    const allResults: unknown[] = [];
    let maxId: string | undefined;

    while (allResults.length < requestedLimit) {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        only_media: "true",
        min_id: "1",
      });
      if (maxId) params.set("max_id", maxId);

      const response = await fetch(`${PIXELFED_URL}?${params}`);
      if (!response.ok) break;

      const page = await response.json();
      if (!Array.isArray(page) || page.length === 0) break;

      allResults.push(...page);
      maxId = page[page.length - 1].id;

      // If we got fewer than PAGE_SIZE, there are no more pages
      if (page.length < PAGE_SIZE) break;
    }

    const trimmed = allResults.slice(0, requestedLimit);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (process.env.NODE_ENV === "production") {
      res.setHeader(
        "Cache-Control",
        "max-age=0, s-maxage=60, stale-while-revalidate=300",
      );
    }
    res.end(JSON.stringify(trimmed));
  } catch {
    res.status(500).json({ error: "Failed to fetch photos" });
  }
};
