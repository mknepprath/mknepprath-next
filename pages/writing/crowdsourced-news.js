import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">The Advent of Crowdsourced News</title>
    </Head>

    <article>
      <header>
        <h1>The Advent of Crowdsourced News</h1>
      </header>

      <p>
        Technology is bringing about many changes to the way we interact and
        consume. News is an excellent example of how quickly this change is
        happening. I’ve transitioned from reading the newspaper at work and
        watching TV, to using Flipboard, having an optimized Twitter list, and
        receiving daily headlines from the Huffington Post in my email.
      </p>
      <p>
        News is continuing to evolve, as can be seen during the events of the
        Aurora, Colorado shooting on July 20th. The public was receiving updates
        long before any large news corporations could get reporters to the scene
        of the incident.{" "}
        <a href="http://www.reddit.com/r/news/comments/wvb5e/comprehensive_timeline_part_2_aurora_massacre/">
          On Reddit
        </a>
        , eyewitnesses started building a timeline, filling in all of the gaps
        with contributions by others that were present. Others on Reddit were
        actually able to interact with the victims, asking them questions and{" "}
        <a href="http://www.reddit.com/r/AskReddit/comments/wv4q2/someone_came_into_our_theater_at_the_midnight/">
          offering support
        </a>
        . One of the injured even posted a picture of{" "}
        <a href="http://www.reddit.com/tb/wvbbk">his bloodied shirt</a> after
        they’d been shot in the chest. This is very cool, in my opinion, and
        here are a few reasons why.
      </p>
      <ol>
        <li>
          <strong>It’s true eyewitness news. </strong>This is the most real news
          has ever been. We’re reading firsthand reports from people who were in
          or near the incident. Because of this, it’s also much more personal.
          It was a heart-wrenching moment when a link to the Twitter account of
          one of the victims was shared, and their last tweet was about how
          excited they were for the movie that was starting in twenty minutes.
        </li>
        <li>
          <strong>It’s live. </strong>Information and photos were being posted
          as they were found or captured. The filter was removed, and everything
          the witnesses found shareable was shared.
        </li>
        <li>
          <strong>It’s a two-way conversation. </strong>Rather than being
          spoon-fed the news, it was actually possible to ask questions of the
          victims and others present. Because of this, those providing the news
          knew exactly what the public was looking for, and provided details
          accordingly.
        </li>
        <li>
          <strong>People are interested. </strong>When news is crowdsourced, it
          requires the input of many people. These people are only going to
          contribute what they deem interesting, and what others seem to find
          interesting. This process cuts out all of the fluff news we see on TV
          today, the news created to fill time and take up space when nothing
          else is going on.
        </li>
      </ol>
      <p>
        While there may be some downsides to this process, time will tell
        whether the speed and intimacy of crowdsourced news will win out in the
        end. What do you think of this change? Would you take part in a
        crowdsourced event like this?
      </p>

      <p className={"blog-time"}>
        <time dateTime="2012-08-13">August 13, 2012</time>
      </p>
    </article>
  </Page>
);
