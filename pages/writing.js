// External
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import Link from "next/link";
import PropTypes from "prop-types";

// Components
import Page from "core/page";

// Data
import posts from "data/posts";

import styles from "./writing.module.css";

const Writing = ({ posts }) => (
  <Page className="container" title="Michael Knepprath, Occasional Writer">
    <header>
      <h1>Writing</h1>
    </header>

    <main>
      {posts
        // The `sort` method can be conveniently used with function expressions:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        .sort((a, b) => parseISO(b.date) - parseISO(a.date))
        .map(post => (
          <article key={post.id}>
            <header>
              <Link href={`/writing/${post.id}`}>
                <a>
                  <h2 className={styles.title}>{post.title}</h2>
                </a>
              </Link>{" "}
              <small>{format(parseISO(post.date), "MMMM d, yyyy")}</small>
            </header>
          </article>
        ))}
    </main>
  </Page>
);

Writing.defaultProps = {
  posts: []
};

Writing.getInitialProps = () => {
  return { posts };
};

Writing.propTypes = {
  posts: PropTypes.array
};

export default Writing;
