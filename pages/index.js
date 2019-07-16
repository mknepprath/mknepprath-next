import React from "react";
import Link from "next/link";

import Card from "../core/card";
import Footer from "../core/footer";
import Head from "../core/head";
import Nav from "../core/nav";

import { projectLinks } from "../utils/links";

import styles from "./index.css";

export default () => (
  <div>
    <Head title="Michael Knepprath, Developer &amp; Designer" />
    <Nav />

    <div className={styles.hero}>
      <h1 className={styles.title}>
        <span>Hello!</span>
        <br />I design & develop things for the internet.
      </h1>
    </div>

    <div className={styles.row}>
      {projectLinks.map(({ description, href, imgSrc, label }) => (
        <Card
          description={description}
          href={href}
          imgSrc={imgSrc}
          key={label}
          label={label}
        />
      ))}
    </div>

    <Footer />
  </div>
);
