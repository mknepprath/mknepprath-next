import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2016-01-21",
  title: "Creating Lilt — Part 2",
};

export default function LiltPart2() {
  return (
    <BlogPage dateTime={meta.publishedAt} highlightCode title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        Now that I’ve been working on this game for a month or so, it’s time to
        share some of my progress. I knew that writing the story for this game
        was going to be a challenge, but I had not realized that I’d first have
        to overcome a equally challenging prerequisite — figuring out how to
        write this story.
      </p>
      <p>
        Not to downplay the challenges of writing a good novel — but at the most
        basic level, books are a long string of carefully curated words. There
        are tons of tools out there for organizing, formatting, and correcting
        these words, but not much out there for what I was planning to do. My
        story would be 3D, 4D, or even RealD when compared to the flatness of a
        book.
      </p>
      <p>So, without further ado,</p>

      <h2>Attempt #1:</h2>
      <p>
        I’m clumping together a few similar attempts I tried here: lists. I had
        lists in Google Docs, lists in{" "}
        <a href="http://realmacsoftware.com/clear">Clear</a>, lists in a
        notebook… but none of these seemed to suffice. It became obvious that
        for a multi-dimensional story like Lilt, I’d need a multi-dimensional
        tool.
      </p>

      <h2>Attempt #2</h2>
      <p>Lists in lists.</p>
      <pre>
        <code className="language-markup">
          {`
<ul>Tweet "start" to begin.
  <li>start
    <ul>You are resting in a glade. There is a waterfall to your right and a pathway to your left. What will you do?
      <li>walk down the path | walk down the pathway | take the path | walk the path
        <ul>You walk down the path but soon realize your way is blocked by a large felled tree. You walk back.
        </ul>
      <li>pick up the ladle | pick up the #ladle | pick up ladle | pick the #ladle
            <ul>You now have a <b>#ladle</b>.
            </ul>
          </li>
      </li>
      <li>look at the waterfall
        <ul>The water looks pure. There are beautiful koi fish swimming around in it.
        </ul>
      </li>
      <li>drink from the waterfall
        <ul>Something prevents you from touching the water with your hands. Perhaps you need a tool for that?
        </ul>
        <ul>(<b>#ladle</b>) You use the ladle to scoop up some water and drink it. You are now immortal.
        </ul>
      </li>
      <li>
      </li>
    </ul>
  </li>
  <li>asdfgh
    <ul>You can't do that yet.</ul>
  </li>
</ul>
              `}
        </code>
      </pre>

      <p>
        I had the above list hosted on my site so I could view it as I updated
        the html. This allowed me to map out the branches a player could take as
        they made their way through the game. I also attempted to use{" "}
        <a href="https://daringfireball.net/projects/markdown">Markdown</a>,
        which was a little better, but both ended up being to0 unwieldy and
        neither could scale easily. I discovered over and over again how much I
        had underestimated the amount of content I’d have to generate for even a
        small, simple puzzle in this game.
      </p>

      <h2>Attempts #3</h2>
      <p>
        For this attempt, I decided I needed to start defining the space of the
        first level of this game, and then see if a good system came to light
        through that.
      </p>
      <img
        alt="Drawing of The Room"
        className="blog-image"
        src="/assets/creating-lilt-part-2-1.png"
      />
      <p>
        To kick off this process, I had a friend over and quickly threw together
        an illustration of a room in Google Docs, then we started playing
        through some ideas. We compiled a list of all the objects in this room,
        and generated a short list of possible interactions. We also came up
        with the general path a player would need to follow to advance.
      </p>
      <p>
        It was this brainstorming session that lead me to the surprising
        solution that I’ve been running with so far… a spreadsheet.
      </p>
      <img
        alt="Screenshot of the Lilt spreadsheet"
        className="blog-image"
        src="/assets/creating-lilt-part-2-2.png"
      />
      <p>
        This allowed me to account for a vast majority of object/interaction
        combinations with relative ease. The top row also includes an entire
        section at the end for, “use X with Y,” for instance, “use X with ants,”
        which would then be followed by a column of responses for “use blanket
        with ants,” “use bucket with ants,” “use coin with ants,” and so on.
      </p>

      <h2>Next Steps</h2>
      <p>
        Part 3 of this series will be coming soon, as I’ve started working on a
        prototype, and it’s already playable. Hit me up on Twitter,
        <a href="https://twitter.com/mknepprath">@mknepprath</a>, if you’d like
        to give it a shot!
      </p>
    </BlogPage>
  );
}
