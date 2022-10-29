import Image from "next/legacy/image";

import BlogPage from "@core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2016-03-20",
  title: "Creating Lilt — Part 4",
};

export default function CreatingLiltPart4(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        As you may have seen in the addendum to{" "}
        <a href="http://mknepprath.com/writing/creating-lilt-part-3">Part 3</a>,
        I had quite the wrench thrown into this project. One of the main tools I
        had become heavily invested in, <a href="http://parse.com/">Parse</a>,
        <a href="http://blog.parse.com/announcements/moving-on">
          {" "}
          announced that they’d be shutting down
        </a>{" "}
        in early 2017. Luckily, this is a side project that hadn’t been launched
        yet, so I can’t complain too much — my sympathies to those who had far
        more riding on the service.
      </p>

      <h2>Robot M. Knepprath</h2>
      <p>
        Serendipitously, I was inspired to{" "}
        <a href="http://readwrite.com/2014/06/20/random-non-sequitur-twitter-bot-instructions">
          build a simple ebooks Twitterbot
        </a>{" "}
        around that time: <a href="https://twitter.com/robot_mk">@robot_mk</a>.
        This ended up being the springboard that launched me into building out
        the actual functioning game, instead of the prototype I had been working
        on previously. This bot was written in Python, deployed through Heroku,
        and utilizes{" "}
        <a href="https://github.com/bear/python-twitter">python-twitter</a> to
        work with Twitter’s API. I made some minor modifications to this bot to
        get a handle on how it was structured, then attempted to clone it and
        frankenstein the functionality I needed into it. This ended up being a
        bad idea — I would have needed to rip out all of the old logic anyway,
        so I decided to start fresh.
      </p>

      <h2>Liltbot</h2>
      <p>
        The new Lilt Twitterbot is written in Python (requiring me to rewrite
        all of what I’d written in JavaScript for the prototype), and deployed
        through Heroku like my ebooks bot. Instead of python-twitter, I’m using{" "}
        <a href="http://www.tweepy.org">Tweepy</a> to communicate with Twitter’s
        API. I was having a hard time figuring out how to get Twitter mentions
        with python-twitter, which was the main functionality I’d need for Lilt.
        Tweepy has made that a very simple process.
      </p>

      <h2>What About Parse?</h2>
      <p>
        Since I was rewriting my game anyway (JS to Python), I’ve been working
        on building in some required features (ability to support more than one
        player at a time), and wish list features (a better item management
        system). I first had to select a replacement for Parse, so I chose one
        that was already well integrated into Heroku:{" "}
        <a href="http://www.postgresql.org">Postgresql</a>. It’s not as pretty
        or easy to work with (considering you work with it pretty much entirely
        through the command line), but it hasn’t been all that bad, either.
      </p>
      <p>
        So far, I have three tables: Users, Items, and Moves. Moves serves the
        exact same purpose as the Moves table in Parse described in{" "}
        <a href="http://mknepprath.com/writing/creating-lilt-part-3">Part 3</a>,
        so I won’t cover that again — but I’ll give an overview of the other
        two:
      </p>
      <ol>
        <li>
          Users: When someone tweets at Lilt, Liltbot will get that tweet and
          grab their username, id, the id of that tweet, the tweet text, and
          initiate the position and inventory for that person. I can take a deep
          dive later into how the inventory is currently working, but it’s
          basically a string of json that stores dynamic item traits, like
          quantity.
        </li>
        <li>
          Items: This table contains all static item traits, like limits for how
          many one can carry, or how much a particular item would heal you, and
          so on.
        </li>
      </ol>
      <Image
        alt="Postgresql table displaying users"
        className="corner-radius-8"
        height={190}
        src="/assets/creating-lilt-part-4-1.png"
        layout="responsive"
        width={700}
      />

      <h2>Gameplay Example</h2>
      <p>
        So what’s possible so far? Here’s an example of an interaction I’ve had
        with Liltbot after I’d already picked up a few items:
      </p>
      <blockquote>
        <p>Me: @familiarlilt inventory</p>
        <p>Liltbot: @mknepprath apple •••, rock, banana •••</p>
        <p>
          M: @familiarlilt pick up BANANA…… (sidenote: Liltbot cleans up the
          tweet so it’s more readable, so this one would be read as ‘pick up
          banana’)
        </p>
        <p>L: @mknepprath You acquired a banana.</p>
        <p>M: @familiarlilt INVENTORY!!!!!!</p>
        <p>L: @mknepprath banana ••••, apple •••, rock</p>
        <p>M: @familiarlilt look around</p>
        <p>L: @mknepprath It’s pretty neat in here.</p>
      </blockquote>
      <p>
        Very excited about how far along this has come in the last couple
        months. I’m hoping to launch a playable version of Lilt relatively soon
        — can’t wait for all of you to jump in and play.
      </p>
      <p>
        If you have any questions or suggestions,{" "}
        <a href="https://twitter.com/mknepprath">tweet at me</a>!
      </p>
    </BlogPage>
  );
}
