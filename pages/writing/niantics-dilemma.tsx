import BlogPage from "@core/blog-page";

export const meta: Meta = {
  published: true,
  publishedAt: "2021-11-09",
  summary: "My thoughts on Casey Newton's piece about Niantic and Pokémon Go.",
  title: "Thoughts on 'The Dark Horse in the Metaverse Wars'",
};

export default function NianticsDilemma(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <em>
        My thoughts on{" "}
        <a href="https://twitter.com/CaseyNewton">Casey Newton</a>
        &apos;s piece{" "}
        <a href="https://www.platformer.news/p/the-dark-horse-in-the-metaverse-wars">
          The Dark Horse in the Metaverse Wars
        </a>
        .
      </em>

      <p>Great stuff! Had a thought about:</p>
      <blockquote>
        The question now is whether other developers can use Niantic’s tools to
        build a Pokémon-scale hit — or whether, as my colleague Andrew Webster
        has argued at The Verge, Pokémon was a fluke.
      </blockquote>
      <p>
        It’s possible that both of these options are false. I imagine Niantic
        doesn’t want to believe the success was mostly due to the IP, but
        Pokémon has proven to be a perfect fit for this format
        (tamagotchi-style, expansive) and also happened to be at a perfect point
        in its history for a refresher. This, plus the dearth of mainline
        Nintendo (ok, Game Freak) properties on mobile had people clamoring for
        something. In that way, it was not a fluke and may also be impossible to
        replicate.
      </p>
      <p>
        I think the release of Go was a pivotal moment in the history of the
        Pokémon brand much more than it was or will be for any other IP they
        attempt to shoehorn (too strong of a word?) into their platform.
      </p>
    </BlogPage>
  );
}
