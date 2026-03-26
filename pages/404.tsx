import Head from "@core/head";
import Nav from "@core/nav";
import Footer from "@core/footer";
import classnames from "classnames";

import styles from "./404.module.css";

export default function Custom404(): React.ReactNode {
  return (
    <>
      <Head title="404 – M. Knepprath" />
      <Nav className={classnames("container")} />

      <div className={classnames("container", styles.wrapper)}>
        <svg className={styles.filters}>
          <defs>
            <filter id="distort">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.015"
                numOctaves="3"
                seed="2"
                result="turbulence"
              >
                <animate
                  attributeName="baseFrequency"
                  values="0.015;0.025;0.015"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                scale="40"
                xChannelSelector="R"
                yChannelSelector="G"
              >
                <animate
                  attributeName="scale"
                  values="40;60;40"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </feDisplacementMap>
            </filter>
          </defs>
        </svg>

        <div className={styles.content}>
          <h1 className={styles.heading}>404</h1>
          <p className={styles.subheading}>Page not found</p>
          <a href="/" className={styles.link}>
            &larr; Go home
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
