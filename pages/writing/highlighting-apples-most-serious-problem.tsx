import Image from "next/legacy/image";

import BlogPage from "@core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2013-01-11",
  title: "Highlighting Apple's Most Serious Problem",
};

export default function IosHighlights(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        If you know me, you know I enjoy using Apple’s products. Whether it be
        the iPhone, iMac, iPad, iRefrigerator… I find the simplicity and
        elegance to be a breath of fresh air after exclusively working on PCs
        for the first 18 years of my life. I do have one major issue with all of
        my iDevices however.
      </p>
      <p>First, let’s take a look at a sample of Apple app icons.</p>

      <Image
        alt="Screenshot of iOS app icons with highlights"
        height={337}
        src="/assets/highlighting-apple-1.png"
        layout="responsive"
        priority
        width={779}
      />

      <p>
        Do you see it? Look closer. Closer. That’s right. Every single one of
        them has that hokey highlight stretching across the top/middle. All of
        these icons look dated and cheesy, and a big reason for that is this
        awful highlight. But wait. It gets worse.
      </p>

      <Image
        alt="Screenshot of more iOS app icons with faux highlights"
        height={336}
        src="/assets/highlighting-apple-2.png"
        layout="responsive"
        width={762}
      />

      <p>
        It’s spreading like a virus! Let this be a lesson to you, app
        developers. Highlights are okay, just don’t use this one anymore.
      </p>
    </BlogPage>
  );
}
