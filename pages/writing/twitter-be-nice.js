import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page>
    <Head>
      <title key="title">Twitter, Be Nice</title>
    </Head>

    <div className={"blog-container container"}>
      <h1>Twitter, Be Nice</h1>

      <p>
        Twitter’s been lucky and unique in that they own the entirety of a near
        ubiquitous type of messaging — the short form message. These streams of
        short form transmissions have become many people’s identity online.
        Watch the news and you’ll see the anchor’s Twitter handle featured as
        prominently as their name, and same goes for many sports players. This
        cannot be said about their Facebook username, or any other platform.
      </p>
      <p>
        This is great, and I love what has been accomplished with Twitter. I
        wonder, though, if Twitter is limiting its own platform at our expense.
        Put simply, many companies have created innovative products on top of
        Twitter who are then cut down as soon as Twitter recognizes them a
        threat to their own website and apps. My concern is that this system
        allows Twitter to stay on top without competing. As soon as an
        interesting or better way of consuming tweets comes along, Twitter
        doesn’t have to think twice about how their website or apps might be
        comparatively insufficient — they can just cut off the third party’s
        access to Twitter before most people notice what they’re missing.
      </p>
      <p>
        I bring all of this up, of course, because of{" "}
        <a href="http://meerkatapp.co">Meerkat</a>. Meerkat is built on Twitter
        and is going to be the big hit of SXSW this year. Twitter recently
        announced their acquisition of Periscope (a near clone of Meerkat), and
        subsequently cut off Meerkat’s access to Twitter’s social graph. While I
        think Meerkat will be fine, the fact that Twitter could have won by
        doing this as opposed to offering a better product experience frustrates
        me.
      </p>
      <p>
        I’m not sure if anything can be done about it, but Twitter — please give
        3rd party developers a fair shake. It will do nothing but help your
        platform in the end.
      </p>

      <p className={"blog-time"}>
        <time dateTime="2015-03-14">March 14, 2015</time>
      </p>
    </div>
  </Page>
);
