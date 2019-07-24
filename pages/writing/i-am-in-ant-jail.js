import Head from "next/head";

import Page from "../../core/page";

export default () => (
  <Page>
    <Head>
      <title key="title">oh my god i am in ant jail</title>
    </Head>

    <div className={"blog-container container"}>
      <h1>Lilt</h1>
      {/*
        TODO: Put this into a component
        Interface: name, username, tweet ID, date
        Script can be move to page-level
      */}
      <blockquote
        className="twitter-tweet"
        data-dnt="true"
        data-link-color="#6abd9d"
      >
        <p lang="en" dir="ltr">
          oh my god i am in ant jail
        </p>
        &mdash; Devon Ko (@3dfordesigners){" "}
        <a href="https://twitter.com/3dfordesigners/status/954103363918028801">
          January 18, 2018
        </a>
      </blockquote>{" "}
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      />
    </div>
  </Page>
);
