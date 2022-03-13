import classnames from "classnames";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import fetch from "isomorphic-unfetch";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

import Card from "@core/card";
import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
import Shot from "@core/shot";
import { projectLinks } from "@data/links";
import posts from "@data/posts";

import styles from "./index.module.css";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

export default function Home(): React.ReactNode {
  const { data: shots } = useSWR<Shot[]>(`/api/v1/dribbble`, fetcher);

  return (
    <>
      <Head />
      <Nav className="container" />

      <div className={classnames("container", styles.hero)}>
        <h1 className={styles.greeting}>
          <a
            href="https://youtu.be/5-CEGCXDVgI"
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
                      <div
                        className="fill-image bordered-image"
                        style={{ height: 200 }}
                      >
                        <Image
                          alt={`cover image for ${post.title}`}
                          className="corner-radius-8"
                          src={post.image}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    ) : null}
                    <h3 className={styles.title}>{post.title}</h3>
                  </a>
                </Link>{" "}
                <small>{format(parseISO(post.date), "MMMM d, yyyy")}</small>
              </header>
            </article>
          ))}
        {/* TODO: Make this look good. */}
        {/* <Link href="/writing">See more</Link> */}
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

      {shots?.length ? (
        <div className={classnames("container", styles.projectContainer)}>
          <h2>Illustrations</h2>
          <div className={styles.cardContainer}>
            {shots?.map(({ html_url, images, published_at, title }) => (
              <Shot
                description={format(parseISO(published_at), "MMMM d, yyyy")}
                href={html_url}
                imgSrc={images.normal}
                key={title}
                title={title}
              />
            ))}
          </div>
          {/* TODO: Make this look good. */}
          {/* <A href="https://dribbble.com/mknepprath">See more</A> */}
        </div>
      ) : null}

      <Footer className="container" />
    </>
  );
}
