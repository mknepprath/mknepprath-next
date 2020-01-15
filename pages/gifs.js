// Components
import Footer from "core/footer";
import Head from "core/head";
import Nav from "core/nav";

// Data
import { gifs } from "data/gifs";

import styles from "./gifs.css";

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default () => {
  React.useEffect(() => {
    // Leverages clipboard.js to copy the gif URL to your clipboard on click.
    const gifElements = document.querySelectorAll(".gif");
    new Clipboard(gifElements); // eslint-disable-line no-undef
  }, []);

  return (
    <>
      <Head title="Michael Knepprath, GIF Aficionado" />
      <Nav className="container" />

      <div className={styles.gifIndex}>
        {shuffle(gifs).map(gif => (
          <img
            className="gif"
            data-clipboard-text={`http://mknepprath.com/gifs/${gif.id}.gif`}
            key={gif.id}
            src={`/gifs/${gif.id}.gif`}
          />
        ))}
      </div>

      <Footer className="container" />
    </>
  );
};
