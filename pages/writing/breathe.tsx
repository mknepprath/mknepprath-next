import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/breathe-1.jpg",
  published: true,
  publishedAt: "2019-08-03",
  summary: "What if we let our code breathe a little?",
  title: "Code Should Breathe",
};

export default function Breathe() {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      highlightCode
      ogImage={meta.image}
      title={meta.title}
    >
      <img alt="A feather" className="blog-image" src="/assets/breathe-1.jpg" />

      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        <em>
          Note: This is my opinion. If you have thoughts or concerns, that's
          fine - feel free to{" "}
          <a href="https://twitter.com/mknepprath">message me</a>.
        </em>
      </p>

      <p>
        In programming, there can be an obsession with brevity, compactness and
        cleverness (i.e. magic). How much can I do in one line? How few lines
        can I have in my component? How much can I abbreviate my variable names?
        All of this leads to the code equivalent of hyperventilation.
      </p>
      <p>
        What if we let our code breathe a little? "Breathing room" here is
        defined as extra lines and empty space within code. Here are a couple
        ways this can be accomplished.
      </p>

      <h2 id="use-blank-lines-to-create-sections">
        Use Blank Lines To Create Sections
      </h2>
      <p>
        A List Apart had a great article about the use of whitespace in web
        design entitled simply,{" "}
        <a href="http://alistapart.com/article/whitespace/">Whitespace</a>. This
        piece refers to a concept called <b>active whitespace</b>, "whitespace
        added to a composition to better emphasize or structure, information."
        In code, use whitespace (blank lines) to clearly separate imports,
        methods, and so on. Here's an example from this website:
      </p>
      <pre>
        <code className="language-js">
          {`
  // External
  import parseISO from "date-fns/parseISO";
  import Link from "next/link";
  import { withRouter } from "next/router";

  // Components
  import Page from "core/page";

  // Data
  import posts from "data/posts";

  class Writing extends React.Component {
    ...
              `}
        </code>
      </pre>
      <p>
        And, of course, there are examples of great whitespace usage in the
        official React docs. See the code examples in the{" "}
        <a href="https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class">
          Adding Lifecycle Methods to a Class
        </a>{" "}
        section. From the A List Apart article, "[W]hitespace creates breathing
        room and balance. It’s important."
      </p>

      <h2 id="lint-rules">Lint Rules</h2>
      <p>
        If a lint rule exists that enforces adding more lines and space,
        implement it. One example:{" "}
        <a href="https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-closing-bracket-newline.md">
          vue/html-closing-bracket-newline
        </a>
        .{" "}
      </p>
      <pre>
        <code className="language-markup">
          {`
 <!-- Example A: -->
 <p
   id="foo"
   class="bar">
   baz
 </p>

 <!-- Example B: -->
 <p
   id="foo"
   class="bar"
 >
   baz
 </p>
              `}
        </code>
      </pre>
      <p>
        Given the two options above, <b>Example B</b> allows for more breathing
        room. It's easier to understand at a glance. Multiply <b>Example A</b>{" "}
        by a dozen elements with varying numbers of attributes and it becomes
        increasingly difficult to see where attributes end and text/nested
        elements begin. I propose that when choosing between two lint rule
        options, always choose the one that adds more lines and space.
      </p>

      <h2 id="close-blocks-clearly">Close Blocks Clearly</h2>
      <p>
        While I do enjoy the simplicity of{" "}
        <a href="https://pugjs.org/api/getting-started.html">Pug</a>, the
        template engine formerly known as Jade, I do believe some human
        processing speed is lost due to the lack of closing tags.
      </p>
      <pre>
        <code className="language-markup">
          {`
<!-- Example A (Pug) -->
.fancy-link
	a(href="/")
    | Home
.fancy-link
  a(href="/about")
    | About

<!-- Example B -->
<div class="fancy-link">
	<a href="/">
		Home
	</a>
</div>
<div class="fancy-link">
	<a href="/about">
		About
	</a>
</div>
              `}
        </code>
      </pre>
      <p>
        While I love the brevity of Pug here, I personally think there's too
        much left to the imagination. Again, multiply <b>Example A</b> by a
        dozen different nested elements and it becomes dense and difficult to
        parse.
      </p>

      <h2 id="breathe">Breathe!</h2>
      <p>
        On a fun website called <a href="https://www.dwitter.net">Dwitter</a>,
        contributors are challenged to see what they can create with 140
        characters (or less) of JavaScript. While limiting characters can be a
        fun constraint, this isn't code I want to read on a day-to-day basis.
        Instead, let's luxuriate in the fact that we have room to breathe.{" "}
      </p>

      <a href="https://twitter.com/mknepprath/status/1057477764033458181?s=20">
        <img alt="Fishing" className="blog-image" src="/assets/breathe-2.jpg" />
      </a>
    </BlogPage>
  );
}
