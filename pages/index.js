import classnames from "classnames";

import Card from "core/card";
import Page from "core/page";

import { projectLinks } from "../utils/links";

import styles from "./index.css";

export default () => (
  <Page>
    <div className={classnames("container", styles.hero)}>
      <h1 className={styles.greeting}>
        <span>Hello!</span>
        <br />I design & develop things for the internet.
      </h1>
    </div>

    <div className={classnames("container", styles.row)}>
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
  </Page>
);
