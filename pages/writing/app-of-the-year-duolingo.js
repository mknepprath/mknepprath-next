import BlogPage from "core/blog-page";

export default () => (
  <BlogPage dateTime="2013-12-20" title="App Of The Year: Duolingo">
    <header>
      <h1>App Of The Year: Duolingo</h1>
    </header>

    <p>
      This really is a cool app, and it’s gone through quite the transformation
      since it was first released to the App Store.{" "}
      <a href="https://web.archive.org/web/20140127084831/http://www.mknepprath.com/how-to-use-duolingo/">
        I wrote about the service
      </a>{" "}
      when it first came out as a website, which is also worth a look if you’re
      interested in learning a second language. They now offer courses on
      German, French, Spanish, Portuguese, and Italian.
    </p>

    <img
      alt="Screenshot of the app Duolingo"
      className="blog-image"
      src="/static/app-of-the-year-duolingo.jpg"
    />
  </BlogPage>
);
