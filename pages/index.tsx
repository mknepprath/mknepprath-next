// External
import classnames from "classnames";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import Link from "next/link";

// Components
import Card from "core/card";
import Footer from "core/footer";
import Head from "core/head";
import Nav from "core/nav";

// Data
import { projectLinks } from "data/links";
import posts from "data/posts";

import styles from "./index.module.css";

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
        // The `sort` method can be conveniently used with function expressions:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        .sort((a, b) => +parseISO(b.date) - +parseISO(a.date))
        // Only display first 5 posts.
        .slice(0, 5)
        .map((post) => (
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
    </div>

    <div className={classnames("container", styles.projectContainer)}>
      <h2>Projects</h2>
      <div className={styles.cardContainer}>
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
    </div>

    <Footer className="container" />
  </>
);
