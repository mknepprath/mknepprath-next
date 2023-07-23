import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  published: true,
  publishedAt: "2012-10-09",
  title: "The Physical Turning Digital",
  image: "/assets/virtualworld.jpg",
};

export default function ThePhysicalTurningDigital(): React.ReactNode {
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
        Remember when a CD was required to listen to music? I still have a large
        stack sitting at my parent&apos;s house, untouched for many years. These
        days I listen to music on <a href="http://www.spotify.com/">Spotify</a>,{" "}
        <a href="http://www.apple.com/itunes/">iTunes</a>, or{" "}
        <a href="http://www.youtube.com/music">YouTube</a>. Film is heading in
        the same direction. DVDs are still quite popular, but it won&apos;t be
        long before the majority of what we watch is through services like{" "}
        <a href="http://www.netflix.com/">Netflix</a> or{" "}
        <a href="http://www.hulu.com/">Hulu</a>. And what about gaming?{" "}
        <a href="http://store.steampowered.com/">Steam</a> is leading the charge
        in this medium.
      </p>
      <p>
        <Image
          alt="An AR desktop experience."
          className="corner-radius-8"
          height={471}
          layout="responsive"
          priority
          src="/assets/virtualworld.jpg"
          width={700}
        />
      </p>
      <p>So what else will be going digital in the future?</p>
      <p>
        This question is more misleading than it first appears. Honestly, what
        few things <em>won&apos;t</em> be going digital in the future? Here are
        a few things I own that won&apos;t make the transition:
      </p>
      <ol>
        <li>Sustenance.</li>
        <li>Supplies for hygiene and health.</li>
        <li>Seating and tables.</li>
        <li>Vehicles for transportation.</li>
      </ol>
      <p>
        And... that&apos;s about it. As augmented reality becomes more practical
        and mainstream, it will be possible to turn most physical objects into
        digital ones. Just looking at my desk, I see a number of examples.
      </p>
      <ol>
        <li>
          <strong>My computer. </strong>A lot of things I do on my computer will
          no longer be managed on a screen. Files are much easier to work with
          when I can move and sort with my hands or voice commands. The entire
          file system on my computer may end up looking more like a stack of
          folders, photos, and documents on my desk. The keyboard will be
          displayed on the desk surface.
        </li>
        <li>
          <strong>Pictures in frames.</strong> Pictures will no longer require
          frames, since they&apos;ll be digital images mapped out to the desk.
          They can float, turn into video, or even a chat window to talk with
          someone else through.
        </li>
        <li>
          <strong>Notebook and pen.</strong> I know. I wrote{" "}
          <a href="http://mknepprath.com/2012/09/i-prefer-writing/">
            a whole post
          </a>{" "}
          about how I prefer writing over any digital alternative. This was
          because of the Digital Disconnect, and I believe augmented reality
          would remove this barrier.
        </li>
        <li>
          <strong>A container for coupons and other documents.</strong> These
          are all going digital already. Check out{" "}
          <a href="http://www.retailmenot.com/">retailmenot.com</a>. I pay most
          of my bills online, and many other documents are located there, as
          well. I can print them off if I need to, but in the future I doubt
          this will be necessary.
        </li>
      </ol>
      <p>
        In the end, a normal person&apos;s apartment will appear quite bare to
        the naked eye. Even the objects that will be there (couch, refrigerator,
        bed) will seem very plain and simple, because they can be given a
        &apos;skin&apos; of sorts through augmented reality.
      </p>
      <p>
        What do you think? Are there other objects you use that can&apos;t be
        converted to the digital world?
      </p>
    </BlogPage>
  );
}
