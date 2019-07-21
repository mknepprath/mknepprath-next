import classnames from "classnames";

import Card from "../core/card";
import Footer from "../core/footer";
import Head from "../core/head";
import Nav from "../core/nav";

import { projectLinks } from "../utils/links";

import styles from "./index.css";

export default () => (
  <React.Fragment>
    <Head title="Michael Knepprath, Developer &amp; Designer" />
    <Nav />

    <div className={classnames("container", styles.hero)}>
      <h1 className={styles.greeting}>
        <span>Hello!</span>
        <br />I design & develop things for the internet.
      </h1>
    </div>

    <div className={classnames("container", styles.row)}>
      {projectLinks.map(({ description, href, imgSrc, label }) => (
        <Card
          description={description}
          href={href}
          imgSrc={imgSrc}
          key={label}
          label={label}
        />
      ))}
    </div>

    <Footer />
  </React.Fragment>
);
