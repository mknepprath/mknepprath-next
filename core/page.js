import PropTypes from "prop-types";

import Footer from "core/footer";
import Head from "core/head";
import Nav from "core/nav";

const Page = ({ children, className, description, ogImage, title }) => (
  <div className={className}>
    <Head title={title} description={description} ogImage={ogImage} />
    <Nav />
    {children}
    <Footer />
  </div>
);

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  className: PropTypes.string,
  description: PropTypes.string,
  ogImage: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Page;
