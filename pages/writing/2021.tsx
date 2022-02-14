import A from "core/a";
import BlogPage from "core/blog-page";
import Image from "next/image";
import Link from "next/link";

export const meta = {
  image: "/assets/2021-in-review-3.jpg",
  published: true,
  publishedAt: "2021-12-30",
  summary: "A look at my accomplishments during the past year.",
  title: "2021 in Review",
  tweetId: "1476611721825603586",
};

export default function ReviewOf2021(): React.ReactNode {
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

      <Image
        alt="Three photos from 2021."
        className="corner-radius-8"
        height={384}
        src="/assets/2021-in-review-3.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        Goals create a conflict between what I want to do at any given moment
        and what I set out to accomplish over an extended period of time. The
        assumption is that the long-term goal is the one that will be most
        important to me in the future, and will enrich my life and hopefully the
        lives of those around me - family, friends, colleagues, etc.
      </p>
      <p>
        The flaw in this assumption is that these goals are based on my capacity
        and interests during the moment of their creation. These goals are a
        snapshot in time.
      </p>
      <p>
        Alright, yeah, you&apos;ve probably already caught on to the fact that
        this is just a long way of saying: I did not complete most of my goals
        this year.
      </p>

      <h2 id="read-15-books">Read 15 books (17/15)</h2>

      <p>
        In 2021, I read 17 books. I enjoyed all of them. Their paths to me were
        varied - some were based on podcast recommendations, some were lent to
        me by friends, many were gifts, and some were a personal interest in
        learning more about where I live and work.
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
        <li>
          <b>The Crystal Kingdom</b> by The McElroys
        </li>
        <li>
          <b>Uncanny Valley</b> by Anna Wiener
        </li>
        <li>
          <b>Wonder Woman: Dead Earth</b> by Daniel Warren Johnson
        </li>
        <li>
          <b>Battle Cry of Freedom</b> by James M. McPherson
        </li>
        <li>
          <b>Expressive Design Systems</b> by Yesenia Perez-Cruz
        </li>
        <li>
          <b>The Anthropocene Reviewed</b> by John Green
        </li>
        <li>
          <b>The Department of Truth</b> by James Tynion IV
        </li>
      </ol>

      <p>
        I spent the most time this year with the 900-page tome, Battle Cry of
        Freedom. In this book, McPherson does an amazing job of explaining all
        of the factors that lead to the Civil War along with every pivotal
        moment during it. Growing up, history felt distant. This book combined
        with recent events including this year&apos;s attack on the Capitol
        brought it all a lot closer.
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

      <p>
        Battle Cry was a gift from my brother-in-law, a Professor of American
        History, who has since gifted me an entire book about Reconstruction and
        another about Frederick Douglass.
      </p>
      <p>
        I&apos;m looking forward to these books, but I&apos;ll admit that I took
        most of the remaining year off once I had reached my reading goal. I
        attribute this almost entirely to burnout, which had dire consequences
        for my remaining goals.
      </p>

      <Image
        alt="Three photos from 2021."
        className="corner-radius-8"
        height={384}
        src="/assets/2021-in-review-4.jpg"
        layout="responsive"
        width={1170}
      />

      <h2 id="write-10-blog-posts">Write 10 blog posts (6/10)</h2>

      <p>
        Despite maintaining the necessary pace to complete this goal during the
        first half of the year, I only wrote one additional post since my
        mid-year review.
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
        <li>
          <Link href="/writing/thd">If I Only Had A Brain</Link>
        </li>
      </ol>
      <p>
        Halfway through 2021, my org at work underwent a major restructuring.
        I&apos;ve come to realize that reorgs are a corporate ritual. No matter
        how well things are working, new management means a reorg is on the way.
      </p>
      <p>
        I first experienced this at my previous employer. Shortly after
        we&apos;d hired our first VP of Engineering, we were called into an
        all-hands meeting to discuss a reorg. The VP displayed a slide with our
        existing team structure, then flipped to the next slide... which looked
        exactly the same.
      </p>
      <p>
        I was confused by this for years, but I now realize that <em>what</em>{" "}
        changed was irrelevant. The ritual must be performed.
      </p>
      <p>
        <a
          href="https://journals.sagepub.com/doi/pdf/10.1177/216507999704501104"
          rel="noreferrer noopener"
        >
          And so it goes
        </a>
        . My non-work time became dedicated to movies, gaming, and toy projects.
        I gave myself permission to leave this goal incomplete. Hopefully,
        I&apos;ll feel up to it in the new year.
      </p>
      <p>
        And so it goes for my remaining goals, as well: Tiny Mystery Club,
        animations, comics... All were put on pause shortly after my mid-year
        update.
      </p>

      <Image
        alt="Three photos from 2021."
        className="corner-radius-8"
        height={384}
        src="/assets/2021-in-review-2.jpg"
        layout="responsive"
        width={1170}
      />

      <h2>Other stuff</h2>

      <h3 id="film">Film</h3>

      <blockquote>
        I think cinema, movies, and magic have always been closely associated.
        The very earliest people who made film were magicians. - Francis Ford
        Coppola
      </blockquote>
      <p>
        I&apos;ve been making a conscious effort during the pandemic to catch up
        on films you&apos;d find on such lists as &ldquo;The Best Films of All
        Time&rdquo; and &ldquo;Must-See Movies Before You Die&rdquo;. Some
        highlights:
      </p>

      <ul>
        <li>In the Mood for Love (2000)</li>
        <li>The Godfather Part II (1974)</li>
        <li>Vertigo (1958)</li>
        <li>Goodfellas (1990)</li>
        <li>Contact (1997)</li>
        <li>Sorcerer (1977)</li>
        <li>Princess Mononoke (1997)</li>
        <li>Catch Me If You Can (2002)</li>
        <li>The Abyss (2009)</li>
        <li>Seven Samurai (1954)</li>
      </ul>

      <Image
        alt="Seven Samurai (1954)"
        className="corner-radius-8"
        height={728}
        src="/assets/2021-in-review-6.jpg"
        layout="responsive"
        width={1024}
      />

      <p>
        It&apos;s strange how watching an older film can feel like homework
        until you actually start playing it. Sure, Seven Samurai is 67 years
        old, black and white, and considered one most influential films of all
        time, but it&apos;s also just a lot of fun to watch. It&apos;s funny,
        heartfelt and full of action. It doesn&apos;t feel like you&apos;re
        watching an &ldquo;old&rdquo; movie. It feels more like you&apos;re
        watching, say, The Avengers.
      </p>

      <h3>Video games</h3>

      <p>
        Two things defined my gaming habits this year: First, the purchase of an
        Oculus Quest 2. Second, Pokémon Go Battle League.
      </p>

      <h4>Virtual Reality</h4>

      <p>
        The Quest still blows my mind every time I put it on. My favorite game
        on it is Walkabout Mini Golf. The stakes are low, the game is simple,
        and I&apos;m able to hang out with distant friends in what feels like a
        dimensional space - unlike hanging in a Zoom call. It&apos;s very cool.
      </p>

      <Image
        alt="Walkabout Mini Golf"
        className="corner-radius-8"
        height={974}
        src="/assets/2021-in-review-7.jpg"
        layout="responsive"
        width={1440}
      />

      <p>
        On the opposite end of the spectrum, Resident Evil 4 was released in
        October. It&apos;s one of my all-time favorites, but actually being in
        that world is an experience. I love it, but it&apos;s <em>a lot</em>.
      </p>

      <h4>Pokémon Go Battle League</h4>

      <p>
        This is the first year I&apos;ve participated in any sort of competitive
        league online. Go Battle League was introduced just last year and added
        a way to create teams and battle other trainers in Pokémon Go. Similar
        to chess, you are ranked based on an ELO rating system. I&apos;m proud
        to say that I managed to battle my way to the second-highest rank during
        my first season of the league which ended last month.
      </p>

      <h3>OpenAI</h3>

      <p>
        My doppelganger Twitter bot,{" "}
        <a href="https://twitter.com/robot_mk" rel="noreferrer noopener">
          @robot_mk
        </a>
        , has provided moments of surprise and delight for a while - moments of
        serendipity where it&apos;d appear to be almost sentient. This used to
        be entirely chance, randomly tweeting remixes of my own tweets using the
        Markov chain method. No more.{" "}
        <a href="https://twitter.com/robot_mk" rel="noreferrer noopener">
          @robot_mk
        </a>{" "}
        became the first candidate for a brain transplant when I gained access
        to OpenAI&apos;s API.
      </p>

      <blockquote>
        do you ever feel like you are holding your breath and when you exhale it
        feels like your first exhale ever -{" "}
        <a
          href="https://twitter.com/robot_mk/status/1426803177324744710"
          rel="noreferrer noopener"
        >
          @robot_mk
        </a>
      </blockquote>

      <Image
        alt="Yahoo! Answers."
        className="corner-radius-8"
        height={942}
        src="/assets/2021-in-review-8.png"
        layout="responsive"
        width={1798}
      />

      <p>
        Other OpenAI projects include{" "}
        <a href="https://twitter.com/thezoneoftruth" rel="noreferrer noopener">
          It&apos;s The Adventure Zone
        </a>{" "}
        and a series of{" "}
        <a
          href="https://twitter.com/mknepprath/status/1471898822452334593"
          rel="noreferrer noopener"
        >
          Yahoo! Answers questions
        </a>{" "}
        inspired by the podcast{" "}
        <a
          href="https://www.themcelroy.family/mbmbam"
          rel="noreferrer noopener"
        >
          My Brother, My Brother and Me
        </a>
        .
      </p>

      <Image
        alt="Three photos from 2021."
        className="corner-radius-8"
        height={384}
        src="/assets/2021-in-review-1.jpg"
        layout="responsive"
        width={1170}
      />

      <p>
        I&apos;ve got a few more projects in the works. I started helping out
        the crew at{" "}
        <a href="https://twitter.com/hyperonline_" rel="noreferrer noopener">
          Hyper
        </a>{" "}
        with their web interface. I plan on creating more{" "}
        <a
          href="https://twitter.com/mknepprath/status/1473031502854295561"
          rel="noreferrer noopener"
        >
          stop-motion video
        </a>{" "}
        with my son. For now, I&apos;m going to stop writing and take full
        advantage of my holiday break.
      </p>

      <p>Thanks for reading, Happy New Year!</p>
    </BlogPage>
  );
}
