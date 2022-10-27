import "../css/global.css";
import "../css/prism.css";

import { AppProps } from "next/app";

import { Analytics } from "@vercel/analytics/react";

export default function MyApp({
  Component,
  pageProps,
}: AppProps): React.ReactNode {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
