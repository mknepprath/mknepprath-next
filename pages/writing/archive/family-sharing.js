import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page>
    <Head>
      <title key="title">The Significance of Family Sharing</title>
    </Head>

    <div className={"blog-container container"}>
      <h1>The Significance of Family Sharing</h1>

      <p>
        Apple announced a new feature during WWDC called{" "}
        <a href="http://www.apple.com/ios/ios8/family-sharing">
          Family Sharing
        </a>{" "}
        that will “bring harmony to your family’s digital life” by allowing up
        to six users share apps they buy using the same credit card. This is a
        genius play, but not all the reasons are obvious.
      </p>
      <p>
        For one thing, people were sharing their Apple IDs with family and
        friends to do this, anyway. While this caused some confusion within the
        accounts, it was worth it to save some money through not having to buy
        the same app for each family member. How Apple reacted to this behavior
        is telling — rather than doing the obvious by trying to prevent people
        from “cheating the system,” they’ve endorsed it by officially allowing
        family to share apps among each other for free.
      </p>
      <p>
        But isn’t this potentially cutting developers’ revenue by a significant
        amount? No, and I believe the opposite could be true. It’s far easier to
        justify buying an app for six people than one. Anyone sharing their ID
        before will continue their current (and now sanctioned) behavior, while
        those who weren’t may now consider buying apps that they wouldn’t have
        otherwise.
      </p>
      <p>
        This is also great for Apple, because now that they’ve officially
        addressed customers’ desire to share apps, they’ve brought it into their
        realm of control — and can build upon it. Work on this has already
        begun. My favorite slide from the announcement of Family Sharing is
        pictured above.
      </p>
      <p>
        I love Family Sharing. It shows that Apple is very much in-touch with
        how their platform is being used, is making smart decisions, and is
        willing to make sacrifices for a better customer experience.
      </p>

      <p className={"blog-time"}>
        <time dateTime="2014-06-04">June 4, 2014</time>
      </p>
    </div>
  </Page>
);
