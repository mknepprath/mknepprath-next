// External
import parseISO from "date-fns/parseISO";
import Link from "next/link";
import { withRouter } from "next/router";
import PropTypes from "prop-types";

// Components
import Page from "core/page";

// Data
import posts from "data/posts";

import styles from "./writing.css";

const Writing = ({ posts, router }) => (
  <Page className="container" title="Michael Knepprath, Occasional Writer">
    <header>
      <h1>Writing</h1>
    </header>

    <main>
      {posts
        // Including this query param will display all posts.
        // https://mknepprath.com/writing?all=true
        .filter(post => post.published || router.query.all)
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
              <small>
                {post.date}
                {/* If displaying all posts, label the unpublished ones. */}
                {router.query.all && (post.published ? "" : " • Unlisted")}
              </small>
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
  posts: PropTypes.array,
  router: PropTypes.shape({
    query: PropTypes.object.isRequired
  }).isRequired
};

export default withRouter(Writing);
