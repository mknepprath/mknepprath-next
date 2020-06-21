import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2013-12-12",
  title: "IFTTT Adds iOS Location"
};

export default () => (
  <BlogPage dateTime={meta.publishedAt} title={meta.title}>
    <header>
      <h1>{meta.title}</h1>
    </header>

    <p>
      <a href="http://www.mknepprath.com/ifttt/">IFTTT</a> introduced a new
      channel today: iOS Location. Yep, this means you can make your other
      channels interact with where you are located at any time. Want your lights
      to automatically turn on when you get home? Track when you arrive or leave
      from work? Send your spouse a text when you’re heading home? IFTTT can
      automate all of that. Pretty cool, huh?
    </p>
  </BlogPage>
);
