// External
import classnames from "classnames";
import parse from "date-fns/parse";
import Link from "next/link";

// Components
import Card from "core/card";
import Footer from "core/footer";
import Head from "core/head";
import Nav from "core/nav";

// Data
import { projectLinks } from "data/links";
import posts from "data/posts";

import styles from "./index.css";

export default () => (
  <>
    <Head />
    <Nav className="container" />

    <div className={classnames("container", styles.hero)}>
      <h1 className={styles.greeting}>
        <span>Hello!</span>
        <br />I design & develop things for the internet.
      </h1>
    </div>

    <div className="container">
      {posts
        // Including this query param will display all posts.
        // https://mknepprath.com/writing?all=true
        .filter(post => post.published)
        // The `sort` method can be conveniently used with function expressions:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        .sort((a, b) => parse(b.date) - parse(a.date))
        // Only display first 5 posts.
        .slice(0, 5)
        .map(post => (
          <article key={post.id}>
            <header>
              <Link href={`/writing/${post.id}`}>
                <a>
                  <h2 className={styles.title}>{post.title}</h2>
                </a>
              </Link>{" "}
              <small>{post.date}</small>
            </header>
          </article>
        ))}
    </div>

    <div className={classnames("container", styles.cardContainer)}>
      {projectLinks.map(({ description, href, imgSrc, title }) => (
        <Card
          description={description}
          href={href}
          imgSrc={imgSrc}
          key={title}
          title={title}
        />
      ))}
    </div>

    <Footer className="container" />
  </>
);
