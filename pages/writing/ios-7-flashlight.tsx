import Image from "next/image";

import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2013-09-26",
  title: "iOS 7 Flashlight",
};

export default function Ios7Flashlight(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        I submitted this subtle detail to{" "}
        <a href="http://littlebigdetails.com/">Little Big Details</a>, but I
        though it was worth sharing here as well. Apple sweats the details.
        (Hint: Look at the on/off switch on the flashlight.)
      </p>

      <Image
        alt="Screenshot of the flashlight app icon in iOS 7"
        className="corner-radius-8"
        height={398}
        layout="responsive"
        priority
        src="/assets/ios-7-flashlight.jpg"
        width={640}
      />
    </BlogPage>
  );
}
