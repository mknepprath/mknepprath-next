// External
import parseISO from "date-fns/parseISO";
import Link from "next/link";
import { withRouter } from "next/router";
import PropTypes from "prop-types";

// Hooks
import useKeyPress from "hooks/useKeyPress";

// Data
import allPosts from "data/posts";

import styles from "./blog-nav.css";

const posts = allPosts
  // The `sort` method can be conveniently used with function expressions:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  .sort((a, b) => parseISO(b.date) - parseISO(a.date));

const BlogNav = ({ router }) => {
  const postIndex = posts.findIndex(
    post => post.id === router.pathname.replace("/writing/", "")
  );

  const nextPost = posts[postIndex - 1];
  const prevPost = posts[postIndex + 1];

  useKeyPress("ArrowLeft", () => {
    if (postIndex > 0) {
      router.push(`/writing/${nextPost.id}`);
    }
  });

  useKeyPress("ArrowRight", () => {
    if (postIndex < posts.length - 1) {
      router.push(`/writing/${prevPost.id}`);
    }
  });

  return (
    <div className={styles.container}>
      {postIndex > 0 ? (
        <Link href={`/writing/${nextPost.id}`}>
          <a>&larr; {nextPost.title}</a>
        </Link>
      ) : null}{" "}
      {postIndex < posts.length - 1 ? (
        <Link href={`/writing/${prevPost.id}`}>
          <a>{prevPost.title} &rarr;</a>
        </Link>
      ) : null}
    </div>
  );
};

BlogNav.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    push: PropTypes.function
  }).isRequired
};

export default withRouter(BlogNav);
