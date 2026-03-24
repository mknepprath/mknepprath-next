import BlogNav from "@core/blog-nav";
import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
import ReadingProgress from "@core/reading-progress";
import TwitterMetrics from "@core/twitter-metrics";
import classnames from "classnames";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import Prism from "prismjs";
import React from "react";
import useSWR from "swr";

import styles from "./blog-page.module.css";

const fetcher = (url: RequestInfo): Promise<Tweet> =>
  fetch(url).then((response) => response.json());

interface Props {
  children: React.ReactNode;
  className?: string;
  dateTime: string;
  description?: string;
  ogImage?: string;
  highlightCode?: boolean;
  title: string;
  tweetId?: string;
}

export default function BlogPage({
  children,
  className,
  dateTime,
  description,
  highlightCode,
  ogImage,
  title,
  tweetId,
}: Props): React.JSX.Element {
  React.useEffect(() => {
    if (highlightCode) Prism.highlightAll();
  }, [highlightCode]);

  const { data: tweet } = useSWR(`/api/v1/tweet/${tweetId}`, fetcher);

  return (
    <div className={classnames("container", styles.blogContainer, className)}>
      <Head title={title} description={description} ogImage={ogImage} />
      <ReadingProgress />
      <Nav />

      <article className={styles.article}>
        <header>
          <div className={styles.articleMeta}>
            Published {format(parseISO(dateTime), "MMMM d, yyyy")} ·{" "}
            {formatDistanceToNow(parseISO(dateTime))} ago
          </div>
          <h1 className={styles.articleTitle}>{title}</h1>
          <div className={styles.articleRule} />
        </header>
        <div className={styles.articleBody}>
          {children}
        </div>
        {tweet?.data ? (
          <TwitterMetrics tweetId={tweetId} {...tweet.data.public_metrics} />
        ) : null}
      </article>

      <BlogNav />
      <Footer />
    </div>
  );
}
