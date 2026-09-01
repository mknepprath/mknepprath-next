import React from "react";
// `_document.js` is only rendered on the server side and not on the client side.
// Event handlers like onClick can't be added to this file.

// See documentation: https://github.com/zeit/next.js#custom-document

import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render(): React.JSX.Element {
    return (
      // This is the reason this file was added - to set the `lang` attribute.
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Special+Elite&family=Courier+Prime:wght@400;700&family=Creepster&family=Caveat:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
