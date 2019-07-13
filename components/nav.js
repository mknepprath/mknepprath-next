import React from "react";
import Link from "next/link";

import { navLinks } from "../utils/links";

import "./nav.css";

const Nav = () => (
  <nav className={"nav"}>
    <a className={"site-logo"} href={"/"}>
      <img
        alt={"Michael Knepprath Memoji"}
        className={"img"}
        src={"/static/memoji.png"}
      />
      <span>M. Knepprath</span>
    </a>
    <ul>
      {navLinks.map(({ href, key, label }) => (
        <li key={key}>
          <Link href={href}>
            <a
              rel={label === "About" ? "" : "noopener"}
              target={label === "About" ? "" : "_blank"}
            >
              {label}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
