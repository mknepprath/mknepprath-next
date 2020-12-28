import Image from "next/image";
import Link from "next/link";

import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/ebooks.jpg",
  published: true,
  publishedAt: "2020-12-20",
  summary: "An ebooks account in retrospect.",
  title: "“It's Just the Algorithm”",
};

export default function Ebooks(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
    >
      <Image
        alt="lily dex artwork"
        className="corner-radius-8"
        height={1040}
        layout="responsive"
        priority
        src={meta.image}
        width={2000}
      />
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        In 2016, I had some{" "}
        <Link href="/writing/creating-lilt-part-4">
          <a>big ideas</a>
        </Link>{" "}
        that required developing Twitter bots and decided to build an ebooks
        account as a sort of trial run. It came together much faster than
        I&apos;d expected and I was able to switch to my other Twitter bot ideas
        within a few weeks.
      </p>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          Nothing is certain except Star Wars clothing.
        </p>
        &mdash; Robot MK (@robot_mk){" "}
        <a href="https://twitter.com/robot_mk/status/697868068920414208?ref_src=twsrc%5Etfw">
          February 11, 2016
        </a>
      </blockquote>{" "}
      <p>
        Despite having worked very little on{" "}
        <a
          href="https://twitter.com/robot_mk"
          rel="noopener noreferrer"
          target="_blank"
        >
          @robot_mk
        </a>{" "}
        beyond the initial setup, it has been a constant presence in my online
        life since. People still find joy and entertainment from its tweets and
        frequently play along with their weird responses.
      </p>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          Wow you seem to get more relatable each month 🤔😂
        </p>
        &mdash; Kevin Gutowski (@kevgski){" "}
        <a href="https://twitter.com/kevgski/status/995176681852698625?ref_src=twsrc%5Etfw">
          May 12, 2018
        </a>
      </blockquote>
      <p>
        Even the quirks caused by &ldquo;bugs&rdquo; were fun, such as when it
        would repeat my tweets verbatim. Here, the bot turned one of my tweets
        into a sort of ouroboros.
      </p>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          <a href="https://twitter.com/mknepprath?ref_src=twsrc%5Etfw">
            @mknepprath
          </a>{" "}
          pretty soon I&#39;m going to start getting confused with which one of
          you is real
        </p>
        &mdash; Ben Lundsten (@benlundsten){" "}
        <a href="https://twitter.com/benlundsten/status/771493071749980160?ref_src=twsrc%5Etfw">
          September 1, 2016
        </a>
      </blockquote>
      <p>
        It&apos;s not all fun and games, however. Sometimes the account seems to
        tweet veiled threats.
      </p>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          I might have an army of bots.
        </p>
        &mdash; Robot MK (@robot_mk){" "}
        <a href="https://twitter.com/robot_mk/status/1110173403430965249?ref_src=twsrc%5Etfw">
          March 25, 2019
        </a>
      </blockquote>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          you leave Mars alone
        </p>
        &mdash; Michael Knepprath (@mknepprath){" "}
        <a href="https://twitter.com/mknepprath/status/781281278352060416?ref_src=twsrc%5Etfw">
          September 28, 2016
        </a>
      </blockquote>
      <blockquote className="twitter-tweet">
        <p lang="und" dir="ltr">
          {" "}
          <a href="https://t.co/tYoGkCMEtr">pic.twitter.com/tYoGkCMEtr</a>
        </p>
        &mdash; Josh Wierschke (@JoshWWhat){" "}
        <a href="https://twitter.com/JoshWWhat/status/1314050201716486149?ref_src=twsrc%5Etfw">
          October 8, 2020
        </a>
      </blockquote>
      <p>
        While concerning, I can sleep soundly knowing that{" "}
        <small>
          <em>
            (despite the fact that I provide the data and wrote all of the code
            used to generate these tweets)
          </em>
        </small>{" "}
        this is a failure of the <b>algorithm</b>.
      </p>
      <h2>It&apos;s Just the Algorithm</h2>
      <p>
        The reason my bot sometimes tweets in a threatening manner has to do
        with the algorithm behind the bot, as the tweets are determined by an
        algorithm. The{" "}
        <em>
          <b>algorithm</b>
        </em>{" "}
        is what failed.
      </p>
      <p>Right?</p>
      <br />
      <br />
      <br />
      <hr />
      <blockquote>
        “[T]he Stanford vaccine <b>algorithm failed</b> to prioritize house
        staff.” −{" "}
        <a
          href="https://www.washingtonpost.com/health/2020/12/18/stanford-hospital-protest-covid-vaccine/"
          rel="noopener noreferrer"
          target="_blank"
        >
          The Washington Post
        </a>
      </blockquote>
      <blockquote>
        Facebook representatives told NPR that the reason why some people did
        not see the march as trending had to do with <b>the algorithm</b> behind
        the feature. −{" "}
        <a
          href="https://www.npr.org/sections/alltechconsidered/2017/01/25/511641939/facebook-tweaks-its-trending-topics-algorithm-to-better-reflect-real-news"
          rel="noopener noreferrer"
          target="_blank"
        >
          NPR
        </a>
      </blockquote>
      <blockquote>
        “It&apos;s <b>the algorithm</b>.” −{" "}
        <a
          href="https://www.rand.org/blog/2019/11/did-no-one-audit-the-apple-card-algorithm.html"
          rel="noopener noreferrer"
          target="_blank"
        >
          RAND
        </a>
      </blockquote>
      <blockquote>
        “<b>As it learns</b>, some of its responses are inappropriate and
        indicative of the types of interactions some people are having with it.”
        −{" "}
        <a
          href="https://www.theverge.com/2016/3/24/11297050/tay-microsoft-chatbot-racist"
          rel="noopener noreferrer"
          target="_blank"
        >
          The Verge
        </a>
      </blockquote>
    </BlogPage>
  );
}
