import { parseISO } from "date-fns";
import Image from "next/legacy/image";
import Link from "next/link";
import useSWR from "swr";

import A from "@core/a";
import BlogPage from "@core/blog-page";
import Card from "@core/card";

import styles from "./2022.module.css";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

export const meta = {
  image: "/assets/2022-in-review-6.jpg",
  published: true,
  publishedAt: "2023-01-01",
  summary: "A look at my accomplishments during the past year.",
  title: "2022 in Review",
  tweetId: "1609679621267537920",
};

export default function ReviewOf2022(): React.ReactNode {
  const { data: activity = [] } = useSWR<PostListItem[]>(
    `/api/v1/activity?max_results=6&min_rating=1`,
    fetcher
  );
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
        alt="Three photos from 2022."
        className="corner-radius-8"
        height={384}
        src="/assets/2022-in-review-6.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>Hey everyone,</p>

      <p>
        Welcome to my fourth annual year-in-review post, following my{" "}
        <Link href="/writing/2019">2019</Link>,{" "}
        <Link href="/writing/2020">2020</Link> and{" "}
        <Link href="/writing/2021">2021</Link> reviews. This year was a big one
        for me, with lots of accomplishments and growth. Here&apos;s a rundown
        of everything I achieved in 2022.
      </p>

      <p>
        One of my biggest achievements this year was getting promoted to{" "}
        <A href="https://www.linkedin.com/posts/activity-6929931122986336256-qj6G">
          Staff Software Engineer
        </A>{" "}
        at Walmart. It was a long road, but I put in a lot of hard work and
        dedication, and it paid off. I&apos;m excited to continue growing and
        learning in this role, and to contribute even more to the team.
      </p>

      <Image
        alt="Three photos from 2022."
        className="corner-radius-8"
        height={384}
        src="/assets/2022-in-review-7.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        In terms of personal goals, I was able to read a total of 12 books this
        year, which I&apos;m pretty proud of. Some of my favorites were
        Piranesi, The Complete Maus, The Sum of Us and Project Hail Mary.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="Susanna Clarke"
          href="https://www.goodreads.com/book/show/50202953-piranesi"
          imgSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1609095173i/50202953.jpg"
          title="Piranesi"
        />
        <Card
          description="Art Spiegelman"
          href="https://www.goodreads.com/book/show/15195.The_Complete_Maus"
          imgSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327354180i/15195.jpg"
          title="The Complete Maus"
        />
        <Card
          description="Heather McGhee"
          href="https://www.goodreads.com/book/show/53231851-the-sum-of-us"
          imgSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1606321459i/53231851.jpg"
          title="The Sum of Us"
        />
        <Card
          description="Andy Weir"
          href="https://www.goodreads.com/book/show/54493401-project-hail-mary"
          imgSrc="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg"
          title="Project Hail Mary"
        />
      </div>

      <p>
        In March, I kicked off a year-long bender of catching up on significant
        movies I&apos;d missed starting with Lady Bird, La La Land and Whiplash.
        I also started watching more Indian films such as 3 Idiots, the two
        Bāhubali movies, Tumbbad and RRR (4×). All told, I watched a total of{" "}
        <A href="https://letterboxd.com/mknepprath/year/2022/">
          303 movies in 2022
        </A>
        .
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="2017"
          href="https://letterboxd.com/mknepprath/film/lady-bird/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/3/2/6/2/7/9/326279-lady-bird-0-300-0-450-crop.jpg?v=754ff28eb4"
          title="Lady Bird"
        />
        <Card
          description="2016"
          href="https://letterboxd.com/mknepprath/film/la-la-land/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/2/4/0/3/4/4/240344-la-la-land-0-300-0-450-crop.jpg?v=053670ff84"
          title="La La Land"
        />
        <Card
          description="2014"
          href="https://letterboxd.com/mknepprath/film/whiplash-2014/"
          imgSrc="https://a.ltrbxd.com/resized/sm/upload/cl/dn/kr/f1/4C9LHDxMsoYI0S3iMPZdm3Oevwo-0-300-0-450-crop.jpg?v=d13ea36528"
          title="Whiplash"
        />
        <Card
          description="2009"
          href="https://letterboxd.com/mknepprath/film/3-idiots/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/3/8/9/9/9/p/aGah4UXB7ngftxkqel8CxOfrxnj-0-300-0-450-crop.jpg?v=fa6d09eecf"
          title="3 Idiots"
        />
        <Card
          description="2015"
          href="https://letterboxd.com/mknepprath/film/baahubali-the-beginning/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/1/7/9/9/1/5/p/4x6Buj1yyRZBTMYQETzwnEj3I7E-0-300-0-450-crop.jpg?v=f262dd366d"
          title="Bāhubali: The Beginning"
        />
        <Card
          description="2017"
          href="https://letterboxd.com/mknepprath/film/baahubali-the-conclusion/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/2/8/0/7/1/0/280710-baahubali-the-conclusion-0-300-0-450-crop.jpg?v=e3236ba8ee"
          title="Bāhubali: The Conclusion"
        />
        <Card
          description="2018"
          href="https://letterboxd.com/mknepprath/film/tumbbad/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/6/8/1/9/5/468195-tumbbad-0-300-0-450-crop.jpg?v=c48f92ce1f"
          title="Tumbbad"
        />
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/rrr/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/0/8/0/3/7/p/yI1zbTaUV7ZKsSS1fzvokERDe1U-0-300-0-450-crop.jpg?v=e71679b788"
          title="RRR"
        />
      </div>

      <p>
        One thing that made this goal a little more fun was that I bought a
        projector so that I could watch some of the silent era films with my
        son. It was a great way to bond and introduce him to some classic films.
      </p>

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
        I also spent a lot of time this year playing a Wordle-like game called{" "}
        <A href="https://framed.wtf/">Framed</A> which is all about movies. I
        became so obsessed with it that I even created a study companion website
        called <A href="https://framed.fyi/">framed.fyi</A> to help myself and
        others learn more about the films and actors featured in the game.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="framed.wtf"
          href="https://framed.wtf/"
          title="Framed"
        />
        <Card
          description="framed.fyi"
          href="https://framed.fyi/"
          title="Framed Study Buddy"
        />
      </div>

      <Image
        alt="Three photos from 2022."
        className="corner-radius-8"
        height={384}
        src="/assets/2022-in-review-1.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        In terms of my website, I made a few improvements this year, including
        adding a parallax illustration to the homepage and an activity feed that
        displays my activity across all the social media sites I&apos;m on.
        It&apos;s been a great way to keep my website fresh and engaging for
        visitors.
      </p>

      <div className={styles.cardContainer}>
        {activity.map((item) => {
          const time = parseISO(item.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          return (
            <Card
              description={item.action ? `${item.action} on ${time}` : time}
              href={item.url || "#"}
              imgSrc={item.image}
              key={item.id}
              title={item.title}
            />
          );
        })}
      </div>

      <p>
        One project that I worked on this year was the migration of some of my
        bots from Heroku to AWS, due to Heroku removing their free-tier. It was
        a bit of a challenge, but I&apos;m glad that I was able to get
        everything up and running smoothly on the new platform.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="A Twitter text adventure"
          href="https://twitter.com/familiarlilt"
          imgSrc="/assets/lilt.png"
          title="lilt"
        />
        <Card
          description="AI Twitter bot"
          href="https://twitter.com/robot_mk"
          imgSrc="/assets/robot-mk.png"
          title="Robot MK"
        />
        <Card
          description="A prompt a day, every day"
          href="https://twitter.com/designprompts"
          imgSrc="/assets/design-prompts.png"
          title="Design Prompts"
        />
        <Card
          description="A Pokémon card every hour"
          href="https://twitter.com/EveryPkmnCard"
          imgSrc="https://pbs.twimg.com/profile_images/1505940357065883652/L7-M1mm-_400x400.jpg"
          title="Every Pokémon Card"
        />
      </div>

      <Image
        alt="Three photos from 2022."
        className="corner-radius-8"
        height={384}
        src="/assets/2022-in-review-3.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        I also had the opportunity to work on a contract project for the Hyper
        app, which was a really exciting and rewarding experience.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="Build a vtuber and stream"
          href="https://apps.apple.com/us/app/hyper-vtuber-avatar-studio/id1535709341"
          imgSrc="https://is5-ssl.mzstatic.com/image/thumb/Purple123/v4/69/fe/32/69fe329b-319b-ece1-27d6-344a20b343e8/AppIconProduction-1x_U007emarketing-0-10-0-85-220.png/460x0w.webp"
          title="Hyper"
        />
        <Card
          description="hyper.online"
          href="https://hyper.online/"
          imgSrc="https://hyper.online/_next/image?url=%2Fplaceholder-getstarted.jpg&w=2048&q=75"
          title="Hyper Website"
        />
      </div>

      <p>
        One of the highlights of the year for me was participating in{" "}
        <A href="https://react.holiday/">React Holiday</A>, a daily Next.js
        lesson series run by{" "}
        <A href="https://mastodon.social/@chantastic@hachyderm.io">
          @chantastic
        </A>{" "}
        during the month of December. It was a great way to end the year and
        connect with other developers in the community.
      </p>

      <Image
        alt="Three photos from 2022."
        className="corner-radius-8"
        height={384}
        src="/assets/2022-in-review-4.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        Overall, it&apos;s been a busy and productive year, and I&apos;m
        grateful for all the opportunities and experiences that have come my
        way. Looking ahead to next year, I have a few goals that I&apos;m
        excited to work towards. One is to continue learning and growing as a
        software engineer, and to take on new challenges and projects that will
        help me to expand my skillset. I&apos;m also planning to read at least
        15 books and to watch even more movies. And I&apos;d like to work on
        some more updates and improvements to my website.
      </p>

      <p>
        All in all, it&apos;s been an incredible year, and I&apos;m looking
        forward to what the next one has in store. Thanks for reading, and
        here&apos;s to a bright and prosperous 2022!
      </p>

      <Image
        alt="Three photos from 2022."
        className="corner-radius-8"
        height={384}
        src="/assets/2022-in-review-5.jpg"
        layout="responsive"
        priority
        width={1170}
      />
    </BlogPage>
  );
}
