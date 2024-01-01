import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  image: "/assets/the-notebook-film.jpeg",
  published: true,
  publishedAt: "2014-06-25",
  summary: "Love is like the wind, you can’t see it but you can feel it.",
  title: "My Review of The Notebook (2004)",
};

export default function TheNotebook(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      highlightCode
      ogImage={meta.image}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>
      <Image
        alt="A still featuring the stars of The Notebook (2004)."
        className="corner-radius-8"
        height={720}
        src="/assets/the-notebook-film.jpeg"
        layout="responsive"
        priority
        width={1280}
      />
      <blockquote>
        “Love is like the wind, you can’t see it but you can feel it.”
      </blockquote>
      <blockquote>
        “The reason it hurts so much to separate is because our souls are
        connected.”
      </blockquote>
      <blockquote>
        “I love you more than there are stars in the sky and fish in the sea.”
      </blockquote>

      <p>
        No words could strike more fear in my heart than, “based on a novel by
        Nicholas Sparks.”
      </p>
      <p>
        <i>The Notebook</i> is a romantic drama released ten years ago today to
        lukewarm reviews. The general consensus seemed to be that the film was
        “trying too hard,” lazy, dismissive, melodramatic, idiotic… and yet, it
        ended up gaining a massive cult following. I would go so far as to
        suggest that it is one of the most memorable films of 2004.
      </p>
      <p>
        The film begins with an elderly man in a nursing home telling a story
        about two lovers to a fellow patient who is suffering from dementia.
        Eventually, we find out the subjects of the story are actually them when
        they first met. They cross paths several times, until eventually they
        realize they can no longer be apart. Back to the present, the story
        causes Allie to become lucid and remember that this is actually their
        story. They get to enjoy some time together before the dementia
        reappears.
      </p>
      <p>
        I was hesitant to watch this film due to its reputation, but am happy to
        announce that I loved it. Noah (Ryan Gosling), was a likable and
        relatable character – and the viewer could achieve a level of catharsis
        viewing his early attempts to woo Allie (Rachel McAdams). Both actors
        did a marvelous job, and their strong chemistry was apparent throughout
        the course of the film.
      </p>
      <p>
        My theory about the half-hearted reviews is this, you have to be in the
        right mood to watch this film. If you don’t allow yourself to be drawn
        in, you won’t get it. I also believe that it gets better when you get
        married and as you grow older. Youth view marriage and old age as
        something that they see, but are totally unrelated to themselves. With
        age, you begin to realize how scary the premise of this film really is.
        Imagine having such a wonderfully romantic story with someone, only to
        have that snatched from both of you. Absolutely heart-wrenching.
      </p>
      <p>
        At the end of the day, this one of the few romantic dramas I did not
        regret watching – and that’s saying a lot.
      </p>

      <blockquote>
        “So it’s not gonna be easy. It’s going to be really hard; we’re gonna
        have to work at this everyday, but I want to do that because I want you.
        I want all of you, forever, everyday. You and me… everyday.” – Noah
        Calhoun
      </blockquote>
    </BlogPage>
  );
}
