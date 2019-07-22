import Head from "next/head";

import Page from "../../core/page";

export default () => (
  <Page>
    <Head>
      <title key="title">oh my god i am in ant jail</title>
    </Head>

    <div className={"container"}>
      <h1>Lilt</h1>

      <p>
        Once upon a time I made a game called Lilt which can be found on Twitter
        at @familiarlilt. You can play it there and stuff.
      </p>

      <h2>Cool Stuff</h2>
      <p>Here, I delve into cool stuff about Lilt and other things, too.</p>
      <h3>One Cool Stuff</h3>
      <p>So this goes into detail about one cool stuff about Lilt.</p>
    </div>
  </Page>
);
