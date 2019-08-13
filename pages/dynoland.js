import { distanceInWordsToNow, format, parse } from "date-fns";
import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";

import Page from "core/page";

import styles from "./dynoland.css";

class Dynoland extends React.Component {
  componentDidMount() {
    // Leverages clipboard.js to copy the server address.
    const copyButton = document.getElementById("copy-address-button");
    new Clipboard(copyButton); // eslint-disable-line no-undef
  }
  render() {
    const { server } = this.props;
    return (
      <Page className="container" title={server.motd}>
        <article>
          <header>
            <h1>
              {server.motd}
              {server.online ? "" : " (Offline)"}
            </h1>
          </header>

          <img
            alt="Dynoland rendered image"
            className="blog-image"
            src="/static/dynoland.png"
          />

          <p>
            <button
              className={styles.button}
              data-clipboard-text="dynoland.space"
              id="copy-address-button"
              type="button"
            >
              Copy Server Address
            </button>
          </p>

          <p>
            This server is set to Survival Mode. "Players must collect
            resources, build structures, battle mobs, manage hunger, and explore
            the world in an effort to thrive and survive."
          </p>
          <p>
            There are currently{" "}
            {server.players.now <= 0
              ? "no"
              : `${server.players.now}/${server.players.max}`}{" "}
            players online. If you would like to be whitelisted to access this
            server, contact <a href="https://twitter.com/mknepprath">Michael</a>
            .
          </p>

          <p>
            We have an inactive{" "}
            <a href="https://www.facebook.com/groups/dynoland/">
              Facebook page
            </a>
            .
          </p>

          <img alt="Dynoland favicon" src={server.favicon} />
        </article>
      </Page>
    );
  }
}

Dynoland.getInitialProps = async function() {
  const res = await fetch("https://mcapi.us/server/status?ip=dynoland.space");
  const server = await res.json();
  return { server };
};

Dynoland.propTypes = {
  server: PropTypes.object.isRequired
};

export default Dynoland;
