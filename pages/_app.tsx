import { AppProps } from "next/app";

import "../css/global.css";
/* TODO: prism.css is only used in blog posts, yet is being included globally. */
import "../css/prism.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
