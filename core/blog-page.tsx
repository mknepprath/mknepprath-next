import React from "react";
import classnames from "classnames";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import Prism from "prismjs";
import useSWR from "swr";

import A from "core/a";
import BlogNav from "core/blog-nav";
import Footer from "core/footer";
import Head from "core/head";
import RepliesIcon from "core/icon-replies";
import Nav from "core/nav";

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
            <>
              {tweet?.data?.public_metrics.like_count ? (
                <A href={`https://twitter.com/mknepprath/status/${tweetId}`}>
                  ♥ {tweet?.data?.public_metrics.like_count} likes
                </A>
              ) : null}
              {tweet?.data?.public_metrics.reply_count ? (
                <A href={`https://twitter.com/mknepprath/status/${tweetId}`}>
                  <RepliesIcon /> {tweet?.data?.public_metrics.reply_count}{" "}
                  replies
                </A>
              ) : null}
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
