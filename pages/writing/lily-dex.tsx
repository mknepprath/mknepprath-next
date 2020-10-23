import Link from "next/link";
import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/2020-mid-year-1.jpg",
  published: false,
  publishedAt: "2020-10-23",
  summary: "Building and publishing a SwiftUI app",
  title: "lily dex",
};

export default () => (
  <BlogPage
    dateTime={meta.publishedAt}
    description={meta.summary}
    ogImage={meta.image}
    title={meta.title}
  >
    <header>
      <h1>{meta.title}</h1>
    </header>
    <p>
      Ay
    </p>
  </BlogPage>
);
