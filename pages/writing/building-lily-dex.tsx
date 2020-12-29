import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/2020-mid-year-1.jpg",
  published: false,
  publishedAt: "2020-10-23",
  summary: "Building and publishing a SwiftUI app",
  title: "Building lily dex",
};

export default function BuildingLilyDex(): React.ReactNode {
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
      <p>
        In July, I took my third dive into iOS development by taking{" "}
        <a
          href="https://www.hackingwithswift.com/100/swiftui"
          rel="noopener noreferrer"
          target="_blank"
        >
          100 Days of SwiftUI
        </a>
        , a course by{" "}
        <a
          href="https://twitter.com/twostraws"
          rel="noopener noreferrer"
          target="_blank"
        >
          Paul Hudson
        </a>
        .
        <ul>
          <li>
            - My previous attempts resulted in some simple apps, but nothing
            substantial
          </li>
          <li>- Objective-C never really clicked for me</li>
          <li>
            SwiftUI, on the other hand, felt much more familiar -basically, like
            React (views = components)
          </li>
          <li>Get notes from SwiftUI talk</li>
          <li>
            I needed an app idea to work on, I knew it would be a good motivator
            and it would be cool to have something original I could ship -
            unlike the example apps
          </li>
          <li>
            I&apos;d been manually tracking the Pokémon I was missing in PoGo
            using a Notion doc
          </li>
          <li>
            This accomplished what I wanted, but was painful to keep up to date
            as new Pokémon were added
          </li>
          <li>
            The Notion doc also included an icon indicating what was needed to
            catch each Pokémon (wild, egg, regional)
          </li>
          <li>
            I decided this would be a great candidate to app-ify -phones are
            nothing if not glorified list-making/managing machines
          </li>
          <li>
            After 70 days of the SwiftUI course, I was able to confidently piece
            together a simple dex that I named lily dex
          </li>
          <li>
            lily dex -lily, like lotad (original icon was a direct reference),
            pad like a notepad
          </li>
          <li>
            The big problem I had to solve to make something I could ship: data
            becoming outdated
          </li>
          <li>
            Any new Pokémon in PoGo would require a full update to the app
          </li>
          <li>
            I was scraping data from the Silph Road catalog page -which
            actually... wasn&apos;t great data, full of errors
          </li>
          <li>
            Eventually found the PoGoAPI. We&apos;ll see how it goes? So far so
            good
          </li>
          <li>
            PoGoAPI not only gets me an up to date list of Pokémon, but also
            raids, tiers, Ditto disguises and a lot more
          </li>
          <li>
            At this point I published the app for beta testing in Singer&apos;s
            Airport app -approved!
          </li>
          <li>
            Then submitted to the App Store for approval (accidentally?) &
            rejected due to mentioning Pokémon Go in the tagline and the icon
          </li>
          <li>
            After fixing these 2 things, I submitted the app again and was
            approved :D
          </li>
        </ul>
      </p>
    </BlogPage>
  );
}
