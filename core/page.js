import Footer from "../core/footer";
import Head from "../core/head";
import Nav from "../core/nav";

import "./global.css";

export default ({ children }) => (
  <>
    <Head />
    <Nav />
    {children}
    <Footer />
  </>
);
