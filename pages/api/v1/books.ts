import { NextApiRequest, NextApiResponse } from "next";
import { setCacheControl } from "@lib/api";
import { fetchRecentlyRead, fetchShelf } from "@lib/goodreads";
import bookDates from "@data/books.json";

// Read dates come from data/books.json, which scripts/update-books.ts keeps —
// the widgets Goodreads left behind don't carry them.
const dates = bookDates as Record<string, { title: string; finished: string | null }>;

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { shelf = "read", min_rating = 3 } = req.query;
  let books: Book[] = [];

  try {
    const userId = process.env.GOODREADS_ID;
    if (!userId) throw new Error("GOODREADS_ID not set");

    // Only the read shelf comes with ratings and reviews attached; everything
    // else is title, cover and link.
    books =
      shelf === "read"
        ? await fetchRecentlyRead(userId)
        : await fetchShelf(userId, shelf as string);

    books = books.map((book) => ({
      ...book,
      date_finished: dates[book.id]?.finished ?? undefined,
    }));
  } catch (error) {
    console.error(error);
  }

  if (shelf === "read")
    books = books.filter((book) => +(book.rating ?? 0) >= +min_rating).slice(0, 6);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV === "production") setCacheControl(res, 300, 600);
  res.end(JSON.stringify(books));
};
