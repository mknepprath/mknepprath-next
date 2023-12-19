import A from "@core/a";
import BlogPage from "@core/blog-page";

export const meta: Meta = {
  published: true,
  publishedAt: "2018-03-14",
  summary: "As featured in the Ultimate Guide to Small Business Web Design.",
  title: "Above All Else, Be Consistent",
};

export default function Consistency(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        A common trap small businesses fall into is letting their online
        presence grow stagnant. I’ve seen businesses set up blogs, Facebook
        pages, Twitter accounts, and more, only to have those same pages go for
        months or even years without updates. This is because it’s easy to
        underestimate how difficult it is to write a post once a day, or even
        once a week. While their goals are admirable, they aren’t achievable.
      </p>

      <h2>But it’s important!</h2>
      <p>
        Consistency is one of the most important factors when running a
        business, especially when it comes to blogging and social media. There
        is little more telling than a Twitter account that hasn’t been updated
        since 2016. Customers will think, “This business doesn’t appear to be
        active. I don’t think they’ll be very responsive if I have a question or
        need help.” This reflects poorly on you and your business.
      </p>

      <h2>How can I be consistent?</h2>
      <p>
        It’s important to start small. Set up a routine and add it to your
        schedule – for instance, in the case of a blog, two short paragraphs
        each week. If the goal seems too simple, that means it’s just right. The
        most important factor isn’t quantity, nor is it quality. It’s
        achievability – and from that follows consistency. Refine this process
        further by creating templates or outlines to work from. Automate as much
        as possible – use services like Hootsuite or Buffer to schedule and
        crosspost to all of your accounts. Once the consistency is the primary
        goal, momentum, quantity, and quality will follow.
      </p>

      <hr />

      <em>
        Crossposted to <A href="https://hookagency.com">Hook Agency</A>
        ’s blog post entitled,{" "}
        <A href="https://hookagency.com/web-design-basics/">
          Website Design Tips: Ultimate Guide to Small Business Web Design
        </A>
        .
      </em>
    </BlogPage>
  );
}
