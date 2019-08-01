import Page from "core/page";

export default () => (
  <Page className={"container"} title={"Instagram Direct"}>
    <article>
      <header>
        <h1>Instagram Direct</h1>
      </header>

      <p>
        Instagram’s introduced it’s new direct messaging feature, along with
        some other iOS 7-y UI changes. It’s similar to Facebook Messenger in
        that it tells you when others have seen the photo you shared with them.
        Does anyone actually like read receipts?
      </p>

      <p>
        <time dateTime="2013-12-12">December 12, 2013</time>
      </p>
    </article>
  </Page>
);
