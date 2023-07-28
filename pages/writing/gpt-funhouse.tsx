import A from "@core/a";
import BlogPage from "@core/blog-page";

export const meta: Meta = {
  published: true,
  publishedAt: "2023-07-28",
  summary: "About what ChatGPT is and isn't.",
  title: "Thoughts on Nick Cave's Response to ChatGPT",
  // tweetId: "1158369861996883968",
};

export default function WritingCode(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      highlightCode
      title={meta.title}
      // tweetId={meta.tweetId}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        <em>
          &ldquo;This is what we humble humans can offer, that AI can only
          mimic, the transcendent journey of the artist that forever grapples
          with his or her own shortcomings.&rdquo; -
          <A href="https://www.theredhandfiles.com/chat-gpt-what-do-you-think/">
            Nick Cave, The Red Hand Files Issue #218
          </A>
          .
        </em>
      </p>
      <p>
        While this post is well-written and provides great insight into the
        song-writing process, it betrays a slight misunderstanding of what this
        AI is. He is correct that this “AI” is{" "}
        <A href="https://www.bloomberg.com/opinion/articles/2023-03-26/even-with-chat-gpt-4-there-s-no-such-thing-as-artificial-intelligence">
          not truly AI
        </A>{" "}
        and is not intelligent. There is no… there… there.
      </p>
      <p>
        But the output of it <em>is</em> interesting. Mimicry, sure, but this
        word is used here to needlessly cheapen it. I’d liken it more to a
        reflection. Not of any single artist, but of humanity filtered back
        through humanity’s understanding of that artist. An unfathomable amount
        of human creation synthesized through an algorithm to output a singular
        result. That is interesting.
      </p>
    </BlogPage>
  );
}
