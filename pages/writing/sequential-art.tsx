import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  published: true,
  publishedAt: "2019-12-12",
  summary: "A comic retrospective.",
  image: "/assets/comics-05.jpeg",
  title: "Sequential Art™",
  tweetId: "1205319311029485569",
};

export default function SequentialArt(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
      tweetId={meta.tweetId}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        Comics, both web and traditional, have been a fascination of mine for
        some time. I wasn&apos;t brave enough to try my hand at creating them
        until I made a discovery during{" "}
        <a href="https://twitter.com/search?q=from%3A%40mknepprath%20%23inktober">
          #inktober
        </a>{" "}
        2017 - the best way to get over the fear of drawing is to use bold
        drawing tools. I started with pencil, transitioned to pen, and
        eventually cracked open a marker set. My resulting illustrations were as
        brazen as the drawing tools I was using.
      </p>
      <Image
        alt="A pumpkin illustration"
        className="corner-radius-8"
        height={1200}
        layout="responsive"
        priority
        src="/assets/comics-01.jpeg"
        width={1200}
      />
      <p></p>
      <Image
        alt="A canoe illustration"
        className="corner-radius-8"
        height={1024}
        src="/assets/comics-02.jpeg"
        layout="responsive"
        width={1024}
      />
      <p>
        Last year, I decided to use this technique to draw some panels. I posted
        my first comic as a reply to{" "}
        <a href="https://twitter.com/JamesInks/status/1021770737877692422">
          @JamesInks
        </a>
        , a talented comic artist, as a gag. I believe I was planning on
        replying to a bunch of tweets with comics, but I only ended up posting
        two in this way.
      </p>
      <Image
        alt="Make comics. Who has time for that!"
        className="corner-radius-8"
        height={900}
        src="/assets/comics-03.jpeg"
        layout="responsive"
        width={1200}
      />
      <p>
        The second was in reply to{" "}
        <a href="https://twitter.com/JamesInks/status/1023671020560035842">
          a tweet about pie
        </a>
        .
      </p>
      <Image
        alt="I love pie!!!"
        className="corner-radius-8"
        height={900}
        src="/assets/comics-04.jpeg"
        layout="responsive"
        width={1200}
      />
      <p>
        After this, I started{" "}
        <a href="https://twitter.com/mknepprath/status/1024083111091597312">
          a thread
        </a>{" "}
        that now includes 19 short comics. This first one,{" "}
        <b>Sequential Art™</b> was meant to be a light-hearted jab at the
        self-seriousness of some comic artists.
      </p>
      <Image
        alt="Sequential art"
        className="corner-radius-8"
        height={900}
        src="/assets/comics-05.jpeg"
        layout="responsive"
        width={1200}
      />
      <p>
        I tried my hand at social commentary for my 4th comic,{" "}
        <b>Sequential Stress™</b>. These panels ended up being featured in Owen
        Williams&apos; (<a href="http://twitter.com/ow">@ow</a>) article
        entitled, &ldquo;
        <a href="https://char.gd/blog/2019/mobile-notifications-are-broken-its-time-to-fix-them">
          Notifications are broken. It&apos;s time to fix them.
        </a>
        &rdquo;
      </p>
      <Image
        alt="Sequential stress"
        className="corner-radius-8"
        height={900}
        src="/assets/comics-06.jpeg"
        layout="responsive"
        width={1200}
      />
      <p>
        At this point, I was attempting to create at least one comic per day, so
        the subject matter turned to trivial things I was dealing with. Like
        bugs.
      </p>
      <Image
        alt="Demon bug!!"
        className="corner-radius-8"
        height={539}
        src="/assets/comics-07.jpeg"
        layout="responsive"
        width={1200}
      />
      <p>And exercise.</p>
      <Image
        alt="Apple Watch activity rings"
        className="corner-radius-8"
        height={520}
        src="/assets/comics-08.jpeg"
        layout="responsive"
        width={1200}
      />
      <p>
        There was a third panel here that turned out bad, so I cut it off. I
        enjoyed this two-panel reaction shot enough to post it despite that.
      </p>
      <Image
        alt="I will say nothing"
        className="corner-radius-8"
        height={736}
        src="/assets/comics-09.jpeg"
        layout="responsive"
        width={1200}
      />
      <p>
        Most of my comics didn&apos;t warrant a title. Perhaps this one
        didn&apos;t, either, but I decided to include it for some additional
        context.
      </p>
      <Image
        alt="Flat La Croix"
        className="corner-radius-8"
        height={707}
        src="/assets/comics-10.jpeg"
        layout="responsive"
        width={1200}
      />
      <p>My son and I take pictures of our silly faces sometimes.</p>
      <Image
        alt="Silly faces"
        className="corner-radius-8"
        height={607}
        src="/assets/comics-11.jpeg"
        layout="responsive"
        width={1200}
      />
      <p>
        My hairstyle was in transition during this time. I did a few quick
        studies to nail how I wanted to portray it on the page.
      </p>
      <Image
        alt="Hair study"
        className="corner-radius-8"
        height={900}
        src="/assets/comics-12.jpeg"
        layout="responsive"
        width={1200}
      />

      <p>
        While simple, this is the first one where I played with the perspective.
        Perhaps a sequel is warranted, &ldquo;honk.&rdquo;
      </p>
      <Image
        alt="Duck"
        className="corner-radius-8"
        height={559}
        src="/assets/comics-13.jpeg"
        layout="responsive"
        width={1200}
      />

      <p>
        The goal of this study was to illustrate butterflies at various levels
        of resolution in interesting ways. Note that they become hearts as they
        fade into the distance.
      </p>
      <Image
        alt="Butterflies"
        className="corner-radius-8"
        height={2048}
        src="/assets/comics-14.jpeg"
        layout="responsive"
        width={1392}
      />

      <p>Again, hair transition issues.</p>
      <Image
        alt="Hair problems"
        className="corner-radius-8"
        height={608}
        src="/assets/comics-15.jpeg"
        layout="responsive"
        width={1200}
      />

      <p>
        Here, I attempted to portray a simple thing in comic form that
        couldn&apos;t happen in reality.
      </p>
      <Image
        alt="Disappearing can"
        className="corner-radius-8"
        height={558}
        src="/assets/comics-16.jpeg"
        layout="responsive"
        width={1200}
      />

      <p>
        Using line thickness and texture, I created a biopic about our RoboVac.
      </p>
      <Image
        alt="Robot vacuum"
        className="corner-radius-8"
        height={616}
        src="/assets/comics-17.jpeg"
        layout="responsive"
        width={1200}
      />
      <p>
        After a brief hiatus, I came back to comics with a fresh perspective on
        my previous panels. I had become too careful, and it was time to loosen
        up a bit. This cat comic could be seen as a more feral version of the
        original &ldquo;MAKE COMICS&rdquo; strip.
      </p>
      <Image
        alt="RAAWRRRRR"
        className="corner-radius-8"
        height={653}
        src="/assets/comics-18.jpeg"
        layout="responsive"
        width={1200}
      />

      <p>
        These few comics were illustrated around Halloween 2018. I drew the
        candy witch, a witch who trades a toy for candy.
      </p>
      <Image
        alt="Candy witch"
        className="corner-radius-8"
        height={900}
        src="/assets/comics-19.jpeg"
        layout="responsive"
        width={1200}
      />

      <p>I also found the idea of an angsty pumpkin hilarious.</p>
      <Image
        alt="Angsty pumpkin"
        className="corner-radius-8"
        height={900}
        src="/assets/comics-20.jpeg"
        layout="responsive"
        width={1200}
      />

      <p>
        This started out as a hand study, but resulted in one of my favorite
        strips - more realistic with multiple perspectives. There is a nostalgia
        to it, as well. I haven&apos;t gone fishing in years, if not decades.
      </p>
      <Image
        alt="Contemplative fisherman"
        className="corner-radius-8"
        height={900}
        src="/assets/comics-21.jpeg"
        layout="responsive"
        width={1200}
      />

      <p>
        Back to the Halloween theme, I thought it would be fun to illustrate a
        dragon - with a twist. It was my son&apos;s costume all along.
      </p>
      <Image
        alt="Dragon costume"
        className="corner-radius-8"
        height={675}
        src="/assets/comics-22.jpeg"
        layout="responsive"
        width={1200}
      />

      <p>Finally, too much caffeine!</p>
      <Image
        alt="Coffee high"
        className="corner-radius-8"
        height={900}
        src="/assets/comics-23.jpeg"
        layout="responsive"
        width={1200}
      />
      <p>
        I had a lot of fun with these, and I hope to do more. My main takeaway
        from the project is that I can (and should) impose constraints upon
        myself to yield the results I&apos;m looking for. I wanted to create
        quick, rough comics - the best tool for the job ended up being a big
        ol&apos; Sharpie (and a few other markers for color). Many of my comics
        are bold and dynamic because it&apos;s hard to do otherwise with the
        tools I was using. That wasn&apos;t an accident.
      </p>
    </BlogPage>
  );
}
