import Image from "next/image";

import BlogPage from "core/blog-page";

export const meta = {
  published: false,
  publishedAt: "2013-12-20",
  title: "App Of The Year: Duolingo",
};

export default function AppOfTheYearDuolingo(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        This really is a cool app, and it’s gone through quite the
        transformation since it was first released to the App Store.{" "}
        <a href="https://web.archive.org/web/20140127084831/http://www.mknepprath.com/how-to-use-duolingo/">
          I wrote about the service
        </a>{" "}
        when it first came out as a website, which is also worth a look if
        you’re interested in learning a second language. They now offer courses
        on German, French, Spanish, Portuguese, and Italian.
      </p>

      <Image
        alt="Screenshot of the app Duolingo"
        className="corner-radius-8"
        height={1136}
        src="/assets/app-of-the-year-duolingo.jpg"
        layout="responsive"
        priority
        width={640}
      />
    </BlogPage>
  );
}
