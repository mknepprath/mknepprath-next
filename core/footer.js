import React from "react";

import TwitterIcon from "../core/icon-twitter";

import { footerLinks } from "../utils/links";

import styles from "./footer.css";

export default () => (
  <nav className={styles.footer}>
    <p className={styles.footerMeta}>
      Created by Michael Knepprath •
      <a
        href="https://github.com/mknepprath/mknepprath-next"
        rel="noopener"
        target="_blank"
      >
        View on GitHub
      </a>
    </p>
    <ul>
      <li>
        <a
          aria-label="Twitter"
          className={styles.twitter}
          href="https://twitter.com/mknepprath"
          title="The Bird Site"
        >
          <TwitterIcon />
        </a>
      </li>
      {footerLinks.map(({ href, key, label }) => (
        <li key={key}>
          <a href={href} rel="noopener" target="_blank" title={label}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);
