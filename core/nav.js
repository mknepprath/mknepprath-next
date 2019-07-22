import classnames from "classnames";
import Link from "next/link";

import { navLinks } from "../utils/links";

import styles from "./nav.css";

export default () => (
  <nav className={classnames("container", styles.nav)}>
    <a className={styles.siteLogo} href={"/"}>
      <img
        alt={"Michael Knepprath Memoji"}
        className={styles.img}
        src={"/static/memoji.png"}
      />
      <span>M. Knepprath</span>
    </a>
    <ul>
      {navLinks.map(({ href, key, title }) => (
        <li key={key}>
          <a href={href} rel={"noopener"} target={"_blank"}>
            {title}
          </a>
        </li>
      ))}
      {/* Internal links - we can use Next's Link here. */}
      <li>
        <Link href={"/blog"}>
          <a>Writing</a>
        </Link>
      </li>
      <li>
        <Link href={"/about"}>
          <a>About</a>
        </Link>
      </li>
    </ul>
  </nav>
);
