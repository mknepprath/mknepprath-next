import Image from "next/legacy/image";

import BlogPage from "@core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2016-01-27",
  title: "Creating lilt — Part 3",
};

export default function CreatingLiltPart3(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        Work has begun on a prototype of lilt, and I thought it’d be fun to go
        through the steps I’ve taken to build it out so far. Disclaimer, if you
        want to play the game spoiler-free… don’t read this, but do{" "}
        <a href="https://twitter.com/mknepprath">hit me up on Twitter</a>. Let’s
        jump in!
      </p>
      <Image
        alt="lilt prototype"
        height={265}
        src="/assets/creating-lilt-part-3-1.png"
        layout="responsive"
        priority
        width={700}
      />

      <h2>The Interface</h2>
      <p>
        One quick reminder — this game will be played through Twitter in its
        final form, so I purposely spent very little time on this interface (and
        yet still more than I should have). You enter your “tweet” into the
        field on the left and it gets appended to the list on the right, along
        with the response from the game. I built it with{" "}
        <a href="http://getbootstrap.com">Bootstrap</a>. Simple!
      </p>

      <h2>The Engine — Phase 1</h2>
      <blockquote>
        <p>“Big things have small beginnings.” — David</p>
      </blockquote>
      <p>
        Small beginnings, indeed — you can view an early draft of{" "}
        <a href="https://gist.github.com/mknepprath/96b9944d055de23345ee">
          my game.js file here
        </a>
        . Allow me to define a few concepts below.
      </p>
      <p>
        <b>Position:</b> At the most basic level, if you want to interact with
        things in a certain place, you need to be positioned there. There are
        two locations so far: “start,” and “cell.”
      </p>
      <p>
        <b>Move:</b> This is a cleansed version of your input. You could enter
        “Start!” or “START” or “start…” but in all of these cases, your move
        will be “start”.
      </p>
      <p>
        <b>Response:</b> Once you make your move, this is what the game responds
        with.
      </p>
      <p>
        So, let’s say you’ve decided to “Open the door” while in the “cell.”
        Looking at the <b>#tweet</b> function in the game.js file, your{" "}
        <b>tweet</b> gets assigned to <b>move</b> as “open the door”. Because
        your location is “cell,” the game skips “start” and looks for “open the
        door” under the “cell” if/else statement. Once it’s found, it assigns
        the proper response, “Surprise, no can do,” to <b>response</b>. Finally,
        the original <b>tweet</b> and <b>response</b> are appended to the list
        (.command) on the right. You might notice that there is no other logic —
        no way to interact with objects, or win. That’s coming, I promise!
      </p>

      <h2>The Engine — Phase 2</h2>
      <p>
        A few major features were added in{" "}
        <a href="https://gist.github.com/mknepprath/f723588d559048e05df2">
          this revision
        </a>
        .
      </p>
      <p>
        <b>Cookies:</b> I used{" "}
        <a href="https://github.com/js-cookie/js-cookie">JavaScript Cookie</a>{" "}
        to add the ability to continue where you left off in the game, even if
        you closed the tab or turned off your computer. It was a small win that
        will be useful for me while building this prototype, and was fairly easy
        to implement, so I went for it. You’ll see logic at the beginning of
        game.js that checks to see if a cookie exists, and then calls it or
        creates a new one based on that result. Towards the end, you’ll see
        where the cookies get updated after each move, or deleted if the game is
        reset.
      </p>
      <p>
        <b>Interactions:</b> You may see some random variables sprinkled around
        the responses, such as <b>key_pasted</b> and <b>key_acquired</b>. The
        game keeps track of what you’ve completed with these so that you can
        successfully do things like “open the door” once you’ve acquired the
        key.
      </p>
      <p>
        <b>Comments:</b> Now that game.js is getting to be bigger and more
        confusing, I’ve started to add comments to clarify what different tasks
        are being handled. I get even more thorough than this as time passes —
        they’ve been extremely helpful during this process.
      </p>

      <h2>The Engine — Phase 3</h2>
      <p>
        You may have noticed that all of the if statements were getting a bit
        out of hand, and not very{" "}
        <a href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself">DRY</a>.
        Phase 3 is where I decided to take care of that and move all of my data
        (positions, moves, responses) into <a href="http://parse.com/">Parse</a>
        . Despite the number of possible moves in lilt increases by 5x, I was
        able to cut{" "}
        <a href="https://gist.github.com/mknepprath/d3228826c3cedc61d4f9">
          my game.js file in half
        </a>
        , from 280 lines to 137.
      </p>
      <Image
        alt="Moves and responses in Parse"
        className="corner-radius-8"
        height={322}
        src="/assets/creating-lilt-part-3-2.png"
        layout="responsive"
        width={700}
      />
      <p>
        So, let’s try to “open the chest” while in the “cell.” When the game was
        loaded previously, the data for <b>moves</b> and <b>interactions</b>{" "}
        were fetched from Parse. Clicking the Tweet button immediately logs your{" "}
        <b>tweet</b> to the list on the right. It then loops through all of the
        moves gathered from Parse until it finds one that matches your{" "}
        <b>tweet</b> (“open the chest”).
      </p>
      <Image
        alt="Interactions in Parse"
        className="corner-radius-8"
        height={301}
        src="/assets/creating-lilt-part-3-3.png"
        layout="responsive"
        width={500}
      />
      <p>
        Once a match is found, it replies with the corresponding <b>response</b>{" "}
        (“There’s a coin in it.”), and triggers any <b>interactions</b>{" "}
        (chestopen) associated it. It will also change your position, although
        there is only one instance where this is necessary so far — when you
        tweet “start” at the beginning of the game.
      </p>

      <h2>What&apos;s Next</h2>
      <p>
        Dumping all of the moves into Parse has been a big help, but it’s still
        unwieldy dealing with all of that data. I’ve begun work on an admin
        interface that will help with managing all of it.
      </p>
      <p>
        I’m also not pleased with how certain items are being handled, such as
        the coin and the key. I’d prefer that there were some logic in place
        where you could be carrying them in an inventory.
      </p>
      <p>
        Got questions or want to try to play through this prototype?{" "}
        <a href="https://twitter.com/mknepprath">Hit me up on Twitter!</a>
      </p>
      <p>
        Update 1/28:{" "}
        <a href="http://bits.blogs.nytimes.com/2016/01/28/facebook-to-shut-down-parse-its-platform-for-mobile-developers">
          Well, this certainly complicates a few things.
        </a>
      </p>

      <small>
        This is Part 3 of a series of posts about the game. Part 4 can be found{" "}
        <a href="/writing/creating-lilt-part-4">here</a>. Or{" "}
        <a href={"/writing/creating-lilt-part-1"}>start at the beginning</a>.
      </small>
    </BlogPage>
  );
}
