import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta = {
  // image: "/assets/breathe-1.jpg",
  published: true,
  publishedAt: "2023-07-22",
  summary: "Writing code is writing for humans.",
  title: "Writing Code Is Writing",
  tweetId: "1158369861996883968",
};

export default function WritingCode(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      highlightCode
      // ogImage={meta.image}
      title={meta.title}
      tweetId={meta.tweetId}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        <em>
          Note: This is my opinion. If you have thoughts or concerns,
          that&apos;s fine - feel free to{" "}
          <a href="https://mastodon.social/@mknepprath">message me</a>.
        </em>
      </p>
      <p>
        When writing code, it’s easy to fall into that trap of thinking that
        you’re writing for the computer. You’re not. You’re writing for other
        engineers... whether it be your coworkers, the open source community, or
        yourself in six months. Making sure your code is human-readable is just
        as important as making sure it works.
      </p>
      <p>
        How do you make code human-readable? Think about the intended message of
        each line. For instance, I once had a hard rule to never type{" "}
        <code className="language-js">value === true</code> for boolean
        variables because it was technically redundant. For example, let’s look
        at the following snippet:
      </p>
      <pre>
        <code className="language-js">
          {`
if (value) console.log(value);
        `}
        </code>
      </pre>
      <p>
        This is quite readable to me. I can easily read this as, “if there’s a
        value, log the value to the console.”
      </p>
      <p>Now the next example:</p>
      <pre>
        <code className="language-js">
          {`
Object.values(form.checkboxes).every((checkbox) => checkbox);
        `}
        </code>
      </pre>
      <p>
        Is it immediately obvious what this code is doing? I don’t think so.
        It’s not difficult code, but you do have to do an extra run around the
        mental event loop for your brain to process it. “This is checking if
        every checkbox in the form is…?”
      </p>
      <p>
        The change that would make this code clearer to me would be the
        following:
      </p>
      <pre>
        <code className="language-js">
          {`
Object.values(form.checkboxes)
  .every((checkbox) => checkbox === true);
        `}
        </code>
      </pre>
      <p>
        The <code className="language-js">=== true</code> here is completely
        unnecessary when it comes to the functionality of the code, but does
        wonders for the legibility of the code. “Ah! This is checking if every
        checkbox in the form is true.”
      </p>
      <p>
        Notice what I’ve been doing in all of the examples above? Reading your
        code back to yourself using natural language is a great way to gauge
        code clarity.
      </p>
      <p>
        You aren’t a robot and your code shouldn’t appear to be written by one.
        Don’t simplify your code blindly. What you choose to include or exclude
        should depend a great deal on what makes it easier to read.
      </p>

      <Image
        alt="Duck"
        className="corner-radius-8"
        height={559}
        src="/assets/comics-13.jpeg"
        layout="responsive"
        width={1200}
      />
    </BlogPage>
  );
}
