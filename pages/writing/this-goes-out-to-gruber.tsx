import BlogPage from "@core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2013-10-30",
  title: "Google's Android And The HTC/Amazon Rumor",
};

export default function GooglesAndroid(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        Now seems like a good time for{" "}
        <a href="http://arstechnica.com/gadgets/2013/10/googles-iron-grip-on-android-controlling-open-source-by-any-means-necessary/">
          this article by Ron Amadeo
        </a>{" "}
        to resurface. Here are his key points:
      </p>
      <p>
        1. Android started out as open source, but the open source apps that
        Google was developing are slowly being replaced by closed source Google
        apps. When they are replaced, Google stops developing the open source
        app. The best example of this is Search, which can be seen on{" "}
        <a href="http://arstechnica.com/gadgets/2013/10/googles-iron-grip-on-android-controlling-open-source-by-any-means-necessary/">
          the first page of Ron’s article
        </a>
        . This has also happened with{" "}
        <a href="http://arstechnica.com/gadgets/2013/10/googles-iron-grip-on-android-controlling-open-source-by-any-means-necessary/2/">
          Music, Calendar, the keyboard, Camera, and as Ron predicted, SMS
          messaging
        </a>
        . Since this article was published, Google has announced that Google
        Hangouts now supports SMS. Google’s grip just got a little tighter.
      </p>
      <p>
        2. If you want to use these closed source apps developed by Google, you
        have to join the Open Handset Alliance (OHA). To be in the OHA you have
        to contractually agree to not develop phones without Google’s apps. If
        you do, you get kicked out. You are then either stuck with the
        undeveloped open source apps, or you have to develop your own.
      </p>
      <p>
        3. If you want to develop a new Android OS, you are going to have a hard
        time finding a phone manufacturer to carry it, because they are all
        stuck in the OHA.
      </p>
      <p>
        4. Finally, you’re going to have a hard time getting people to develop
        apps for your Android OS, because Google offers many APIs that make it
        easy to develop apps… but they only work with Google Play Services,
        which is only available through the package of Google apps you get by
        being a member of the OHA.
      </p>
      <p>
        5. The only company that has been able to survive without being a member
        of the OHA is Amazon. They develop their own clones to the apps that
        Google stops developing.
      </p>
      <p>
        My question: Rumor has it that HTC is developing a phone for Amazon, but
        HTC is a member of the OHA. Is Google going to kick them out, and can an
        HTC/Amazon phone survive without Google’s support?
      </p>
    </BlogPage>
  );
}
