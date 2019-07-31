import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">Instagram For iOS 7</title>
    </Head>

    <article>
      <header>
        <h1>Instagram For iOS 7</h1>
      </header>

      <p>
        Let me preface this post by saying that I love redesigns and all of the
        apps that I’ve seen iOS 7 updates for have been great… until this one. I
        appreciate what they were trying to do, but this just feels rushed to
        me. None of the divider lines are necessary, they only serve to clutter
        up the UI. Also, why have the profile pictures been changed to circles?
        It’s not consistent with any of the other elements in this app.
      </p>
      <p>
        Designing for iOS 7 requires more than just flattening bubbly elements
        and pulling ideas straight from Apple’s new apps. Some apps, like{" "}
        <a href="https://medium.com/what-i-learned-building/b31868b76721">
          Mailbox
        </a>
        ,{" "}
        <a title="007" href="http://vesperapp.co/blog/vesper-1-007/#more-143">
          Vesper
        </a>
        , and <a href="http://www.realmacsoftware.com/clear/">Clear</a>, were
        essentially iOS 7 apps built for iOS 6, so they didn’t require many
        changes. Other apps were very iOS 6-y and required major overhauls.
        These include{" "}
        <a href="http://www.theverge.com/2013/9/18/4743908/evernote-ios-7-iphone-ipad-complete-redesign-update">
          Evernote
        </a>
        ,{" "}
        <a href="http://www.theverge.com/2013/9/20/4751892/best-new-apps-omnifocus-2">
          OmniFocus 2
        </a>
        , and{" "}
        <a href="http://blog.hipmunk.com/hipmunk-news-updated-android-and-ios-7-hipmunk-apps/">
          Hipmunk
        </a>
        . Instagram’s redesign is just a flattened iOS 6 app with little regard
        to simplifying or optimization.
      </p>

      <img
        alt="Screenshot of Instagram's redesign for iOS 7"
        className="blog-image"
        src="/static/instagram-for-ios-7.png"
      />

      <p className={"blog-time"}>
        <time dateTime="2013-09-26">September 26, 2013</time>
      </p>
    </article>
  </Page>
);
