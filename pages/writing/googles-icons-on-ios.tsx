import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  published: true,
  publishedAt: "2013-10-25",
  title: "Google’s Icons On iOS",
  tweetId: "442675061229502465",
};

export default function GooglesIconsOnIos(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      title={meta.title}
      tweetId={meta.tweetId}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        Google spent all year unifying their iOS icons with a consistent ridge
        running along the bottom of each. Then iOS 7 came out and the shape of
        the app icons changed. What a mess. Some are fixed, others are still
        amiss. My opinion? It’s time to ditch the ridge. Google Maps is the only
        one that looks good on my phone anymore.
      </p>

      <Image
        alt="Google's icons on iOS"
        className="corner-radius-8"
        height={1136}
        layout="responsive"
        src="/assets/googles-icons-on-ios.jpg"
        priority
        width={640}
      />
    </BlogPage>
  );
}
