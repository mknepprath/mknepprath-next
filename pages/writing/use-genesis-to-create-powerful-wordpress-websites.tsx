import BlogPage from "@core/blog-page";

export const meta = {
  publishedAt: "2012-07-26",
  title: "Use Genesis to Create Powerful WordPress Websites",
};

export default function GenesisFramework(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        The company I work for recently purchased the{" "}
        <a href="http://www.studiopress.com/themes/genesis">
          Genesis Framework
        </a>{" "}
        and <a href="http://www.studiopress.com/pro-plus">Pro Plus Package</a>{" "}
        from <a href="http://www.studiopress.com/">StudioPress</a>, and I have
        to say, I am extremely excited about using them. I recently came across{" "}
        <a href="http://www.studiopress.com/features#top">this awesome page</a>{" "}
        detailing all of the features of Genesis.
      </p>
      <p>I’d like to pick out my favorites and add a few insights of my own.</p>
      <ol>
        <li>
          <b>It’s optimized for search engines. </b>It doesn’t take long to
          discover how important SEO is. Luckily, StudioPress has optimized
          Genesis to best take advantage of Google and the like. I’m not a pro
          at SEO, so I love this feature.
        </li>
        <li>
          <b>There are tons of easily customizable themes available.</b>
          There are a large number of themes already developed for this
          framework, all of which can be customized quite easily with widgets,
          theme options, images, etc. I’ve already taken a look at the
          stylesheet of one of these Genesis websites, and it was all laid out
          and organized beautifully.
        </li>
        <li>
          <b>Unlimited everything, including updates. </b>Many companies that
          deal with WordPress require that you pay for the next iteration of
          their theme. If you don’t, you run the risk of your website becoming
          out-of-date. That’s why I’m a fan of the Genesis model: you pay for a
          theme and you get unlimited updates and support. The support has
          already been invaluable for me, as well. I’ve run into a few issues,
          and they’ve helped me resolve them within a day.
        </li>
        <li>
          <b>There are widgets built specifically for these themes.</b>
          This one truly blew my mind. StudioPress actually developed widgets
          optimized for Genesis. These include Latest Tweets, Featured Post,
          Featured BlogPage, User Profile, and eNews and Updates. I’ve used
          most, if not all of these, and they all work beautifully.
        </li>
        <li>
          <b>The design is wonderful.</b> StudioPress knows what they’re doing
          when it comes to design. Everything looks great, and all themes start
          out looking very nice as well. Of course, you will want to change many
          of the graphics on these sites, but they give you a great head start,
          anyway.
        </li>
      </ol>
      <p>
        Genesis is killer. If you can afford the $349.95 for the Pro Plus
        Package, it’s well worth the $1150 worth of themes you receive. As I
        become more familiar with the Genesis Framework, I’m sure you’ll see
        more posts on the topic. Let me know if you have any questions about
        Genesis!
      </p>
    </BlogPage>
  );
}
