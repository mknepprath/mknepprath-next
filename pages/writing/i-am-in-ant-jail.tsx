import BlogPage from "core/blog-page";

export const meta = {
  publishedAt: "2020-06-21",
  title: "oh my god i am in ant jail",
};

export default () => (
  <BlogPage dateTime={meta.publishedAt} title={meta.title}>
    <header>
      <h1>{meta.title}</h1>
    </header>

    {/*
        TODO: Put this into a component
        Interface: name, username, tweet ID, date
        Script can be move to page-level
      */}
    <blockquote>
      <p>oh my god i am in ant jail</p>
      &mdash; Devon Ko (@3dfordesigners){" "}
      <a href="https://twitter.com/3dfordesigners/status/954103363918028801">
        January 18, 2018
      </a>
    </blockquote>
  </BlogPage>
);
