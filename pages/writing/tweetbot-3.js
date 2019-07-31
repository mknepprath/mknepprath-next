import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">Tweetbot 3</title>
    </Head>

    <article>
      <header>
        <h1>Tweetbot 3</h1>
      </header>

      <p>
        It’s out! And it’s the first paid upgrade I’ve seen for iOS 7. Yes, this
        means that even if you own Tweetbot already, you will still have to pay
        to get Tweetbot 3. It’s $2.99 for a limited time, so if you plan on
        getting it… now is the time.
      </p>

      <img
        alt="Screenshot of Tweetbot 3 in the App Store"
        className="blog-image"
        src="/static/tweetbot-3.jpg"
      />

      <p>
        <time dateTime="2013-10-24">October 24, 2013</time>
      </p>
    </article>
  </Page>
);
