// Archival link:
// https://web.archive.org/web/20140127084100/http://www.mknepprath.com/vine-introduces-web-profiles/

import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">Vine Introduces Web Profiles</title>
    </Head>

    <article>
      <header>
        <h1>Vine Introduces Web Profiles</h1>
      </header>

      <p>
        I wonder if <a href="https://vine.co/">Vine</a>
        ‘s web profiles will do better than Instagram’s. Does anyone visit
        those? Vine’s announcement comes with a new feature: TV mode. This blows
        up the Vines to the size of your browser and plays them in sequence.
      </p>

      {/* TODO: Get screenshot from archival link. */}

      <p>
        <time dateTime="2014-01-03">January 3, 2014</time>
      </p>
    </article>
  </Page>
);
