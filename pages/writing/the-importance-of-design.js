import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2014-03-20",
  title: "The Importance of Design"
};

export default () => (
  <BlogPage dateTime={meta.publishedAt} title={meta.title}>
    <header>
      <h1>{meta.title}</h1>
    </header>

    <p>
      I’m not even halfway through the{" "}
      <a href="http://www.imore.com/vector-34-importance-design">
        latest episode of Vector
      </a>
      , but there have been so many great quotes about topics that have been on
      my mind lately, I had to write a quick post about it.{" "}
      <a href="https://twitter.com/reneritchie">Rene Ritchie</a> asks:
    </p>
    <blockquote>
      <p>
        “When should you give users settings and choices and options, and when
        should you do that heavy lifting for them?”
      </p>
    </blockquote>
    <p>
      Straightforward question – and the answer was obvious to me up through a
      couple years ago. We should be given as many settings, choices, and
      options as possible so we can optimize our experience to fit our every
      want or need.
    </p>
    <p>
      I’ve changed my mind, however. Here is the candid response I gave to my
      brother when he recently asked, “Why do artists use Macs?”:
    </p>
    <blockquote>
      <p>
        “PCs are for people who want to have a computer and do computery things
        – experiment with them, customize them, optimize them, etc – and that’s
        fine. The Mac is more for people who want a computer for getting stuff
        done rather than have to deal with anything related to the computer
        itself.”
      </p>
    </blockquote>
    <p>
      <a href="https://twitter.com/dwiskus">Dave Wiskus</a> shared similar
      thoughts with Rene in response to his question:
    </p>
    <blockquote>
      <p>
        “I lost so many years getting the software to work that I could’ve spent
        learning the software. If I had spent that same amount of time in front
        of a Mac learning Photoshop, I would’ve been years ahead of where I am
        now. That’s time that I, and so many other people, have lost. And so now
        I feel that my job in designing a piece of software is to not steal that
        time from people. I want to make sure they’re not wasting their time
        trying to figure out how the app works, and instead writing their note,
        and then moving on.”
      </p>
    </blockquote>
    <p>
      In essence, a designer’s job is to reduce the friction between a person
      and their goal, whether that be creating a design, jotting down a note,
      sharing a photo – basically anything. The fewer steps there are between a
      person wanting to do something and achieving it – the better the design.
    </p>
    <p>Rene:</p>
    <blockquote>
      <p>
        “The apps that I like the most are the ones that don’t let me mess
        around – they basically force me into doing what I’m supposed to do. In
        a way, it’s sort of enabling. Yes, I can’t customize the way I want.
        That is a loss, but the gain is so much more valuable.”
      </p>
    </blockquote>
  </BlogPage>
);
