import dynamic from "next/dynamic";
import Head from "next/head";

const Scene = dynamic(() => import("@core/404-scene"), { ssr: false });

export default function Custom404(): React.ReactNode {
  return (
    <>
      <Head>
        <title>404 – M. Knepprath</title>
      </Head>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "hsl(0, 0%, 3%)",
        }}
      >
        <Scene />
        <a
          href="/"
          style={{
            position: "absolute",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "1.25rem",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif",
            fontWeight: 300,
            color: "hsla(0, 0%, 70%, 1)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          ← Go home
        </a>
      </div>
    </>
  );
}
