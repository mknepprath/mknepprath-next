import A from "core/a";
import Page from "core/page";

export default function Uses(): React.ReactNode {
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
          <li>
            Terminal.app with the{" "}
            <A href="https://github.com/mcansh/night-owl-terminal">Night Owl</A>{" "}
            theme (that I tweaked a bit)
          </li>
        </ul>

        <h2>Apps</h2>
        <ul>
          <li>
            <A href="https://www.microsoft.com/en-us/edge">Microsoft Edge</A>
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
            <A href="http://notion.so/">Notion</A>
          </li>
          <li>
            <A href="https://meetshotty.com/">Shotty</A> by{" "}
            <A href="https://twitter.com/JacobRuizDesign">Jacob Ruiz</A>
          </li>
          <li>
            <A href="https://music.apple.com/">Apple Music</A> (
            <A href="https://music.apple.com/profile/mknepprath">follow me</A>)
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
          <li>
            <A href="https://beta.wall.cat/">Wallcat</A> by{" "}
            <A href="https://twitter.com/SmallAnimalInc">
              Small Animal Studios
            </A>
          </li>
          <li>
            <A href="https://github.com/JohnCoates/Aerial">
              Aerial Screensaver
            </A>
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
          <A href="https://twitter.com/mknepprath/status/1215106277447282689?s=20">
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
              MacBook Air
            </A>{" "}
            (13-inch, 2020)
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
        </ul>

        <hr />

        <em>
          Featured on <A href="https://uses.tech">uses.tech</A>.
        </em>
      </article>
    </Page>
  );
}
