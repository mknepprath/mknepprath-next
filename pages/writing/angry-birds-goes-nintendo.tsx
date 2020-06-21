import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2013-12-16",
  title: "Angry Birds Goes Nintendo",
};

export default () => (
  <BlogPage dateTime={meta.publishedAt} title={meta.title}>
    <header>
      <h1>{meta.title}</h1>
    </header>

    <p>
      Rovio just released{" "}
      <a href="https://itunes.apple.com/us/app/angry-birds-go!/id642821482?mt=8">
        Angry Birds Go!
      </a>{" "}
      for iOS, and I wonder if their decision to develop this had anything to do
      with Nintendo saying they would never develop for mobile phones. The
      longer Nintendo waits, the more chances other developers will have to jump
      in and{" "}
      <a href="https://itunes.apple.com/us/app/oceanhorn/id708196645?mt=8">
        take their rupees
      </a>
      .
    </p>
  </BlogPage>
);
