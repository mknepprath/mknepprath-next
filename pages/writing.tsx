// External
// Components
import Page from "@core/page";
// Data
import posts from "@data/posts";
import { format, parseISO } from "date-fns";
import Link from "next/link";

// Styles
import styles from "./writing.module.css";

export default function Writing(): React.ReactNode {
  return (
    <Page title="Michael Knepprath, Occasional Writer">
      <header data-cy="writing-page">
        <h1>Writing</h1>
      </header>

      <>
        {posts
          // The `sort` method can be conveniently used with function expressions:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
          .sort((a, b) => +parseISO(b.date) - +parseISO(a.date))
          .map((post) => (
            <article key={post.id}>
              <header>
                <Link href={`/writing/${post.id}`}>
                  <h2 className={styles.title}>{post.title}</h2>
                </Link>{" "}
                <small>{format(parseISO(post.date), "MMMM d, yyyy")}</small>
              </header>
            </article>
          ))}
      </>
    </Page>
  );
}
