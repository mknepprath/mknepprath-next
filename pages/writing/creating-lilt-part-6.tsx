import BlogPage from "@core/blog-page";
import { ReactNode } from "react";

export const meta: Meta = {
  published: false,
  publishedAt: "2023-02-13",
  title: "Creating lilt — Part 6",
};

export default function CreatingLiltPart6(): ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>7 years later...</p>
      <p>Heroku to AWS and Supabase. Twitter to Mastodon. GPT-3.</p>

      <small>
        This is Part 6 of a series of posts about the game. Part 1 can be found{" "}
        <a href="/writing/creating-lilt-part-1">here</a>.
      </small>
    </BlogPage>
  );
}
