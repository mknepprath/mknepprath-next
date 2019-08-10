// External
import parse from "date-fns/parse";
import Link from "next/link";
import { withRouter } from "next/router";
import PropTypes from "prop-types";

// Data
import posts from "data/posts";

import styles from "./blog-nav.css";

const sortedPosts = posts
  .filter(post => post.published)
  // The `sort` method can be conveniently used with function expressions:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  .sort((a, b) => parse(b.date) - parse(a.date));

const BlogNav = props => {
  const postIndex = sortedPosts.findIndex(
    post => post.id === props.router.pathname.replace("/writing/", "")
  );

  const nextPost = sortedPosts[postIndex - 1];
  const prevPost = sortedPosts[postIndex + 1];

  return (
    <div className={styles.container}>
      {postIndex > 0 ? (
        <Link href={`/writing/${nextPost.id}`}>
          <a>&larr; {nextPost.title}</a>
        </Link>
      ) : null}{" "}
      {postIndex < sortedPosts.length - 1 ? (
        <Link href={`/writing/${prevPost.id}`}>
          <a>{prevPost.title} &rarr;</a>
        </Link>
      ) : null}
    </div>
  );
};

BlogNav.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(BlogNav);
