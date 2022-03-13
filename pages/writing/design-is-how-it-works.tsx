import BlogPage from "@core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2014-03-20",
  title: "Design Is How It Works",
};

export default function DesignIsHowItWorks(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        <a href="https://twitter.com/dwiskus">Dave Wiskus</a>
        &nbsp;in the{" "}
        <a href="http://www.imore.com/vector-34-importance-design">
          latest episode of Vector
        </a>
        :
      </p>
      <blockquote>
        <p>
          “People will say that they’ve been going through Dribbble looking for
          a designer… and that always shocks me. If you’re searching for an app
          designer or interaction designer based on the way they make things
          look, that’s so backwards to me. The coat of paint is the last thing
          you put on. It would be like choosing a builder based on the color of
          the buildings they’ve made.”
        </p>
      </blockquote>
      <p>
        He’s addressing people who have a confused idea of what the definition
        of design is. An app’s design should be self-fulfilling – an app’s
        purpose dictates its design. If a platform, service, or product looks
        pleasant, but is unpleasant to use, it is designed poorly. In the words
        of Steve Jobs:
      </p>
      <blockquote>
        <p>
          “Most people make the mistake of thinking design is what it looks
          like. People think it’s this veneer — that the designers are handed
          this box and told, ‘Make it look good!’ That’s not what we think
          design is. It’s not just what it looks like and feels like. Design is
          how it works.”
        </p>
      </blockquote>
    </BlogPage>
  );
}
