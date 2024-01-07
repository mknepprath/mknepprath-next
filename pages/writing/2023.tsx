import A from "@core/a";
import BlogPage from "@core/blog-page";
import Card from "@core/card";
import Image from "next/legacy/image";
import Link from "next/link";

import styles from "./2023.module.css";

export const meta: Meta = {
  image: "/assets/2023-in-review-2.jpg",
  published: true,
  publishedAt: "2024-01-07",
  summary: "A look at my accomplishments during the past year.",
  title: "2023 in Review",
};

export default function ReviewOf2023(): React.ReactNode {
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
        src="/assets/2023-in-review-2.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>Hi all, and Happy New Year!</p>

      <p>
        Wow, we made it to year-in-review number five! While I avoided publicly
        setting any concrete goals for the year, I feel that I experienced and
        accomplished a lot. This past year was a fun one.
      </p>

      <p>
        But first, a massive shoutout to my wife, who achieved a monumental
        goal. Little did I know when I wrote my inaugural year-in-review post in
        2019, that we would soon be relocating to Ohio for my wife to attend med
        school. Fast forward four years of relentless effort, she&apos;s now a
        doctor! I couldn&apos;t be prouder.
      </p>

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-review-3.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        Turning to personal endeavors, I&apos;ve continued to pursue several
        interests from previous years - writing, reading, watching movies, and
        working on side projects.
      </p>

      <h2>Writing</h2>

      <p>
        I wrote a half dozen blog posts in 2023, half of which were reacting to
        the sudden surge of LLMs. My drafts folder is bursting with ideas for
        more posts that I plan to publish in 2024. Stay tuned for those!
      </p>

      <ol>
        <li>
          <Link href="/writing/keaton-ssr">KEATON × SSR</Link>
        </li>
        <li>
          <Link href="/writing/where-gpt-belongs">
            Microsoft Is Using GPT-4 Wrong
          </Link>
        </li>
        <li>
          <Link href="/writing/writing-code">Writing Code Is Writing</Link>
        </li>
        <li>
          <Link href="/writing/gpt-funhouse">
            Thoughts on Nick Cave’s Response to ChatGPT
          </Link>
        </li>
        <li>
          <Link href="/writing/large-language-mayhem">
            It’s Not AI, and It Wasn’t Built to Be Accurate
          </Link>
        </li>
        <li>
          <Link href="/writing/stamped">The Life Electronic</Link>
        </li>
      </ol>

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-review-11.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h2>Books</h2>

      <p>
        Despite the towering stacks of unread books in my house, I ventured into
        a new reading experience this year—consuming books on my phone through
        Apple Books. The experiment was a wild success; I read 28 books in total
        (granted, a significant portion comprised early Sherlock Holmes short
        stories). Favorites included Camera Man, Leonardo da Vinci, Killers of
        the Flower Moon, and The Wager. I also delved deeper into sci-fi with
        Dark Matter, The Murderbot Diaries, Kaiju Preservation Society, and
        Mickey 7.
      </p>

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-review-1.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h2>Film</h2>

      <p>
        Last year&apos;s movie count was 303. This year, aiming for 365, I
        surpassed my goal by watching 438 films. Highlights included catching
        RRR in theaters with my wife and friends, viewing Killers of the Flower
        Moon after reading the fantastic book, Barbenheimer, Godzilla Minus One,
        and completing Buster Keaton&apos;s filmography. I plan on writing more
        about this topic in a separate post.
      </p>

      <div className={styles.cardContainer}>
        <Card
          description="2022"
          href="https://letterboxd.com/mknepprath/film/rrr/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/5/0/8/0/3/7/p/yI1zbTaUV7ZKsSS1fzvokERDe1U-0-300-0-450-crop.jpg?v=e71679b788"
          title="RRR"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/killers-of-the-flower-moon/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/3/9/8/0/0/9/p/3OLkNs21FLci7I54a9zS18NeGyZ-0-300-0-450-crop.jpg?v=422e890ea5"
          title="Killers of the Flower Moon"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/barbie/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/2/7/7/0/6/4/p/gUn6zXDYilszDcNBhIPxdA4pwdn-0-300-0-450-crop.jpg?v=763ed22dfd"
          title="Barbie"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/oppenheimer-2023/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/7/8/4/3/2/8/p/bAFmcrCpXsJis5q0aaXvCz3dTiX-0-300-0-450-crop.jpg?v=0d462642e3"
          title="Oppenheimer"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/godzilla-minus-one/"
          imgSrc="https://a.ltrbxd.com/resized/alternative-poster/8/4/5/7/0/6/p/eYJsurMCdA4W8UIknII20a4pwiq-0-300-0-450-crop.jpg?v=8867d61862"
          title="Godzilla Minus One"
        />
        <Card
          description="1923"
          href="https://letterboxd.com/mknepprath/film/our-hospitality/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/5/1/4/2/5/51425-our-hospitality-0-150-0-225-crop.jpg?v=a83329c123"
          title="Our Hospitality"
        />
        <Card
          description="1925"
          href="https://letterboxd.com/mknepprath/film/go-west/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/3/0/0/8/6/30086-go-west-0-150-0-225-crop.jpg?v=b43e9db07f"
          title="Go West"
        />
        <Card
          description="1926"
          href="https://letterboxd.com/mknepprath/film/battling-butler/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/1/4/4/4/0/14440-battling-butler-0-150-0-225-crop.jpg?v=e6df0a78d0"
          title="Battling Butler"
        />
      </div>

      <h2>Games</h2>

      <p>
        I hadn’t played an AAA game in a while, but being gifted a PlayStation 5
        this year changed that. I played through Spider-Man: Miles Morales and
        picked up quite a few more games I’m excited to check out.
      </p>

      <p>
        I also spent quality time with my Switch, playing Super Mario Bros.
        Wonder with my son and venturing into Paldea in Pokémon Scarlet.
      </p>

      <p>
        Still hooked on Wordle and Framed, I added another small game from The
        New York Times to the list: Connections.
      </p>

      <p>
        Lastly, I couldn&apos;t resist picking up Root—a beautifully designed
        game where teams with unique abilities vie for control of the board.
      </p>

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-review-10.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h2>Projects</h2>

      <h3>Tardy Critic</h3>

      <p>
        <A href="https://www.tardycritic.com/">Tardy Critic</A> is one of my
        oldest and most neglected projects. This project was born from the idea
        that most film reviews are published upon the release of a movie at the
        point when it’s impossible to separate it from the hype cycle and
        marketing surrounding it. Tardy Critic would be a site that only
        publishes reviews of movies on their 10th anniversary, assuming that
        that’s long enough for public opinion to settle.
      </p>

      <p>
        This year, I decided to migrate all of the reviews from WordPress to{" "}
        <A href="https://letterboxd.com/tardycritic">Letterboxd</A> and create a
        new website that links to their new home there. I’ve generally been
        moving the other way with my writing, from apps to self-hosted, but I’m
        a fan of Letterboxd and like the idea of these reviews showing up in
        people’s feeds there.
      </p>

      <p>
        The website has neat features in its own right, such as the
        automatically generated anniversary list at the top of the page.
      </p>

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-review-7.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h3>The Activity Feed</h3>

      <p>
        The <Link href="/activity">activity feed</Link> on this website has been
        an ongoing, fun project. Its dual purpose is to create a single feed
        incorporating all my internet activity and make my personal website more
        dynamic.
      </p>

      <p>
        A neat thing happened when I put this together. Stories began to form,
        connecting instances where a random movie thought on Mastodon preceded
        my Letterboxd review for the same movie. This connectivity would have
        remained invisible without the feed.
      </p>

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-review-8.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h3>Bot Migration</h3>

      <p>
        For reasons we don’t need to get into here, all of my bots were
        imperiled in early 2023 and I had to migrate them to ensure their
        survival. Having previously moved them from Heroku to AWS, I now had to
        shift from Twitter to Mastodon. The transition was successful, turning
        my once Heroku-hosted Twitter bots into AWS-hosted Mastodon bots. I even
        created a new one specifically for Mastodon,{" "}
        <A href="https://mastodon.social/@PokemonFacts">PokemonFacts</A>. 🦣
      </p>

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-review-5.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h3>Personal Film Preservation Project</h3>

      <p>
        I went all in on{" "}
        <A href="https://letterboxd.com/mknepprath/">Letterboxd</A> a few years
        ago. My film reviews before that were scattered across the internet,
        many hidden in an old Twitter archive ZIP file. I decided to take up
        backfilling my Letterboxd profile with reviews from the before, tracking
        down tweets, email receipts, and even physical ticket stubs.
      </p>

      <p>
        I was able to reach all the way back to 2008 when I watched{" "}
        <A href="https://letterboxd.com/mknepprath/film/the-dark-knight/">
          The Dark Knight
        </A>{" "}
        in theaters for the first time. I even had{" "}
        <A href="https://letterboxd.com/mknepprath/film/paranormal-activity/">
          instances
        </A>{" "}
        where I’d found a tweet with my thoughts about a movie that aligned with
        a ticket stub I had saved from over a decade ago.
      </p>

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-review-6.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h2>Onward...</h2>

      <p>
        At this point, it’s becoming clear to me that most of my interests are
        converging on one mega-interest: movies. I’m either watching them or
        reading about them or listening to podcasts about them or building
        websites for them or just straight up{" "}
        <A href="https://www.youtube.com/watch?v=pl4LEjA05oo">making</A>{" "}
        <A href="https://www.youtube.com/watch?v=_qMKKNXe8Jo">them</A>. I have
        ideas and tentative plans to do more with this in 2024. I want to slow
        down on the consumption and start creating more. Let’s go.
      </p>

      <Image
        alt="Three photos from 2023."
        className="corner-radius-8"
        height={384}
        src="/assets/2023-in-review-9.jpg"
        layout="responsive"
        priority
        width={1170}
      />
    </BlogPage>
  );
}
