import classnames from "classnames";

import TwitterIcon from "../core/icon-twitter";

import { footerLinks } from "../utils/links";

import styles from "./footer.css";

export default () => (
  <nav className={classnames("container", styles.footer)}>
    <span className={styles.footerMeta}>
      Created by Michael Knepprath •
      <a
        href={"https://github.com/mknepprath/mknepprath-next"}
        rel={"noopener"}
        target={"_blank"}
      >
        View on GitHub
      </a>
    </span>
    <ul>
      <li>
        <a
          aria-label={"Twitter"}
          className={styles.twitter}
          href={"https://twitter.com/mknepprath"}
          title={"The Bird Site"}
        >
          <TwitterIcon />
        </a>
      </li>
      {footerLinks.map(({ href, key, title }) => (
        <li key={key}>
          <a href={href} rel={"noopener"} target={"_blank"} title={title}>
            {title}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
