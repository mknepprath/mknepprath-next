import A from "@core/a";
import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";
import { ReactNode } from "react";

export const meta: Meta = {
  image: "/assets/keaton-ssr-2.png",
  published: true,
  publishedAt: "2023-03-10",
  summary: "A story about two obsessions colliding.",
  title: "KEATON × SSR",
};

export default function KeatonSsr(): ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <Image
        alt="Buster Keaton and S. S. Rajamouli"
        className="bordered-image corner-radius-8"
        height={447}
        src="/assets/keaton-ssr-1.png"
        width={800}
      />

      <p>
        If you know me, you know I&apos;ve been obsessed with the film{" "}
        <A href="https://letterboxd.com/film/rrr/">RRR</A> since early last
        year. I&apos;ve seen it half a dozen times, and my obsession hasn&apos;t
        stopped there - I&apos;ve gone back and watched most of the director S.
        S. Rajamouli&apos;s other films as well.
      </p>
      <p>
        If you know me, you know I&apos;ve been watching tons of old
        black-and-white films with my son over the past couple of years.
        I&apos;ve gravitated towards Buster Keaton being my favorite of the
        silent era comedians and consider{" "}
        <A href="https://letterboxd.com/film/sherlock-jr/">Sherlock, Jr.</A> one
        of my all-time favorite films.
      </p>
      <p>
        Earlier this year, I worked my way back to watching Rajamouli&apos;s
        2010 film,{" "}
        <A href="https://letterboxd.com/film/maryada-ramanna/">
          Maryada Ramanna
        </A>
        . I found the premise novel and fun. From Letterboxd: &ldquo;Ramu
        returns to his hometown to sell a piece of land he owns and falls in
        love with a young woman only to find out that her parents want him
        dead.&rdquo; The film starts by setting up a deadly rivalry between
        families, jumps forward in time to the protagonist taking a train to his
        hometown, and continues from there.
      </p>
      <p>
        A few weeks later I put on Buster Keaton&apos;s 1923 film{" "}
        <A href="https://letterboxd.com/film/our-hospitality/">
          Our Hospitality
        </A>
        . It starts by setting up a deadly rivalry between families. I thought,
        &ldquo;Huh, I&apos;ll have to note this similarity in my review.&rdquo;
        It continues by jumping forward to the protagonist taking a train to his
        hometown. I thought, &ldquo;Hold on... What&apos;s happening?&rdquo; It
        quickly became apparent that I was watching <em>THE SAME MOVIE</em>.
      </p>
      <p>
        The serendipity of this experience surprised and delighted me. I had to
        do something with it, so I made this. Enjoy!
      </p>

      <iframe
        width="100%"
        height="353"
        src="https://www.youtube.com/embed/pl4LEjA05oo"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </BlogPage>
  );
}
