import classnames from "classnames";

import Card from "core/card";
import Footer from "core/footer";
import Head from "core/head";
import Nav from "core/nav";

import { projectLinks } from "data/links";

import styles from "./index.css";

export default () => (
  <>
    <Head />
    <Nav className={"container"} />

    <div className={classnames("container", styles.hero)}>
      <h1 className={styles.greeting}>
        <span>Hello!</span>
        <br />I design & develop things for the internet.
      </h1>
    </div>

    <div className={classnames("container", styles.grid)}>
      {projectLinks.map(({ description, href, imgSrc, title }) => (
        <Card
          description={description}
          href={href}
          imgSrc={imgSrc}
          key={title}
          title={title}
        />
      ))}
    </div>

    <Footer className={"container"} />
  </>
);
