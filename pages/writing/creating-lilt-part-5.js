import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">Creating Lilt — Part 5</title>
    </Head>

    <article>
      <header>
        <h1>Creating Lilt — Part 5</h1>
      </header>

      <p>
        I am beyond pleased to announce the official launch of{" "}
        <a href="http://twitter.com/familiarlilt">
          Lilt: A Twitter Text Adventure
        </a>
        . Join the adventure by tweeting ‘start’ at the Lilt Twitter account,
        <a href="http://twitter.com/familiarlilt">@FamiliarLilt</a>!
      </p>

      <h2>What Is Lilt?</h2>
      <p>
        Lilt is a modern twist on the text adventures of old, many/most of which
        were created before I was born. Fortunately, I didn’t miss out on this
        genre thanks to{" "}
        <a href="http://www.homestarrunner.com/sbemail94.html">
          Strong Bad Email
        </a>
        ’s{" "}
        <a href="http://www.homestarrunner.com/dungeonman.html">Dungeonman</a>.
      </p>
      <p>
        While I feel that Lilt is very traditional in its gameplay, there is one
        advantage it has that past games lacked — the Internet. By building on
        top of Twitter’s API, I’ve been able to build a more social and
        cooperative text adventure than was previously possible. Players are
        able to see what their friends are doing in-game and give each other
        items. Eventually they may have to work together to solve puzzles,
        defeat enemies, complete missions, and so on.
      </p>
      <p>
        A major part of Lilt that has not yet been fully explored is the ability
        for players themselves to add to Lilt. I have been listening to some
        Dungeons & Dragons podcasts lately (specifically The Adventure Zone),
        and I love the idea of letting the game grow organically through player
        exploration. I’ll go more into how I’m going to make this possible
        below, where I outline a new Twitter account I’ve created:{" "}
        <a href="http://twitter.com/liltbuilder">@liltbuilder</a>.
      </p>

      <h2>Why Twitter, Though?</h2>
      <p>
        Twitter has it’s limitations — the obvious one being the 140-character
        limit. While many text adventures seem to thrive on the ability to pile
        on the exposition, I’ve decided to embrace the forced brevity, and I
        believe Lilt is better for it. Being forced to say as much as possible
        in as few words as possible has lead to concise and clear responses from
        Lilt. That being said, Twitter has been easing up on this limitation,
        and therefore me,{" "}
        <a href="http://www.bloomberg.com/news/articles/2016-05-16/twitter-to-stop-counting-photos-and-links-in-140-character-limit">
          by the day
        </a>
        .
      </p>
      <p>
        For a few more reasons, I go into it a bit further in{" "}
        <a href="https://mknepprath.com/writing/creating-lilt-part-1">
          Part 1 of this series.
        </a>
      </p>

      <h2>New Features</h2>
      <p>
        I made a lot of additions to Lilt since{" "}
        <a href="https://mknepprath.com/writing/creating-lilt-part-4">
          Creating Lilt — Part 4
        </a>
        , including a few more Twitter accounts, refactoring, and other
        technical changes.
      </p>
      <ol>
        <li>
          <a href="http://twitter.com/liltbuilder">@liltbuilder</a> — I made a
          few major updates to Lilt, and this is one of them. This account has
          been given powers far beyond the normal player, including the ability
          to add new moves, responses, items, events, and more to Lilt. In fact,
          Builder is essentially able to communicate directly with the Lilt
          database through a protocol I built that translates tweets into
          PostgreSQL statements and queries. Builder’s tweets are processed
          before any player tweets, allowing me to catch any player moves I know
          won’t work. For example, if a player were to run into a forest
          (@familiarlilt run through the forest), and I’d never considered the
          possibility — I can choose to add it as an option right then (@player
          You run through the forest until you find a clearing. There, you meet
          a fox.). Once I’ve added it, the option is there for if/when any
          future players attempt to do the same. In this way, I hope to build
          Lilt organically, like a large-scale game of Dungeons & Dragons.
        </li>
        <li>
          <a href="http://twitter.com/lilt_bird">@lilt_bird</a> — This is just
          one example of a player-controlled in-game character. While this blue
          bird is a character in the game, it’s currently controlled entirely by
          me. I hope to eventually have many characters like this, some of which
          will either be controlled by myself, trusted friends, or may even be
          bots themselves.
        </li>
        <li>
          Lastly, Lilt underwent a major refactoring over the last couple weeks
          to make it easier for myself to manage and update when needed. I won’t
          get too deep into the weeds, but the main goal was for it to be easier
          to handle moves that called for a more complicated,
          algorithmically-generated response, such as ‘inventory,’ ‘delete me
          from Lilt,’ or ‘give @rrhoover an apple.’
        </li>
      </ol>

      <h2>Outro</h2>
      <p>
        While I’m excited to see where Lilt goes from here, I’m personally proud
        of what I’ve accomplished with it thus far. When I was first
        brainstorming about the game, I had no experience with bots, the Twitter
        API, or Python — and I doubt I had even heard of Heroku or PostgreSQL. I
        wasn’t sure if building Lilt how I wanted to build it would be
        technically possible. I’m glad to have gained the experience, and look
        forward to building a world with you and everyone else who gives Lilt a
        shot.
      </p>
      <p>Thank you!</p>
      <p>Michael</p>

      <p>
        <time dateTime="2016-05-17">May 17, 2016</time>
      </p>
    </article>
  </Page>
);
