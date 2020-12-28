import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2013-12-12",
  title: "Instagram Direct",
};

export default function InstagramDirect(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        Instagram’s introduced it’s new direct messaging feature, along with
        some other iOS 7-y UI changes. It’s similar to Facebook Messenger in
        that it tells you when others have seen the photo you shared with them.
        Does anyone actually like read receipts?
      </p>
    </BlogPage>
  );
}
