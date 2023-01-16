import Image from "next/legacy/image";

import A from "@core/a";
import BlogPage from "@core/blog-page";
import Card from "@core/card";
import { FilmPost } from "@core/post";
import Shot from "@core/shot";

import styles from "./2022.module.css";

export const meta = {
  image: "/assets/2022-in-review-2.jpg",
  published: true,
  publishedAt: "2023-01-16",
  summary: "Reviewing the many movies I watched during 2022.",
  title: "2022 in Film",
  // tweetId: "1609679621267537920",
};

export default function FilmsOf2022(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
      // tweetId={meta.tweetId}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <Image
        alt="Three photos from 2022."
        className="corner-radius-8"
        height={384}
        src="/assets/2022-in-review-2.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        Hi all! I wanted to take a moment to reflect on all the films I watched
        in 2022. Below you will find a number of film cards. Each of these links
        to my Letterboxd review. Click on any of them to read my thoughts on the
        film.
      </p>
      <p>
        By the end of the year I had watched a total of 302 films, nearly triple
        2021&apos;s total. This amounted to almost 500 hours of movie-watching.
        15.6% of the films I watched were new 2022 releases and 23.5% were
        rewatches.
      </p>

      <h2>My Top Films of 2022</h2>

      <p>
        While I was able to watch a lot of great films, I know there are still
        many more from last year that I haven&apos;t seen yet. This list only
        covers the films I watched in 2022 - sorry if I missed any of your
        favorites!
      </p>

      <p>
        Let&apos;s start with my personal top movies of the year. My top 2 were:
      </p>

      <div className={styles.cardContainer}>
        <Shot
          description="2022"
          href="https://letterboxd.com/mknepprath/film/everything-everywhere-all-at-once/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/7/4/4/7/4/p/7rvVWbvg0CuNzYigehTs0lRUCs8-0-1000-0-1500-crop.jpg?v=2c1066d075 2x"
          title="Everything Everywhere All at Once"
        />
        <div>
          <p>
            <A href="https://letterboxd.com/mknepprath/film/everything-everywhere-all-at-once/">
              Everything Everywhere All at Once
            </A>{" "}
            is a mind-bending sci-fi film that kept me on the edge of my seat.
            My wife and I watched it in theaters shortly after it came out
            without knowing anything about it. We loved it so much that
            we&apos;ve watched it a few more times since. It&apos;s so dense
            that I was still discovering new things during my 4th viewing.
          </p>
          <p>
            Despite being an earlier release, this held the top spot as my
            favorite film of the year. I&apos;m so excited to see what the
            directors have in store for us next.
          </p>
        </div>
      </div>

      <div className={styles.cardContainer}>
        <Shot
          description="2022"
          href="https://letterboxd.com/mknepprath/film/rrr/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/0/8/0/3/7/p/yI1zbTaUV7ZKsSS1fzvokERDe1U-0-1000-0-1500-crop.jpg?v=e71679b788 2x"
          title="RRR"
        />
        <div>
          <p>
            <A href="https://letterboxd.com/mknepprath/film/rrr/">RRR</A> is
            Telugu period action film that was just an epic ride. I watched it
            four times last year as well, and I&apos;m planning to put it on
            again soon.
          </p>
          <p>
            Both this and Everything Everywhere could be considered maximalist
            films in that they both do... everything. Neither leaves anything on
            the table.
          </p>
          <p>
            This one in particular led me to watch many more Indian films
            including others by S. S. Rajamouli, the director of RRR.
          </p>
        </div>
      </div>

      <p>And the next 10 in no particular order:</p>

      <div className={styles.cardContainer}>
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/nope/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/6/8/2/5/4/7/682547-nope-0-300-0-450-crop.jpg?v=d6a6158cc3 2x"
          title="Nope"
        />
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/the-batman/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/3/4/8/9/1/4/p/seyWFgGInaLqW7nOZvu0ZC95rtx-0-300-0-450-crop.jpg?v=a6e77c81b2 2x"
          title="The Batman"
        />
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/turning-red/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/3/8/7/2/7/438727-turning-red-0-150-0-225-crop.jpg?v=85497b8090 2x"
          title="Turning Red"
        />
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/triangle-of-sadness/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/2/7/9/7/0/p/omzkwoLVSEZhs1h5e3XqoHo8eF5-0-300-0-450-crop.jpg?v=0c901c9ba9 2x"
          title="Triangle of Sadness"
        />
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/barbarian-2022/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/8/1/9/6/4/8/819648-barbarian-0-150-0-225-crop.jpg?v=75b067327a 2x"
          title="Barbarian"
        />
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/athena-2022-1/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/7/6/6/6/0/7/766607-athena-0-300-0-450-crop.jpg?v=6d9beba4a5 2x"
          title="Athena"
        />
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/prey-2022/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/6/8/6/3/8/9/686389-prey-0-150-0-225-crop.jpg?v=f9f0c6bb6e 2x"
          title="Prey"
        />
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/glass-onion-a-knives-out-mystery/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/8/6/7/2/3/p/vDGr1YdrlfbU9wxTOdpf3zChmv9-0-300-0-450-crop.jpg?v=1969a4d3cc 2x"
          title="Glass Onion"
        />
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/black-panther-wakanda-forever/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/3/5/4/6/0/435460-black-panther-wakanda-forever-0-150-0-225-crop.jpg?v=27db1e3d45 2x"
          title="Black Panther: Wakanda Forever"
        />
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/marcel-the-shell-with-shoes-on-2021/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/7/8/1/3/2/6/p/jaYmP4Ct8YLnxWAW2oYkUjeXtzm-0-150-0-225-crop.jpg?v=30c0473928 2x"
          title="Marcel the Shell with Shoes On"
        />
      </div>

      <h2>My Top Films Watched in 2022</h2>

      <p>
        I also want to mention the best movies I watched this year, regardless
        of when they were released. 2022 was a year of catching up on culturally
        significant films I had missed. Represented here are a number of films I
        continue to think about and bring up in conversation frequently with
        friends. Again, in no particular order.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="1962"
          href="https://letterboxd.com/mknepprath/film/harakiri/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/3/0/1/5/43015-harakiri-0-150-0-225-crop.jpg?v=007080a0fb 2x"
          title="Harakiri"
        />
        <Card
          description="2018"
          href="https://letterboxd.com/mknepprath/film/minding-the-gap/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/2/0/4/5/6/p/mXpMU9hAY882xUq2YV5b7BZlqTN-0-150-0-225-crop.jpg?v=5ad43e0f21 2x"
          title="Minding the Gap"
        />
        <Card
          description="1985"
          href="https://letterboxd.com/mknepprath/film/come-and-see/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/3/6/1/9/2/p/qNbMsKVzigERgJUbwf8pKyZogpb-0-150-0-225-crop.jpg?v=b4d07fdb58 2x"
          title="Come and See"
        />
        <Card
          description="2021"
          href="https://letterboxd.com/mknepprath/film/the-green-knight/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/8/8/3/9/9/p/if4hw3Ou5Sav9Em7WWHj66mnywp-0-150-0-225-crop.jpg?v=2ee7553714 2x"
          title="The Green Knight"
        />
        <Card
          description="2021"
          href="https://letterboxd.com/mknepprath/film/west-side-story-2021/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/4/1/4/7/1/p/3WnyUEG41PXB1YIu4JR1z8om0Xj-0-150-0-225-crop.jpg?v=ca4292cdfd 2x"
          title="West Side Story"
        />
        <Card
          description="2014"
          href="https://letterboxd.com/mknepprath/film/whiplash-2014/"
          imgSrc="https://a.ltrbxd.com/resized/sm/upload/cl/dn/kr/f1/4C9LHDxMsoYI0S3iMPZdm3Oevwo-0-150-0-225-crop.jpg?v=d13ea36528 2x"
          title="Whiplash"
        />
        <Card
          description="1959"
          href="https://letterboxd.com/mknepprath/film/north-by-northwest/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/5/1/8/4/3/51843-north-by-northwest-0-150-0-225-crop.jpg?v=d458d56e9f 2x"
          title="North by Northwest"
        />
        <Card
          description="1957"
          href="https://letterboxd.com/mknepprath/film/the-seventh-seal/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/5/1/6/2/0/51620-the-seventh-seal-0-150-0-225-crop.jpg?v=fa1963f0b2 2x"
          title="The Seventh Seal"
        />
        <Card
          description="1975"
          href="https://letterboxd.com/mknepprath/film/barry-lyndon/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/9/8/1/1/p/znfLskGQnXYB2xcOGM9eInRHPAV-0-150-0-225-crop.jpg?v=fd147ea3cd 2x"
          title="Barry Lyndon"
        />
        <Card
          description="1942"
          href="https://letterboxd.com/mknepprath/film/casablanca/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/1/7/7/0/p/pQjUifS7GXimKOtRwPf8nXWw1bd-0-150-0-225-crop.jpg?v=39f19ba675 2x"
          title="Casablanca"
        />
        <Card
          description="1975"
          href="https://letterboxd.com/mknepprath/film/jeanne-dielman-23-quai-du-commerce-1080-bruxelles/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/2/1/1/4/9/21149-jeanne-dielman-23-quai-du-commerce-1080-bruxelles-0-150-0-225-crop.jpg?v=c5ca6dfec9 2x"
          title="Jeanne Dielman, 23 Quai du Commerce, 1080 Bruxelles"
        />
        <Card
          description="1964"
          href="https://letterboxd.com/mknepprath/film/dr-strangelove-or-how-i-learned-to-stop-worrying-and-love-the-bomb/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/1/2/1/8/p/gHm96BRW4GoI339rF1vYoYTB6Qe-0-150-0-225-crop.jpg?v=b918851629 2x"
          title="Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb"
        />
      </div>

      <h2>My Top Obscure Films Watched in 2022</h2>

      <p>
        Here&apos;s a special shoutout to some of the more obscure films I
        enjoyed this year. I calculated this by sorting my Letterboxd list by
        popularity, scrolling to the bottom, and picking the first 10 films that
        I had rated 4 stars or higher.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="2019"
          href="https://letterboxd.com/mknepprath/film/the-haunted-swordsman/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/5/5/9/3/6/3/559363-the-haunted-swordsman-0-150-0-225-crop.jpg?v=6bb08bb270 2x"
          title="The Haunted Swordsman"
        />
        <Card
          description="2012"
          href="https://letterboxd.com/mknepprath/film/pizza-2012/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/1/0/6/5/5/2/106552-pizza-0-150-0-225-crop.jpg?v=455d636d44 2x"
          title="Pizza"
        />
        <Card
          description="1995"
          href="https://letterboxd.com/mknepprath/film/magnetic-rose/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/2/6/8/8/2688-magnetic-rose-0-150-0-225-crop.jpg?v=5717913a6f 2x"
          title="Magnetic Rose"
        />
        <Card
          description="2021"
          href="https://letterboxd.com/mknepprath/film/sardar-udham/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/5/2/6/3/7/3/526373-sardar-udham-0-150-0-225-crop.jpg?v=9acf95286a 2x"
          title="Sardar Udham"
        />
        <Card
          description="1922"
          href="https://letterboxd.com/mknepprath/film/cops/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/2/5/8/7/3/p/6CX4AcuxBjVjXxthVilYtU942Ad-0-150-0-225-crop.jpg?v=48e57eb442 2x"
          title="Cops"
        />
        <Card
          description="2021"
          href="https://letterboxd.com/mknepprath/film/murina/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/7/5/3/3/9/3/753393-murina-0-150-0-225-crop.jpg?v=f8f9b4eb45 2x"
          title="Murina"
        />
        <Card
          description="2017"
          href="https://letterboxd.com/mknepprath/film/bahubali-2-the-conclusion/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/2/8/0/7/1/0/280710-baahubali-the-conclusion-0-150-0-225-crop.jpg?v=e3236ba8ee 2x"
          title="Bāhubali 2"
        />
        <Card
          description="2018"
          href="https://letterboxd.com/mknepprath/film/tumbbad/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/6/8/1/9/5/468195-tumbbad-0-150-0-225-crop.jpg?v=c48f92ce1f 2x"
          title="Tumbbad"
        />
        <Card
          description="2021"
          href="https://letterboxd.com/mknepprath/film/robin-robin/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/5/7/5/7/6/2/575762-robin-robin-0-150-0-225-crop.jpg?v=64388e0d1d 2x"
          title="Robin Robin"
        />
        <Card
          description="1928"
          href="https://letterboxd.com/mknepprath/film/steamboat-bill-jr/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/3/5/8/0/8/35808-steamboat-bill-jr--0-150-0-225-crop.jpg?v=ad7722e288 2x"
          title="Steamboat Bill, Jr."
        />
        <Card
          description="1928"
          href="https://letterboxd.com/mknepprath/film/the-cameraman/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/3/1/2/0/0/p/oz7dVRzxN95IIpa7hsG5XS3nO2L-0-150-0-225-crop.jpg?v=489d2e9923 2x"
          title="The Cameraman"
        />
        <Card
          description="1971"
          href="https://letterboxd.com/mknepprath/film/duel/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/1/3/1/3/p/vGVxYIAstgGIjjhXXXfmeqtNLmz-0-150-0-225-crop.jpg?v=1e193825e9 2x"
          title="Duel"
        />
      </div>

      <h2>My Top Reviews from 2022</h2>

      <p>Here are a few of my more popular film reviews from this year.</p>

      <FilmPost
        url="https://letterboxd.com/mknepprath/film/jurassic-park/"
        title="Jurassic Park (1993)"
        summary="Jurassic Park still isn’t showing its age - the CG looks better than the CG in 90% of movies that have come out since.
        No one’s made a better shark movie since Jaws and no one’s made a better dinosaur movie since this. What’s Spielberg’s secret?"
        date="2022-05-14"
        id="jurassic-park"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/alternative-poster/5/1/7/3/3/p/b1xCNnyrPebIc7EWNZIa6jhb1Ww-0-150-0-225-crop.jpg?v=294447a63d"
      />
      <FilmPost
        url="https://letterboxd.com/mknepprath/film/prey-2022/"
        title="Prey (2022)"
        summary="I’d like to propose a pick-and-choose trilogy: Predator, Predators, and this. Forget the rest. This was great fun."
        date="2022-08-06"
        id="prey-2022"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/film-poster/6/8/6/3/8/9/686389-prey-0-150-0-225-crop.jpg?v=f9f0c6bb6e"
      />
      <FilmPost
        url="https://letterboxd.com/mknepprath/film/nosferatu/"
        title="Nosferatu (1922)"
        summary="Man, I had no idea this was a plague movie. Nosferatu’s look is literally modeled after the rats featured so heavily in this film. Interesting!
        Can’t wait to see Eggers’ take on this."
        date="2022-11-01"
        id="nosferatu"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/alternative-poster/5/1/4/7/1/p/lsG4UFjL8SGKaH0Nz8vgFVJGifM-0-150-0-225-crop.jpg?v=c13cf596e4"
      />
      <FilmPost
        url="https://letterboxd.com/mknepprath/film/the-seventh-seal/"
        title="The Seventh Seal (1957)"
        summary="Yet another film I expected to be some kind of ethereal arthouse experience but ended up being a fairly linear fantasy adventure film… and I don’t mean that as a knock against it. May be one of the most beautiful films I’ve ever seen."
        date="2022-11-16"
        id="the-seventh-seal"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/film-poster/5/1/6/2/0/51620-the-seventh-seal-0-150-0-225-crop.jpg?v=fa1963f0b2"
      />
      <FilmPost
        url="https://letterboxd.com/mknepprath/film/strange-world-2022/"
        title="Strange World (2022)"
        summary="Everything visually, I liked. The big twist, great. The writing… bad, bad, bad. Stop repeatedly explaining things we already know!"
        date="2022-12-03"
        id="strange-world-2022"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/alternative-poster/7/8/9/0/8/2/p/szpzEL2rjXQLzaoZqH1EnBQWtZE-0-150-0-225-crop.jpg?v=8be85e985f"
      />

      <h2>Stats</h2>

      <p>
        In terms of most watched films,{" "}
        <A href="https://letterboxd.com/mknepprath/film/everything-everywhere-all-at-once/">
          Everything Everywhere All at Once
        </A>
        , <A href="https://letterboxd.com/mknepprath/film/rrr/">RRR</A>,{" "}
        <A href="https://letterboxd.com/mknepprath/film/game-night/">
          Game Night
        </A>
        , and{" "}
        <A href="https://letterboxd.com/mknepprath/film/steamboat-bill-jr/">
          Steamboat Bill, Jr.
        </A>{" "}
        were at the top of my list.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="4 times"
          href="https://letterboxd.com/mknepprath/film/everything-everywhere-all-at-once/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/4/7/4/4/7/4/p/7rvVWbvg0CuNzYigehTs0lRUCs8-0-1000-0-1500-crop.jpg?v=2c1066d075 2x"
          title="Everything Everywhere All at Once"
        />
        <Card
          description="4 times"
          href="https://letterboxd.com/mknepprath/film/rrr/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/0/8/0/3/7/p/yI1zbTaUV7ZKsSS1fzvokERDe1U-0-1000-0-1500-crop.jpg?v=e71679b788 2x"
          title="RRR"
        />
        <Card
          description="3 times"
          href="https://letterboxd.com/mknepprath/film/game-night/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/3/7/8/0/4/8/p/cAqZ2dC3LCVOfwUMsWgxEuLyg5j-0-150-0-225-crop.jpg?v=c55023863a 2x"
          title="Game Night"
        />
        <Card
          description="3 times"
          href="https://letterboxd.com/mknepprath/film/steamboat-bill-jr/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/3/5/8/0/8/35808-steamboat-bill-jr--0-150-0-225-crop.jpg?v=ad7722e288 2x"
          title="Steamboat Bill, Jr."
        />
      </div>

      <p>
        My most watched actor and director last year were the same:{" "}
        <A href="https://letterboxd.com/mknepprath/films/diary/for/2022/genre/-documentary/with/actor/buster-keaton/">
          Buster Keaton
        </A>
        . I watched 12 films he acted in, 10 of which he also directed. This was
        a lot of fun, especially because I watched them with my son.
      </p>

      <Image
        alt="Buster Keaton in Sherlock Jr."
        className="corner-radius-8"
        height={675}
        src="https://a.ltrbxd.com/resized/sm/upload/5w/bn/ff/yt/sherlock-jr-1200-1200-675-675-crop-000000.jpg?v=a44af93dd3"
        layout="responsive"
        width={1200}
      />

      <p>
        I also want to give a special shoutout to the{" "}
        <A href="https://letterboxd.com/mknepprath/tag/kaiju/reviews/">
          classic Godzilla movies
        </A>
        , which I had a blast watching this year with my son as well. This is a
        project we&apos;re continuing in 2023.
      </p>

      <p>
        On top of that, I decided to complete the filmographies of three
        directors:{" "}
        <A href="https://letterboxd.com/mknepprath/films/diary/for/2022/genre/-documentary/with/director/quentin-tarantino/">
          Quentin Tarantino
        </A>
        ,{" "}
        <A href="https://letterboxd.com/mknepprath/films/diary/for/2022/genre/-documentary/with/director/hayao-miyazaki/">
          Hayao Miyazaki
        </A>{" "}
        and{" "}
        <A href="https://letterboxd.com/mknepprath/films/diary/for/2022/genre/-documentary/with/director/wes-anderson/">
          Wes Anderson
        </A>
        .
      </p>

      <p>
        Overall, it was a great year of movie-watching for me and I am looking
        forward to seeing what 2023 brings.
      </p>
    </BlogPage>
  );
}
