import Image from "next/image";
import Link from "next/link";

import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/2020-in-review-3.jpeg",
  published: true,
  publishedAt: "2020-12-28",
  summary: "A look at my accomplishments during the past year.",
  title: "2020 in Review",
};

export default function ReviewOf2020(): React.ReactNode {
  return (
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
        Hello and welcome to my second annual year-in-review post, the first
        being last year&apos;s <Link href="/writing/2019">2019 in Review</Link>.
        Unlike 2019, I had actual goals this year - so I can give a report on
        how I did. Yay!
      </p>
      <Image
        alt="Three photos from 2020."
        className="corner-radius-8"
        height={410}
        src="/assets/2020-in-review-3.jpeg"
        layout="responsive"
        priority
        width={1242}
      />
      <h2>2020 Goals</h2>
      <h3>Read 10 books ✅</h3>
      <p>I read 14 books/series this year, surpassing my goal of 10 books.</p>
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
          <b>Over The Garden Wall (Series)</b> by Jim Campbell
        </li>
        <li>
          <b>
            Creative Selection: Inside Apple&#8217;s Design Process During the
            Golden Age of Steve Jobs
          </b>{" "}
          by Ken Kocienda
        </li>
        <li>
          <b>The Shape of Design</b> by Frank Chimero
        </li>
        <li>
          <b>So You Want to Talk About Race</b> by Ijeoma Oluo
        </li>
        <li>
          <b>Zed</b> by Joanna Kavenna
        </li>
        <li>
          <b>Black Skin, White Masks</b> by Frantz Fanon
        </li>
        <li>
          <b>The Adventure Zone: Petals to the Metal</b> by the McElroys
        </li>
        <li>
          <b>March (Series)</b> by John Lewis
        </li>
        <li>
          <b>Rage</b> by Bob Woodward
        </li>
        <li>
          <b>Between the World and Me</b> by Ta-Nehisi Coates
        </li>
      </ol>
      <p>
        I was also delighted by a number of books I read with my son, including{" "}
        <b>Dog Man</b> by Dav Pilkey and <b>A Narwhal and Jelly Book</b> by Ben
        Clanton.
      </p>
      <p>
        I&apos;m currently rereading Watchmen after watching the phenomenal HBO
        series a few weeks ago. I expect to finish it by the end of this year as
        well.
      </p>
      <h3>Write 10 blog posts ✅</h3>
      <p>
        I wrote exactly 10 posts this year not including this post or{" "}
        <Link href="/writing/2020-mid-year-review">the mid-year review</Link>.
        That&apos;s 6 more than last year!
      </p>
      <ol>
        <li>
          <Link href="/writing/rss">
            <a>Adding RSS to My Next.js Website</a>
          </Link>
        </li>
        <li>
          <Link href="/writing/sorry-to-bother-you">
            <a>Twitter Defeated Me</a>
          </Link>
        </li>
        <li>
          <Link href="/writing/babys-first-codemod">
            <a>The Codemod Side Quest</a>
          </Link>
        </li>
        <li>
          <Link href="/writing/apple-made-me-do-it">
            <a>Home Screen Hack</a>
          </Link>
        </li>
        <li>
          <Link href="/writing/making-a-minecraft-status-page">
            <a>Making a Minecraft Server Status Page</a>
          </Link>
        </li>
        <li>
          <Link href="/writing/culturally-irrelevant">
            <a>Building a Culturally Irrelevant Recommendation Board</a>
          </Link>
        </li>
        <li>
          <Link href="/writing/life-art-nostalgia">
            <a>Life, Art, Nostalgia</a>
          </Link>
        </li>
        <li>
          <Link href="/writing/lily-dex">
            <a>lily dex</a>
          </Link>
        </li>
        <li>
          <Link href="/writing/bills-pc">
            <a>Pokémon Data Munging</a>
          </Link>
        </li>
        <li>
          <Link href="/writing/ebooks">
            <a>“It&apos;s Just the Algorithm”</a>
          </Link>
        </li>
      </ol>
      <p>
        In addition to these, I searched the Wayback Machine for one of my old
        posts, updated it with photos from my 2010 college yearbook and
        republished it:{" "}
        <Link href="/writing/giant-portraits">Giant Portraits</Link>.
      </p>
      <h3>Release the next chapter of Lilt ✅</h3>
      <p>
        I had big dreams for Lilt that weren&apos;t realized this year.
        Regardless, I did add a few new areas to the game and announced it on
        Twitter, completing this goal.
      </p>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          my twitter text adventure,{" "}
          <a href="https://twitter.com/FamiliarLilt?ref_src=twsrc%5Etfw">
            @FamiliarLilt
          </a>
          , has some new areas to explore - tweet ‘start’ at the account to play
          🗿 <a href="https://t.co/wz4zFabHix">https://t.co/wz4zFabHix</a>
        </p>
        &mdash; Michael Knepprath (@mknepprath){" "}
        <a href="https://twitter.com/mknepprath/status/1212853133342388230?ref_src=twsrc%5Etfw">
          January 2, 2020
        </a>
      </blockquote>
      <h3>Complete 3 online courses 🔴</h3>
      <p>
        I made some progress on{" "}
        <a
          href="https://testingjavascript.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Testing JavaScript
        </a>{" "}
        by Kent C. Dodds and made it most of the way through{" "}
        <a
          href="https://www.hackingwithswift.com/100/swiftui"
          rel="noopener noreferrer"
          target="_blank"
        >
          100 Days of SwiftUI
        </a>{" "}
        by Paul Hudson. I learned A LOT this year, yet I didn&apos;t complete a
        single course. This was the only 2020 goal I failed.
      </p>
      <p>
        It&apos;d be easy for me to say, well, this was an unrealistic goal. It
        doesn&apos;t reflect how I actually learn. So it goes.
      </p>
      <p>
        It&apos;d be easy. And while I do believe it&apos;s true, I don&apos;t
        want to jump ahead without pointing out the fact that I clearly
        didn&apos;t understand something about myself at the time of goal
        setting and will take this into consideration when setting goals for
        2021.
      </p>
      <h3>Draw, illustrate, animate! ✅</h3>
      <p>
        I managed to create a number of drawings and animations during the first
        half of this year as outlined in{" "}
        <Link href="/writing/2020-mid-year-review#draw-illustrate-animate">
          my mid-year review
        </Link>
        . Since then, I made another movie with my son called{" "}
        <a
          href="https://www.youtube.com/watch?v=mdGTbURZhZc"
          rel="noopener noreferrer"
          target="_blank"
        >
          Bag Crush
        </a>
        , more drawings, and started working on some 2D animations.
      </p>
      <a
        href="https://twitter.com/mknepprath/status/1340091334988840963"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt="Drawing of a bathroom stool."
          className="corner-radius-8"
          height={1534}
          src="/assets/2020-in-review-1.jpg"
          layout="responsive"
          width={2048}
        />
      </a>
      <p>
        A few of my drawings were enhanced by a collection Copic markers I
        recently purchased, including the illustration for my most recent blog
        post, <Link href="/writing/ebooks">“It&apos;s Just the Algorithm”</Link>
        .
      </p>
      <h3>Bonus: Develop an iOS app ✅</h3>
      <p>
        One of my 2019 goals was to build an app. I spent quite a bit of time on
        this, but ended up failing to accomplish this goal. In hindsight, I feel
        that the main reason was my lack of Swift experience and the rush to
        build something before picking up even the basics of it.
      </p>
      <p>
        I didn&apos;t set a repeat goal for this in 2020, and yet...{" "}
        <Link href="/writing/lily-dex">I built an app</Link>! And{" "}
        <a
          href="https://apps.apple.com/us/app/lily-dex/id1525132070"
          rel="noopener noreferrer"
          target="_blank"
        >
          <em>published</em> it
        </a>
        ! This was all thanks to the excellent 100 Days of SwiftUI course
        mentioned above. I didn&apos;t complete the course, yet I was able to do
        more with the knowledge I gained from it than I would&apos;ve ever
        imagined at the beginning of the year.
      </p>
      <p>
        I have to give some credit to Apple, as well. SwiftUI wasn&apos;t around
        for my previous attempts at iOS development, and it was a joy to work
        with.
      </p>
      <Image
        alt="Three photos from 2020."
        className="corner-radius-8"
        height={410}
        src="/assets/2020-in-review-4.jpeg"
        layout="responsive"
        priority
        width={1242}
      />
      <h2>Cool Things</h2>
      <h3>Side projects</h3>
      <p>
        I worked on a lot of web-based side projects outside of my goals
        outlined at the beginning of the year.
      </p>
      <p>
        Earlier this year, I dropped all of my other projects to work on the{" "}
        <a
          href="https://culturallyirrelevant.net"
          rel="noopener noreferrer"
          target="_blank"
        >
          Culturally Irrelevant Recommendation Board
        </a>
        , a website inspired by a retired podcast of the same name. I spent a
        full month on this site and detailed out the process in a post entitled{" "}
        <Link href="/writing/culturally-irrelevant">
          Building a Culturally Irrelevant Recommendation Board
        </Link>
        .
      </p>
      <p>
        I also worked on a game. I gave it a name,{" "}
        <a
          href="http://tinymystery.club"
          rel="noopener noreferrer"
          target="_blank"
        >
          Tiny Mystery Club
        </a>
        , and added some actual gameplay elements. I think it will be an
        interesting sandbox to play in next year.
      </p>
      <Image
        alt="Tiny Mystery Club"
        className="corner-radius-8"
        height={531}
        src="/assets/2020-in-review-8.gif"
        layout="responsive"
        priority
        width={600}
      />
      <p>
        Finally, I did a bunch of work on my personal site. I integrated
        Goodreads and Letterboxd into my <Link href="/about">About</Link> page
        to display six of my most recently read books and watched movies.
      </p>
      <Image
        alt="Three photos from 2020."
        className="corner-radius-8"
        height={410}
        src="/assets/2020-in-review-5.jpeg"
        layout="responsive"
        priority
        width={1242}
      />
      <h3>Gaming group</h3>
      <p>Video games every week!</p>
      <h3>Pokemon Go</h3>I reached level 40, then upgraded to iOS 14 and
      couldn&apos;t play for 3 months 🤷‍♂️
      <h2>2021 Goals</h2>
      <p>
        Here&apos;s my list of what I&apos;d like to accomplish during the next
        year.
      </p>
      <h3>Read 15 books</h3>
      <p>
        I&apos;ve been averaging less than 10 books per year. If I can make it
        to 10, I&apos;ll be happy.
      </p>
      <h3>Write 10 blog posts</h3>
      <p>
        I reached this goal, but I think 10 posts a year is a pretty good
        cadence and I&apos;d like to continue with it. Goals don&apos;t
        necessarily have to increase, my main hope is that they drive me to work
        on these things consistently.
      </p>
      <h3>Release the next chapter of Lilt</h3>
      <p>
        I have a couple goals for{" "}
        <a href="https://twitter.com/familiarlilt">Lilt</a>. First, I hope to
        develop a user interface to help manage moves, locations, and items in
        the game (likely with React). Second, I want to introduce more areas to
        explore. While the interface would be nice for me, it doesn&apos;t add
        anything of interest for Lilt&apos;s players. This is why I want to
        focus on expanding the game first.
      </p>
      <h3>Complete 3 online courses - AXE</h3>
      <p>
        I&apos;ve purchased a bunch of online courses over the years that
        I&apos;d like to finish. I hope to finish at least three of these during
        2020:
      </p>
      <ul>
        <li>
          <a href="https://www.3dfordesigners.com/">3D for Designers</a> by
          Devon Ko
        </li>
        <li>
          <a href="https://testingjavascript.com/">Testing JavaScript</a> with
          Kent C. Dodds
        </li>
        <li>5 courses on Udemy (Swift, React, Python, TensorFlow...)</li>
      </ul>
      <h3>Complete a suite of 2D animations</h3>
      <p>
        I want to draw some more comics, create some short animations, etc. I
        don&apos;t care all that much about the format as long as I do some cool
        visual work. I may even dabble in capital &lquo;A&rquo; Art again.
      </p>
      <Image
        alt="Three photos from 2020."
        className="corner-radius-8"
        height={410}
        src="/assets/2020-in-review-6.jpeg"
        layout="responsive"
        priority
        width={1242}
      />
      <h2>Tracking My Goals</h2>
      <p>
        Last year I was planning on posting an update every other month, and I
        ended up posting 3 updates throughout the year including this one.
      </p>
      <p>👋</p>
    </BlogPage>
  );
}
