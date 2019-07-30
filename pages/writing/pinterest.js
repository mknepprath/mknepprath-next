import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">Harness the Power of Pinterest</title>
    </Head>

    <article>
      <header>
        <h1>Harness the Power of Pinterest</h1>
      </header>

      <p>
        Unless you’ve been hiding under a rock, you probably heard about
        Pinterest’s recent and rapid rise to fame. Pinterest is a “virtual
        pinboard” where one is able to post images from anywhere on the web and
        share them with their friends. It wasn’t originally targeted towards any
        particular audience, but the user base is currently{" "}
        <a href="http://mashable.com/2012/07/04/men-women-social-media/">
          predominantly women
        </a>
        .
      </p>
      <p>
        Many businesses are just now discovering that there is value in
        participating in social media, but where does Pinterest fit into this
        mix?
      </p>
      <p>
        Pinterest, a network composed of found graphics and photos, functions
        differently from other social media sites you may be used to. Here are a
        few tips to help you be more successful on this new platform.
      </p>
      <ol>
        <li>
          <strong>Tailor your images for the audience. </strong>As mentioned
          earlier, Pinterest is primarily women. As such, it’s not surprising
          that some of the top brands on the site are related to wedding
          planning, parenting, chocolate, and clothing. You (or your business)
          don’t necessarily have to fall into these categories, but be sure that
          you are targeting the correct audience.
        </li>
        <li>
          <strong>Create shareable images. </strong>The main size at which your
          images will be viewed is relatively small, a measly 192 pixels across.
          Therefore, if you are planning on including words, make them large
          enough to be legible at that width. There will be a much greater
          chance of people reading what you are attempting to share with them.
        </li>
        <li>
          <strong>Be aware of the trends.</strong> Speaking of including words
          in your pins, doing just that is highly recommended. Inspirational
          quotes go viral frequently, as many users like and relate to them.
          Other trends include food, hair, shoes, dresses, and design.
        </li>
        <li>
          <strong>Create a gallery on your website.</strong> This mainly applies
          to businesses, and is also where the marketing value of Pinterest
          lies. When a person pins an interesting or beautiful image from a
          website, their friends will start to share it with each other. Then
          their friends share it with their friends. If that doesn’t already
          sound amazing, here’s the clincher. Each of these pins is a link back
          to the website they were originally pinned from. Yours.
        </li>
        <li>
          <strong>Consistently share new pins.</strong> The most important step
          is also the most difficult. Be consistent. Add pins on a regular basis
          so people have a reason to keep coming back. If your page grows
          stagnant, they will stop checking.
        </li>
      </ol>
      <p>
        To see some of these tips in action, here’s{" "}
        <a href="http://www.socialmediaexaminer.com/how-alaskan-mom-brings-millions-to-her-carpentry-blog/">
          a cool case study
        </a>{" "}
        about an Alaskan mom who draws millions of people to her carpentry blog
        through Pinterest.
      </p>
      <p>
        What do you think? Do you have any tips through your experience on
        Pinterest?
      </p>

      <p className={"blog-time"}>
        <time dateTime="2012-07-06">July 6, 2012</time>
      </p>
    </article>
  </Page>
);
