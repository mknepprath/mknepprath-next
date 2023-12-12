import A from "@core/a";
import Page from "@core/page";
import Image from "next/legacy/image";
import useSWR from "swr";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

export default function Uses(): React.ReactNode {
  const { data: books } = useSWR<Book[]>(`/api/v1/books?shelf=desk`, fetcher);

  return (
    <Page title="Uses">
      <article data-cy="uses-page">
        <header>
          <h1>Uses</h1>
        </header>

        <Image
          alt="Photograph of my desk."
          className="corner-radius-8"
          height={714}
          src="/assets/uses.jpg"
          layout="responsive"
          width={1200}
        />

        <p>
          <em>
            Last updated on <time dateTime="2023-12-11">December 11, 2023</time>
            . Books are live from{" "}
            <A href="https://www.goodreads.com/review/list/12921689?shelf=desk">
              Goodreads
            </A>
            .
          </em>
        </p>

        <p>
          This is where I document tools and products I use and love. If
          you&apos;re curious about anything, feel free to{" "}
          <A href="https://mastodon.social/@mknepprath">@ me</A>.
        </p>

        <h2>Apps</h2>

        <h3>Productivity</h3>
        <ul>
          <li>
            <A href="https://arc.net/">Arc</A> from The Browser Company
          </li>
          <li>
            <A href="https://culturedcode.com/things/">Things</A> by Cultured
            Code
          </li>
          <li>
            <A href="https://pdfexpert.com/">PDF Expert</A> by Readdle
          </li>
          <li>
            <A href="https://flexibits.com/fantastical">Fantastical</A> by
            Flexibits
          </li>
          <li>
            <A href="https://slack.com/">Slack</A>
          </li>
          <li>
            <A href="https://reincubate.com/camo/">Camo</A> by Reincubate
          </li>
          <li>
            <A href="https://www.raycast.com/">Raycast</A>
          </li>
          <li>
            <A href="https://meetshotty.com/">Shotty</A> by{" "}
            <A href="https://twitter.com/JacobRuizDesign">Jacob Ruiz</A>
          </li>
          <li>
            <A href="https://1password.com/">1Password</A> by AgileBits
          </li>
          <li>
            <A href="https://www.apple.com/safari/">Safari</A>
          </li>
          <li>
            <A href="https://apps.apple.com/us/app/notes/id1110145109">
              Apple Notes
            </A>
          </li>
        </ul>

        <h3>Communication</h3>
        <ul>
          <li>
            <A href="https://apps.apple.com/us/app/beeper-universal-messenger/id1551695541/">
              Beeper
            </A>
          </li>
          <li>
            <A href="https://apps.apple.com/us/app/messages/id1146560473">
              iMessage
            </A>
          </li>
          <li>
            <A href="https://sparkmailapp.com/">Spark</A> by Readdle
          </li>
          <li>
            <A href="https://apps.apple.com/us/app/ivory-for-mastodon-by-tapbots/id6444602274">
              Ivory
            </A>{" "}
            by Tapbots
          </li>
        </ul>

        <h3>Development</h3>
        <ul>
          <li>
            <A href="https://www.jetbrains.com/webstorm/">WebStorm</A> by
            JetBrains
          </li>
          <li>
            <A href="https://tableplus.com/">TablePlus</A>
          </li>
        </ul>

        <h3>Design</h3>
        <ul>
          <li>
            <A href="https://www.figma.com/">Figma</A>
          </li>
        </ul>

        <h3>Music</h3>
        <ul>
          <li>
            <A href="https://www.apple.com/apple-music/">Apple Music</A>
          </li>
        </ul>

        <h3>Reading</h3>
        <ul>
          <li>
            <A href="https://www.apple.com/apple-books/">Apple Books</A>
          </li>
          <li>
            <A href="https://apps.apple.com/app/id1572927568">Artifact</A> by
            Nokto
          </li>
          <li>
            <A href="https://apps.apple.com/us/app/reeder-5/id1529445840">
              Reeder
            </A>{" "}
            by Silvio Rizzi
          </li>
        </ul>

        <h3>Podcasts</h3>
        <ul>
          <li>
            <A href="https://apps.apple.com/us/app/overcast/id888422857">
              Overcast
            </A>{" "}
            by Marco Arment
          </li>
        </ul>

        <h3>Tracking</h3>
        <ul>
          <li>
            <A href="https://apps.apple.com/us/app/letterboxd/id1054271011">
              Letterboxd
            </A>
          </li>
          <li>
            <A href="https://apps.apple.com/us/app/sequel-media-tracker/id1630746993">
              Sequel
            </A>{" "}
            by Romain Lefebvre
          </li>
          <li>
            <A href="https://apps.apple.com/us/app/goodreads-book-reviews/id355833469">
              Goodreads
            </A>
          </li>
        </ul>

        <h2>Desktop IRL</h2>
        <p>
          The things on{" "}
          <A href="https://twitter.com/mknepprath/status/1215106277447282689">
            my real desk
          </A>{" "}
          that I use everyday.
        </p>
        <ul>
          <li>
            <A href="https://www.westelm.com/products/modern-wall-desk-white-pecan-h1499/">
              West Elm Modern Wall Desk
            </A>
          </li>
          <li>M1 MacBook Pro (16-inch, 2021) for work</li>
          <li>Thunderbolt Display</li>
          <li>M1 MacBook Pro (14-inch, 2021)</li>
          <li>iPad Air (5th generation)</li>
          <li>
            <A href="https://www.apple.com/airpods-pro">AirPods Pro</A>
          </li>
          <li>
            <A href="https://www.logitech.com/en-us/products/mice/lift-vertical-ergonomic-mouse.html">
              Logitech Lift
            </A>
          </li>
          <li>
            Rain Design&apos;s{" "}
            <A href="https://www.amazon.com/Rain-Design-mStand-Laptop-Patented/dp/B000OOYECC">
              mStand Laptop Stand
            </A>
          </li>
          {books?.length ? (
            <>
              {books
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((book) => (
                  <li key={book.link}>
                    <A href={book.link}>{book.title}</A> by {book.author}
                  </li>
                ))}
            </>
          ) : null}
        </ul>

        <hr />

        <em>
          Featured on <A href="https://uses.tech">uses.tech</A>.
        </em>
      </article>
    </Page>
  );
}
