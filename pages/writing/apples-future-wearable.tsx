import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2014-04-29",
  title: "Apple’s Future Wearable"
};

export default () => (
  <BlogPage dateTime={meta.publishedAt} title={meta.title}>
    <header>
      <h1>{meta.title}</h1>
    </header>

    <p>
      I’d like to preface this post by saying everything being proposed here is
      entirely speculation and may never see the light of day. Speculation is
      fun, though – so let’s get into it.
    </p>
    <p>
      Rumors of an Apple iWatch have been making the rounds for quite some time
      now. I’d normally brush these aside due to lack of evidence, but a few
      recent events have brought me back around to the idea.
    </p>
    <ol>
      <li>
        <a href="http://www.theverge.com/2013/4/23/4258272/apple-tim-cook-teases-exciting-new-product-category">
          Tim Cook has teased the possibility of new product categories this
          fall.
        </a>{" "}
        This, in it of itself, does not imply a wearable is on the way. He could
        be referring to the rumored bigger iPhone. Or anything else, really.
      </li>
      <li>
        <a href="http://9to5mac.com/2014/03/17/this-is-healthbook-apples-first-major-step-into-health-fitness-tracking/">
          Screenshots of a Healthbook app have leaked.
        </a>{" "}
        Again, this does not necessarily prove the existence of a wearable. The
        iPhone is{" "}
        <a href="http://gizmodo.com/how-apples-m7-chip-makes-the-iphone-5s-the-ultimate-tr-1286594287">
          perfectly capable of tracking many of the items listed in this app
        </a>
        , and others aren’t trackable by anything but manual entry.
      </li>
      <li>
        <a href="http://www.digitaltrends.com/mobile/nike-focusing-software-excited-future-plans-apple/#!GiOcY">
          Nike has all but abolished it’s FuelBand hardware team, and plans to
          focus on software.
        </a>{" "}
        Nike and Apple have always been very close. Nike isn’t a hardware
        company. Apple is. I think this is the biggest sign of what’s to come.
        My guess is that Apple and Nike have been working together on a product
        being designed and developed by Apple that will integrate with Nike+
        (among many other things). I wouldn’t be surprised if we see this
        product being sold in Apple <em>and</em> Nike stores upon its release.
      </li>
    </ol>
    <p>
      Clearly, this product will not ever be the cash cow that the iPhone ended
      up being. I think Apple is okay with that. For one, it will strengthen
      Apple’s current ecosystem of services and products. Second, assuming it’s
      a well designed and useful product, it will help people get and stay
      healthy. Apple may be willing to “take the hit” for the common good, as
      illustrated by Tim Cook’s retort to a conservative finance group who
      wanted him to commit to only doing things that were profitable in regard
      to Apple’s energy sustainability programs, “When we work on making our
      devices accessible by the blind, I don’t consider the bloody ROI.”
    </p>
  </BlogPage>
);
