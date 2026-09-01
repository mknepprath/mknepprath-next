import A from "@core/a";
import BlogPage from "@core/blog-page";

export const meta: Meta = {
  published: true,
  publishedAt: "2023-11-11",
  summary: "LLMs are breaking the internet.",
  title: "It’s Not AI, and It Wasn’t Built to Be Accurate",
};

export default function LargeLanguageMayhem(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      highlightCode
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        I&apos;d already been getting frustrated with the discourse around LLMs,
        but watching the latest Humane demo and fallout put me over the edge.
      </p>

      <p>
        In my last post on this topic, I said, &ldquo;GPT has no concept of
        accuracy or correctness, so it&apos;s wild to see... well-known
        companies placing this volatile service in front of their customers with
        relatively few precautionary measures.&rdquo; I thought I was being a
        bit punchy, but time has proven this take to be tame.
      </p>

      <p>
        Humane has just launched their long-awaited flagship product, the{" "}
        <a href="https://vimeo.com/882968794">Humane Ai Pin</a>. Despite the dry
        video, I was taken with the sci-fi-like device brought to life. I
        assumed that Humane had somehow overcome the accuracy problem, as they
        surely wouldn&apos;t launch an entire product predicated on the
        assumption that an LLM left to its own devices would return accurate
        information.
      </p>

      <p>
        I was wrong. Humane released a prerecorded and edited launch video
        featuring{" "}
        <A href="https://mastodon.social/@ironicsans/111381973070786872">
          not one
        </A>{" "}
        <A href="https://mastodon.social/@siracusa/111384288436972133">
          but two
        </A>{" "}
        wholly inaccurate responses from the &ldquo;AI&rdquo; pin.
      </p>

      <p>
        Humane is receiving a lot of flak about this right now, but they&apos;re
        far from the only ones with this issue. My research today led me to
        Google, &ldquo;What are the technical differences between GPT-3 and
        GPT-4?&rdquo; and Google&apos;s big bold pull quote at the top was all
        about how much more powerful GPT-3 is than GPT-4.
      </p>

      <p>LLMs are breaking the internet.</p>

      <p>
        ChatGPT (and LLMs in general) weren&apos;t built for this. LLMs were
        built with the singular goal of emulating human language -{" "}
        <em>sounding human</em> isn&apos;t the same as <em>being accurate</em>,
        although some level of the latter is required to accomplish the former.
        Any incidental accuracy is a byproduct of the fact that it&apos;s
        trained to sound authentic.
      </p>

      <p>
        After all this LLM-bashing, I do have to say that this technology can be
        useful. To make the most of it, however, we need to understand its
        limitations and build accordingly.
      </p>
    </BlogPage>
  );
}
