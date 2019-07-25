import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page>
    <Head>
      <title key="title">Creating Lilt — Part 1</title>
    </Head>

    <div className={"blog-container container"}>
      <h1>Creating Lilt — Part 1</h1>

      <p>
        Roughly one year ago, I had an idea for a game that would be entirely
        playable through Twitter. I don’t recall what sparked it, but the game
        would be a text adventure where you’d tweet to the game’s Twitter
        account, and it would respond with options for your next move. There are
        a few reasons I thought (and still believe) Twitter would be the perfect
        platform for this…
      </p>

      <h2>Why Twitter?</h2>
      <ol>
        <li>
          Twitter hides tweets sent between two accounts unless you follow both
          accounts, so your followers won’t get annoyed by you playing the game.
          The tweets would be hidden.
        </li>
        <li>
          On the flip side, if a few of your followers were also playing the
          game and followed the game account (
          <a href="https://twitter.com/familiarlilt">@familiarlilt</a>), they
          would see those tweets. It then becomes a great social experience,
          where you’re all playing and figuring things out together.
        </li>
        <li>
          Not long after I had the idea, Twitter released an update that
          separated <strong>Tweets</strong> and{" "}
          <strong>Tweets & replies</strong> into separate tabs. This means that
          your main Tweets feed won’t get bogged down with game tweets — they’d
          only be visible under Tweets & replies.
        </li>
        <li>
          Finally, Twitter is still{" "}
          <a href="https://support.twitter.com/articles/14589">
            entirely usable through SMS
          </a>
          , meaning it can be played on any phone including old dumb phones.
        </li>
      </ol>

      <h2>Gameplay</h2>
      <p>
        The big limitation with Twitter, that extends far beyond this game, is
        tweet length. There are ways to circumvent this (e.g. images with text),
        but I’ve decided to embrace the limitation. Here’s an example of a rough
        early demo:
      </p>
      <blockquote>
        <p>
          @familiarlilt: You are resting in a glade. There is a waterfall to
          your right and a strange statue to your left. What will you do?
        </p>
        <p>@mknepprath (me): look at waterfall</p>
        <p>
          @familiarlilt: The water looks pure. There are beautiful koi fish
          swimming around in it.
        </p>
        <p>@mknepprath: drink from waterfall</p>
        <p>
          @familiarlilt: Something prevents you from touching the water with
          your hands. Perhaps you need a tool for that?
        </p>
        <p>@mknepprath: look at statue</p>
        <p>
          @familiarlilt: The statue has an inscription that reads, “Fountain of
          Youth.” There is a #ladle resting on the statue.
        </p>
      </blockquote>
      <p>
        I’m not sure how useful the hashtag is, especially considering how often
        people have already used{" "}
        <a href="https://twitter.com/search?q=%23ladle">#ladle on Twitter</a> —
        but I like the idea of using it as an indicator for things that can be
        collected. Perhaps it would be more useful for more unique items or
        achievements, so that you’d be able see what other players are doing
        when clicking on it.
      </p>
      <p>
        For the commands you send to @familiarlilt, my hope is to leave it open
        to whatever people want to try. What works will usually be pretty
        straight-forward, like “look at X” or “pick up Y,” but I would love to
        add more to the game based on what people ask. An simple example — maybe
        the game mentions a pond, but I didn’t plan anything for that pond
        beyond just being a part of the setting. If a dozen people ask to “look
        at pond” or “swim in pond,” I may consider adding an actual path to
        explore there.
      </p>
      <p>
        I’m still thinking about how an inventory might be included and managed.
        It would also be cool to incorporate some sort of trading system or
        places that can only be accessed through cooperation with another
        player.
      </p>
      <p>
        Oh, and I need to put together some art. I would love for there to be a
        nice illustration for each item, achievement, and destination. All in
        good time.
      </p>

      <h2>Onward</h2>
      <p>
        I’m in love with this crowdsourced text adventure D&D-like game, and I
        can’t wait to get something together for all of you to try. I wrote this
        so that I’d be held accountable for it, so please, give me crap until
        you see some progress on this.
      </p>
      <p>
        Before writing this, I did some searching to see if anything similar had
        been done before. Here are a few.{" "}
        <a href="https://www.twitter.com/140charADV">@140charADV</a> wins the
        award for being most similar and appearing long before I had the idea.
        Now I’m going to play some{" "}
        <a href="https://www.twitter.com/leonsintro">@leonsintro</a>!
      </p>
      <ul>
        <li>
          <a href="https://twitter.com/YouAreCarrying">@YouAreCarrying</a>
        </li>
        <li>
          <a href="https://twitter.com/leonsintro">@leonsintro</a>
        </li>
        <li>
          <a href="https://www.twitter.com/140charADV">@140charADV</a>
        </li>
        <li>
          <a href="https://twitter.com/wnd_go">@wnd_go</a>
        </li>
      </ul>

      <p className={"blog-time"}>
        <time dateTime="2015-11-21">November 21, 2015</time>
      </p>
    </div>
  </Page>
);
