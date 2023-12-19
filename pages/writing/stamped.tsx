import A from "@core/a";
import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  published: true,
  publishedAt: "2023-12-19",
  title: "The Life Electronic",
  summary: "Navigating the ephemeral nature of digital content.",
  image: "/assets/zissou-1.jpg",
};

export default function TheLifeElectronic(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      ogImage={meta.image}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        <Image
          alt="The Belafonte."
          className="corner-radius-8"
          height={456}
          layout="responsive"
          priority
          src="/assets/zissou-1.jpg"
          width={800}
        />
      </p>

      <blockquote>
        &ldquo;I had no idea what to expect going into this, but I was not
        disappointed.&rdquo;{" "}
        <p>
          - My review of{" "}
          <em>
            <a href="https://www.imdb.com/title/tt0362270/">
              The Life Aquatic with Steve Zissou
            </a>
          </em>
          , Jan 2012.
        </p>
      </blockquote>

      <p>
        I&apos;d like to walk through a little case study. Back in 2012, I
        posted a movie review on a fledgling platform at the time,{" "}
        <A href="https://web.archive.org/web/20140226032433/http://mashable.com/2011/11/25/stamped-iphone-recommendation-app/">
          Stamped
        </A>
        , where users could post reviews of things and recommend them to their
        friends.
      </p>

      <p>Stamped was quickly bought up by Yahoo and shuttered shortly after.</p>

      <p>
        Thanks to a popular but short-lived trend at the time, Stamped included
        the ability to cross-post to other platforms when you published a
        review. This review ended up on Twitter.
      </p>

      <p>
        In 2021, I became tired of the clutter on my Twitter profile and decided
        to delete a majority of my tweets. Unsurprisingly, this included my
        Stamped review.
      </p>

      <p>
        Last year I stumbled upon the Tweetback project, a way to publish my
        tweets to my own site. Luckily, I&apos;d been paranoid and downloaded my
        Twitter archive every few years since 2012. I set up my own Tweetback
        instance and got all of my tweets... back.
      </p>

      <p>
        Finally, I decided to backfill my Letterboxd account using reviews
        I&apos;d written across the web and ticket stubs I&apos;d saved over the
        years. This particular review completed its journey and now lives
        alongside my growing collection of movie reviews.
      </p>

      <p>
        Unfortunately, when the Stamped review was cross-posted, its content was
        cut off. Had I said more about it at the time?{" "}
        <em>We may never know.</em>
      </p>

      <p>Preserving the internet is hard.</p>

      <p>
        <Image
          alt="An illustration of Zissou."
          className="corner-radius-8"
          height={911}
          layout="responsive"
          priority
          src="/assets/zissou.jpg"
          width={600}
        />
      </p>
      <p>
        <em>Art by Michael Knepprath, 2012.</em>
      </p>
    </BlogPage>
  );
}
