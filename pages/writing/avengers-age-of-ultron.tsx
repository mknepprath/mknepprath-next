import A from "@core/a";
import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  image: "/assets/avengers-age-of-ultron.jpg",
  published: true,
  publishedAt: "2025-05-01",
  summary:
    "My review celebrating the 10th anniversary of Avengers: Age of Ultron.",
  title: "My Review of Avengers: Age of Ultron (2015)",
};

export default function AvengersAgeOfUltron(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      highlightCode
      ogImage={meta.image}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>
      <Image
        alt="A still featuring Vision and Ultron from the film Avengers: Age of Ultron (2015)."
        className="corner-radius-8"
        height={562}
        src="/assets/avengers-age-of-ultron.jpg"
        layout="responsive"
        priority
        width={1000}
      />
      <blockquote>
        “I am not Ultron. I am not J.A.R.V.I.S. I am… I am.” — Vision
      </blockquote>
      <h2>A Quick Summary</h2>
      <p>
        A traumatized Tony Stark takes matters into his own hands, building an
        army of Iron Men in the name of peace, only for it to fall into the
        hands of someone not so different from… himself? The Avengers reassemble
        to stop his creation before it brings about “peace in our time.”
      </p>
      <h2>Reception at the Time</h2>
      <p>
        <i>Avengers: Age of Ultron</i>, the second big team-up film in the
        Marvel Cinematic Universe, received mixed-to-positive reviews upon
        release. It was knocked for being messy, exposition-heavy, and full of
        setup for future Marvel properties. This likely didn’t impact its box
        office take, however, as it ended up in the top 10 for all-time gross
        and is currently sitting in 18th place with a lifetime worldwide gross
        of 1.4 billion dollars.
      </p>
      <h2>How It’s Aged</h2>
      <p>
        This one’s gotten better with time. It might be the rare case where ten
        years isn’t enough distance to fully review it. So much of its legacy
        depends on what came after—Wanda’s arc, Vision’s existence, the Infinity
        Stones, Wakanda, even the road Tony ends up on. The movie feels more
        relevant now within the MCU than it did at the time.
      </p>
      <p>
        At the core is a surprisingly focused theme: playing god. Tony tries to
        create peace and ends up creating a monster. Ultron immediately starts
        quoting scripture, shaping his apocalyptic logic around phrases like
        “Ask Noah” and “Peace in our time.” It’s not subtle. Vision, born from
        the wreckage, literally says, “I am…” This is Marvel doing Frankenstein
        by way of technotheism, and for once, the mess kind of fits the message.
      </p>
      <p>
        Also worth noting: Marvel literally changed the movie post-release. The
        Thor vision sequence, once a confusing tangent, has been cut down and
        re-edited on Disney+ to focus on the Infinity Stones. It works better
        now. My main gripe? Gone.
      </p>
      <h2>Best Parts</h2>
      <p>
        James Spader’s Ultron. He’s a dark Tony Stark with a god complex and the
        deadpan delivery to match. Ultron can’t tell the difference between
        saving the world and destroying it. “Where do you think he gets that?”
      </p>
      <p>
        Wanda’s visions. Her actions spark Tony’s anxiety spiral and indirectly
        kick off the entire second half of the Infinity Saga. She might actually
        be the main villain here, depending on how you look at it, though that
        dynamic shifts by the end.
      </p>
      <p>
        Quicksilver has a great introduction. “You didn’t see that coming?”
        cracked me up. The moment where he grabs Thor’s hammer mid-fight is so
        great. Wish we got more of him.
      </p>
      <p>
        Vision’s birth scene hit completely different this time around. They go
        full Universal Monsters. He’s created in a coffin and brought to life by
        a team of mad scientists. I never fully registered it before, but this
        is Frankenstein’s monster, born of Thor’s lightning. One of the most
        thematically loaded scenes Marvel’s ever done that now 100% works for me
        when it previously did not. “We’re mad scientists. We’re monsters,
        buddy.”
      </p>
      <h2>Overall</h2>
      <p>
        <i>Age of Ultron</i> has always been a little messy, but that’s part of
        the appeal now. It swings big, it builds out half the future of the MCU,
        and it gives us one of the most interesting villains in the franchise.
        It’s also one of the few Marvel films that actually wrestles with power;
        how it’s created, who controls it, and what happens when your creation
        turns on you. You’ve never seen a Frankenstein movie like this.
      </p>
      <p>And somehow, it still holds together. More than that, it holds up.</p>
      <blockquote>“That up there, that’s the endgame.” — Tony Stark</blockquote>

      <hr />

      <em>
        Published on{" "}
        <A href="https://letterboxd.com/tardycritic/film/avengers-age-of-ultron/">
          Tardy Critic
        </A>
        , a film blog where movies are reviewed ten years late.
      </em>
    </BlogPage>
  );
}
