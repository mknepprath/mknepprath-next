import Prism from "prismjs";

import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/home-screen-1.png",
  published: true,
  publishedAt: "2020-05-07",
  summary: "How I customized my iOS home screen.",
  title: "Home Screen Hack",
};

export default () => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
    >
      <img
        alt="iOS home screen"
        className="blog-image"
        src="/assets/home-screen-1.png"
      />

      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        This is my iPhone home screen. Yes, my icons are bottom-aligned. No,
        this isn't a native feature of iOS. For quite some time, I had been
        relying on a website called{" "}
        <a src="https://iempty.tooliphone.net/">iEmpty</a> to generate empty
        home screen icons.
      </p>
      <p>
        <blockquote>
          [Using iEmpty,] you can add blank icons on your iOS home screen, and
          set your application icons where you want on the iPhone screen,
          hacking the limitation set by Apple on icons positions on the iOS
          devices screens.
        </blockquote>
      </p>
      <p>
        iEmpty achieves this by using iOS's ability to save websites to your
        home screen with custom icons. iEmpty dynamically generates web pages
        with Apple icons that match your wallpaper, making them appear
        invisible.
      </p>
      <p>
        There were a couple downsides to using this service. First, I was
        reliant on a 3rd-party website that didn't fully trust. Second, they
        hosted images ephemerally, so if I were to tap on one of the empty
        icons, it would open the iEmpty website and update the icon with
        iEmpty's logo. I'd have to go through the whole process of creating the
        icon again to replace the broken one.{" "}
      </p>
      <p>
        To fix this, I decided it was time to host these icons myself. My
        website is currently built with{" "}
        <a href="https://nextjs.org/">Next.js</a>, so I was very quickly able to
        throw together a{" "}
        <a href="https://nextjs.org/docs/routing/dynamic-routes">
          dynamic route
        </a>{" "}
        that generates pages for each icon I needed. I called that route{" "}
        <a href="https://github.com/mknepprath/mknepprath-next/blob/master/pages/icon/%5Bdim%5D.js">
          [dim].js
        </a>
        , and here is the entirety of the code:
      </p>
      <pre>
        <code className="language-js">
          {`
import NextHead from "next/head";
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const { dim } = router.query
  return <>
    <NextHead>
      {/* Populates the icon name with empty text. */}
      <title> ‍ </title>
      {/* Sets the icon specified in the URL as the Apple home screen icon. */}
      <link rel="apple-touch-icon" sizes="57x57" href={\`/assets/icon/\${dim}.png\`}></link>
    </NextHead>
  </>
}
              `}
        </code>
      </pre>
      <p>
        Once this was done, I opened{" "}
        <a href="http://mknepprath.com/icon/1x1">each</a>{" "}
        <a href="http://mknepprath.com/icon/1x2">icon</a>{" "}
        <a href="http://mknepprath.com/icon/1x3">page</a> and saved them to my
        home screen.
      </p>
      <p>That's it! Same result, except I'm no longer using iEmpty. 🎉</p>
    </BlogPage>
  );
};
