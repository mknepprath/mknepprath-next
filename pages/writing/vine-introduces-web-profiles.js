// Archival link:
// https://web.archive.org/web/20140127084100/http://www.mknepprath.com/vine-introduces-web-profiles/

import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2014-01-03",
  title: "Vine Introduces Web Profiles"
};

export default () => (
  <BlogPage dateTime={meta.publishedAt} title={meta.title}>
    <header>
      <h1>{meta.title}</h1>
    </header>

    <p>
      I wonder if <a href="https://vine.co/">Vine</a>
      ‘s web profiles will do better than Instagram’s. Does anyone visit those?
      Vine’s announcement comes with a new feature: TV mode. This blows up the
      Vines to the size of your browser and plays them in sequence.
    </p>

    {/* TODO: Get screenshot from archival link. */}
  </BlogPage>
);
