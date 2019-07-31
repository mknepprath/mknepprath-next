import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">Embed Facebook Posts</title>
    </Head>

    <article>
      <header>
        <h1>Embed Facebook Posts</h1>
      </header>

      <p>
        Facebook’s been releasing a lot of small updates to their platform,
        including hashtags and the ability to upload photos with your comments.
        Here’s one that snuck under my radar: embeddable Facebook posts. Twitter
        has had a similar feature for quite some time, and I know it has seen
        its fair share of use on blogs and news sites, so I’m not surprised to
        see this.
      </p>

      <p>
        <time dateTime="2013-10-17">October 17, 2013</time>
      </p>
    </article>
  </Page>
);
