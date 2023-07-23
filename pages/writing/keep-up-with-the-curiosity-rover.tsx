import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  published: true,
  publishedAt: "2012-08-16",
  title: "Keep Up With the Curiosity Rover",
  image: "/assets/mars.jpg",
};

export default function KeepUpWithTheCuriosityRover(): React.ReactNode {
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
        Ten days ago, NASA landed a rover on Mars. I was one of the many
        watching the event streaming live online. What a rush!
      </p>
      <p>
        <Image
          alt="Mars."
          className="corner-radius-8"
          height={471}
          layout="responsive"
          priority
          src="/assets/mars.jpg"
          width={700}
        />
      </p>
      <p>
        The live stream was a great way for NASA to connect with people on a
        more personal level. I breathed a sigh of relief as each step was
        successful and celebrated once the landing was confirmed. Now that
        that&apos;s all over, however, how do we keep up with Curiosity and its
        team? NASA&apos;s doing a wonderful job with social media, offering
        quite a few ways to follow them and their discoveries. Here are just a
        few.
      </p>
      <ol>
        <li>
          <strong>
            <a href="https://twitter.com/MarsCuriosity">Twitter</a>.
          </strong>{" "}
          Starting with one of my favorites, NASA is updating a Twitter account
          as if the Curiosity Rover itself is sending the tweets. When Curiosity
          landed,{" "}
          <a href="https://twitter.com/MarsCuriosity/status/232348380431544320">
            it tweeted
          </a>
          , &ldquo;I&apos;m safely on the surface of Mars. GALE CRATER I AM IN
          YOU!!!&rdquo;
        </li>
        <li>
          <strong>
            <a href="https://www.facebook.com/MarsCuriosity">Facebook</a>.
          </strong>{" "}
          The team shares updates through a Facebook page, such as the first
          color photo of Curiosity from orbit. They also share posts from others
          related to them, including photos and music videos.
        </li>
        <li>
          <strong>
            <a href="http://www.youtube.com/NASATelevision">YouTube</a>.
          </strong>{" "}
          Their YouTube channel allows you to relive all of the celebration when
          the Rover landed. It also contains many high quality videos about
          Curiosity and its mission.
        </li>
        <li>
          <strong>
            <a href="http://itunes.apple.com/podcast/nasacast-video/id201661703?mt=2">
              Podcasts
            </a>
            .
          </strong>{" "}
          There&apos;s even a podcast! They update it fairly frequently with
          updates regarding Curiosity, and other NASA related projects.
        </li>
        <li>
          <strong>
            <a href="https://plus.google.com/u/0/102371865054310418159/posts">
              Google+
            </a>
            .
          </strong>{" "}
          NASA gained a huge following on Google+ by sharing tons of beautiful
          photos from space.
        </li>
        <li>
          <strong>
            <a href="http://www.reddit.com/r/IAmA/comments/ybmmh/we_are_engineers_and_scientists_on_the_mars/">
              Reddit
            </a>
            .
          </strong>{" "}
          The Curiosity team is on Reddit RIGHT NOW answering people&apos;s
          questions regarding the landing, etc. If you have an account, I
          recommend logging in and asking them anything you might be curious
          about.
        </li>
      </ol>
      <p>
        <div>
          <span style={{ color: "#808080" }}>
            It&apos;s amazing that NASA is able to find the time to keep up with
            all of these outlets, but I believe they find it to be well worth
            it. They&apos;re successfully bringing about a rebirth in interest
            of our space exploration program.
          </span>
        </div>
      </p>
    </BlogPage>
  );
}
