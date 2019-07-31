import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">Spotify App Adds Free Option</title>
    </Head>

    <article>
      <header>
        <h1>Spotify App Adds Free Option</h1>
      </header>

      <p>
        You can finally listen to all of your Spotify playlists on your phone
        without paying for Premium. Only one catch – you have to listen to them
        on shuffle. Not bad.
      </p>
      <p>
        In other news, I hear their desktop client just went through a major
        redesign. Haven’t seen it yet, but I look forward to doing so!
      </p>

      <p>
        <time dateTime="2013-12-19">December 19, 2013</time>
      </p>
    </article>
  </Page>
);
