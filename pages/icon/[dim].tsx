import NextHead from "next/head";
import { useRouter } from "next/router";

export default function Dim(): React.ReactNode {
  const router = useRouter();
  const { dim } = router.query;

  return (
    <>
      <NextHead>
        {/* Populates the icon name with empty text. */}
        <title> ‍ </title>
        {/* Sets the icon specified in the URL as the Apple home screen icon. */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href={`/assets/icon/${dim}.png`}
        ></link>
      </NextHead>

      <img src={`/assets/icon/${dim}.png`} />
    </>
  );
}
