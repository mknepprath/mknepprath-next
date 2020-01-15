import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";

import Page from "core/page";

import styles from "./dynoland.css";

const Dynoland = ({ online, players, server }) => {
  const copyServerAddressButton = React.createRef();

  React.useEffect(() => {
    // Leverages clipboard.js to copy the server address.
    // Note: we're accessing "current" to get the DOM node.
    new Clipboard(copyServerAddressButton.current); // eslint-disable-line no-undef
  }, [copyServerAddressButton]);

  return (
    <Page className="container" title="Dynoland">
      <article>
        <header>
          <h1>Dynoland {online ? "" : "(Offline)"}</h1>
        </header>

        <img
          alt="Dynoland rendered image"
          className="blog-image"
          src="/assets/dynoland.png"
        />

        <p>
          <button
            className={styles.button}
            data-clipboard-text="dynoland.space"
            ref={copyServerAddressButton}
            type="button"
          >
            Copy Server Address
          </button>
        </p>

        <p>
          This Minecraft server is set to Survival Mode. "Players must collect
          resources, build structures, battle mobs, manage hunger, and explore
          the world in an effort to thrive and survive."
        </p>
        <p>
          There are currently{" "}
          {players.now <= 0 ? "no" : `${players.now}/${players.max}`} players
          online. If you would like to be whitelisted to access this server,
          contact <a href="https://twitter.com/mknepprath">Michael</a>.
        </p>

        <p>
          We're running version {server.name.replace("Spigot ", "")} of
          Minecraft, so you will need to ensure your client matches. Follow the
          directions on the{" "}
          <a
            href="https://help.mojang.com/customer/portal/articles/1475923-changing-game-versions"
            rel="noopener noreferrer"
            target="_blank"
          >
            Changing game versions
          </a>{" "}
          support page if it doesn't.
        </p>

        <p>
          We also have an inactive{" "}
          <a href="https://www.facebook.com/groups/dynoland/">Facebook page</a>.
        </p>

        {/* <img alt="Dynoland favicon" src={server.favicon} /> */}
      </article>
    </Page>
  );
};

Dynoland.getInitialProps = async function() {
  const res = await fetch("https://mcapi.us/server/status?ip=dynoland.space");
  const data = await res.json();
  return { ...data };
};

Dynoland.propTypes = {
  online: PropTypes.bool,
  players: PropTypes.object,
  server: PropTypes.object
};

export default Dynoland;
