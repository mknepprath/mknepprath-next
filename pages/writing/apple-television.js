import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">
        Why Does Everyone Think Apple Plans On Releasing A Television Set?
      </title>
    </Head>

    <article>
      <header>
        <h1>
          Why Does Everyone Think Apple Plans On Releasing A Television Set?
        </h1>
      </header>

      <p>It's not going to happen.</p>

      <p className={"blog-time"}>
        <time dateTime="2013-10-23">October 23, 2013</time>
      </p>
    </article>
  </Page>
);
