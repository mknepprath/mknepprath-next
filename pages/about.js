import classnames from "classnames";

import Page from "core/page";
import PhotoStack from "core/photo-stack";

import styles from "./about.css";

export default () => (
  <Page
    className={classnames("container", styles.pageContainer)}
    title="About Michael Knepprath"
  >
    <article>
      <header>
        <h1>About</h1>
      </header>

      <div className={styles.photoStackContainer}>
        <PhotoStack />
      </div>

      <p>
        Michael Knepprath is a Software Engineer at{" "}
        <a href="https://www.walmartlabs.com" target="_blank">
          Walmart Labs
        </a>
        . He loves the point at which technology and art converge: technology,
        design, film, video games, and so on.
      </p>

      <h2>Contact</h2>
      <p>
        You can contact him via{" "}
        <a href="mailto:michael@mknepprath.com">email</a> or send a message on{" "}
        <a href="https://twitter.com/mknepprath" target="_blank">
          Twitter
        </a>
        .
      </p>
    </article>
  </Page>
);
