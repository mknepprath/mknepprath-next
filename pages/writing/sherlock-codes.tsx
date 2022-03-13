import Image from "next/image";

import A from "@core/a";
import BlogPage from "@core/blog-page";

export const meta = {
  image: "/assets/sherlock-codes.jpg",
  published: true,
  publishedAt: "2021-02-15",
  summary: "Mystery game mechanics as an allegory for debugging.",
  title: "10x Detective",
  tweetId: "1361426223470170117",
};

export default function TenXDetective(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
      tweetId={meta.tweetId}
    >
      <Image
        alt="Bug Detective"
        className="bordered-image corner-radius-8"
        height={690}
        src={meta.image}
        layout="responsive"
        priority
        width={1200}
      />
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        A friend shared this great Game Maker&apos;s Toolkit video with me,{" "}
        <A href="https://www.youtube.com/watch?v=gwV_mA2cv_0">
          What Makes a Good Detective Game?
        </A>
        , while we were researching in preparation for{" "}
        <A href="http://tinymystery.club">Tiny Mystery Club</A>. He made a side
        comment about how programming can be a lot like solving a mystery, a
        comment which has been popping back into my head nearly every time
        I&apos;ve worked through some code since.
      </p>
      <p>
        My favorite segment of the video is about Sherlock Holmes: Consulting
        Detective, a video game based on a board game of the same name.
      </p>
      <Image
        alt="Sherlock Holmes: Consulting Detective"
        className="corner-radius-8"
        height={826}
        src="/assets/sherlock-codes-1.png"
        layout="responsive"
        width={1102}
      />
      <blockquote>
        <p>
          So, in this game, you actually get a newspaper in the box and you have
          to scan through it for articles that might be relevant to your
          investigation...
        </p>
        <p>
          Then, in the game itself, you open up a directory of every person or
          business in London. There&apos;s roughly 200 entries in here at least,
          so you&apos;ll have to rifle through it to find the right person. The
          idea is to hide the relevant names in a sea of red herrings.
        </p>
      </blockquote>
      <p>
        I had this example in mind while working on a recent project. During the
        past week, I&apos;d been working on building and deploying a new{" "}
        <A href="https://nextjs.org">Next.js</A> website with my work&apos;s
        internal tools. The tools are well-documented for lots of different
        kinds of sites, but not Next.js (yet).
      </p>
      <p>
        After some digging, the most effective way I found to solve this problem
        was to try a bunch of different build scripts based on reading the
        documentation for Next.js and our internal deploy tool, then search
        GitHub Enterprise for repositories where folks had tried the same thing.
        The documentation was my newspaper, and GitHub was my London full of red
        herrings.
      </p>
      <p>
        Game Maker&apos;s Toolkit also mentioned a 2009 game called Blackwell
        Convergence:
      </p>
      <blockquote>
        <p>
          In Blackwell, you can type interesting place names you&apos;ve heard
          or seen written down into the Internet to get addresses before
          they&apos;re added to your map as locations you can visit. The magic
          of the search bar is that these people and place names are only
          acknowledged by the game as useful clues when the player has proven
          that they know they&apos;re useful clues by typing them in.
        </p>
      </blockquote>
      <Image
        alt="Sherlock Holmes Consulting Detective"
        className="corner-radius-8"
        height={826}
        src="/assets/sherlock-codes-2.png"
        layout="responsive"
        width={1104}
      />
      <p>
        In some ways, this hews even closer to my experience at work. While
        reading the documentation, I had to recognize which keywords were
        significant and search for them using an actual search bar in GitHub.
        I&apos;d know the keywords were useful clues when they led me to
        someone&apos;s repository in which they were trying to solve a similar
        problem.
      </p>
      <p>
        For example, the documentation for our internal deploy tool indicated
        that I&apos;d need to build to a specially named directory called{" "}
        <code className="language-html">target</code>. I cross-referenced that
        with the Next.js page about how to{" "}
        <A href="https://nextjs.org/docs/api-reference/next.config.js/setting-a-custom-build-directory">
          set a custom build directory
        </A>
        , specified a <code className="language-html">distDir</code> directory
        for my website, and searched for{" "}
        <code className="language-html">distDir: &apos;target&apos;</code> in
        GitHub Enterprise. There were a few results! This indicated to me that I
        was probably on the right path. Even better, the results led to more
        repositories where I could hunt for even more clues.
      </p>
      <p>
        Of course, I&apos;m not trying to play a game while I&apos;m working -
        and for most tasks, I&apos;d really prefer a simple list of steps to
        follow. In fact, how similar my work is to a mystery game is probably
        inversely proportional to how much coverage a tool&apos;s documentation
        has. In mystery games, the goal is to make the player have to work to
        solve the problem without spoonfeeding them answers. In development, I
        want to complete my tasks as quickly and efficiently as possible.
      </p>
    </BlogPage>
  );
}
