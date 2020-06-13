import classnames from "classnames";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";
import PropTypes from "prop-types";

import BlogNav from "core/blog-nav";
import Footer from "core/footer";
import Head from "core/head";
import Nav from "core/nav";

const BlogPage = ({
  children,
  className,
  dateTime,
  description,
  ogImage,
  title,
  url,
}) => (
  <div className={classnames("container", className)}>
    <Head title={title} description={description} url={url} ogImage={ogImage} />
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

BlogPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  className: PropTypes.string,
  dateTime: PropTypes.string.isRequired,
  description: PropTypes.string,
  ogImage: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default BlogPage;
