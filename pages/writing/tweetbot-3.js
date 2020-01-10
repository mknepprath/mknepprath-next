import BlogPage from "core/blog-page";

export const meta = {
  publishedAt: "2013-10-24",
  title: "Tweetbot 3"
};

export default () => (
  <BlogPage dateTime={meta.publishedAt} title={meta.title}>
    <header>
      <h1>{meta.title}</h1>
    </header>

    <p>
      It’s out! And it’s the first paid upgrade I’ve seen for iOS 7. Yes, this
      means that even if you own Tweetbot already, you will still have to pay to
      get Tweetbot 3. It’s $2.99 for a limited time, so if you plan on getting
      it… now is the time.
    </p>

    <img
      alt="Screenshot of Tweetbot 3 in the App Store"
      className="blog-image"
      src="/assets/tweetbot-3.jpg"
    />
  </BlogPage>
);
