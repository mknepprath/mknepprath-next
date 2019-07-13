import React from "react";
import Link from "next/link";
import Head from "../components/head";
import Nav from "../components/nav";
import Footer from "../components/footer";

import { projectLinks } from "../utils/links";

import "./index.css";

export default () => (
  <div>
    <Head title="Michael Knepprath, Developer &amp; Designer" />
    <Nav />

    <div className={"hero"}>
      <h1 className={"title"}>
        <span>Hello!</span>
        <br />I design & develop things for the internet.
      </h1>
    </div>

    <div className={"row"}>
      {projectLinks.map(link => (
        <Link href={link.href} key={link.label}>
          <a className={"card"} rel="noopener" target="_blank">
            {link.imgSrc ? (
              <img alt={link.label} className={"img"} src={link.imgSrc} />
            ) : null}
            <div>
              <h3>
                {link.label} <span className={"arrow"}>&rarr;</span>
              </h3>
              <p>{link.description}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>

    <Footer />
  </div>
);
