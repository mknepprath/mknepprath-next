import A from "@core/a";
import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";
import Link from "next/link";

export const meta: Meta = {
  image: "/assets/2020-in-review-3.jpeg",
  published: true,
  publishedAt: "2020-12-28",
  summary: "A look at my accomplishments during the past year.",
  title: "2020 in Review",
  tweetId: "1343720383472656385",
};

export default function ReviewOf2020(): React.ReactNode {
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
        I was also delighted by several books I read with my son, including{" "}
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
        <li>
          <Link href="/writing/lily-dex">lily dex</Link>
        </li>
        <li>
          <Link href="/writing/bills-pc">Pokémon Data Munging</Link>
        </li>
        <li>
          <Link href="/writing/ebooks">“It&apos;s Just the Algorithm”</Link>
        </li>
      </ol>
      <p>
        In addition to these, I searched the Wayback Machine for one of my old
        posts, updated it with photos from my 2010 college yearbook, and
        republished it:{" "}
        <Link href="/writing/giant-portraits">Giant Portraits</Link>.
      </p>
      <h3>Release the next chapter of lilt ✅</h3>
      <p>
        I had big dreams for lilt that weren&apos;t realized this year.
        Regardless, I did add a few new areas to the game and announced it on
        Twitter, completing this goal.
      </p>
      <blockquote>
        <p lang="en" dir="ltr">
          my twitter text adventure,{" "}
          <A href="https://twitter.com/FamiliarLilt?ref_src=twsrc%5Etfw">
            @FamiliarLilt
          </A>
          , has some new areas to explore - tweet ‘start’ at the account to play
          🗿 <A href="https://t.co/wz4zFabHix">https://t.co/wz4zFabHix</A>
        </p>
        &mdash; Michael Knepprath (@mknepprath){" "}
        <A href="https://twitter.com/mknepprath/status/1212853133342388230?ref_src=twsrc%5Etfw">
          January 2, 2020
        </A>
      </blockquote>
      <h3>Complete 3 online courses 🔴</h3>
      <p>
        I made some progress on{" "}
        <A href="https://testingjavascript.com/">Testing JavaScript</A> by Kent
        C. Dodds and made it most of the way through{" "}
        <A href="https://www.hackingwithswift.com/100/swiftui">
          100 Days of SwiftUI
        </A>{" "}
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
        I managed to create several drawings and animations during the first
        half of this year as outlined in{" "}
        <Link href="/writing/2020-mid-year-review#draw-illustrate-animate">
          my mid-year review
        </Link>
        . Since then, I made another movie with my son called{" "}
        <A href="https://www.youtube.com/watch?v=mdGTbURZhZc">Bag Crush</A>,
        more drawings, and started working on some 2D animations.
      </p>
      <A href="https://twitter.com/mknepprath/status/1340091334988840963">
        <Image
          alt="Drawing of a bathroom stool."
          className="corner-radius-8"
          height={1534}
          src="/assets/2020-in-review-1.jpg"
          layout="responsive"
          width={2048}
        />
      </A>
      <p>
        A few of my drawings were enhanced by a collection of Copic markers I
        recently purchased, including the illustration for my most recent blog
        post, <Link href="/writing/ebooks">“It&apos;s Just the Algorithm”</Link>
        .
      </p>
      <h3>Bonus: Develop an iOS app ✅</h3>
      <p>
        One of my 2019 goals was to build an app. I spent quite a bit of time on
        this but ended up failing to accomplish this goal. In hindsight, I feel
        that the main reason was my lack of Swift experience and the rush to
        build something before picking up even the basics of it.
      </p>
      <p>
        I didn&apos;t set a repeat goal for this in 2020, and yet...{" "}
        <Link href="/writing/lily-dex">I built an app</Link>! And{" "}
        <A href="https://lilydex.com">
          <em>published</em> it
        </A>
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
        <A href="https://culturallyirrelevant.com">
          Culturally Irrelevant Recommendation Board
        </A>
        , a website inspired by a retired podcast of the same name. I spent a
        full month on this site and described the process in a post entitled{" "}
        <Link href="/writing/culturally-irrelevant">
          Building a Culturally Irrelevant Recommendation Board
        </Link>
        .
      </p>
      <p>
        I also worked on a game. I gave it a name,{" "}
        <A href="http://tinymystery.club">Tiny Mystery Club</A>, and added some
        actual gameplay elements. I think it will be an interesting sandbox to
        play in next year.
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
        Finally, I did a bunch of work on my personal site, including
        integrating Goodreads and Letterboxd into my{" "}
        <Link href="/about">About</Link> page to display six of my most recently
        read books and watched movies. Behind the scenes, I added a bunch of{" "}
        <A href="https://www.cypress.io">Cypress</A> tests and used{" "}
        <A href="https://github.com/features/actions">GitHub Actions</A> to
        automatically run them on all of my commits.
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
      <h3>Gaming</h3>
      <p>
        Last year, my family moved to a new state. For the first time in years,
        I thought about doing some online gaming since it&apos;s a fun way to
        socialize with the friends I wasn&apos;t able to see as much anymore.
      </p>
      <p>
        We&apos;ve been playing about once a week and it&apos;s been a blast.
        Early on we played Hammerwatch, then Unrailed! (which has an amazing
        soundtrack), some Tabletop Simulator, and tons of Among Us.{" "}
      </p>
      <Image
        alt="Among Us waiting room."
        className="corner-radius-8"
        height={554}
        src="/assets/2020-in-review-9.jpg"
        layout="responsive"
        priority
        width={1200}
      />
      <h2>2021 Goals</h2>
      <p>Time to up the stakes. Here are my revised goals for 2021.</p>
      <h3>Read 15 books</h3>
      <p>
        Last year, I said I&apos;d be happy if I read ten books. Since I
        surpassed that goal by quite a bit, I&apos;m going to increase this goal
        to 15. My only hesitation here is that I&apos;d like the flexibility to
        read some larger books such as Leonardo da Vinci by Walter Isaacson.
        We&apos;ll see how it goes.
      </p>
      <h3>Write 10 blog posts</h3>
      <p>
        I think 10 posts a year is a pretty good cadence and I&apos;d like to
        continue with it. My main hope is that these goals drive me to be
        consistent, so they don&apos;t necessarily have to increase in
        difficulty.
      </p>
      <h3>Release the next version of Tiny Mystery Club</h3>
      <p>
        I believe <A href="https://tinymystery.club">Tiny Mystery Club</A> has a
        lot of potential, but I haven&apos;t spent anywhere near as much time as
        I would like developing it. Next year, I&apos;d like to develop a{" "}
        <em>good</em> mystery and release it as a big 2.0 release of the game.
      </p>
      <h3>Develop a collection of 2D animations</h3>
      <p>
        Hand-drawn 2D animations, that is. I&apos;ve{" "}
        <A href="https://vimeo.com/15226579">dabbled</A> with it in the past, so
        I know it&apos;s fun! The result of this goal should be a collection of
        thematically connected, consistent hand-drawn 2D animations.
      </p>
      <h3>Illustrate a comic</h3>
      <p>
        I sorta gave myself an out this year by grouping drawing, comics, and
        animation into one goal. Next year, I&apos;m GOING to MAKE a COMIC. That
        is all I know at this point.
      </p>
      <h3>Launch lily dex</h3>
      <p>
        I published lily dex, but I haven&apos;t formally announced it anywhere
        beyond Twitter. I&apos;d like to finish any lingering features on my
        to-do list, then make an actual effort to get customers. I also
        purchased the <A href="http://lilydex.com">lilydex.com</A> domain, so
        I&apos;m considering building out a lily dex web app, as well...
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
      <h2>Parting Thoughts</h2>
      <p>
        2020 was my first year publicly setting goals, so it was far from
        guaranteed that I&apos;d be continuing it in 2021. It did cause me some
        stress, especially when I realized there was no way I&apos;d be
        completing three courses by the end of the year. I think it was worth
        it, though. I always had something to work on and all of it was
        rewarding, fun, or both.
      </p>
      <p>Thanks for reading! 👋</p>
    </BlogPage>
  );
}
