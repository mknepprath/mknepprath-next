import A from "@core/a";
import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  image: "/assets/lily-dex-hero.jpg",
  published: true,
  publishedAt: "2026-03-19",
  summary: "lily dex grew from a simple catch tracker into a full Pokémon GO companion",
  title: "lily dex, revisited",
};

export default function LilyDexRevisited(): React.ReactNode {
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
        src="/assets/lily-dex-hero.jpg"
        width={2000}
      />

      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        The first version of lily dex was a simple catch tracker. You&apos;d
        scroll through the Pokédex, tap the ones you&apos;d caught, and that
        was it.
      </p>

      <p>That was 2020. A lot has changed.</p>

      <p>
        lily dex is now a full Pokémon GO companion. There&apos;s a Pokédex
        covering every region from Kanto through Paldea with catch and shiny
        tracking. PvP IV rankings for every battle league. An event calendar
        that pulls from community sources so you never miss a Community Day.
        Home screen widgets that show your progress at a glance.
      </p>

      <p>A few things I focused on this time around:</p>

      <p>
        <b>It should feel good.</b> Most companion apps treat design as an
        afterthought. I wanted lily dex to feel like an app you actually enjoy
        opening. The Pokédex is fast, filterable, and browsable. The widgets
        look great on your home screen. The interactions are responsive.
      </p>

      <p>
        <b>Events should be proactive.</b> The event calendar pulls from{" "}
        <a
          href="https://leekduck.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Leek Duck&apos;s
        </a>{" "}
        community calendar and lets you filter by event type: Community Day,
        Raid Bosses, Research Days, GBL seasons. You can set up push
        notifications for just the types you care about. No more missing a
        Spotlight Hour because you forgot to check social media.
      </p>

      <p>
        <b>PvP should be accessible.</b> The battle tab shows rankings and IV
        analysis for Great, Ultra, and Master League. If you catch something
        and want to know if it&apos;s worth powering up, you can check in
        seconds.
      </p>

      <p>
        <b>No ads.</b> The core Pokédex and event calendar are free. The Ace
        Trainer upgrade unlocks PvP rankings, event notifications, shiny
        hunting mode, and alternative app icons.
      </p>

      <p>
        lily dex is on the App Store now. If you play Pokémon GO, I&apos;d
        love for you to{" "}
        <A href="https://lilydex.com">try it</A>.
      </p>
    </BlogPage>
  );
}
