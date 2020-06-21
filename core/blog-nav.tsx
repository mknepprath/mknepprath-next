// External
import parseISO from "date-fns/parseISO";
import Link from "next/link";
import { withRouter } from "next/router";

// Hooks
import useKeyPress from "hooks/useKeyPress";

// Data
import allPosts from "data/posts";

// Styles
import styles from "./blog-nav.module.css";

const posts = allPosts
  // The `sort` method can be conveniently used with function expressions:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  .sort((a, b) => Number(parseISO(b.date)) - Number(parseISO(a.date)));

interface Props {
  router: {
    pathname: string;
    push: (pathname: string) => void;
  };
}

const BlogNav = ({ router }: Props) => {
  const postIndex = posts.findIndex(
    (post) => post.id === router.pathname.replace("/writing/", "")
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

export default withRouter(BlogNav);
