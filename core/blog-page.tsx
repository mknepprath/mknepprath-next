import BlogNav from "@core/blog-nav";
import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
import TwitterMetrics from "@core/twitter-metrics";
import classnames from "classnames";
import { formatDistanceToNow, parseISO } from "date-fns";
import Prism from "prismjs";
import React from "react";
import useSWR from "swr";

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
}: Props): JSX.Element {
  React.useEffect(() => {
    if (highlightCode) Prism.highlightAll();
  }, [highlightCode]);

  const { data: tweet } = useSWR(`/api/v1/tweet/${tweetId}`, fetcher);

  return (
    <div className={classnames("container", className)}>
      <Head title={title} description={description} ogImage={ogImage} />
      <Nav />

      <article>
        {children}
        <p className="blog-meta">
          <time dateTime={dateTime}>
            Published {formatDistanceToNow(parseISO(dateTime))} ago
          </time>
          {tweet?.data ? (
            <TwitterMetrics tweetId={tweetId} {...tweet.data.public_metrics} />
          ) : (
            ""
          )}
        </p>
      </article>

      <BlogNav />
      <Footer />
    </div>
  );
}
