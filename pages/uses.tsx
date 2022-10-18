import useSWR from "swr";

import A from "@core/a";
import Page from "@core/page";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

export default function Uses(): React.ReactNode {
  const { data: books } = useSWR<Book[]>(`/api/v1/books?shelf=desk`, fetcher);

  return (
    <Page className="container" title="Uses">
      <article data-cy="uses-page">
        <header>
          <h1>Uses</h1>
        </header>

        <p>
          This is where I document tools and products I use and love. If
          you&apos;re curious about anything, feel free to{" "}
          <A href="https://twitter.com/mknepprath">@ me</A>.
        </p>

        <h2>Editor & Terminal</h2>
        <ul>
          <li>
            <A href="https://code.visualstudio.com/">Visual Studio Code</A>
          </li>
          <li>
            <A href="https://marketplace.visualstudio.com/items?itemName=sdras.night-owl">
              Night Owl
            </A>{" "}
            by <A href="https://twitter.com/sarah_edo">Sarah Drasner</A>
          </li>
          <li>
            <A href="https://dank.sh/">Dank Mono</A> font by{" "}
            <A href="https://twitter.com/_philpl">Phil Pluckthun</A>
          </li>
        </ul>

        <h2>Apps</h2>
        <ul>
          <li>
            <A href="https://arc.net/">Arc</A> from the Browser Company
          </li>
          <li>
            <A href="https://1password.com/">1Password</A>
          </li>
          <li>
            <A href="https://culturedcode.com/things/">Things</A>
          </li>
          <li>
            <A href="https://flexibits.com/fantastical">Fantastical</A> by{" "}
            <A href="https://twitter.com/flexibits">Flexibits</A>
          </li>
          <li>
            <A href="https://slack.com/">Slack</A>
          </li>
          <li>
            <A href="https://reincubate.com/camo/">Camo</A> by Reincubate
          </li>
          <li>
            <A href="http://craft.do/">Craft</A>
          </li>
          <li>
            <A href="https://meetshotty.com/">Shotty</A> by{" "}
            <A href="https://twitter.com/JacobRuizDesign">Jacob Ruiz</A>
          </li>
          <li>
            <A href="https://music.apple.com/">Apple Music</A>
          </li>
          <li>
            <A href="https://www.figma.com/">Figma</A>
          </li>
          <li>
            <A href="https://tableplus.com/">TablePlus</A>
          </li>
          <li>
            <A href="https://pdfexpert.com/">PDF Expert</A>
          </li>
        </ul>

        <h2>Edge Extensions</h2>
        <ul>
          <li>
            <A href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi">
              React Developer Tools
            </A>
          </li>
          <li>
            <A href="https://chrome.google.com/webstore/detail/instapaper/ldjkgaaoikpmhmkelcgkgacicjfbofhh">
              Instapaper
            </A>
          </li>
          <li>
            <A href="https://grammarly.com">Grammarly</A>
          </li>
          <li>
            <A href="https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa">
              JSON Formatter
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
          <li>
            <A href="https://www.apple.com/shop/buy-mac/macbook-pro">
              MacBook Pro
            </A>{" "}
            (16-inch, 2019) for work
          </li>
          <li>
            <A href="https://www.amazon.com/Apple-MC914LL-27-inch-Thunderbolt-Display/dp/B074D4W31Y">
              Thunderbolt Display
            </A>
          </li>
          <li>
            <A href="https://www.apple.com/shop/buy-mac/macbook-pro">
              M1 MacBook Pro
            </A>{" "}
            (14-inch, 2021)
          </li>
          <li>
            <A href="https://www.apple.com/airpods">AirPods</A>
          </li>
          <li>
            <A href="https://www.apple.com/shop/product/MLA02LL/A/magic-mouse-2-silver">
              Magic Mouse
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
              {books.map((book) => (
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
