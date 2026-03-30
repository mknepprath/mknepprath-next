import React from "react";
import classnames from "classnames";
import Image from "next/image";
import Link from "next/link";

import styles from "./nav.module.css";

interface Props {
  className?: string;
}

export default function Nav({ className }: Props): React.JSX.Element {
  return (
    <nav className={classnames(styles.nav, className)}>
      <a className={styles.siteLogo} href="/">
        <Image
          alt="Michael Knepprath Memoji"
          height={32}
          priority
          src="/assets/mk-profile-pic.png"
          width={32}
        />
        <span>M. Knepprath</span>
      </a>
      <ul>
        <li>
          <Link href="/writing">Writing</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}
