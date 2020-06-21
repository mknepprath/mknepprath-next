import BlogPage from "core/blog-page";

export const meta = {
  published: false,
  publishedAt: "2013-10-23",
  title: "Why Does Everyone Think Apple Plans On Releasing A Television Set?",
};

export default () => (
  <BlogPage dateTime={meta.publishedAt} title={meta.title}>
    <header>
      <h1>{meta.title}</h1>
    </header>

    <p>It's not going to happen.</p>
  </BlogPage>
);
