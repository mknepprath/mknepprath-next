import Image from "next/image";

import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/2020-mid-year-1.jpg",
  published: true,
  publishedAt: "2014-11-29",
  summary: "My biggest college art project.",
  title: "Giant Portraits",
};

export default () => (
  <BlogPage
    dateTime={meta.publishedAt}
    description={meta.summary}
    ogImage={meta.image}
    title={meta.title}
  >
    <header>
      <h1>{meta.title}</h1>
    </header>
    <p>
      Upon deciding to take full advantage of my school’s unlimited black and
      white printing, I first blew up a photo to 10 feet wide by 6.5 feet tall,
      then pulled it into Photoshop and divided it into 8.5×11” sections. This
      first project ended up being 95 sheets of printer paper that I displayed
      in my dorm room at the time.
    </p>

    <Image
      alt="Couch photo in being put up."
      className="corner-radius-8"
      height={195}
      src="/assets/giant-portraits-1.jpg"
      layout="responsive"
      priority
      width={260}
    />
    <p />
    <Image
      alt="Couch photo."
      className="corner-radius-8"
      height={195}
      src="/assets/giant-portraits-2.jpg"
      layout="responsive"
      priority
      width={260}
    />

    <p>A similar piece was displayed in the mid-year student art show.</p>
    <Image
      alt="Couch photo in color."
      className="corner-radius-8"
      height={382}
      src="/assets/giant-portraits-5.png"
      layout="responsive"
      priority
      width={637}
    />
    <p>Here's how it looked sliced up:</p>
    <Image
      alt="Couch photo files."
      className="corner-radius-8"
      height={479}
      src="/assets/giant-portraits-6.png"
      layout="responsive"
      priority
      width={828}
    />

    <p>
      For the end-of-year student art show I decided to go even bigger. I
      illustrated a portrait of myself and followed the same process, except
      this time the piece ended up being 323 sheets of paper, or 12 feet wide by
      17.5 feet tall.
    </p>

    <Image
      alt="Giant photo illustration."
      className="corner-radius-8"
      height={1024}
      src="/assets/giant-portraits-3.png"
      layout="responsive"
      priority
      width={730}
    />
    <p>
      I was on a lift for a full day hanging it up. For comparison, you can see
      some normal artwork at the bottom of the second photo.
    </p>
    <Image
      alt="Giant photo."
      className="corner-radius-8"
      height={816}
      src="/assets/giant-portraits-4.jpg"
      layout="responsive"
      priority
      width={608}
    />
  </BlogPage>
);
