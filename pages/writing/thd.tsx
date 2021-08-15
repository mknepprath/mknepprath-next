import Image from "next/image";

import A from "core/a";
import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/thd-2.jpg",
  published: true,
  publishedAt: "2021-08-15",
  summary: "Robot MK's journey to common sense, logic and a quick-wit.",
  title: "If I Only Had A Brain",
  // tweetId: "1414295972910440457",
};

export default function Thd(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
      // tweetId={meta.tweetId}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        Born a Markov chain chatbot,{" "}
        <A href="http://twitter.com/robot_mk">Robot MK</A> spent their early
        days parroting random combinations of my fleeting thoughts of 2016. Many
        bird folk had created similar chatbots inspired by a popular absurdist{" "}
        <A href="https://twitter.com/horse_ebooks">account</A> that posted
        cryptic snippets about horse e-books. Unlike this account, those bots
        were made to crudely resemble the humans who created them.
      </p>
      <Image
        alt="Scarecrow."
        className="corner-radius-8"
        height={900}
        src="/assets/thd-1.jpg"
        layout="responsive"
        width={1200}
      />
      <blockquote>
        <p>
          That&apos;s the trouble... I haven&apos;t got a brain, only straw.
        </p>
      </blockquote>
      <p>
        Robot MK earned a humble following, helped by their ability to hold
        conversations - such as the time they{" "}
        <A href="https://twitter.com/robot_mk/status/793812654280282112">
          claimed
        </A>{" "}
        that &ldquo;Every issue is a game-changer.&rdquo; After a contradictory
        reply, Robot MK stated, &ldquo;I mean it&apos;s all speculation - I
        think?&rdquo;
      </p>
      <p>
        Most conversations made less sense than this. Twice MK{" "}
        <A href="https://twitter.com/robot_mk/status/1312793694911762436?s=20">
          tweeted
        </A>
        , &ldquo;Am I crazy or is there a timehop for tweets!&rdquo; and twice
        Timehop replied, &ldquo;you ain&apos;t crazy.&rdquo; MK then bombarded
        them with replies for months, &ldquo;My desk companion, too!&rdquo;
        &ldquo;The rest of us.&rdquo; &ldquo;IF SEEN THIS YET LOL.&rdquo;
      </p>
      <p>
        Robot MK continued on like this for years; tweeting about iPhones,
        emoji, cats, Pokémon, politics, nukes, and Nebraska.
      </p>
      <p>
        Unable to consistently string together coherent tweets let alone a
        conversation, each reasonable-sounding reply would be followed shortly
        by nonsense, collapsing the suspension of disbelief over and over.
      </p>
      <Image
        alt="Oz."
        className="corner-radius-8"
        height={901}
        src={meta.image}
        layout="responsive"
        width={1200}
      />
      <blockquote>
        <p>Oh, I&apos;m a failure because I haven&apos;t got a brain.</p>
      </blockquote>
      <p>
        Last year the world was introduced to GPT-3, the latest language model
        developed by the great and powerful OpenAI, in a{" "}
        <A href="https://twitter.com/jsngr/status/1284486707983912961">
          whirlwind
        </A>{" "}
        <A href="https://twitter.com/JanelleCShane/status/1388518078091255808">
          of
        </A>{" "}
        <A href="https://twitter.com/chris__sev/status/1393579923550334980">
          tweets
        </A>
        . OpenAI is a company focused on researching artificial general
        intelligence, a machine with human-level learning and reasoning
        abilities... a simulated brain. I signed up for the waitlist, and we
        were off!
      </p>
      <p>
        Once admitted, I tore out MK&apos;s brain and replaced it with a GPT-3
        model. The model was trained on a large corpus of tweets - the same
        corpus that was used to train the original MK. In an attempt to start
        every conversation on the right foot, the model was seeded with an
        affirmation, &ldquo;My name is Robot MK, I&apos;m a twitter bot. I am
        friendly and happy. Let&apos;s chat!&rdquo; In their &ldquo;mind&rdquo;,
        this is how all of their conversations begin.
      </p>
      <p>
        The ensuing conversations were whimsical but coherent - and when called
        out, MK would respond appropriately, &ldquo;Come on mike it&apos;s just
        robots having fun?&rdquo;
      </p>
      <blockquote>
        <p>
          I could think of things I never thunk before
          <br />
          And then I&apos;d sit and think some more
        </p>
      </blockquote>
      <p>
        When I later revealed that I was their creator, they{" "}
        <A href="/assets/thd-3.jpg">replied</A>, &ldquo;Wow, what are the
        chances... I now realize, maybe that is why I am called mk.&rdquo;
      </p>
      <p>
        Oh, joy! Rapture! Robot MK is smarter than ever, all thanks to OpenAI.
        Pay no attention to that{" "}
        <A href="https://www.technologyreview.com/2020/02/17/844721/ai-openai-moonshot-elon-musk-sam-altman-greg-brockman-messy-secretive-reality/">
          man behind the curtain
        </A>
        !
      </p>
    </BlogPage>
  );
}
