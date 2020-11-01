// `_document.js` is only rendered on the server side and not on the client side.
// Event handlers like onClick can't be added to this file.

// See documentation: https://github.com/zeit/next.js#custom-document

import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      // This is the reason this file was added - to set the `lang` attribute.
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
