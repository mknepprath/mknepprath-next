import React from "react";
import classnames from "classnames";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import Prism from "prismjs";

import BlogNav from "core/blog-nav";
import Footer from "core/footer";
import Head from "core/head";
import Nav from "core/nav";

interface Props {
  children: React.ReactNode;
  className?: string;
  dateTime: string;
  description?: string;
  ogImage?: string;
  highlightCode?: boolean;
  title: string;
}

export default function BlogPage({
  children,
  className,
  dateTime,
  description,
  highlightCode,
  ogImage,
  title,
}: Props) {
  React.useEffect(() => {
    if (highlightCode) Prism.highlightAll();
  }, []);

  return (
    <div className={classnames("container", className)}>
      <Head title={title} description={description} ogImage={ogImage} />
      <Nav />

      <article>
        {children}
        <p>
          <time dateTime={dateTime}>
            {format(parseISO(dateTime), "MMMM d, yyyy")} •{" "}
            {formatDistanceToNow(parseISO(dateTime))} ago
          </time>
        </p>
      </article>

      <BlogNav />
      <Footer />
    </div>
  );
}
