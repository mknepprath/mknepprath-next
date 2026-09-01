import BlogPage from "@core/blog-page";
import Image from "next/image";

export const meta: Meta = {
  image: "/assets/uncle-charlie.jpg",
  published: true,
  publishedAt: "2026-05-31",
  summary:
    "I think I've made a new discovery about an 83-year-old film: Uncle Charlie as an inverted St. Paul, in a Thornton Wilder theological film.",
  tags: ["film"],
  title: "Uncle Charlie the Dark Apostle",
};

export default function UncleCharlieDarkApostle(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
    >
      <Image
        alt="Uncle Charlie standing at the door of the Newton home"
        height={1210}
        priority
        src="/assets/uncle-charlie.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1618}
      />
      <header>
        <h1>{meta.title}</h1>
      </header>
      <blockquote>
        <p>
          ⚠︎ This article contains spoilers for Shadow of a Doubt (1943). I
          highly recommend you watch the film before reading.
        </p>
      </blockquote>
      <p>
        I think I&apos;ve made a new discovery about an 83-year-old film. At
        the very least, I can&apos;t find evidence of this discovery in any of
        the analysis I&apos;ve seen of this film online.
      </p>
      <p>
        I&apos;d read that Shadow of a Doubt (1943) was Alfred Hitchcock&apos;s
        favorite of his own films, something that landed in the &ldquo;fun
        fact&rdquo; territory of my mind without further exploration during my
        initial viewing. This, despite my recurring confusion about how many of
        the characters were acting and talking during the film: weird
        relationships, random outbursts, odd phrasing&hellip; I found the film
        to be entertaining enough, but it didn&apos;t blow me away by any
        means.
      </p>
      <p>
        During my second viewing, I found myself hooked by a seemingly minor detail:
        repeated mentions of St. Paul. The first: Uncle Charlie, &ldquo;Standing
        there, you don&apos;t look like Emma Newton. You look like Emma Spencer
        Oakley of 46 Burnham Street, St. Paul, Minnesota.&rdquo; The second,
        Charlie again, at the dinner table, &ldquo;You know what St. Paul said:
        &lsquo;Take a little wine for thy stomach&apos;s sake.&rsquo;&rdquo;
      </p>
      <p>
        Entering spoiler territory now, it&apos;s worth pausing to give some
        additional details about Uncle Charlie. Charlie opens the movie on the
        run from the law. We learn fairly quickly that he is being pursued as
        the Merry Widow Murderer, a serial killer of widows who then steals
        their fortunes. We also learn through his sister, Emma, that he
        experienced a tragic bicycle accident that changed him permanently.
      </p>
      <h2 id="a-little-wine">A Little Wine</h2>
      <Image
        alt="Uncle Charlie at the dinner table with his family"
        height={920}
        src="/assets/uncle-charlie-dinner-rant.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1400}
      />
      <p>
        So I pulled on the second thread, &ldquo;Take a little wine for thy
        stomach&apos;s sake.&rdquo; Not cited in the film, of course, but this
        is 1 Timothy 5:23. This is the only Bible verse quoted in the entire
        film, it&apos;s casually tossed off, and yet it&apos;s the key to what
        I&apos;m now dubbing my Dark Apostle theory. Open 1 Timothy 5 and you
        will see that this chapter has a great deal to say about&hellip; WIDOWS.
      </p>
      <blockquote>
        <p>
          <sup>5</sup> Now she that is a widow indeed, and desolate, trusteth in God, and
          continueth in supplications and prayers night and day.
          <br /><sup>6</sup> <strong>But she that liveth in pleasure is dead while she liveth.</strong>
        </p>
      </blockquote>
      <p>
        Reading the chapter in full reveals that this may, in fact, be the
        urtext for Uncle Charlie&apos;s entire mode of being.
      </p>
      <blockquote>
        <p>
          <sup>8</sup> But if any provide not for his own, and specially for those of his
          own house, he hath denied the faith, and is worse than an infidel.
        </p>
      </blockquote>
      <p>
        Does this explain Charlie&apos;s constant gift-giving and promises to
        purchase them a new house and car?
      </p>
      <blockquote>
        <p>
          <sup>13</sup> And withal they learn to be idle, wandering about from house to
          house; and not only idle, but tattlers also and busybodies, speaking
          things which they ought not.
        </p>
      </blockquote>
      <p>
        Is Charlie echoing this verse in his dinner table rant? &ldquo;You see
        them in hotels, the best hotels, by the thousands, playing all afternoon
        and all night, smelling of money, proud of their jewelry, proud of
        nothing else.&rdquo;
      </p>
      <p>
        I don&apos;t want to stretch this too far, but the simple fact that
        Uncle Charlie quotes from a chapter that is all about widows is itself a
        new discovery, as far as I&apos;ve been able to confirm.
      </p>
      <h2 id="the-conversion-of-uncle-charlie">
        The Conversion of Uncle Charlie
      </h2>
      <Image
        alt="Young Charlie and Mrs. Newton listen to the bicycle accident story"
        height={1214}
        src="/assets/uncle-charlie-bicycle-accident-story.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1622}
      />
      <p>
        I mentioned earlier how odd I&apos;d found some of the phrasing, and
        one of these moments is one degree away from the first mention of St.
        Paul. Thanks to Uncle Charlie, we know he and Emma grew up in St. Paul,
        Minnesota, and Emma later recounts the only story we hear about his
        childhood.
      </p>
      <blockquote>
        <p>
          I always said Papa should never have bought you that bicycle. You
          didn&apos;t know how to handle it! Why, Charlie, he took it right out
          on the icy road and skidded into a street car. We thought he was going
          to die. Well, he almost did, let me tell you. He had a fractured skull
          and he was laid up so long, and when he got well, there was no holding
          him. It was as though all that rest he got was too much for him and he
          had to get into all sorts of mischief to blow off steam. He didn&apos;t
          read much after that, let me tell you!
        </p>
      </blockquote>
      <p>
        Why all the trouble to lay out every step of this journey? I now believe
        it&apos;s because it was meant to map one-to-one with another conversion
        story. That&apos;s right. St. Paul&apos;s.
      </p>
      <table>
        <thead>
          <tr>
            <th>Acts 9</th>
            <th>Shadow of a Doubt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&ldquo;as he journeyed, he came near Damascus&rdquo;</td>
            <td>&ldquo;he took it right out on the icy road&rdquo;</td>
          </tr>
          <tr>
            <td>&ldquo;he fell to the earth&rdquo;</td>
            <td>&ldquo;skidded into a street car&rdquo;</td>
          </tr>
          <tr>
            <td>&ldquo;his eyes were opened, he saw no man&rdquo;</td>
            <td>&ldquo;He had a fractured skull&rdquo;</td>
          </tr>
          <tr>
            <td>&ldquo;three days without sight&rdquo;</td>
            <td>&ldquo;laid up so long&rdquo;</td>
          </tr>
          <tr>
            <td>&ldquo;received sight… and was strengthened&rdquo;</td>
            <td>&ldquo;when he got well&rdquo;</td>
          </tr>
          <tr>
            <td>&ldquo;straightway he preached Christ&rdquo;</td>
            <td>&ldquo;there was no holding him&rdquo;</td>
          </tr>
          <tr>
            <td>Saul becomes devoted to the Word</td>
            <td>&ldquo;He didn&apos;t read much after that&rdquo;</td>
          </tr>
        </tbody>
      </table>
      <p>
        They both fell off of their rides and converted. Note that
        Charlie&apos;s story is inverted.
      </p>
      <h2 id="the-dark-apostle-theory">The Dark Apostle Theory</h2>
      <p>
        Uncle Charlie&apos;s conversion parallels St. Paul&apos;s, except he
        transforms from a quiet reader to, eventually, a killer, who perverts
        the text of St. Paul for his selfish and self-preserving ends. He
        preaches throughout the movie (&ldquo;I seem to be making my speech
        here&rdquo;), attempting to convert members of his family to his
        violent, nihilistic view of the world. Uncle Charlie is an inverted
        Paul, a dark apostle.
      </p>
      <p>
        While I can&apos;t claim that Hitchcock intended for all of this, I&apos;m
        confident Thornton Wilder did.
        I now imagine Wilder had 1 Timothy 5 open beside him while writing this
        entire screenplay. Important to note that Wilder was no stranger to
        biblical allegory. His previous work was{" "}
        <a href="https://en.wikipedia.org/wiki/The_Skin_of_Our_Teeth">
          The Skin of Our Teeth
        </a>
        .
      </p>
    </BlogPage>
  );
}
