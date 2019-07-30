import Footer from "core/footer";
import Head from "core/head";
import Nav from "core/nav";

export default ({ children, className }) => (
  <div className={className}>
    <Head />
    <Nav />
    {children}
    <Footer />
  </div>
);
