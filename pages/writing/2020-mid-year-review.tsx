import Image from "next/legacy/image";
import Link from "next/link";

import BlogPage from "@core/blog-page";

export const meta = {
  image: "/assets/2020-mid-year-1.jpg",
  published: true,
  publishedAt: "2020-06-30",
  summary: "A mid-year check-in to see how I'm doing on my goals.",
  title: "The 2020 Mid-Year Review",
  tweetId: "1278141092291059714",
};

export default function MidyearReviewOf2020(): React.ReactNode {
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
        <em>
          <b>Phew.</b>
        </em>
      </p>
      <p>What a year.</p>
      <p>
        I promised progress reports, so here&#8217;s report #2 (the first one
        being{" "}
        <a
          href="https://twitter.com/mknepprath/status/1234112661039861760"
          rel="noopener noreferrer"
          target="_blank"
        >
          a tweet
        </a>{" "}
        posted on{" "}
        <a
          href="https://www.nytimes.com/2020/02/29/opinion/sunday/corona-virus-usa.html"
          rel="noopener noreferrer"
          target="_blank"
        >
          March 1st
        </a>
        ).{" "}
      </p>

      <h2>Read 10 books (7/10)</h2>
      <p>
        I&#8217;m doing well in this category, although it&#8217;s padded a bit
        with a couple of graphic novels I read to my son. I&#8217;m on track to
        read ten books excluding those, so I&#8217;m feeling okay about that.
      </p>
      <a
        href="https://twitter.com/mknepprath/status/1205328489408319488"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="A photo of Design as Art."
          className="corner-radius-8"
          height={900}
          src="/assets/2020-mid-year-2.jpg"
          layout="responsive"
          priority
          width={1200}
        />
      </a>
      <ol>
        <li>
          <b>Snow Crash</b> by Neal Stephenson
        </li>
        <li>
          <b>Code</b> by Charles Petzold
        </li>
        <li>
          <b>One Flew Over the Cuckoo&#8217;s Nest</b> by Ken Kesey
        </li>
        <li>
          <b>1984</b> by George Orwell
        </li>
        <li>
          <b>Over The Garden Wall, Vol. 1</b> by Jim Campbell
        </li>
        <li>
          <b>Over The Garden Wall, Vol. 2</b> by Jim Campbell
        </li>
        <li>
          <b>
            Creative Selection: Inside Apple&#8217;s Design Process During the
            Golden Age of Steve Jobs
          </b>{" "}
          by Ken Kocienda
        </li>
      </ol>
      <p>
        I&#8217;m currently reading <b>The Shape of Design</b> by Frank Chimero.
        The books I have queued up for the rest of the year are{" "}
        <b>So You Want to Talk About Race</b> by Ijeoma Oluo, <b>Zed</b> by
        Joanna Kavenna, and <b>Black Skin, White Masks</b> by Frantz Fanon.
      </p>
      <a
        href="https://twitter.com/mknepprath/status/1252679361918107650"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="A photo of The Shape of Design."
          className="corner-radius-8"
          height={2048}
          src="/assets/2020-mid-year-3.jpg"
          layout="responsive"
          width={1536}
        />
      </a>

      <h2>Write 10 blog posts (7/10)</h2>
      <p>
        I&apos;ve been writing more this year than ever, and some of these posts
        represent a significant chunk of work, for instance,{" "}
        <Link href="/writing/culturally-irrelevant">
          Building a Culturally Irrelevant Recommendation Board
        </Link>{" "}
        was the follow-up to a month-long React project. I&#8217;m very happy
        with how these are turning out.{" "}
        <a
          href="https://twitter.com/brian_lovin/status/1211391250324164608"
          target="_blank"
          rel="noopener noreferrer"
        >
          Brian Lovin says
        </a>{" "}
        this post doesn&apos;t count towards my goal, so 3 more to go!
      </p>
      <ol>
        <li>
          <Link href="/writing/rss">Adding RSS to My Next.js Website</Link>
        </li>
        <li>
          <Link href="/writing/sorry-to-bother-you">Twitter Defeated Me</Link>
        </li>
        <li>
          <Link href="/writing/babys-first-codemod">
            The Codemod Side Quest
          </Link>
        </li>
        <li>
          <Link href="/writing/apple-made-me-do-it">Home Screen Hack</Link>
        </li>
        <li>
          <Link href="/writing/making-a-minecraft-status-page">
            Making a Minecraft Server Status Page
          </Link>
        </li>
        <li>
          <Link href="/writing/culturally-irrelevant">
            Building a Culturally Irrelevant Recommendation Board
          </Link>
        </li>
        <li>
          <Link href="/writing/life-art-nostalgia">Life, Art, Nostalgia</Link>
        </li>
      </ol>

      <h2>Release the next chapter of lilt</h2>
      <p>
        I created some additional areas to explore in{" "}
        <a
          href="https://twitter.com/familiarlilt"
          target="_blank"
          rel="noopener noreferrer"
        >
          @familiarlilt
        </a>
        , but have not gotten started on the proposed admin interface that I
        mentioned in my <Link href="/writing/2019">2019 in Review</Link> post.
        I&#8217;m not sure I will, either. I&#8217;m content with the work I did
        on it, and have{" "}
        <a
          href="https://tinymystery.club/"
          target="_blank"
          rel="noopener noreferrer"
        >
          other projects I want to expand on
        </a>
        .
      </p>

      <h2>Complete 3 online courses (0/3)</h2>
      <p>
        I made progress on Kent C. Dodds&#8217;{" "}
        <a
          href="https://testingjavascript.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Testing JavaScript
        </a>{" "}
        course, but have not yet completed it. I&#8217;m currently looking into
        some SwiftUI courses due to the recent updates announced at WWDC. I
        wanna make more apps!
      </p>

      <h2 id="draw-illustrate-animate">Draw, illustrate, animate!</h2>
      <p>
        I&apos;m proud to say I&#8217;ve been making this goal happen! First, I
        have a{" "}
        <a
          href="https://twitter.com/mknepprath/status/1239240208769482754"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter thread
        </a>{" "}
        of drawings. I like &#8217;em.
      </p>
      <a
        href="https://twitter.com/mknepprath/status/1242471151634440192"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          alt="A car drawing."
          className="corner-radius-8"
          height={900}
          src="/assets/2020-mid-year-1.jpg"
          layout="responsive"
          width={1200}
        />
      </a>
      <p>
        Additionally, I created more{" "}
        <a
          href="https://twitter.com/mknepprath/status/1278016717277540352"
          target="_blank"
          rel="noopener noreferrer"
        >
          pixel art
        </a>{" "}
        for a game I&apos;m working on.
      </p>
      <p>
        And finally, my son and I created two movies so far this year. The first
        was{" "}
        <a
          href="https://youtu.be/5-CEGCXDVgI"
          target="_blank"
          rel="noopener noreferrer"
        >
          a stop-motion LEGO Minecraft movie
        </a>
        , and the second, a Mister Rogers-like episode starring him called{" "}
        <a
          href="https://www.youtube.com/watch?v=H46rZESY8UA"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mr. Owen
        </a>
        .
      </p>
      <Image
        alt="A still from Mr. Owen."
        className="corner-radius-8"
        height={990}
        src="/assets/2020-mid-year-4.png"
        layout="responsive"
        width={1920}
      />

      <p>
        And that&apos;s it! It&apos;s been good to have these distractions in
        the time of COVID-19. At this rate, I expect that I will be completing
        all of my goals by the end of the year.
      </p>

      <p>Until next time! 👋</p>
    </BlogPage>
  );
}
