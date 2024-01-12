import A from "@core/a";
import BlogPage from "@core/blog-page";
import Card from "@core/card";
import { FilmPost } from "@core/post";
import Shot from "@core/shot";
import Image from "next/legacy/image";

import styles from "./2023.module.css";

export const meta: Meta = {
  image: "/assets/2023-in-film-1.jpg",
  published: false,
  publishedAt: "2024-01-12",
  summary: "Reviewing the many movies I watched during 2023.",
  title: "2023 in Film",
};

export default function FilmsOf2023(): React.ReactNode {
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

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-film-1.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        Hey there, movie lovers! Continuing the tradition I started the{" "}
        <A href="/writing/2022-in-film">previous year</A>, here&apos;s an
        overview of what I saw in 2023. I watched a total of 438 movies, far
        exceeding my goal of 365. By my rough estimation, my film reviews
        totaled around 14,000 words.
      </p>

      <h2>My Top Films of 2023</h2>

      <p>
        I saw a lot of great films released last year, many in theaters. In
        fact, I made it to the theater at least twenty times. Feels great after
        a couple years of not being able to go. My favorite theatrical
        experiences were seeing{" "}
        <A href="https://letterboxd.com/mknepprath/film/rrr/">RRR (2022)</A>{" "}
        with my wife and friends who were first-timers and loved it, seeing
        Killers of the Flower Moon after waiting in anticipation all year, and
        seeing Godzilla Minus One with my wife and Godzilla-obsessed son.
      </p>

      <div className={styles.cardContainer}>
        <Shot
          description="2023"
          href="https://letterboxd.com/mknepprath/film/killers-of-the-flower-moon/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/3/9/8/0/0/9/p/3OLkNs21FLci7I54a9zS18NeGyZ-0-1000-0-1500-crop.jpg"
          title="Killers of the Flower Moon"
        />
        <div>
          <p>
            <A href="https://letterboxd.com/mknepprath/film/killers-of-the-flower-moon/">
              Killers of the Flower Moon
            </A>{" "}
            is a thrilling adaptation of a book I love. I think that it&apos;s
            the most important film of the year because of how it sheds like on
            a dark part of American history that I didn&apos;t know about until
            reading the book. I appreciate that it approaches the subject matter
            from a different perspective, making it a great companion piece to
            the book instead of a redundant retelling.
          </p>
          <p>
            This is my favorite film of the year and I&apos;m excited to see
            what Scorsese does with David Grann&apos;s next book,{" "}
            <A href="https://www.goodreads.com/en/book/show/61714633">
              The Wager
            </A>
            , which was one of my favorite reads of the 2023.
          </p>
        </div>
      </div>

      <div className={styles.cardContainer}>
        <Shot
          description="2023"
          href="https://letterboxd.com/mknepprath/film/godzilla-minus-one/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/8/4/5/7/0/6/p/eYJsurMCdA4W8UIknII20a4pwiq-0-1000-0-1500-crop.jpg"
          title="Godzilla Minus One"
        />
        <div>
          <p>
            <A href="https://letterboxd.com/mknepprath/film/godzilla-minus-one/">
              Godzilla Minus One
            </A>{" "}
            is Toho&apos;s first Godzilla film since Shin Godzilla in 2016. I
            wasn&apos;t sure if they could top that film, but they did. In fact,
            I&apos;m close to admitting that this is my favorite Godzilla film
            of all time. It has a great story, the effects are amazing, and the
            set pieces are perfectly constructed.
          </p>
          <p>
            My son and I spent the last couple years watching all the Showa era
            Godzilla films. We didn&apos;t realize this would owe so much to
            those films, so all the direct visual and thematic references made
            us so happy. I can&apos;t wait to watch this one again (in{" "}
            <A href="https://www.youtube.com/watch?v=PShgB-ielBI">
              black & white
            </A>
            ?).
          </p>
        </div>
      </div>

      <p>And the next 10 in no particular order:</p>

      <div className={styles.cardContainer}>
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/spider-man-across-the-spider-verse/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/9/7/6/3/1/p/jN1tz3Z10gUOdb11iPwQd6JBlms-0-150-0-225-crop.jpg"
          title="Spider-Man: Across the Spider-Verse"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/past-lives/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/5/9/1/0/5/3/591053-past-lives-0-150-0-225-crop.jpg"
          title="Past Lives"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/the-boy-and-the-heron/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/3/8/6/9/2/p/ojWgbvGGAHDXlGqNq4SsBuUSJYO-0-150-0-225-crop.jpg"
          title="The Boy and the Heron"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/may-december/"
          imgSrc="https://a.ltrbxd.com/resized/sm/upload/zh/p4/cg/6v/may-december-0-150-0-225-crop.jpg"
          title="May December"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/oppenheimer-2023/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/7/8/4/3/2/8/p/bAFmcrCpXsJis5q0aaXvCz3dTiX-0-150-0-225-crop.jpg"
          title="Oppenheimer"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/barbie/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/2/7/7/0/6/4/p/gUn6zXDYilszDcNBhIPxdA4pwdn-0-150-0-225-crop.jpg"
          title="Barbie"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/mission-impossible-dead-reckoning-part-one/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/5/0/3/4/0/2/503402-mission-impossible-dead-reckoning-part-one-0-150-0-225-crop.jpg"
          title="Mission: Impossible – Dead Reckoning Part One"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/anatomy-of-a-fall/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/8/2/2/0/9/3/p/zkhuMc71iRpBstkgCnQhzKxF7l3-0-150-0-225-crop.jpg"
          title="Anatomy of a Fall"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/dungeons-dragons-honor-among-thieves/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/2/4/0/0/3/p/bux0tkbppuWu3taBaOMxLUddGIw-0-150-0-225-crop.jpg"
          title="Dungeons & Dragons: Honor Among Thieves"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/rye-lane"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/9/4/6/6/0/7/946607-rye-lane-0-150-0-225-crop.jpg"
          title="Rye Lane"
        />
      </div>

      <h2>My Top Films Watched in 2023</h2>

      <p>
        Next I&apos;d like to highlight my favorite films I watched for the
        first time in 2023 that were not released during that year. Here are the
        top ten that have stuck with me to the point where I still think about
        them and bring them up in conversation with friends.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="1963"
          href="https://letterboxd.com/mknepprath/film/high-and-low/"
          imgSrc="https://a.ltrbxd.com/resized/sm/upload/do/zm/ur/ug/dgnyE40yWdI7gbaHmmB5yCCIVpI-0-150-0-225-crop.jpg"
          title="High and Low"
        />
        <Card
          description="1962"
          href="https://letterboxd.com/mknepprath/film/lawrence-of-arabia/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/6/0/2/9/9/60299-lawrence-of-arabia-0-150-0-225-crop.jpg"
          title="Lawrence of Arabia"
        />
        <Card
          description="1966"
          href="https://letterboxd.com/mknepprath/film/seconds/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/3/8/8/9/4/38894-seconds-0-150-0-225-crop.jpg"
          title="Seconds"
        />
        <Card
          description="1967"
          href="https://letterboxd.com/mknepprath/film/le-samourai/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/8/8/1/7/48817-le-samourai-0-150-0-225-crop.jpg"
          title="La Samouraï"
        />
        <Card
          description="1957"
          href="https://letterboxd.com/mknepprath/film/paths-of-glory/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/1/1/9/4/p/3O10X1bVSasrS2NQ186s2tlKvqN-0-150-0-225-crop.jpg"
          title="Paths of Glory"
        />
        <Card
          description="2017"
          href="https://letterboxd.com/mknepprath/film/finding-frances/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/1/6/7/8/6/416786-nathan-for-you-finding-frances-0-150-0-225-crop.jpg"
          title="Finding Frances"
        />
        <Card
          description="2008"
          href="https://letterboxd.com/mknepprath/film/synecdoche-new-york/"
          imgSrc="https://a.ltrbxd.com/resized/sm/upload/z9/j9/kx/ve/l3r5MgeN0UUySPbf6aWeUyKGdb2-0-150-0-225-crop.jpg"
          title="Synecdoche, New York"
        />
        <Card
          description="2013"
          href="https://letterboxd.com/mknepprath/film/the-lunchbox/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/1/3/7/9/2/8/137928-the-lunchbox-0-150-0-225-crop.jpg"
          title="The Lunchbox"
        />
        <Card
          description="1982"
          href="https://letterboxd.com/mknepprath/film/the-verdict-1982/"
          imgSrc="https://a.ltrbxd.com/resized/sm/upload/hy/39/5h/d4/fXM8Kyq0rUdSmePz25NlOFlbCB2-0-150-0-225-crop.jpg"
          title="The Verdict"
        />
        <Card
          description="2004"
          href="https://letterboxd.com/mknepprath/film/collateral/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/0/9/9/5/p/gwVx0LN5pzZXVVqbhiBnoJKaP81-0-150-0-225-crop.jpg"
          title="Collateral"
        />
      </div>

      <h2>My Top Obscure Films Watched in 2023</h2>

      <p>
        I&apos;d love to draw your attention to some great films you might not
        have bumped into yet. Here my favorite obscure films watched last year;
        calculated by sorting my Letterboxd list by popularity and picking the
        last 10 films that I&apos;ve rated 4 stars or higher.
      </p>
      <p>
        I&apos;d like to highlight The High Sign, one of my favorite Buster
        Keaton shorts. I also really enjoyed The Natural History of the Chicken
        and Cane Toads: An Unnatural History which are humorous documentaries by
        Mark Lewis, an Australian filmmaker I&apos;d never heard of before.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="2000"
          href="https://letterboxd.com/mknepprath/film/the-natural-history-of-the-chicken/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/1/7/7/1/5/7/177157-the-natural-history-of-the-chicken-0-150-0-225-crop.jpg"
          title="The Natural History of the Chicken"
        />
        <Card
          description="1988"
          href="https://letterboxd.com/mknepprath/film/cane-toads-an-unnatural-history/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/6/8/7/2/1/68721-cane-toads-an-unnatural-history-0-150-0-225-crop.jpg"
          title="Cane Toads: An Unnatural History"
        />
        <Card
          description="1921"
          href="https://letterboxd.com/mknepprath/film/the-boat/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/1/4/9/9/8/14998-the-boat-0-150-0-225-crop.jpg"
          title="The Boat"
        />
        <Card
          description="1920"
          href="https://letterboxd.com/mknepprath/film/convict-13/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/2/5/9/0/6/25906-convict-13-0-150-0-225-crop.jpg"
          title="Convict 13"
        />
        <Card
          description="2007"
          href="https://letterboxd.com/mknepprath/film/no-smoking-2007/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/2/8/0/9/8/p/gBiC8PvATw7cMhszMvPVBuTt93M-0-150-0-225-crop.jpg"
          title="No Smoking"
        />
        <Card
          description="1931"
          href="https://letterboxd.com/mknepprath/film/safe-in-hell/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/6/8/8/5/2/68852-safe-in-hell-0-150-0-225-crop.jpg"
          title="Safe In Hell"
        />
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/rodeo-2022/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/8/4/1/2/3/8/841238-rodeo-0-150-0-225-crop.jpg"
          title="Rodeo"
        />
        <Card
          description="1926"
          href="https://letterboxd.com/mknepprath/film/battling-butler/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/1/4/4/4/0/14440-battling-butler-0-150-0-225-crop.jpg"
          title="Battling Butler"
        />
        <Card
          description="1965"
          href="https://letterboxd.com/mknepprath/film/film/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/1/9/6/6/8/19668-film-0-150-0-225-crop.jpg"
          title="Film"
        />
        <Card
          description="1921"
          href="https://letterboxd.com/mknepprath/film/the-high-sign/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/1/8/8/4/1/p/wWTzwHKySlge1emeYULXb7d74Iy-0-150-0-225-crop.jpg"
          title="The High Sign"
        />
      </div>

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-film-3.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h2>Horror Survey 2023</h2>

      <p>
        I tried something new this past October; I did a Horror Survey where I
        sorted my watchlist from earliest to latest and watched all the horror
        films I could find that were available to stream.
      </p>
      <p>
        I watched 42 horror films during this time starting with The Cat and the
        Canary (1927) and ending with Blade II (2002). I really enjoyed
        experiencing film history through the lens of horror, starting with the
        silent era to talkies to the rise of the slasher and beyond. Here are my
        top 10 horror films I watched in October.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="1966"
          href="https://letterboxd.com/mknepprath/film/seconds/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/3/8/8/9/4/38894-seconds-0-150-0-225-crop.jpg"
          title="Seconds"
        />
        <Card
          description="1985"
          href="https://letterboxd.com/mknepprath/film/day-of-the-dead/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/7/7/5/1/47751-day-of-the-dead-0-150-0-225-crop.jpg"
          title="Day of the Dead"
        />
        <Card
          description="2001"
          href="https://letterboxd.com/mknepprath/film/the-happiness-of-the-katakuris/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/1/7/6/3/p/dMOaB1N5LASSiE0q6y51YWKy8Nn-0-150-0-225-crop.jpg"
          title="The Happiness of the Katakuris"
        />
        <Card
          description="1984"
          href="https://letterboxd.com/mknepprath/film/night-of-the-comet"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/0/3/2/8/p/3kXESP9LarDwkQ6QYWgBaSJO2V3-0-150-0-225-crop.jpg"
          title="Night of the Comet"
        />
        <Card
          description="1941"
          href="https://letterboxd.com/mknepprath/film/the-wolf-man-1941/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/3/6/9/8/p/3qVF5ufIA7Pe8ulR32HjcC307qO-0-150-0-225-crop.jpg"
          title="The Wolf Man"
        />
        <Card
          description="1980"
          href="https://letterboxd.com/mknepprath/film/alligator/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/2/9/7/2/5/29725-alligator-0-150-0-225-crop.jpg"
          title="Alligator"
        />
        <Card
          description="1922"
          href="https://letterboxd.com/mknepprath/film/haxan/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/8/8/7/1/p/6uke82EziPVJuzm7NQvQj5f9uy7-0-150-0-225-crop.jpg"
          title="Häxan"
        />
        <Card
          description="1963"
          href="https://letterboxd.com/mknepprath/film/the-haunting/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/5/0/2/3/45023-the-haunting-0-150-0-225-crop.jpg"
          title="The Haunting"
        />
        <Card
          description="1985"
          href="https://letterboxd.com/mknepprath/film/re-animator/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/0/8/5/1/p/17BreOe5oGS4DT3k68hiyr6cinM-0-150-0-225-crop.jpg"
          title="Re-Animator"
        />
        <Card
          description="1973"
          href="https://letterboxd.com/mknepprath/film/the-wicker-man/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/1/6/6/2/41662-the-wicker-man-0-150-0-225-crop.jpg"
          title="The Wicker Man"
        />
      </div>

      <h2>My Top Reviews from 2023</h2>

      <p>Here are a few of my more popular film reviews from last year.</p>

      <FilmPost
        url="https://letterboxd.com/mknepprath/film/teenage-mutant-ninja-turtles-mutant-mayhem/"
        title="Teenage Mutant Ninja Turtles: Mutant Mayhem (2023)"
        summary="I think Spider-Verse fixed animated film? We’ve had some films come out that copped their style, but this one does it right. Instead of Spider-Versing the turtles, you can tell they thought about how this film should look and feel aesthetically from the ground up and built a world so off-kilter and putrid… It’s great."
        date="2023-08-12"
        id="teenage-mutant-ninja-turtles-mutant-mayhem"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/alternative-poster/5/4/2/0/0/5/p/7pOafueZIz0G97iIYwXlpFXpZ8O-0-150-0-225-crop.jpg"
      />
      <FilmPost
        url="https://letterboxd.com/mknepprath/film/the-haunting/"
        title="The Haunting (1963)"
        summary="I like Robert Wise films, so why haven’t I watched The Sound of Music yet? The mystery continues.
If it isn’t obvious yet, I am doing a thing this October: I’m watching all the horror films in my watchlist available to stream starting with the earliest first. We’ll see how far I get."
        date="2023-10-05"
        id="the-haunting"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/film-poster/4/5/0/2/3/45023-the-haunting-0-150-0-225-crop.jpg"
      />
      <FilmPost
        url="https://letterboxd.com/mknepprath/film/mad-max-fury-road/"
        title="Mad Max: Fury Road (2015)"
        summary="Every 10 seconds the coolest moment in cinematic history up to that point occurs. The level up between the original Mad Max trilogy and this is unfathomable. The first 30 min of this are the most epic Mad Max film ever made, and then it just keeps going.
“I should be… McFeasting in the pleasure gardens with the heroes of all time.”"
        date="2023-09-25"
        id="mad-max-fury-road"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/alternative-poster/6/2/7/8/0/p/v3OpE0Riec9kM8YatDUT31kC1qR-0-150-0-225-crop.jpg"
      />
      <FilmPost
        url="https://letterboxd.com/mknepprath/film/killers-of-the-flower-moon/"
        title="Killers of the Flower Moon (2023)"
        summary="As soon as the silent film title cards came up, this had my heart. A great adaptation of an excellent book telling an important story."
        date="2023-10-30"
        id="killers-of-the-flower-moon"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/alternative-poster/3/9/8/0/0/9/p/3OLkNs21FLci7I54a9zS18NeGyZ-0-150-0-225-crop.jpg"
      />
      <FilmPost
        url="https://letterboxd.com/mknepprath/film/the-natural-history-of-the-chicken/"
        title="The Natural History of the Chicken (2000)"
        summary="Juxtaposition is a powerful tool.
I would be honored to be called “chicken”"
        date="2023-12-13"
        id="the-natural-history-of-the-chicken"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/film-poster/1/7/7/1/5/7/177157-the-natural-history-of-the-chicken-0-150-0-225-crop.jpg"
      />

      <h2>Stats</h2>

      <p>
        In terms of most watched films,{" "}
        <A href="https://letterboxd.com/mknepprath/film/sherlock-jr/">
          Sherlock Jr.
        </A>
        ,{" "}
        <A href="https://letterboxd.com/mknepprath/film/the-high-sign/">
          The High Sign
        </A>
        , <A href="https://letterboxd.com/mknepprath/film/cops/">Cops</A>, and{" "}
        <A href="https://letterboxd.com/mknepprath/film/the-thing/">
          The Thing
        </A>{" "}
        were at the top of my list.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="5 times"
          href="https://letterboxd.com/mknepprath/film/sherlock-jr/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/5/1/1/7/7/51177-sherlock-jr--0-150-0-225-crop.jpg"
          title="Sherlock Jr."
        />
        <Card
          description="4 times"
          href="https://letterboxd.com/mknepprath/film/the-high-sign/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/1/8/8/4/1/p/wWTzwHKySlge1emeYULXb7d74Iy-0-150-0-225-crop.jpg"
          title="The High Sign"
        />
        <Card
          description="3 times"
          href="https://letterboxd.com/mknepprath/film/cops/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/2/5/8/7/3/p/1rN904hMb4LUKoOO6LlqHbIl1EY-0-150-0-225-crop.jpg"
          title="Cops"
        />
        <Card
          description="2 times"
          href="https://letterboxd.com/mknepprath/film/the-thing/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/1/1/5/5/p/tzGY49kseSE9QAKk47uuDGwnSCu-0-150-0-225-crop.jpg"
          title="The Thing"
        />
      </div>

      <p>
        For the second year in a row, my most watched actor and director were
        the same:{" "}
        <A href="https://letterboxd.com/mknepprath/films/diary/for/2023/genre/-documentary/with/actor/buster-keaton/">
          Buster Keaton
        </A>
        . I watched 34 films he acted in, 32 of which he also directed. Keaton
        has quickly become one of my favorite filmmakers of all time. My son and
        I have had a lot of fun screening his movies for family when they visit.
      </p>

      <h2>Shout Outs</h2>

      <p>
        My movie chat group, #BongHive, remains undefeated. In December we did a
        Secret Santa where we each gifted a film or film-adjacent item to
        another member. I received the Criterion edition of{" "}
        <A href="https://letterboxd.com/mknepprath/film/drunken-angel/">
          Drunken Angel (1948)
        </A>{" "}
        which I loved!
      </p>

      <p>
        This coming year we&apos;re doing a monthly challenge where one member
        of the group picks a film for the rest of us to watch. The first was{" "}
        <A href="https://letterboxd.com/mknepprath/film/army-of-shadows">
          Army of Shadows (1969)
        </A>
        . I&apos;m excited to see what else we watch together this year.
      </p>

      <Image
        alt="The #BongHive."
        className="corner-radius-8"
        height={588}
        src="/assets/2023-in-film-4.png"
        layout="responsive"
        priority
        width={1236}
      />

      <p>
        I also want to give a shout out to my wife who gifted me The Criterion
        Channel last year for Christmas. I watched a lot of great films
        including many mentioned above. 82 in total during the year!
      </p>

      <p>
        Finally, thanks to an upgrade to my home theater, I&apos;ve begun to
        collect physical media again. I&apos;ve been picking up a lot of 4K UHD
        Blu-rays and have been enjoying rewatching many of my favorite films in
        high definition.
      </p>

      <p>
        That&apos;s all for now! I&apos;ve already kicked off 2024 with some
        great films and I&apos;m looking forward more during the coming year. If
        you check out any of the films I mentioned above, let me know what you
        think! Happy watching!
      </p>

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-film-2.jpg"
        layout="responsive"
        priority
        width={1170}
      />
    </BlogPage>
  );
}
