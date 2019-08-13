import Page from "core/page";

import styles from "./dynoland.css";

class Dynoland extends React.Component {
  componentDidMount() {
    // Leverages clipboard.js to copy the server address.
    const copyButton = document.getElementById("copy-address-button");
    new Clipboard(copyButton); // eslint-disable-line no-undef
  }
  render() {
    return (
      <Page className="container" title="Dynoland">
        <article>
          <header>
            <h1>Dynoland</h1>
          </header>

          <img
            alt="Dynoland rendered image"
            className="blog-image"
            src="/static/dynoland.png"
          />

          <img
            alt="Dynoland status"
            className="blog-image"
            src="https://minecraft.meloncube.net/index.php?r=status/1573.png"
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
            If you would like to be whitelisted to access this server, contact{" "}
            <a href="https://twitter.com/mknepprath">Michael</a>.
          </p>

          <p>
            We have an inactive{" "}
            <a href="https://www.facebook.com/groups/dynoland/">
              Facebook page
            </a>
            .
          </p>
        </article>
      </Page>
    );
  }
}

export default Dynoland;
