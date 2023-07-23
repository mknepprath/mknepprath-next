import A from "@core/a";
import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";
import Link from "next/link";

export const meta: Meta = {
  image: "/assets/2021-mid-year-4.jpg",
  published: true,
  publishedAt: "2021-07-11",
  summary:
    "A mid-year check-in to see how I&apos;m doing on my goals for 2021.",
  title: "The 2021 Mid-Year Review",
  tweetId: "1414295972910440457",
};

export default function MidyearReviewOf2021(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
      tweetId={meta.tweetId}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        Hard to believe, but we&apos;re already halfway through 2021. Time for
        an update!
      </p>

      <h2 id="read-15-books">Read 15 books (10/15)</h2>
      <p>
        My goal last year was 10 books, a total I&apos;ve already surpassed this
        time around. I was right to increase my goal to 15! What I&apos;ve read
        so far:
      </p>
      <ol>
        <li>
          <b>Saving Capitalism</b> by Robert B. Reich
        </li>
        <li>
          <b>Batman: The Long Halloween</b> by Jeph Loeb
        </li>
        <li>
          <b>The New Jim Crow</b> by Michelle Alexander
        </li>
        <li>
          <b>Serpents of Eden</b> by Martin Edwards
        </li>
        <li>
          <b>This is Chance!</b> by Jon Mooallem
        </li>
        <li>
          <b>Word by Word</b> by Kory Stamper
        </li>
        <li>
          <b>The Road</b> by Cormac McCarthy
        </li>
        <li>
          <b>Working in Public</b> by Nadia Eghbal
        </li>
        <li>
          <b>The Wal-Mart Effect</b> by Charles Fishman
        </li>
        <li>
          <b>You Look Like a Thing and I Love You</b> by Janelle Shane
        </li>
      </ol>
      <p>
        I <em>was</em> way ahead of schedule on this goal, but I think
        that&apos;s going to change with my current book,{" "}
        <b>
          <A href="https://twitter.com/mknepprath/status/1393712872832831494">
            Battle Cry of Freedom
          </A>
        </b>{" "}
        by James McPherson. It&apos;s big.
      </p>
      <p>
        Queued up for the rest of this year: <b>The Making of a Manager</b> by
        Julie Zhuo, <b>Make It Stick</b> by Peter C. Brown,{" "}
        <b>Expressive Design Systems</b> by Yesenia Perez-Cruz, and{" "}
        <b>Everyday Information Architecture</b> by Lisa Maria Martin.
      </p>
      <A href="https://twitter.com/mknepprath/status/1252679361918107650">
        <Image
          alt="A photo of Battle Cry of Freedom."
          className="corner-radius-8"
          height={1600}
          src="/assets/2021-mid-year-1.jpg"
          layout="responsive"
          width={1200}
        />
      </A>

      <h2 id="write-10-blog-posts">Write 10 blog posts (5/10)</h2>
      <p>
        Last year, I&apos;d written most of my blog posts during the first half
        of the year, got burned out, and wrapped up the rest near the end of the
        year. This time around, I&apos;m pacing myself.
      </p>
      <ol>
        <li>
          <Link href="/writing/the-bots-replaced-me">
            Auto-Merging Dependabot Pull Requests
          </Link>
        </li>
        <li>
          <Link href="/writing/sherlock-codes">10x Detective</Link>
        </li>
        <li>
          <Link href="/writing/ping">
            Using the Apple Music API with Next.js
          </Link>
        </li>
        <li>
          <Link href="/writing/settings-done">iOS App Settings: A Study</Link>
        </li>
        <li>
          <Link href="/writing/memes-arent-user-research">
            Memes Aren&apos;t User Research
          </Link>
        </li>
      </ol>
      <p>
        Upcoming topics include VR, machine learning, building for oneself, and
        LEGO Mario. The next post is due in early August!
      </p>

      <h2>
        Release the next chapter of{" "}
        <A href="http://tinymystery.club">Tiny Mystery Club</A>
      </h2>
      <p>
        This project is in the research phase - I read a collection of short
        mystery stories, Serpents of Eden, along with The Long Halloween and
        Watchmen. <Link href="/writing/sherlock-codes">10x Detective</Link> came
        out of the research material for this project while I was looking into
        existing mystery game mechanics. More recently, I watched Sherlock Jr.,
        the 1924 Buster Keaton film.
      </p>
      <Image
        alt="A photo of Serpents of Eden."
        className="corner-radius-8"
        height={1183}
        src="/assets/2021-mid-year-3.jpg"
        layout="responsive"
        width={1200}
      />
      <p>
        A big thank you to{" "}
        <A href="https://twitter.com/benlundsten">Ben Lundsten</A> for
        recommending nearly all of these and collaborating with me on some
        diagrams and wireframes!
      </p>

      <h2 id="animations">Animations</h2>
      <p>Nothing yet.</p>

      <h2 id="illustrate-a-comic">Illustrate a comic</h2>
      <p>
        I&apos;ve been doing quite a bit of{" "}
        <A href="https://twitter.com/mknepprath/status/1402723187817844736">
          drawing
        </A>{" "}
        in preparation for a potential comic about an art gallery gone awry.
        I&apos;ll continue to post progress to the linked Twitter thread.
      </p>
      <A href="https://twitter.com/mknepprath/status/1403568450417664003">
        <Image
          alt="A drawing of a sick painting."
          className="corner-radius-8"
          height={900}
          src="/assets/2021-mid-year-4.jpg"
          layout="responsive"
          width={1200}
        />
      </A>

      <h2 id="launch-lily-dex">Launch lily dex</h2>
      <p>
        Apple announced a bunch of{" "}
        <A href="https://www.hackingwithswift.com/articles/235/whats-new-in-swiftui-for-ios-15">
          amazing additions to SwiftUI
        </A>{" "}
        this year that will benefit lily dex significantly, so I&apos;m
        hesitating to work on it until I can leverage those features. Very
        excited about the improvements to lists (SWIPE ACTIONS!!!) and remote
        image loading.
      </p>
      <p>
        In the meantime, I launched a new landing page and newsletter at{" "}
        <A href="https://lilydex.com">lilydex.com</A>. Sign up there for
        updates!
      </p>

      <h2 id="other-stuff">Other stuff</h2>
      <p>A few other highlights from this year:</p>
      <ul>
        <li>
          <b>
            <A href="https://config.figma.com">Config 2021</A>
          </b>
          : Figma held a remote conference this year, and it was a blast!
        </li>
        <li>
          <b>Pokémon Omega Ruby</b>: I finally got back around to playing Ruby
          and beat the game for the first time earlier this year. I posted
          updates to my gaming Twitter account,{" "}
          <A href="https://twitter.com/mkplaysswitch">@MKPlaysSwitch</A>.
        </li>
        <li>
          <b>
            <A href="https://copilot.github.com">GitHub Copilot</A>
          </b>
          : I got access to the Copilot technical preview shortly after it was
          announced and am very impressed with it so far.
        </li>
        <li>
          <b>
            <A href="https://openai.com">OpenAI</A>
          </b>
          : I also got off the waitlist for OpenAI, the &ldquo;AI&rdquo; that
          powers GitHub Copilot. It was surprisingly very easy to get started
          with it - I&apos;ve already hooked it up to my Twitter bot,{" "}
          <A href="https://twitter.com/robot_mk">@robot_mk</A>, to generate new
          tweets from my tweets. The results have been{" "}
          <A href="https://twitter.com/robot_mk/status/1411692106440138754">
            impressive
          </A>
          .
        </li>
        <li>
          <b>
            <a href="https://acoup.blog/category/collections/this-isnt-sparta/">
              This. Isn&apos;t. Sparta.
            </a>
          </b>
          : This collection of articles deserves an honorable mention - I found
          it super interesting. It&apos;s a deep dive into how Sparta differed
          from the way it&apos;s portrayed in popular media.
        </li>
        <li>
          <b>
            <a href="http://www.galactanet.com/oneoff/theegg_mod.html">
              The Egg
            </a>{" "}
            by Andy Weir
          </b>
          : A very compelling short story by the author of The Martian that
          reminded me of the dialogue on Logic&apos;s album{" "}
          <A href="https://en.wikipedia.org/wiki/Everybody_(Logic_album)">
            Everybody
          </A>
          . (P.S. After grabbing that link for the Logic album, I noticed this
          line in the article: &ldquo;This concept was inspired by the short
          story &apos;The Egg&apos; by Andy Weir.&rdquo; 😅)
        </li>
        <li>
          <b>
            <a href="https://rabbit-hole.simplecast.com">Rabbit Hole</a>
          </b>
          : Binged this podcast in one weekend. All about the internet, social
          media algorithms, and radicalization.
        </li>
      </ul>
      <p>
        At this point, I&apos;m not 100% confident that I&apos;ll complete all
        of my goals for this year. What I&apos;m discovering is that as I get
        access to new tools, I get sidelined by working on projects related to
        those things. I wonder if I should fight this instinct or design goals
        that are more flexible to accommodate for this. 🤔
      </p>
      <p>Until next time! 👋</p>
    </BlogPage>
  );
}
