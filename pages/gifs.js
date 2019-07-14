import React from "react";
import Head from "../components/head";
import Nav from "../components/nav";
import Footer from "../components/footer";

import styles from "./gifs.css";

const gifs = [
  {
    id: "america"
  },
  {
    id: "america2"
  },
  {
    id: "bologna"
  },
  {
    id: "concept"
  },
  {
    id: "crazystarwars"
  },
  {
    id: "cupcakedog"
  },
  {
    id: "cute"
  },
  {
    id: "dab"
  },
  {
    id: "forgetful"
  },
  {
    id: "fry"
  },
  {
    id: "goldblum"
  },
  {
    id: "idiots"
  },
  {
    id: "itstrash"
  },
  {
    id: "madbat"
  },
  {
    id: "magnitude"
  },
  {
    id: "no"
  },
  {
    id: "office"
  },
  {
    id: "ohno"
  },
  {
    id: "pizza"
  },
  {
    id: "raichu"
  },
  {
    id: "reference"
  },
  {
    id: "ryota"
  },
  {
    id: "ryota2"
  },
  {
    id: "shia"
  },
  {
    id: "shia2"
  },
  {
    id: "shiver"
  },
  {
    id: "sun"
  },
  {
    id: "suspense"
  },
  {
    id: "terrace"
  },
  {
    id: "witnessme"
  }
];

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
    const btns = document.querySelectorAll(".gif");
    new Clipboard(btns);
  }
  render() {
    return (
      <div>
        <Head title="Michael Knepprath, GIF Aficionado" />
        <Nav />

        <div className={styles.gifIndex}>
          {shuffle(gifs).map(gif => (
            <img
              className={styles.gif}
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
