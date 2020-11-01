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

export default function Home() {
  return (
    <>
      <Head />
      <Nav className="container" />

      <div className={classnames("container", styles.hero)}>
        <h1 className={styles.greeting}>
          <a
            href="https://twitter.com/mknepprath/status/1256722710308282369"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Hello!</span>
          </a>
          <br />I design & develop things for the internet.
        </h1>
      </div>

      <div className="container">
        <h2>Writing</h2>
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
                    {post.image ? (
                      <img
                        alt={`cover image for ${post.title}`}
                        className="blog-image bordered-image"
                        src={post.image}
                        style={{ maxHeight: 200, objectFit: "cover" }}
                      />
                    ) : null}
                    <h3 className={styles.title}>{post.title}</h3>
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
}
