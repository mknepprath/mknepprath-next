import React from "react";
import classnames from "classnames";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import Prism from "prismjs";
import useSWR from "swr";

import A from "core/a";
import BlogNav from "core/blog-nav";
import Footer from "core/footer";
import Head from "core/head";
import Nav from "core/nav";

const fetcher = (url: RequestInfo): Promise<Tweet> =>
  fetch(url).then((response) => response.json());

interface Tweet {
  data: {
    id: string;
    text: string;
    public_metrics: {
      like_count: number;
      quote_count: number;
      reply_count: number;
      retweet_count: number;
    };
  };
}

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
            {format(parseISO(dateTime), "MMMM d, yyyy")} •{" "}
            {formatDistanceToNow(parseISO(dateTime))} ago
          </time>
          {tweet?.data ? (
            <>
              {" "}
              •{" "}
              <A href={`https://twitter.com/mknepprath/status/${tweetId}`}>
                {tweet?.data?.public_metrics.like_count} likes
              </A>
            </>
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
