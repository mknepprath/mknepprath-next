import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/lily-dex-hero.jpg",
  published: true,
  publishedAt: "2020-11-01",
  summary: "A simple Pokédex for Pokémon Go",
  title: "lily dex",
};

const LilyDex = () => (
  <BlogPage
    dateTime={meta.publishedAt}
    description={meta.summary}
    ogImage={meta.image}
    title={meta.title}
  >
    <img alt="lily dex artwork" className="blog-image" src={meta.image} />

    <header>
      <h1>{meta.title}</h1>
    </header>
    <p>
      Despite being a lifelong fan of Pokémon, I hadn't played any of the games
      since FireRed... that is, until the release of Pokémon Go in 2016. My
      family had a ton of fun hunting around downtown running into other
      families excitedly playing the game - it was an amazing and novel
      experience no app or game has been able to replicate since.
    </p>
    <p>
      Last year, we moved to Ohio, and Go has continued to be a fun way to stay
      connected with family and friends.
    </p>
    <p>
      One of the primary goals of the Pokémon franchise is completing your
      Pokédex by{" "}
      <a
        href="https://www.youtube.com/watch?v=MpaHR-V_R-o"
        rel="noopener noreferrer"
        target="_blank"
      >
        catching 'em all
      </a>
      , and Go is no different. For a while, I maintained a{" "}
      <a
        href="https://www.notion.so/product"
        rel="noopener noreferrer"
        target="_blank"
      >
        Notion
      </a>{" "}
      document with a list of Pokémon I was missing along with an icon hinting
      at how to catch them. It was a bit of a pain to keep it updated, however.
      It was a manual process and frequently became outdated. I decided to turn
      this project into my first serious iOS app - maybe I could help others
      while automating this for myself!
    </p>
    <p>My two guiding principles while building this app were:</p>
    <ol>
      <li>
        <b>It must be entirely dedicated to Pokémon Go.</b> There are A LOT of
        Pokédexes in the App Store, most of which are more general-purpose and
        not focused on any particular game. Since I specifically want to know
        which Pokémon I'm missing in Go, this is not useful.
      </li>
      <li>
        <b>It must be simple.</b> The only number I care about is the total
        number of unique Pokémon I've caught. For those who want to track more
        than this, like shiny Pokémon, regional variants, or costumed Pokémon,
        there{" "}
        <a
          href="https://goranger.app"
          rel="noopener noreferrer"
          target="_blank"
        >
          are existing apps
        </a>
        . This principle affects both content and interactivity: marking a
        Pokémon as caught is (and will always be) a one-tap action.
      </li>
    </ol>
    <p>
      I started working on the app towards the end of July in parallel with{" "}
      <a
        href="https://www.hackingwithswift.com/100/swiftui"
        rel="noopener noreferrer"
        target="_blank"
      >
        100 Days of SwiftUI
      </a>
      . Once I'd replicated my Notion document as an app, I started adding new
      features: integration with{" "}
      <a href="https://pogoapi.net" rel="noopener noreferrer" target="_blank">
        The PoGo API
      </a>{" "}
      to keep the Pokémon list up-to-date, a widget for displaying your dex
      total on your home screen, sorting options, current raid bosses, and more.
    </p>
    <img
      alt="lily dex iOS widget"
      className="blog-image"
      src="/assets/lily-dex-2.jpg"
    />
    <p>
      If you search "Pokédex" in the App Store, you'll see a lot of sameness -
      most apps try to replicate the look of the Pokédex device you see in the
      show and games. To stand out a bit, I went with "lily dex" and leaned into{" "}
      <a
        href="https://bulbapedia.bulbagarden.net/wiki/Lotad_(Pokémon)"
        rel="noopener noreferrer"
        target="_blank"
      >
        Lotad
      </a>{" "}
      as a design motif. Amazingly, my App Store reviewer recognized my{" "}
      <a
        href="https://twitter.com/mknepprath/status/1287432554585489408"
        rel="noopener noreferrer"
        target="_blank"
      >
        original icon
      </a>{" "}
      for what it was, and I had to modify it to make it a bit more generic.
    </p>
    <p>
      I'm proud of the fact that this app is already at a place where it's
      useful for me. It's also the first app I've built that has been approved
      by Apple and published to the App Store! 🥳 Thanks to{" "}
      <a
        href="https://twitter.com/victorkernes"
        rel="noopener noreferrer"
        target="_blank"
      >
        Victor Kernes
      </a>{" "}
      and{" "}
      <a
        href="https://twitter.com/lmeilner"
        rel="noopener noreferrer"
        target="_blank"
      >
        Luke!
      </a>{" "}
      for your feedback during development. I already have a long list of
      improvements and feature ideas for the future.
    </p>
    <p>
      If you play Pokémon Go and this sounds useful to you, check it out in the{" "}
      <a>App Store</a>!
    </p>
    <img
      alt="lily dex in the App Store"
      className="blog-image"
      src="/assets/lily-dex-1.jpg"
    />
  </BlogPage>
);

export default LilyDex;
