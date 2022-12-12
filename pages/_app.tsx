import "../css/global.css";
import "../css/prism.css";

import { AppProps } from "next/app";

import localFont from "@next/font/local";
import { Analytics } from "@vercel/analytics/react";

const headingFont = localFont({ src: "../fonts/Satoshi-Black.otf" });
const bodyFont = localFont({ src: "../fonts/Satoshi-Regular.otf" });
const emFont = localFont({ src: "../fonts/Satoshi-Italic.otf" });

export default function MyApp({
  Component,
  pageProps,
}: AppProps): React.ReactNode {
  return (
    <main>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        body {
          font-family: ${bodyFont.style.fontFamily};
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        a,
        a span {
          font-family: ${headingFont.style.fontFamily};
        }
        p,
        small,
        span {
          font-family: ${bodyFont.style.fontFamily};
        }
        em {
          font-style: ${emFont.style.fontFamily};
        }
        code span {
          font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
        }
      `}</style>
      <Component {...pageProps} />
      <Analytics />
    </main>
  );
}
