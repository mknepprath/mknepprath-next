import BlogPage from "@core/blog-page";

export const meta: Meta = {
  published: true,
  publishedAt: "2014-09-10",
  title: "Thoughts on the Apple Watch",
};

export default function AppleWatch(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        The <a href="http://www.apple.com/watch/design">Watch</a> is here, and
        it’s comical to see{" "}
        <a href="http://venturebeat.com/2014/09/09/apple-watch-is-ugly-and-boring-and-steve-jobs-would-have-agreed">
          history repeat itself once again{" "}
        </a>
        (
        <a href="http://adage.com/article/al-ries/iphone-fail/117355">iPhone</a>
        ,{" "}
        <a href="http://www.infoworld.com/d/windows/why-apples-rumored-itablet-will-fail-big-time-119">
          iPad
        </a>
        ). The media cycle has become predictable when it comes to an Apple
        product launch: hype, hype, HYPE, disappointment, acceptance (once it
        becomes clear that consumers love it).
      </p>
      <p>
        Apple’s competitors have been working very hard to make a cool wrist
        gadget — fashion being an afterthought. My main takeaway from this event
        is that Apple has clearly been studying a great deal about how things
        work in the watch industry, addressing fashion first — because they’ve
        learned that regular people aren’t going to stick a big, ugly computer
        on their wrist no matter how many superpowers it grants them.
      </p>
      <p>
        I think the Watch is going to be a success in time, especially as it
        gets thinner over the next few generations.
      </p>
    </BlogPage>
  );
}
