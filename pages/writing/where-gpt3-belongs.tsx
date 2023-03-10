import A from "@core/a";
import BlogPage from "@core/blog-page";
import { ReactNode } from "react";

export const meta = {
  published: false,
  publishedAt: "2023-02-17",
  title: "Microsoft Is Using GPT-3 Wrong",
};

// Learning from Microsoft’s mistakes
// - You should not return GPT-3 responses directly to users. That’s insane.
// - You can add GPT-3 as a translator for the user. This is helpful, because users aren’t familiar with your language. GPT-3 can be great for this.
// - DON’T give GPT-3 privileged API access. It should have the same limitations the user has. Otherwise, a smart user could “social engineer” their way to doing advanced requests.

export default function WhereGpt3Belongs(): ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <blockquote>
        <p>
          I&apos;m sure it&apos;s been said but I haven&apos;t seen it said:
          GPT-3 seems way more useful for converting user input into some
          computer-readable form than for publishing its output directly to
          users/customers/etc. I would not trust it for that.
        </p>
        <p>
          {" "}
          <a href="https://mastodon.social/@mknepprath/109826168395645602">
            - Michael Knepprath
          </a>
        </p>
      </blockquote>

      <p>
        Hi all! I want to expand on my thoughts from a couple weeks ago based on{" "}
        <A href="https://www.washingtonpost.com/technology/2023/02/16/microsoft-bing-ai-chat-interview/">
          recent events
        </A>{" "}
        and my own experience working with GPT-3.
      </p>

      <h2>What is GPT-3?</h2>

      <p>
        It&apos;s easy to lose what GPT-3 really is in all the chatter about how
        GPT-3 &ldquo;feels&rdquo; or what it &ldquo;wants&rdquo;. GPT-3 is a
        human language <em>emulator</em> at best. It has no intelligence to call
        its own. When asked, &ldquo;What is the meaning of life in one
        word?&rdquo;, it will predict an answer letter-by-letter. The algorithm
        will look at the data it was trained on and decide the most likely
        letter to follow this question is &ldquo;P&rdquo;. Then it will add a
        &ldquo;u&rdquo;, the most likely letter to follow &ldquo;P&rdquo; in
        this context. Then it will add an &ldquo;r&rdquo;, the most likely
        letter to follow &ldquo;Pu&rdquo;. And so on, until it&apos;s completed
        its response, &ldquo;Purpose.&rdquo;
      </p>

      <p>
        It is not &ldquo;thinking&rdquo; about the question. It is not
        &ldquo;feeling&rdquo;. It is not &ldquo;wanting&rdquo; anything. And on
        top of all of this, GPT-3 has no concept of accuracy or correctness. It
        is simply emulating the human language that it has been trained on.
      </p>

      <p>
        Back to my initial post, all the companies I&apos;m seeing use
        GPT-3-like technology seem to be obsessed with the idea of outputting
        the algorithm&apos;s response directly to users. After playing with
        GPT-3 for a couple years now and even integrating it into some of my
        bots, I can say that doing this would make me very nervous. The fun of
        GPT-3 is that it&apos;s so unpredictable. We still don&apos;t have that
        much visibility into how it works. And all of this is entirely
        antithetical
      </p>
    </BlogPage>
  );
}
