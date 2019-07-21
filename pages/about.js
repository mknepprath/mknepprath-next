import classnames from "classnames";

import Footer from "../core/footer";
import Head from "../core/head";
import Nav from "../core/nav";

import styles from "./about.css";

export default () => (
  <div>
    <Head title="About Michael Knepprath" />
    <Nav />

    <div className={classnames("container", styles.main)}>
      <img alt="A photo of Michael Knepprath" src="/static/about.jpg" />

      <h1>About</h1>
      <p>
        Michael Knepprath is a Software Engineer at{" "}
        <a href="https://www.walmartlabs.com" target="_blank">
          Walmart Labs
        </a>
        . He loves the point at which technology and art converge: technology,
        design, film, video games, and so on.
      </p>

      <h3>Contact</h3>
      <p>
        You can contact him via{" "}
        <a href="mailto:michael@mknepprath.com">email</a> or send a message on{" "}
        <a href="https://twitter.com/mknepprath" target="_blank">
          Twitter
        </a>
        .
      </p>
    </div>

    <Footer />
  </div>
);
