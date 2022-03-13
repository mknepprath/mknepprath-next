import BlogPage from "@core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2013-09-24",
  title: "iPhone Naming Conventions",
};

export default function IphoneNamingConventions(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        Listening to the latest{" "}
        <a href="https://web.archive.org/web/20131026111646/http://www.muleradio.net/thetalkshow/">
          Talk Show
        </a>
        , I heard Gruber give his prediction for where Apple will go with future
        iPhone names. His prediction: iPhone 6 on top, then iPhone CS, then 5C
        free with a plan. My prediction for 2014: iPhone 6 on top, then the 5S,
        then the 5C free with a plan. Then in 2015 we’ll see a 6S on top, 6C,
        5S. See how the C-series alternates between the bottom two tiers each
        year? If the pattern continues it would look like this… 2016: 7, 6S, 6C,
        2017: 7S, 7C, 6S.
      </p>
    </BlogPage>
  );
}
