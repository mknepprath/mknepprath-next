import React from "react";
import Link from "next/link";

import TwitterIcon from "../core/icon-twitter";

import { footerLinks } from "../utils/links";

import styles from "./footer.css";

export default () => (
  <nav className={styles.footer}>
    <p className={styles.footerMeta}>
      Created by Michael Knepprath •
      <Link href="https://github.com/mknepprath/mknepprath-next">
        <a rel="noopener" target="_blank">
          View on GitHub
        </a>
      </Link>
    </p>
    <ul>
      <li>
        <Link href="https://twitter.com/mknepprath">
          <a
            aria-label="Twitter"
            className={styles.twitter}
            title="The Bird Site"
          >
            <TwitterIcon />
          </a>
        </Link>
      </li>
      {footerLinks.map(({ href, key, label }) => (
        <li key={key}>
          <Link href={href}>
            <a rel="noopener" target="_blank" title={label}>
              {label}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
