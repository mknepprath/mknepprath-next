import A from "@core/a";
import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";
import { ReactNode } from "react";

export const meta: Meta = {
  image: "/assets/sometown-usa-1.jpg",
  published: true,
  publishedAt: "2024-10-23",
  summary: "The search for Buster Keaton's lost short film.",
  title: "“Life in Sometown, U.S.A.”",
};

export default function SometownUsa(): ReactNode {
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
        alt="Title card for Life in Sometown, U.S.A."
        className="bordered-image corner-radius-8"
        height={490}
        src="/assets/sometown-usa-1.jpg"
        width={650}
      />

      <p>
        I’ve become quite the Buster Keaton enthusiast who, along with Charlie
        Chaplin and Harold Lloyd, is considered one of the pioneers of silent
        cinema. He was an artist who dedicated his life to his craft, renowned
        for his death-defying stunts performed in the name of comedy.
      </p>
      <p>
        Last year, I realized I was close to watching every film Keaton
        directed, so I set out to complete his filmography. Almost all of his
        work as a director was done before 1929, at which point he quit for good
        after a falling out with MGM and a number of personal issues.
      </p>
      <div style={{ float: "left", marginRight: "20px", maxWidth: "200px" }}>
        <Image
          src="/assets/sometown-usa-2.jpg"
          alt="Buster Keaton working on Life in Sometown, U.S.A."
          width={702}
          height={901}
          layout="intrinsic"
        />
      </div>
      <p>
        I say almost all because Keaton directed three additional shorts toward
        the end of the ‘30s. Two are available online, but one is not: “Life in
        Sometown, U.S.A.”
      </p>
      <p>
        This late 1938 short showed up on platforms like Letterboxd. All of the
        Letterboxd reviews (three in total) had a random commenter asking the
        reviewer where they saw the movie. One reply was, “TCM a decade ago.”
      </p>
      <p>
        So I contacted Turner Classic Movies. They pointed me to a third-party
        store. I emailed the store, but they didn’t have it. Dead end. TCM
        graciously forwarded my query to a “movie guru,” offering some hope. I
        haven’t heard from them since.
      </p>
      <Image
        src="/assets/sometown-usa-4.png"
        alt="Screenshot from a University of Minnesota bulletin"
        width={1264}
        height={320}
      />
      <p>
        Online searches reveal plenty of mentions on movie tracking sites, old
        magazines, and evidence of it being used in education. Yet, there’s no
        sign of it online or evidence of it ever being online.
      </p>
      <div style={{ float: "right", marginLeft: "20px", maxWidth: "200px" }}>
        <Image
          src="/assets/sometown-usa-3.jpg"
          alt="Buster Keaton working on Life in Sometown, U.S.A."
          width={640}
          height={831}
          layout="intrinsic"
        />
      </div>
      <p>
        I also went to MGM’s site, thinking I could contact them directly, but
        there’s no email listed. What I did notice, however, was something I’d
        forgotten: Amazon bought MGM, so Amazon presumably owns this short now.
      </p>
      <p>
        All that said, my mission to complete Keaton’s directing filmography on
        Letterboxd is technically complete because the film was removed from
        their database, whether by Letterboxd themselves or the maintainers of
        TMDb. A bittersweet end to a fun journey.
      </p>

      <hr />

      <p>
        Fun fact: The events of Sherlock Jr. took place exactly one century ago
        today! It’s one of my all-time favorite films and available to watch on{" "}
        <A href="https://www.youtube.com/watch?v=lXrBPbgBOiQ">YouTube</A> now.
        Check it out!
      </p>

      <Image
        src="/assets/sometown-usa-5.png"
        alt="A still from Sherlock Jr"
        width={800}
        height={565}
      />
    </BlogPage>
  );
}
