import Image from "next/image";

import A from "core/a";
import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/memes-arent-user-research.jpg",
  published: true,
  publishedAt: "2021-06-12",
  summary:
    "Memes are catchy and entertaining, but rarely capture the full scope of the problem at hand.",
  title: "Memes Aren't User Research",
};

export default function MemesArentUserResearch(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
    >
      <Image
        alt="Katamari App"
        height={677}
        layout="responsive"
        priority
        src="/assets/memes-arent-user-research.jpg"
        width={1200}
      />

      <header>
        <h1>Memes Aren't User Research</h1>
      </header>

      <p>
        “
        <A href="https://twitter.com/lily_flood/status/1400910301852323844?s=20">
          how do i read a recipe online without reading the author’s life story
          first
        </A>
        &quot;
      </p>
      <p>
        &quot;
        <A href="https://twitter.com/LooceeZ/status/1402317703264694277?s=20">
          Recipe bloggers like to write their entire life story before the
          recipe
        </A>
        &quot;
      </p>
      <p>
        &quot;
        <A href="https://twitter.com/MUSlCClTYLOVE/status/1403468992392597504?s=20">
          Imagine a world where you click on a recipe page and it’s just the
          ingredients and instructions and not someone’s life story
        </A>
        &quot;
      </p>
      <p>
        If you&#39;re on Twitter, you&#39;ve probably read thousands of variants
        of this meme. Riding this wave of anti-blog sentiment, a team was formed
        to create a platform called{" "}
        <A href="https://twitter.com/redman/status/1366137187117506560">
          Recipeasly
        </A>{" "}
        for finding recipes stripped of stories and ads. Based on all the above
        tweets, this idea was a slam dunk.
      </p>
      <p>
        Of course,{" "}
        <A href="https://twitter.com/redman/status/1366217790257061891?s=20">
          it wasn’t
        </A>
        . By basing their project on memes and not consulting the food bloggers
        doing the work, this team missed the trade-offs that bloggers had made
        to grow a loyal audience and earn a profit.
      </p>
      <p>
        This example is about as macro as you can get (even gaining some{" "}
        <A href="https://www.washingtonpost.com/food/2021/03/02/recipeasly-food-bloggers-controversy/">
          national attention
        </A>
        ), but this meme-guided go-it-alone phenomenon can occur at any level;
        within your company, or even just within your team.
      </p>
      <p>
        For instance, consider the decision to build a monolithic app instead of
        a collection of microservices. All new services and feature requests
        make their way into this app. Think Katamari Damacy, but an app. One
        could envision a food blog-like situation happening here. Similar to the
        recipe meme,
      </p>
      <ul>
        <li>
          <strong>Trade-offs are made.</strong> Developers decide that the cost
          of building a monolithic app is worth not having to repeatedly solve
          networking, architecture, and deployment issues.
        </li>
        <li>
          <strong>People are separated from the trade-off decision.</strong>{" "}
          Time passes, turnover occurs, and eventually, the developers working
          on the app aren&#39;t the same developers who made the original
          trade-off.
        </li>
        <li>
          <strong>Memes catch fire.</strong> Most complaints are expressions of
          frustration with little in the way of solutions, “KatamariApp is a
          black hole!” The memes focus on the disadvantages so much that the
          advantages are ignored or forgotten.
        </li>
        <li>
          <strong>Someone takes action.</strong> Thanks to the popularity of the
          meme and lack of context around the trade-off, someone gets it in
          their head that building the next feature or service outside of the
          monolith will be a good and popular decision.
        </li>
        <li>
          <strong>Blowback!</strong> Despite the frustration developers have
          with KatamariApp, it was still better than maintaining a separate
          service AND the monolith in tandem.
        </li>
      </ul>
      <p>
        Memes are catchy and often entertaining, but infrequently (if ever)
        capture the full scope of the problem at hand.{" "}
        <strong>Memes are not user research.</strong>
      </p>
      <p>
        It’s important to learn the history and context around the domain one is
        working within. It’s also important to collaborate with (or at least
        consult) those who might be affected by your work.
      </p>
      <p>
        It would’ve saved the Recipeasly team a lot of trouble to interview some
        food bloggers, the backbone of the service they were pitching, to learn
        why they’d made the decisions they’d made. Food bloggers aren’t dumb and
        very consciously made trade-offs in the best interest of their
        businesses.
      </p>
      <p>
        We also need to know about the trade-off decisions in the case of
        KatamariApp. Teams must be proactive by creating a{" "}
        <A href="https://adr.github.io">decision log</A> outlining why the app
        was built a certain way so that future maintainers can reference it and
        have a meme counterweight.
      </p>
    </BlogPage>
  );
}
