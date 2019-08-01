import Page from "core/page";

export default () => (
  <Page className={"container"} title={"Google’s Icons On iOS"}>
    <article>
      <header>
        <h1>Google’s Icons On iOS</h1>
      </header>

      <p>
        Google spent all year unifying their iOS icons with a consistent ridge
        running along the bottom of each. Then iOS 7 came out and the shape of
        the app icons changed. What a mess. Some are fixed, others are still
        amiss. My opinion? It’s time to ditch the ridge. Google Maps is the only
        one that looks good on my phone anymore.
      </p>

      <img
        alt="Google's icons on iOS"
        className="blog-image"
        src="/static/googles-icons-on-ios.jpg"
      />

      <p>
        <time dateTime="2013-10-25">October 25, 2013</time>
      </p>
    </article>
  </Page>
);
