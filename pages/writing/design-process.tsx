import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  published: true,
  publishedAt: "2019-09-07",
  summary: "If I were to be asked to design an app, where would I start?",
  image: "/assets/design-process.jpg",
  title: "Thoughts on Design Process",
  tweetId: "1170381514623729664",
};

export default function DesignProcess(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
      tweetId={meta.tweetId}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <Image
        alt="Rubber duck"
        height={540}
        priority
        src="/assets/design-process.jpg"
        layout="responsive"
        width={896}
      />

      <p>I was recently asked,</p>
      <blockquote>
        <p>
          I’ve just finished reading what we’ll be using as a primer to UX/UI
          design and it’s fairly good (I guess), but misses a few key bits of
          information.
        </p>
        <p>
          The author gives a good bit of basic theoretical information (what and
          why), but assumes that the reader already knows the basics of the UX
          design workflow (missing the HOW). Example: he’ll talk about heat maps
          and eye tracking, but doesn’t care much about explaining the steps
          along the way.
        </p>
        <p>
          If I were to be asked to design an app from the ground up, or redesign
          a substantial pre-existing website, where would I start? What are the
          weigh stations along the way? Where would I introduce the information
          architecture and what form(s) would it take along the way?
        </p>
      </blockquote>

      <p>
        Here are some of my meandering thoughts on the topic.{" "}
        <a href="https://twitter.com/mknepprath">Let me know</a> if I&apos;m
        using any industry jargon that needs further definition. P.S. I&apos;ve{" "}
        <em>never</em> used heat maps or eye tracking. 100% not necessary for
        version 1.0 of any app.{" "}
      </p>

      <h2 id="1-research">1. Research</h2>
      <ul>
        <li>
          At Walmart Labs, this means lots of meetings with people who use the
          website.
        </li>
        <li>
          When working on a recent movie tracking app, I studied existing apps
          in the space.
        </li>
      </ul>
      <p>
        The goal is to get a full understanding of how things currently work,
        and what problems need to be addressed.
      </p>

      <h2 id="2-design-specification">2. Design Specification</h2>
      <p>
        I consider this the most important step - a design spec is the source of
        truth for everything related to the current project. I like to say
        it&apos;s a living document; it gets revised and updated as roadblocks
        are discovered and changes are made. Whenever any new
        &ldquo;artifact&rdquo; is created (writing, mockups, etc), it gets
        referenced in this document. If an engineer has questions about why part
        of the app or feature is designed a certain way, they should be able to
        reference this document for the explanation. The goal of creating this
        is to capture the full scope of the project and answer as many potential
        questions as possible before building it.
      </p>

      <h2 id="3-wireframes">3. Wireframes</h2>
      <p>
        Ideally, these are hand-drawn or put together in a design tool with
        simple shapes - whatever format allows for quick iteration on the
        layout/composition. At this point, it&apos;d be good to start
        referencing the guidelines for whichever platform is being designed for.
        For instance - if this is going to be an Android app, then there&apos;s
        a decent chance the app will need to adopt Android&apos;s built-in
        navigation buttons. This would impact what navigation you&apos;d include
        within the app. You&apos;d also potentially include a{" "}
        <a href="https://material.io/components/buttons-floating-action-button/">
          FAB
        </a>
        . Android&apos;s guidelines are called{" "}
        <a href="https://material.io/">Material Design</a> and Apple&apos;s are
        called{" "}
        <a href="https://developer.apple.com/design/human-interface-guidelines/">
          Human Interface Guidelines
        </a>{" "}
        or HIG.
      </p>

      <h2 id="4-mockups">4. Mockups</h2>
      <p>
        Once I&apos;m feeling good about the design spec and wireframes, and
        after gathering feedback from my team, etc, I open Sketch and start
        building. For the iOS app I worked on, I pulled in a library of HIG
        components and started piecing together the app. Apple has a Resources
        page that includes libraries of their components for a bunch of design
        apps,{" "}
        <a href="https://developer.apple.com/design/resources/">
          including Sketch
        </a>
        . At this point, it&apos;s essentially like building with LEGO.
      </p>
      <p>
        Note: This is not quite as simple on the web, since the web doesn&apos;t
        have a set of guidelines like this - everyone kind of has to build them
        for themselves. One of the apps I work on uses{" "}
        <a href="https://getbootstrap.com/">Bootstrap</a> and another uses{" "}
        <a href="https://material-ui.com/">Material UI</a>, which is a{" "}
        <a href="https://reactjs.org/">React</a> implementation of Material
        Design for the web.
      </p>

      <h2 id="5-developer-feedback">5. Developer Feedback</h2>
      <p>
        This may not deserve it&apos;s own step since I&apos;d generally
        recommend gathering feedback from developers along the way (also, I
        frequently am the developer that ends up implementing what I designed),
        but at some companies, this is considered the point at which the design
        is &ldquo;thrown over the wall.&rdquo; Developers put together a
        technical specification, which is similar to the design spec - except it
        gets into the weeds about what needs to get built, how it should be
        built, what data will be necessary, API endpoints... etc. They often
        discover limitations that were unknown during the design phase that then
        need to get applied to the designs, so there can be some back and forth
        here.
      </p>

      <h2 id="bonus-thoughts">Bonus Thoughts</h2>
      <p>I think the biggest things I&apos;ve learned semi-recently are -</p>
      <ol>
        <li>
          Designers should be writing A LOT. First, mockups only tell half the
          story (if that). Mockups are usually static, so it&apos;s not possible
          to see how certain elements should act or interact. Behavior needs to
          be written down. Second, when working in a company, designers are
          expected to have put thought into why their designs are structured a
          certain way. Writing is the best way to crystalize your thoughts and
          generate a reference sheet for the choices made.
        </li>
        <li>
          Designers can&apos;t work in a silo. It&apos;s impossible to solve a
          problem without fully understanding the context, and they can&apos;t
          get that without talking to people.
        </li>
      </ol>
    </BlogPage>
  );
}
