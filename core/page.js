import Footer from "core/footer";
import Head from "core/head";
import Nav from "core/nav";

export default ({ children, className, description, ogImage, title, url }) => (
  <div className={className}>
    <Head title={title} description={description} url={url} ogImage={ogImage} />
    <Nav />
    {children}
    <Footer />
  </div>
);
