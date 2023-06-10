import BlogPage from "@core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2012-10-29",
  title: "The Mistake of Being Meta",
};

export default function TheMistakeOfBeingMeta(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        I was recently listening to a Top 40 radio station and realized
        something. I couldn&apos;t relate to any of the music. Why? Almost all
        of the songs were about life as a Top 40 artist. They sing about money,
        partying, clubbing, drinking and... their songs. Bridgit Mendler says it
        best, &ldquo;I like your face, do you like my song?&rdquo; Top 40
        artists are not the only, or first, offenders, however.
      </p>
      <p>
        Artists create films about film, paintings about painting, sculptures
        about sculpture, and so on. I believe that this is caused by a lack of
        diversity in education and interest. Think about it. If I train and
        spend all of my time becoming the most incredible painter in history,
        what will my paintings be about? Well, what subject am I now the most
        knowledgeable of? Painting. See the problem?
      </p>
      <p>
        Keep in mind, there has been long and interesting history of art that
        has brought us to this point. But now we&apos;ve reached it. Time to
        move on. (Those of you that are creating{" "}
        <a href="http://www.rottentomatoes.com/m/the_artist/">
          incredible work
        </a>{" "}
        that just so happens to be meta, keep it up. This is for everyone else.)
      </p>
    </BlogPage>
  );
}
