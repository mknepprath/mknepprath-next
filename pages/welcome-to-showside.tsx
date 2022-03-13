import Image from "next/image";

// Components
import A from "@core/a";
import Page from "@core/page";

export default function Dynoland(): React.ReactNode {
  return (
    <Page
      className="container"
      ogImage="/assets/welcome-to-showside.jpg"
      title="8-Bit Kit"
    >
      <article>
        <header>
          <h1>8-Bit Kit</h1>
        </header>

        <Image
          alt="Dynoland rendered image"
          className="corner-radius-8"
          height={638}
          src="/assets/welcome-to-showside.jpg"
          layout="responsive"
          width={1200}
        />

        <p>
          In 2015, I had the great honor of illustrating a back-up comic for{" "}
          <A href="https://comicbookroundup.com/comic-books/reviews/z2-comics/welcome-to-showside/3">
            Welcome to Showside #3
          </A>
          , a series created by the incredibly talented{" "}
          <A href="https://en.wikipedia.org/wiki/Ian_McGinty">Ian McGinty</A>. I
          was tasked with creating a comic in an 8-bit old school video game
          style, referencing games like Q*bert and Pac-Man. I had a great time
          working on it! I still remember picking up my copy at a local comic
          shop.
        </p>

        <blockquote>
          Like many comics nowadays, after the main plot story is done, you are
          treated to some lovely back-up comics. In this issue there are quite a
          few; most notably “What’s In the Box?” by Kate Leth (McGinty’s partner
          on Bravest Warriors and founder of the female comic retail
          organization, The Valkyries) and a lovely Little Nemo referential
          story by Fred Stresing and Michael Knepprath called “8-Bit Kit”. –{" "}
          <A href="https://geekinitiative.com/welcome-showside-issue-3-review/">
            The Geek Initiative
          </A>
        </blockquote>
        <blockquote>
          Stresing also writes a backup drawn by Meg Casey starring Baked Beans,
          the designated Greek chorus/exposition man of Welcome to Showside, as
          he makes a documentary film about the town along with an 8-bit Kit
          story stuffed with video game references drawn by Michael Knepprath. –{" "}
          <A href="https://www.popoptiq.com/welcome-to-showside-3/">PopOptiq</A>
        </blockquote>
      </article>
    </Page>
  );
}
