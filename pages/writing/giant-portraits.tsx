import Image from "next/image";

import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/giant-portraits-2.jpg",
  published: true,
  publishedAt: "2014-11-29",
  summary: "My biggest college art project.",
  title: "Giant Portraits",
  tweetId: "1333065791340765185",
};

export default function GiantPortraits(): React.ReactNode {
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
        Upon deciding to take full advantage of my school’s unlimited black &
        white printing, I first blew up a photo by{" "}
        <a
          href="https://twitter.com/carrphoto"
          rel="noopener noreferrer"
          target="_blank"
        >
          Brandon Carr
        </a>{" "}
        to <b>10 feet wide by 6.5 feet tall</b>, then pulled it into Photoshop
        and divided it into 8.5×11” sections. This first project ended up being
        95 sheets of printer paper that I displayed in my dorm room at the time.
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
        alt="Couch illustration in art show."
        className="corner-radius-8"
        height={568}
        src="/assets/giant-portraits-8.jpg"
        layout="responsive"
        priority
        width={1200}
      />
      <blockquote>
        Above: Seniors Brandon Carr and Michael Knepprath pose next to their
        piece entitled &ldquo;The Couch.&rdquo; Knepprath remarked, &ldquo;It
        received quite a bit of positive feedback at the show, including the
        janitor telling me how much he loved the couch because it reminded him
        of the 70s. The piece is ultimately a memorial to this couch. We had to
        throw it away due to how nasty and smelly it was!&rdquo; Sophomore
        Tracey Melhouse praised Carr and Knepprath&apos;s creativity saying,
        &ldquo;I love this mural because it is so them; they captured themselves
        well.&rdquo;
      </blockquote>

      <p>
        Unfortunately, the black & white yearbook photo doesn&apos;t do it
        justice here. My school gave each student a limited number of color
        prints, so I thought it&apos;d be clever to only use color in certain
        tiles and print the rest in black & white.
      </p>
      <Image
        alt="Couch photo in color."
        className="corner-radius-8"
        height={382}
        src="/assets/giant-portraits-5.png"
        layout="responsive"
        priority
        width={637}
      />
      <p>Here it is sliced up:</p>
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
        this time the piece ended up being 323 sheets of paper, or{" "}
        <b>12 feet wide by 17.5 feet tall</b>.
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
        I was on a lift for a full day hanging it up. For context, check out the
        size of the artwork below my portrait:
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

      <p>
        <a
          href="https://twitter.com/benlundsten"
          rel="noopener noreferrer"
          target="_blank"
        >
          Ben Lundsten
        </a>{" "}
        made an accompanying piece in response to this final portrait, and we
        were both featured in the yearbook that year!
      </p>
      <Image
        alt="Giant photos in the yearbook."
        className="corner-radius-8 bordered-image"
        height={480}
        src="/assets/giant-portraits-7.jpg"
        layout="responsive"
        priority
        width={640}
      />
    </BlogPage>
  );
}
