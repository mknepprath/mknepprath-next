import BlogPage from "core/blog-page";

export default () => (
  <BlogPage
    dateTime="2013-01-11"
    title="Highlighting Apple's Most Serious Problem"
  >
    <header>
      <h1>Highlighting Apple's Most Serious Problem</h1>
    </header>

    <p>
      If you know me, you know I enjoy using Apple’s products. Whether it be the
      iPhone, iMac, iPad, iRefrigerator… I find the simplicity and elegance to
      be a breath of fresh air after exclusively working on PCs for the first 18
      years of my life. I do have one major issue with all of my iDevices
      however.
    </p>
    <p>First, let’s take a look at a sample of Apple app icons.</p>

    <img
      alt="Screenshot of iOS app icons with highlights"
      className="blog-image"
      src="/assets/highlighting-apple-1.png"
    />

    <p>
      Do you see it? Look closer. Closer. That’s right. Every single one of them
      has that hokey highlight stretching across the top/middle. All of these
      icons look dated and cheesy, and a big reason for that is this awful
      highlight. But wait. It gets worse.
    </p>

    <img
      alt="Screenshot of more iOS app icons with faux highlights"
      className="blog-image"
      src="/assets/highlighting-apple-2.png"
    />

    <p>
      It’s spreading like a virus! Let this be a lesson to you, app developers.
      Highlights are okay, just don’t use this one anymore.
    </p>
  </BlogPage>
);
