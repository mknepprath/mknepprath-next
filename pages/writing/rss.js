import Prism from "prismjs";

import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/adding-rss.jpg",
  published: true,
  publishedAt: "2020-01-15",
  summary:
    "Examining the bumps along the road as I worked to add an RSS feed to my website.",
  title: "Adding RSS to My Next.js Website"
};

export default () => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
    >
      <img
        alt="A big shiny subscribe button."
        className="blog-image"
        src="/assets/adding-rss.jpg"
      />
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        Last week, I was riding high thanks to{" "}
        <a href="https://twitter.com/chriscoyier/status/1214555767115862016?s=20">
          this tweet
        </a>{" "}
        mentioning how many personal websites don't include their owner's name.
        Then Chris posted{" "}
        <a href="https://twitter.com/chriscoyier/status/1214606808125341696?s=20">
          this tweet
        </a>{" "}
        highlighting the long list of RSS feeds he was subscribed to and my
        world came crashing down. I had a GitHub issue for adding a feed to this
        website, but hadn't prioritized it yet. This tweet launched it to the
        top of my list.
      </p>
      <p>
        Since my blog on this site was{" "}
        <a href="https://github.com/mknepprath/mknepprath-next/pull/10">
          custom built
        </a>
        , there wasn't a plug-and-play solution out there for me - I had to
        write my own.
      </p>
      <h2 id="the-solution">The Solution</h2>
      <p>
        After a bunch of googling, I landed on Juan Olvera's blog post,{" "}
        <a href="https://jolvera.dev/posts/rebuilding-my-blog-with-nextjs">
          Rebuilding my blog with Next.js
        </a>
        , which included details about how he added an RSS feed to his blog. I
        decided to follow the same pattern he used, "An npm script runs a Node
        function that generates the feed." Once set up, I'd be able to run{" "}
        <code className="language-html">npm run build:rss</code> from the
        command line to generate my RSS{" "}
        <code className="language-html">feed.json</code> file - which RSS reader
        apps would parse to load my posts.
      </p>
      <p>
        Juan's Node function relies upon each post having a separate, exported{" "}
        <code className="language-html">meta</code> object that looks similar to
        this:
      </p>
      <pre>
        <code className="language-js">
          {`
export const meta = {
  published: true,
  publishedAt: "2019-07-22",
  summary: "A quick guide for setting up a new website with GitHub.",
  image: "/assets/create-a-website1.jpg",
  title: "Create a Simple Website with GitHub Pages"
};
              `}
        </code>
      </pre>
      <p>
        None of my posts had this object. They <em>did</em> include all of this
        information as props, but after converting a few, I quickly realized I
        didn't want to repeat this process 60+ times. It was time to write my
        first <a href="https://github.com/facebook/codemod">codemod</a>.
      </p>
      <h3 id="codemods">Codemods</h3>
      <p>
        Codemods are scripts that automate code changes when you need to make
        the same change to a large number of files. If you're familiar with
        batch-processing in Photoshop, this is similar, except a codemod is for
        code.
      </p>
      <p>
        My codemod needed to take the information I was passing as props and
        move them to the <code className="language-html">meta</code> object.
        This was all new to me, but I was able to construct a codemod that
        accomplished this. I published the final version as{" "}
        <a href="https://gist.github.com/mknepprath/be919a308f37315030f4607244afef42">
          a gist
        </a>
        , feel free to leave a comment! It's not perfect, but it got the job
        done. I plan on writing a separate post detailing out the process of
        writing this since it was a bit of a sidequest.
      </p>
      <p>
        Once I added a simplified version of the{" "}
        <code className="language-html">build:rss</code> script, and all my
        posts had their metadata extracted out into{" "}
        <code className="language-html">meta</code> objects, I could generate my
        feed.
      </p>
      <h2 id="validating-the-feed">Validating the Feed</h2>
      <p>
        <a href="https://zeit.co/now">Zeit Now</a> was indispensable for
        validating my feed. Now can integrate with GitHub and create a deploy
        with a{" "}
        <a href="https://sebastiandedeyne.com/design-details-incremental-correctness-with-guillermo-rauch/">
          unique link for every change committed
        </a>{" "}
        to my website. I was able to copy the link for each change I made into
        the official{" "}
        <a href="https://validator.jsonfeed.org/?url=mknepprath-next-git-add-rss.mknepprath.now.sh%2Ffeed.json">
          JSON Feed Validator
        </a>{" "}
        to see what errors I needed to handle. Not only that, I was even able to
        use these links in <em>real</em> RSS readers to see how my feed would
        look in its final form before shipping it.
      </p>
      <h2 id="generating-my-blog-list">Generating My Blog List</h2>
      <p>
        Up until this point, I was maintaining a JSON list of blog posts that{" "}
        <a href="/writing">Writing</a> and my homepage were importing. That
        seemed silly at this point. I was already generating an RSS feed file,
        why not this one? I created a{" "}
        <a href="https://github.com/mknepprath/mknepprath-next/blob/1daf3618649349ca5c0da22e1723ce14e50e460a/data/post-feed.js">
          separate Node script
        </a>{" "}
        to generate this list, as well.
      </p>
      <h2 id="future-work">Future Work</h2>
      <p>
        My website now has an RSS feed! If you{" "}
        <a href="http://mknepprath.com/feed.json">subscribe to it</a>, however,
        you will notice you still have to click through to see the full post.
        This is because the feed solely uses the previously mentioned{" "}
        <code className="language-html">meta</code> objects, which don't contain
        the full contents of my posts. I'm still thinking about how to solve
        this. If you have any ideas, dear reader,{" "}
        <a href="https://twitter.com/mknepprath">let me know</a>.
      </p>
      <p>
        One additional issue is that I have to run the RSS feed and post list
        scripts before publishing new posts - it isn't automatic. I'm
        considering using a <a href="https://githooks.com/">Git hook</a> to help
        with this, but I don't consider it a permanent solution.
      </p>
      <p>
        Is a blog a really a blog if it doesn't have an RSS feed? I don't know,
        but now mine does! Yay!
      </p>
    </BlogPage>
  );
};
