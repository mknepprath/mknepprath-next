import { AppProps } from "next/app";

import "../css/global.css";
import "../css/prism.css";

export default function MyApp({
  Component,
  pageProps,
}: AppProps): React.ReactNode {
  return <Component {...pageProps} />;
}
