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

      <img
        alt="Dynoland status"
        className="blog-image"
        src="https://minecraft.meloncube.net/index.php?r=status/1573.png"
      />

      <p>
        We have a{" "}
        <a href="https://www.facebook.com/groups/dynoland/">Facebook page</a>.
      </p>
    </article>
  </Page>
);
