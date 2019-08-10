import classnames from "classnames";
import { distanceInWordsToNow, format } from "date-fns";
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
  url
}) => (
  <div className={classnames("container", className)}>
    <Head title={title} description={description} url={url} ogImage={ogImage} />
    <Nav />

    <article>
      {children}
      <p>
        <time dateTime={dateTime}>
          {format(dateTime, "MMMM Do, YYYY")} • {distanceInWordsToNow(dateTime)}{" "}
          ago
        </time>
      </p>
    </article>

    <BlogNav />
    <Footer />
  </div>
);

BlogPage.defaultProps = {
  className: "",
  description: "",
  ogImage: "",
  url: ""
};

BlogPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  className: PropTypes.string,
  dateTime: PropTypes.string.isRequired,
  description: PropTypes.string,
  ogImage: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default BlogPage;
