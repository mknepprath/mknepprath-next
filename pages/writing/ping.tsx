import Image from "next/image";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

import A from "core/a";
import BlogPage from "core/blog-page";
import Card from "core/card";

import styles from "./ping.module.css";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

const MusicSection = (props: { music: Playlist[] }): JSX.Element => (
  <div className={styles.cardContainer}>
    {props.music.map((playlist) => {
      // Titlecase the kind of media this is.
      const kind = playlist.attributes.playParams.kind.replace(
        /([A-Z])/g,
        " $1"
      );
      return (
        <Card
          description={kind.charAt(0).toUpperCase() + kind.slice(1)}
          href={
            playlist.attributes.url ||
            `https://music.apple.com/us/${playlist.attributes.playParams.kind}/${playlist.attributes.playParams.globalId}`
          }
          imgSrc={playlist.attributes.artwork.url
            .replace("{w}", "200")
            .replace("{h}", "200")}
          key={playlist.id}
          title={playlist.attributes.name}
        />
      );
    })}
  </div>
);

export const meta = {
  image: "/assets/ping.jpg",
  published: true,
  publishedAt: "2021-02-21",
  summary:
    "How I hacked my way to displaying recently played music on my website.",
  title: "Using the Apple Music API with Next.js",
  tweetId: "1363525903591108609",
};

export default function Ping(): React.ReactNode {
  const { data: musicSection1 } = useSWR<{ data: Playlist[] }>(
    `/api/v1/music?limit=4`,
    fetcher,
    { refreshInterval: 1000 }
  );
  const { data: musicSection2 } = useSWR<{ data: Playlist[] }>(
    `/api/v1/music?limit=4&offset=4`,
    fetcher,
    { refreshInterval: 1000 }
  );
  const { data: musicSection3 } = useSWR<{ data: Playlist[] }>(
    `/api/v1/music?limit=4&offset=8`,
    fetcher,
    { refreshInterval: 1000 }
  );

  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
      tweetId={meta.tweetId}
    >
      <Image
        alt="Musical lock"
        height={600}
        src={meta.image}
        layout="responsive"
        priority
        width={1200}
      />

      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        Yesterday I took on the challenge of displaying my most recently played
        music on my <Link href="/about">About</Link> page. Spoiler: I&apos;m not
        sure if I was 100% successful, and I wouldn&apos;t recommend following
        suit without finding a more solid solution.
      </p>
      <p>
        Apple&apos;s framework for working with music is{" "}
        <A href="https://developer.apple.com/musickit/">MusicKit</A>. It focuses
        specifically on letting users play their own music through 3rd-party
        apps and websites... not totally in line with my goal of displaying my
        music on my website, but one should allow for the other (so I thought).
        MusicKit also includes a JavaScript library, which again was mostly
        tangential to my needs.
      </p>
      {musicSection1?.data?.length ? (
        <MusicSection music={musicSection1?.data} />
      ) : null}
      <p>
        Anyway, the first thing I had to do to start making requests for music
        was to get a developer token - a long, secret password that tells Apple
        I&apos;m authorized to make requests from them. To get this, I had to
        sign in to the Apple Developer portal,{" "}
        <A href="https://help.apple.com/developer-account/#/devce5522674">
          create an identifier
        </A>{" "}
        and{" "}
        <A href="https://help.apple.com/developer-account/#/devcdfbb56a3">
          private key in the form of a{" "}
          <code className="language-html">.p8</code> text file
        </A>
        , which I then had to plug into an open source{" "}
        <A href="https://github.com/pelauimagineering/apple-music-token-generator">
          Apple Music token generator
        </A>{" "}
        to finally get the JSON web token (JWT) which is the developer token I
        could use to make requests.
      </p>
      <p>
        If this sounds complicated... that&apos;s because it was, and note that
        at this point I had yet to make a single request. I was helped by the
        fact that I&apos;d already spent a bunch of time in the Apple Developer
        portal while working on <Link href="/writing/lily-dex">lily dex</Link>.
        I&apos;m not even sure you&apos;re able to do all of this without a paid
        account ($99/year).
      </p>
      {musicSection2?.data?.length ? (
        <MusicSection music={musicSection2?.data} />
      ) : null}
      <p>
        At this point, I was flying... straight into a brick wall. I was able to
        make requests for specific albums, playlists, songs, and more, but as
        soon as I tried to get personal music data (recently played, heavy
        rotation, etc) I received a bunch of 403 error responses, meaning I
        wasn&apos;t authorized to make these requests. After some digging, I
        discovered I&apos;d need yet another token,{" "}
        <code className="language-html">Music-User-Token</code>.
      </p>
      <p>
        This token&apos;s primary purpose, as far as I can tell, is to let users
        authenticate with your 3rd-party Apple Music-integrated app or website.
        Again, this is not what I wanted to do, I just wanted to read my own
        Apple Music data... but I figured I could accomplish my goal with this
        token anyway.
      </p>
      <p>
        If you&apos;re familiar with the &ldquo;Sign In with Facebook&rdquo; or
        &ldquo;Sign In with Google&rdquo; flow, that&apos;s how a token like
        this gets generated - you are directed over to another website to
        authenticate with them, and they return a token saying you&apos;re A-OK.
        Despite not having an app that customers would be signing into, I had to
        replicate this flow for myself to get the token I needed. The easiest
        solution I found was to clone and run{" "}
        <A href="https://github.com/KoleMyers/apple-musickit-example">
          a fake MusicKit-integrated website
        </A>
        , sign in with Apple from there, copy the generated{" "}
        <code className="language-html">Music-User-Token</code> and use that for
        my website.
      </p>
      <p>
        Finally, I was able to make requests for my most recently played music
        and more! Yay!
      </p>
      {musicSection3?.data?.length ? (
        <MusicSection music={musicSection3?.data} />
      ) : null}
      <p>
        My main fear right now is I have no idea if and when the tokens I&apos;m
        using will expire. I assume the user token will{" "}
        <A href="https://developer.apple.com/forums/thread/654814">
          at some point
        </A>
        , at which point I&apos;ll have to fire up the fake Apple Music app
        again to generate a new one.
      </p>
      <p>
        In the meantime, my <Link href="/about">About</Link> page includes the 6
        most recent playlists, albums, and stations I&apos;ve listened to! This
        blog post displays 12 and updates live when I start listening to new
        music. COOL.
      </p>
    </BlogPage>
  );
}
