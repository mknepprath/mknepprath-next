import React from "react";
import Prism from "prismjs";

import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2020-03-21",
  summary: "A quick overview of my first experience with codemods.",
  title: "The Codemod Side Quest",
};

export default () => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        In my post from a couple months ago,{" "}
        <a href="/writing/rss">Adding RSS to My Next.js Website</a>, I mentioned
        a minor side quest: building a codemod and executing it on all of my
        existing blog posts. An excerpt from that post:
      </p>
      <p>
        <blockquote>
          Codemods are scripts that automate code changes when you need to make
          the same change to a large number of files. If you're familiar with
          batch-processing in Photoshop, this is similar, except a codemod is
          for code.
        </blockquote>
      </p>
      <p>
        In order to build an RSS feed, all of my posts needed to include a new
        object containing each posts metadata (title, summary, published status,
        etc). While I could have updated each post manually, I am a Real
        Developer, and Real Developers do things The Needlessly Difficult Way.{" "}
        <a href="https://en.wikipedia.org/wiki/Irony_punctuation#Other_typography">
          /s
        </a>
      </p>
      <p>
        Actually, writing a codemod seemed like a fun challenge. It was hyped at
        the most recent{" "}
        <a href="https://youtu.be/T0AY0ea45dM?t=1365">React Conf</a> as an
        invaluable tool at Facebook, and I liked the idea of using code to
        modify code.
      </p>
      <p>
        Luckily, I had already been structuring my blog posts in a consistent
        way, making a batch edit feasible. Here's an example post, pre-codemod.
      </p>
      <pre>
        <code className="language-js">
          {`
import BlogPage from "core/blog-page";

export default () => (
  <BlogPage
    dateTime="2020-03-21"
    description="A description of the post."
    ogImage="/assets/image.jpg"
    title="The Post Title"
  >
    <header>
      <h1>The Post Title</h1>
    </header>
    <p>
      The content of the post.
    </p>
  </BlogPage>
);
              `}
        </code>
      </pre>
      <p>
        My posts didn't include the aforementioned metadata object, but all of
        that data <em>was</em> there as props. Here's how I wanted my posts to
        look post-codemod:
      </p>
      <pre>
        <code className="language-js">
          {`
import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2020-03-21",
  summary: "A description of the post.",
  image: "/assets/image.jpg",
  title: "The Post Title"
};

export default () => (
  <BlogPage
    dateTime={meta.publishedAt}
    description={meta.summary}
    ogImage={meta.image}
    title={meta.title}
  >
    <header>
      <h1>{meta.title}</h1>
    </header>
    <p>
      The content of the post.
    </p>
  </BlogPage>
);
              `}
        </code>
      </pre>
      <h2 id="getting-set-up">Getting Set Up</h2>
      <p>
        I was able to get everything kicked off with{" "}
        <a href="https://www.newline.co/fullstack-react/articles/using-jscodeshift-with-react-codemod-to-update-createclass-components-to-es6-classes/">
          this post
        </a>{" "}
        by <a href="https://twitter.com/accomazzo">Anthony Accomazzo</a>. It
        thoroughly covered how to install and and run jscodeshift - the command
        line tool for running codemods. Exactly what I needed.
      </p>
      <p>
        One of my favorite tips from this post was the <b>dry run</b> flag. By
        including a <b>-d</b> (dry run) and <b>-p</b> (print) in my command, I
        was able to preview what my codemod would do without modifying the files
        themselves.{" "}
      </p>
      <p>
        Next, I explored Facebook's library of codemods,{" "}
        <a href="https://github.com/reactjs/react-codemod">
          reactjs/react-codemod
        </a>
        . I figured this would be the best place to pick up on good patterns to
        use in my own codemod.
      </p>
      <p>
        I also took a look at{" "}
        <a href="https://astexplorer.net/">AST Explorer</a>. It's a popular tool
        that lets you paste in your code and codemod and quickly see the result.
        I wasn't able to get it to work for my needs at the time, however.
      </p>
      <p>
        I ended up heavily referencing{" "}
        <a href="https://skovy.dev/jscodeshift-custom-transform/">
          Creating a custom transform for jscodeshift
        </a>{" "}
        by <a href="https://twitter.com/spencerskovy">Spencer Skovy</a>, another
        very thorough how-to post.
      </p>
      <h2 id="writing-the-codemod">Writing the Codemod</h2>
      <p>
        Go ahead and scroll up to view the pre- and post-codemod blog posts to
        get a feel for the modifications I needed to make. Here they are:
      </p>
      <p>
        <ul>
          <li>
            Get all of the metadata from the props on{" "}
            <code className="language-html">BlogPage</code>.
          </li>
          <li>Update the h1 heading so that it pulls from the metadata.</li>
          <li>Update the props so that they pull from the metadata.</li>
          <li>Create the metadata object.</li>
          <li>Add the metadata object after the last import.</li>
        </ul>
      </p>
      <p>
        Here's the resulting codemod with comments describing how each of these
        tasks was accomplished. I also published this codemod as{" "}
        <a href="https://gist.github.com/mknepprath/be919a308f37315030f4607244afef42">
          a gist
        </a>{" "}
        if you'd like to leave feedback.
      </p>
      <pre>
        <code className="language-js">
          {`
const transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Creates a map of properties. For instance, the \`dateTime\` prop becomes the
  // \`publishedAt\` metadata property.
  const blogPageProps = [
    { name: "dateTime", type: "Literal", metaName: "publishedAt" },
    { name: "description", type: "Literal", metaName: "summary" },
    { name: "ogImage", type: "Literal", metaName: "image" },
    { name: "title", type: "Literal", metaName: "title" }
  ];

  // Not all blog posts include all of the possible props - I collected them for
  // each post in this array.
  const metaProps = [];

  // Updates the h1 heading so that it pulls from the metadata.
  root
    .findJSXElements("h1")
    .replaceWith(() => {
      return "<h1>{meta.title}</h1>";
    });

  const blogPage = root
    .findJSXElements("BlogPage");

  // This looks through each possible prop.
  blogPageProps.forEach(prop => {
    blogPage
      .find(j.JSXAttribute, {
        name: {
          type: "JSXIdentifier",
          name: prop.name
        },
        value: {
          type: prop.type
        }
      })
      .find(j.Literal)
      .replaceWith(nodePath => {
        const { node } = nodePath;
        // The data for this prop is added to the metaProps array and replaced
        // with a reference to the metadata object, such as \`meta.publishedAt\`.
        metaProps.push({ key: prop.metaName, value: node.value });
        return j.jsxExpressionContainer(j.identifier(\`meta.\${prop.metaName}\`));
      });
  });

  // This converts the collected metadata to an array of strings. These become
  // lines of code in the post, such as \`publishedAt: "2019-12-12"\`. A bit
  // janky, but it works.
  const metaPropsStrings = metaProps.map(
    prop => \`\n  \${prop.key}: "\${prop.value}"\`
  );

  // The last import in the example above is
  // \`import BlogPage from "core/blog-page";\`. This adds the metadata object
  // below that import.
  const LAST_IMPORT = root.find(j.ImportDeclaration).at(-1);
  LAST_IMPORT.insertAfter(\`export const meta = {\${metaPropsStrings}
};\`);

  return root.toSource();
};

export default transform;
          `}
        </code>
      </pre>
      <p>
        Note: I did forget to include one thing. This codemod doesn't add a{" "}
        <code className="language-html">published</code> property, so I ended up
        doing a bit of cleanup after the fact.
      </p>
      <h2 id="codemod-complete">Codemod Complete!</h2>
      <p>
        Frequent writers of codemods won't be impressed with this code, but it
        accomplished what I was seeking to do - and I'm happy with that. Feel
        free to bother me on{" "}
        <a href="https://twitter.com/mknepprath">Twitter</a> if you have
        thoughts, I'd love to hear them.
      </p>
      <p>Thanks for reading! 👋</p>
    </BlogPage>
  );
};
