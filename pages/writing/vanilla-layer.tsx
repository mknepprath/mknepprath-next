import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  image: "/assets/vanilla-layer.jpeg",
  published: true,
  publishedAt: "2024-09-23",
  title: "The Vanilla Layer",
};

export default function VanillaLayer(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      ogImage={meta.image}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <Image
        alt="A drawing of a neopolitan ice cream sandwich."
        className="corner-radius-8"
        height={753}
        layout="responsive"
        priority
        src="/assets/vanilla-layer.jpeg"
        width={1000}
      />

      <p>
        Having evaluated and discussed a number of design systems at this point,
        I&apos;m curious about how locked-in brands are to their design systems.
        I&apos;ve found that the frequency with which an interface should be
        refreshed can vary significantly. For instance, GitHub likely
        doesn&apos;t need frequent changes due to its role as a developer
        productivity tool, while a consumer-facing interface like Airbnb&apos;s
        might require more frequent updates to stay fresh, modern, and polished
        for its customers.
      </p>
      <p>
        From what I&apos;ve seen, design systems don&apos;t age well. Their
        built-in inflexibility can cause them to obsolete themselves as
        redesigns become necessary, and often require starting from scratch. I
        suggest that design systems might be more ephemeral than we want to
        accept.
      </p>
      <p>This brings me to my proposed two-tiered solution:</p>
      <p>
        <strong>Vanilla Tier:</strong> A base layer focusing on essentials like
        accessibility and cross-browser support. It doesn&apos;t even need to
        function on its own—it just provides the groundwork for the next tier.
        Most critically, it shouldn&apos;t include layout logic. I think this is
        what differentiates it from a typical design system.
      </p>
      <p>
        <strong>Brand Tier:</strong> Builds upon this foundation, adding style,
        layout, and brand specifics. This tier allows for evolution without the
        need for a redesign from the ground up.
      </p>
      <p>
        I believe a vanilla tier could become a more permanent base, escape the
        design system death loop, and reach a state of maturity—especially as
        it’s exercised by the variety of tiers built on top of it. My employer
        uses a similar approach to manage multiple brands, creating a base
        system that each brand can adapt to their needs. Similar solution to a
        different problem there.
      </p>
      <p>
        Is your company doing something like this now? I&apos;d love to hear
        about it! Feel free to reach out on Mastodon at{" "}
        <a
          href="https://mastodon.social/@mknepprath"
          target="_blank"
          rel="noreferrer noopener"
        >
          @mknepprath
        </a>
        .
      </p>
    </BlogPage>
  );
}
