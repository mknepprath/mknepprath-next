import Link from "next/link";
import Prism from "prismjs";

import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/dynoland-1.jpg",
  published: true,
  publishedAt: "2020-06-06",
  summary: "The podcast is over, but the legacy continues.",
  title: "Building a Culturally Irrelevant Recommendation Board",
};

export default function CulturallyIrrelevant() {
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
        alt="The hosts of Culturally Irrelevant."
        className="blog-image"
        src="/assets/culturally-irrelevant-1.jpg"
      />

      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        For a few years, I was the honorary producer and infrequent guest of a
        podcast called Culturally Irrelevant. In it, four friends would each
        pick a movie, video game, book... anything overlooked pop culture at
        large.
      </p>
      <blockquote>
        <p>
          <b>Ben:</b> "This is the point of the whole show. We're trying to draw
          things out of ambiguity. And it's going to be anything, it might be
          video games. Hey, we're going to bring a video game to the table!
          Tyler's got one and on the level of ambiguity, it's, you know, you've
          heard of it. But you might not have played it. And there's some that
          Dane will bring and it's going to be from the depths of like..."
        </p>
        <p>
          <b>Dane:</b> "Oh, you have no idea. You have no idea what I've got to
          bring."
        </p>
        <p>
          <em>— Episode #1 - I Gotta Go Back To Wisconsin (March 6, 2015)</em>
        </p>
      </blockquote>
      <p>
        The podcast ended its run after 42 episodes and 166+ recommendations on
        December 6, 2018. Not long after, the domain expired, and the podcast
        was lost to the internet.
      </p>
      <p>In April of 2020, Dane died in a car accident.</p>
      <p>
        While the podcast was a relatively minor achievement in his life, it was
        one of my favorite projects of his. It showcased many of his favorite
        things. He talked about film, books, video games. He talked about family
        and faith.
      </p>
      <p>I decided that, at least for myself, I had to preserve the podcast.</p>

      <h2 id="preserving-the-podcast">Preserving the Podcast</h2>
      <p>
        After discussing it with the hosts, it became clear to me that I could
        do more than republish the episodes. The goal of the podcast was to
        shine a light on media most had missed. Instead of having that end with
        the podcast, I thought it'd be cool to expand its scope by creating a
        website where anyone can submit their own overlooked recommendations.
      </p>
      <p>
        I simultaneously relistened to the entire podcast, collected audio clips
        (one for each recommendation, plus more) and built the website.
      </p>
      <img
        alt="Podcast recommendations in Airtable."
        className="blog-image"
        src="/assets/culturally-irrelevant-2.png"
      />
    </BlogPage>
  );
}
