// External
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import Link from "next/link";

// Components
import Page from "@core/page";
// Data
import posts from "@data/posts";

// Styles
import styles from "./writing.module.css";

export default function Writing(): React.ReactNode {
  return (
    <Page title="Michael Knepprath, Occasional Writer">
      <header data-cy="writing-page">
        <h1>Writing</h1>
      </header>

      <main>
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
      </main>
    </Page>
  );
}
