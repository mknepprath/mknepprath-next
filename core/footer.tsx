import React from "react";
import classnames from "classnames";
import Link from "next/link";

import styles from "./footer.module.css";

interface Props {
  className?: string;
}

export default function Footer({ className }: Props): React.JSX.Element {
  return (
    <footer className={classnames(styles.footer, className)}>
      <div className={styles.footerGrid}>
        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Explore</h4>
          <Link href="/writing" className={styles.footerLink}>Writing</Link>
          <Link href="/photography" className={styles.footerLink}>Photography</Link>
          <Link href="/films" className={styles.footerLink}>Films</Link>
          <Link href="/#projects" className={styles.footerLink}>Projects</Link>
          <Link href="/themes" className={styles.footerLink}>Themes</Link>
        </div>
        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Elsewhere</h4>
          <a href="https://github.com/mknepprath" className={styles.footerLink} rel="noopener noreferrer" target="_blank">GitHub</a>
          <a href="https://mastodon.social/@mknepprath" className={styles.footerLink} rel="noopener noreferrer" target="_blank">Mastodon</a>
          <a href="https://bsky.app/profile/mknepprath.com" className={styles.footerLink} rel="noopener noreferrer" target="_blank">Bluesky</a>
          <a href="https://letterboxd.com/mknepprath/" className={styles.footerLink} rel="noopener noreferrer" target="_blank">Letterboxd</a>
        </div>
        <div className={styles.footerCol}>
          <h4 className={styles.footerHeading}>Info</h4>
          <Link href="/about" className={styles.footerLink}>About</Link>
          <a href="mailto:mknepprath@gmail.com" className={styles.footerLink}>Contact</a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span className={styles.footerMeta}>
          Michael Knepprath
        </span>
      </div>
    </footer>
  );
}
