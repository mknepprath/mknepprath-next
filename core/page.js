import PropTypes from "prop-types";

import Footer from "core/footer";
import Head from "core/head";
import Nav from "core/nav";

const Page = ({ children, className, description, ogImage, title, url }) => (
  <div className={className}>
    <Head title={title} description={description} url={url} ogImage={ogImage} />
    <Nav />
    {children}
    <Footer />
  </div>
);

Page.defaultProps = {
  className: "",
  description: "",
  ogImage: "",
  url: ""
};

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  className: PropTypes.string,
  description: PropTypes.string,
  ogImage: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default Page;
