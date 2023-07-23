import BlogPage from "@core/blog-page";

export const meta: Meta = {
  published: false,
  publishedAt: "2013-10-17",
  title: "Embed Facebook Posts",
};

export default function EmbedFacebookPosts(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        Facebook’s been releasing a lot of small updates to their platform,
        including hashtags and the ability to upload photos with your comments.
        Here’s one that snuck under my radar: embeddable Facebook posts. Twitter
        has had a similar feature for quite some time, and I know it has seen
        its fair share of use on blogs and news sites, so I’m not surprised to
        see this.
      </p>
    </BlogPage>
  );
}
