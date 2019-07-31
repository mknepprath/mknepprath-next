import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">iOS 7 Flashlight</title>
    </Head>

    <article>
      <header>
        <h1>iOS 7 Flashlight</h1>
      </header>

      <p>
        I submitted this subtle detail to{" "}
        <a href="http://littlebigdetails.com/">Little Big Details</a>, but I
        though it was worth sharing here as well. Apple sweats the details.
        (Hint: Look at the on/off switch on the flashlight.)
      </p>

      <img
        alt="Screenshot of the flashlight app icon in iOS 7"
        className="blog-image"
        src="/static/ios-7-flashlight.jpg"
      />

      <p>
        <time dateTime="2013-09-26">September 26, 2013</time>
      </p>
    </article>
  </Page>
);
