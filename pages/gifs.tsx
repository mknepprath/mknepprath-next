import React, { SyntheticEvent } from "react";

// Components
import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
// Data
import { gifs } from "@data/gifs";

// Styles
import styles from "./gifs.module.css";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "https://mknepprath.com";

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a: Gif[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function onClickToCopy(e: SyntheticEvent) {
  const text = e.currentTarget.getAttribute("data-clipboard-text") || "";
  const fakeElement = document.createElement("textarea");
  fakeElement.value = text;
  document.body.appendChild(fakeElement);
  fakeElement.select();
  fakeElement.setSelectionRange(0, fakeElement.value.length);
  let succeeded;
  try {
    succeeded = document.execCommand("copy");
  } catch (err) {
    succeeded = false;
  }
  if (succeeded)
    document.title = `Michael Knepprath, ${(
      e.currentTarget.id + "!"
    ).toUpperCase()}`;
  document.body.removeChild(fakeElement);
}

export default function GifsPage(): React.ReactNode {
  return (
    <>
      <Head title="Michael Knepprath, GIF Aficionado" />
      <Nav className="container" />

      <div className={styles.gifIndex} data-cy="gifs-page">
        {shuffle(gifs).map((gif: Gif) => (
          <img
            data-clipboard-text={`${BASE_URL}/gifs/${gif.id}.gif`}
            id={gif.id}
            key={gif.id}
            onClick={onClickToCopy}
            src={`/gifs/${gif.id}.gif`}
          />
        ))}
      </div>

      <Footer className="container" />
    </>
  );
}
