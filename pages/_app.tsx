import { Analytics } from "@vercel/analytics/react";
import { useTransition, animated } from "react-spring";

import { AppProps } from "next/app";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import "../css/global.css";
import "../css/prism.css";
import styles from "./_app.module.css";

const headingFont = localFont({ src: "../fonts/Satoshi-Black.otf" });
const bodyFont = localFont({ src: "../fonts/Satoshi-Regular.otf" });
const emFont = localFont({ src: "../fonts/Satoshi-Italic.otf" });

export default function MyApp({
  Component,
  pageProps,
}: AppProps): React.ReactNode {
  const router = useRouter();

  const transitions = useTransition(router.pathname, {
    key: router.pathname,
    initial: { opacity: 1 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, position: "absolute" as const },
    config: { duration: 200 },
  });

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
        a span,
        strong {
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
      <div className={styles.pageWrap}>
        {transitions((style) => (
          <animated.div className={styles.page} style={style}>
            <Component {...pageProps} />
          </animated.div>
        ))}
      </div>
      <Analytics />
    </main>
  );
}
