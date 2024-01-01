import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  image: "/assets/dredd-film.jpeg",
  published: true,
  publishedAt: "2022-09-21",
  summary: "In which I coin the term “yassified bullet time”.",
  title: "My Review of Dredd (2012)",
  tweetId: "1158369861996883968",
};

export default function Dredd(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      highlightCode
      ogImage={meta.image}
      title={meta.title}
      tweetId={meta.tweetId}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>
      <Image
        alt="A still featuring Anderson and Dredd from the film Dredd (2012)."
        className="corner-radius-8"
        height={416}
        src="/assets/dredd-film.jpeg"
        layout="responsive"
        priority
        width={1000}
      />
      <blockquote>
        Anderson: <i>“Sir, he&apos;s thinking about going for your gun.”</i>
        <br />
        Dredd: <i>“Yeah.”</i>
        <br />
        Anderson: <i>“He just changed his mind.”</i>
        <br />
        Dredd: <i>“Yeah.”</i>
      </blockquote>
      <h2>A Quick Summary</h2>
      <p>
        Is it any coincidence that this came out a year after{" "}
        <i>The Raid (2011)</i>? Following a very similar formula, this movie
        follows a couple of Judges (Dredd played by Carl Urban and rookie
        Anderson played by Olivia Thirlby) into a locked-down gang-controlled
        tower where they must use their wits and weapons to survive and serve
        justice.
      </p>
      <h2>Reception at the Time</h2>
      <p>
        The consensus at the time of release seemed to be that it was “okay.”
        Rotten Tomatoes average score is a 6.5/10, indicating that critics
        considered this a good movie, but barely. Most of the focus was on the
        extreme portrayals of violence, and it either gained or lost points
        based on each individuals taste for it. Some critics also called out the
        fact that it was released in 3D. It nearly always lost points for that.
        This was post-Avatar (2009) and viewers were getting tired of it.
      </p>
      <p>
        Meanwhile, general audiences… didn’t see it. The studio infamously
        bungled the marketing and failed to get butts in seats. Despite the
        generally positive reviews, movie-goers were confused resulting in Dredd
        becoming a big ol’ flop.
      </p>
      <h2>How It’s Aged</h2>
      <p>
        I believe this movie has aged particularly well for a number of reasons.
      </p>
      <p>
        First, recent events have continued to bear out the biting satire behind
        the Dredd universe. Cops playing judge, jury and executioner? You don’t
        say.
      </p>
      <p>
        Second, this movie very cannily subverts the girl in the tower trope. We
        get a mini <i>Princess (2022)</i>-style sequence in the back half of
        this that ultimately proves the aptitude of Anderson. She gets one of
        the best moments of the movie when she faces a crooked Judge on her way
        down.
      </p>
      <p>
        Third, the special effects have aged surprisingly well due to this being
        a B-movie. The world looks *good* and whenever the cracks show it just
        enhances the gritty/raw nature of this film.
      </p>
      <p>
        Of course, the elephant in the room is that this movie dropped near the
        height of 3D movie exhaustion. It would’ve been impossible to separate
        this from the craze at the time. Not so difficult now!
      </p>
      <h2>Best Parts</h2>
      <p>
        A highlight for me was the deadpan humor, and I mean DEAD. All of the
        characters are deathly serious; their line readings are as dry as the
        post-apocalyptic wasteland just outside Mega-City One. And that’s the
        bit.
      </p>
      <p>
        Another stand-out feature for me this time around was Slo-Mo, the hot
        new drug that slows time for the user. We, of course, get to experience
        a number of scenes from this perspective. This is yassified bullet time;
        colors become hyper-saturated and water, glass and blood sparkle. No
        bullets are dodged here, however. Bodies slowly deform as they’re hit
        with bullets and smashed into walls. It becomes hard to watch, yet
        harder to look away.
      </p>
      <h2>Overall</h2>
      <p>
        <i>Dredd</i> achieved cult status the instant it became available on DVD
        and fans have been campaigning for a <i>Dredd</i> sequel ever since.
        Anecdotally, I’ve noticed many letterboxd users ratcheting up their
        ratings after repeat viewings. In a world where the satire-filled,
        hyper-violent series <i>The Boys</i> (also starring Urban) is the king
        of streaming television, it’s safe to say <i>Dredd</i> has aged well.
      </p>
      <blockquote>
        <i>“Negotiation&apos;s over. Sentence is death.”</i>
      </blockquote>
    </BlogPage>
  );
}
