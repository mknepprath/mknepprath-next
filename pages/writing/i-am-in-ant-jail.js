import Head from "next/head";

import Page from "../../core/page";

export default () => (
  <Page>
    <Head>
      <title key="title">oh my god i am in ant jail</title>
    </Head>

    <div className={"blog-container container"}>
      <h1>Lilt</h1>
      <p className={"blog-time"}>
        <time dateTime="2019-07-22">July 22, 2019</time>
      </p>
      {/*
        TODO: Put this into a component
        Interface: name, username, tweet ID, date
        Script can be move to page-level
      */}
      <blockquote>
        <p>oh my god i am in ant jail</p>
        &mdash; Devon Ko (@3dfordesigners){" "}
        <a href="https://twitter.com/3dfordesigners/status/954103363918028801">
          January 18, 2018
        </a>
      </blockquote>
    </div>
  </Page>
);
