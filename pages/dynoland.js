import Page from "core/page";

class Dynoland extends React.Component {
  componentDidMount() {
    // Leverages clipboard.js to copy the server address.
    const copyButton = document.getElementById("copy-address-button");
    new Clipboard(copyButton); // eslint-disable-line no-undef
  }
  render() {
    return (
      <Page className={"container"} title={"Dynoland"}>
        <article>
          <header>
            <h1>Dynoland</h1>
          </header>

          <img
            alt="Dynoland status"
            className="blog-image"
            src="https://minecraft.meloncube.net/index.php?r=status/1573.png"
          />

          <button
            data-clipboard-text="dynoland.space"
            id="copy-address-button"
            type="button"
          >
            Copy Server Address
          </button>

          <p>
            We have a{" "}
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
