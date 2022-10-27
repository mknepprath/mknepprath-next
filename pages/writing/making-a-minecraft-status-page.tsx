import Image from "next/legacy/image";
import Link from "next/link";

import BlogPage from "@core/blog-page";

export const meta = {
  image: "/assets/dynoland-1.jpg",
  published: true,
  publishedAt: "2020-06-02",
  summary:
    "Creating a simple page for displaying Minecraft server stats in Next.js.",
  title: "Making a Minecraft Server Status Page",
};

export default function MinecraftStatusPage(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      highlightCode
      ogImage={meta.image}
      title={meta.title}
    >
      <Image
        alt="A render of a Minecraft castle."
        className="corner-radius-8"
        height={1000}
        layout="responsive"
        priority
        src="/assets/dynoland-1.jpg"
        width={2000}
      />
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        I&apos;ve been running a Minecraft server for years. For a while, I
        relied on a Facebook Group with some static information in the
        description for players to reference, like the server address - but then
        I deactivated my Facebook account and this information needed a new
        home.
      </p>
      <p>
        Instead of creating another static page, I thought it&apos;d be fun to
        set up a new dynamic page with live data about my server. Vercel&apos;s
        Next.js makes this easy by providing a method for fetching data
        server-side called{" "}
        <code className="language-html">getInitialProps</code>! Note: This
        method has been deprecated in favor of{" "}
        <code className="language-html">getStaticProps</code>. I set this page
        up before that was introduced, however.
      </p>
      <Image
        alt="A render of a Minecraft battle arena."
        className="corner-radius-8"
        height={1000}
        src="/assets/dynoland-2.jpg"
        layout="responsive"
        width={2000}
      />
      <p>
        First, I tracked down an API service I could use. After a few dead ends,
        I landed on <a href="https://mcapi.us/">mcapi</a>. They provide a
        JavaScript library that returns a bunch of stats, including the server
        name, artwork, and number of players currently online. Using the
        previously mentioned{" "}
        <code className="language-html">getInitialProps</code>, I&apos;m able to
        pass all these stats as props to my page with just four lines of code:
      </p>
      <pre>
        <code className="language-js">
          {`
MinecraftStatusPage.getInitialProps = async function () {
  const res = await fetch("https://mcapi.us/server/status?ip=dynoland.space");
  const data = await res.json();
  return { ...data };
};
              `}
        </code>
      </pre>
      <p>
        I have a custom domain for my server,{" "}
        <a href="http://dynoland.space/">dynoland.space</a>, so I&apos;m able to
        pass that in as the IP address to request the data.
      </p>
      <Image
        alt="A render of a Minecraft castle."
        className="corner-radius-8"
        height={1000}
        src="/assets/dynoland-3.jpg"
        layout="responsive"
        width={2000}
      />
      <p>
        I like the idea of mixing live data with natural language. It&apos;s
        relatively easy to dump a bunch of stats into a table and call it a day,
        but I wanted this status page to be more welcoming than that - so I
        outlined a page similarly to how I&apos;d write a blog post, then
        layered in the server stats. For example, instead of displaying my
        current server version like this:
      </p>
      <table style={{ border: "1px solid black", padding: 8 }}>
        <thead>
          <tr>
            <th>Server Version</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.15.2</td>
          </tr>
        </tbody>
      </table>
      <p>I wrote a full paragraph with some additional context:</p>
      <blockquote>
        We&apos;re running version 1.15.2 of Minecraft, so you will need to
        ensure your client matches. Follow the directions on the{" "}
        <a href="https://help.mojang.com/customer/portal/articles/1475923-changing-game-versions">
          Changing game versions
        </a>{" "}
        support page if it doesn&apos;t.
      </blockquote>
      <Image
        alt="A render of a Minecraft castle."
        className="corner-radius-8"
        height={1000}
        src="/assets/dynoland-4.jpg"
        layout="responsive"
        width={2000}
      />
      <p>
        Another example - if my server is online, I don&apos;t display that in
        any way. It&apos;s implicit. If my server is offline, however, the title
        of the page updates to say &ldquo;Dynoland Is Offline&rdquo;, and an
        additional paragraph is displayed:
      </p>
      <blockquote>
        If you were planning on playing right now, message me and I will look
        into it as soon as I&apos;m available.
      </blockquote>
      <p>
        The last detail I&apos;ll mention is the button that players can click
        to quickly copy the server address to their clipboard. Why not save a
        few steps!
      </p>
      <p>
        Check out the <Link href="/dynoland">final status page here</Link>, and{" "}
        <a href="https://twitter.com/mknepprath">let me know</a> if you&apos;d
        like to join!
      </p>
    </BlogPage>
  );
}
