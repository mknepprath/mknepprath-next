import BlogPage from "@core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2012-07-23",
  title: "Leverage the Combined Power of Your Services with IFTTT",
};

export default function Ifttt(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        <a href="https://ifttt.com">IFTTT</a> is a simple service that produces
        some rather incredible results. Because of IFTTT, I can post this blog
        and it will automatically be shared to Facebook, Twitter, and LinkedIn.
        I also get alerted about incoming rain through text, and new free mp3
        albums on Amazon through email.
      </p>
      <p>
        And this only hints at a few of the thousands of combinations you can
        create with your services.
      </p>
      <p>
        All of IFTTT is based on a single statement: If This Then That.
        Essentially, if one service does this (e.g. a new photo is tagged, a new
        article is posted, the weather changed), then do that (e.g. download the
        photo, share the article, text the weather). Here’s how IFTTT works:
      </p>
      <ol>
        <li>
          <b>Add your channels.</b> In order to work, you need to add your
          services to IFTTT. These services are called channels. Go the the
          Channels tab to add yours.
        </li>
        <li>
          <b>Use pre-built recipes.</b> When two services are combined like in
          the examples above, they are called a recipe. Many recipes have
          already been built and shared by others on the Browse page, the most
          popular being ‘When Facebook profile picture changes, update Twitter
          profile picture.’
        </li>
        <li>
          <b>Build your own recipes.</b> There are already a large number of
          recipes available, but if you can’t find the one you need, it’s
          possible to build your own. Click on the Create tab and follow the
          seven steps to get the results you are looking for.
        </li>
        <li>
          <b>Share your recipes.</b> If you needed to build a recipe to receive
          updates from Jugglers Anonymous in your email, then you’re probably
          not the only one. Share your recipe on IFTTT for others to use.
        </li>
      </ol>
      <p>
        The IFTTT team continues to add more services and features, so it’s
        smart to sign up for the newsletter with{" "}
        <a href="https://ifttt.com/applets/8363p">an IFTTT recipe</a> (of
        course).
      </p>
      <p>
        If you could combine any two of your services, which two would they be,
        and what would they do? Share the link to the recipe if you can create
        it!
      </p>
    </BlogPage>
  );
}
