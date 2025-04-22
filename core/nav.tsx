// External
// Data
import { navLinks } from "@data/links";
import classnames from "classnames";
import Image from "next/legacy/image";
import Link from "next/link";

import styles from "./nav.module.css";

interface Props {
  className?: string;
}

export default function Nav({ className }: Props) {
  return (
    <nav className={classnames(styles.nav, className)}>
      <a className={styles.siteLogo} href="/">
        <Image
          alt="Michael Knepprath Memoji"
          height={32}
          layout="fixed"
          priority
          src="/assets/mk-profile-pic.png"
          width={32}
        />
        <span>M. Knepprath</span>
      </a>
      <ul>
        {navLinks.map(({ href, key, title }) => (
          <li key={key}>
            <a href={href} rel="noopener noreferrer" target="_blank">
              {title}
            </a>
          </li>
        ))}
        {/* Internal links - we can use Next's Link here. */}
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
