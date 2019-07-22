import classnames from "classnames";

import Footer from "../core/footer";
import Head from "../core/head";
import Nav from "../core/nav";

import { gifs } from "../utils/gifData";

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

class GIFs extends React.Component {
  componentDidMount() {
    const gifElements = document.querySelectorAll(".gif");
    new Clipboard(gifElements);
  }
  render() {
    return (
      <div>
        <Head title="Michael Knepprath, GIF Aficionado" />
        <Nav />

        <div className={styles.gifIndex}>
          {shuffle(gifs).map(gif => (
            <img
              className={"gif"}
              data-clipboard-text={`http://mknepprath.com/static/gifs/${
                gif.id
              }.gif`}
              data-pin-nopin="true"
              key={gif.id}
              src={`/static/gifs/${gif.id}.gif`}
            />
          ))}
        </div>

        <Footer />
      </div>
    );
  }
}

export default GIFs;
