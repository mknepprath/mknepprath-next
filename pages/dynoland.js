import classnames from "classnames";
import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">Dynoland</title>
    </Head>

    <article>
      <header>
        <h1>Dynoland</h1>
      </header>

      <p>Content here.</p>
    </article>
  </Page>
);
