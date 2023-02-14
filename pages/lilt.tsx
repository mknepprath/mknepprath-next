import Image from "next/legacy/image";

import Page from "@core/page";

export default function Lilt(): React.ReactNode {
  return (
    <Page title="lilt">
      <article>
        <header>
          <h1>lilt</h1>
        </header>

        <div className="fill-image" style={{ height: 256 }}>
          <Image
            alt="lilt logo"
            src="/assets/lilt.png"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        <p>
          Every game should have a guidebook. Here&apos;s{" "}
          <a
            href="https://botsin.space/@familiarlilt"
            rel="noopener noreferrer"
            target="_blank"
          >
            lilt
          </a>
          &apos;s.
        </p>

        <h2>The Goal</h2>
        <p>
          You find yourself trapped in a mysterious room. How do you get out?
        </p>

        <h2>Tips</h2>
        <p>
          While lilt attempts to allow you to use natural language messages, it
          works best if you follow certain patterns: &ldquo;look at the
          tree&rdquo;, &ldquo;pick up the coin&rdquo;, &ldquo;use water on the
          flower&rdquo;, and so on.
        </p>
        <p>
          It&apos;s also possible to give items to other people who are playing
          the game: &ldquo;Give @frederick an apple.&rdquo;
        </p>
      </article>
    </Page>
  );
}
