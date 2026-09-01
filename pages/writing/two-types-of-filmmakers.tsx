import BlogPage from "@core/blog-page";

export const meta: Meta = {
  published: true,
  publishedAt: "2024-12-19",
  summary: "Jafar Panahi on artistic vision versus commercial appeal in filmmaking.",
  tags: ["film"],
  title: "Two Types of Filmmakers",
};

export default function TwoTypesOfFilmmakers(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        In a recent interview on The Daily Show, Iranian filmmaker Jafar Panahi 
        shared a profound observation about the nature of filmmaking that extends 
        far beyond cinema:
      </p>

      <blockquote>
        <p>
          &ldquo;We only have two types of filmmakers in the world. 95% are filmmakers 
          who are after what the audience wants. But another 5% says this is how 
          I look, and it&rsquo;s up to the audience to come and find me.&rdquo;
        </p>
        <cite>&mdash; Jafar Panahi</cite>
      </blockquote>

      <p>
        This dichotomy speaks to a fundamental tension in any creative field: the 
        choice between following market demands and maintaining artistic integrity. 
        Panahi, who has faced significant persecution for his films in Iran, 
        embodies that rare 5% &mdash; artists who refuse to compromise their vision 
        despite external pressures.
      </p>

      <p>
        The statement resonates beyond filmmaking. In software, writing, design, 
        or any creative endeavor, we face the same choice: chase what we think 
        people want, or develop our authentic voice and trust that the right 
        audience will find us.
      </p>

      <p>
        <a href="https://youtu.be/qGyZbidOfaE?si=JZj0eJgLw_CWXecz">
          Watch the full interview
        </a>
      </p>
    </BlogPage>
  );
}