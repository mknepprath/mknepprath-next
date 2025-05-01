import A from "@core/a";
import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";
import Link from "next/link";

export const meta: Meta = {
  image: "/assets/mem.jpg",
  published: true,
  publishedAt: "2025-05-01",
  title: "Note-taking",
  summary: "Why all these other apps are wrong (except Mem?).",
};

export default function Mem(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      ogImage={meta.image}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <Image
        alt="Michael Knepprath doing a brain dump."
        className="corner-radius-8"
        height={704}
        layout="responsive"
        priority
        src="/assets/mem.jpg"
        width={1000}
      />

      <p>
        It&apos;s the same old story: your current note-taking app is just not
        cutting it. You&apos;ve tried all the popular ones, but they all seem to
        fall short in some way. Apple Notes, Bear, Notion, Craft, Obsidian,
        Capacities... you name it. After spiraling for a while, I finally
        realized that none of these apps actually solve the core problem of
        note-taking. The issue isn&apos;t taking the notes themselves. That part
        is easy. The real issue is everything that comes after. The real issue
        is, simply, time.
      </p>

      <p>
        These apps offer great tooling for writing, formatting, organizing and
        sharing notes, sure, but without the time to actually format and
        organize every note, they become disconnected and difficult to find.
        This defeats the purpose of taking notes in the first place. You end up
        with a dump of disparate, useless notes that you can&apos;t find when
        you need them.
      </p>

      <p>
        I think I&apos;ve finally found a note-taking app that addresses this
        head-on:{" "}
        <A href="https://get.mem.ai/">
          <strong>Mem</strong>
        </A>
        . With Mem, I can scratch down my notes as always without worrying about
        organization, tagging, categorizing, anything. That&apos;s it. Then,
        when I need to find something later, I can just ask for it.
      </p>

      <p>Some cool examples:</p>
      <ul>
        <li>
          I have a note about my cars, and I&apos;m able to ask Mem to pull up
          my license plate number. Little pieces of information like this that
          don&apos;t come up that often can be hard to find in a sea of notes,
          but Mem displays them immediately.
        </li>
        <li>
          I have a number of notes that follow a similar template, but I&apos;d
          never written down the template itself. I was able to ask Mem to
          generate the template for me, and it did, no problem.
        </li>
        <li>
          I can even ask Mem to summarize my notes from the past week, and it
          will do that too. Great for preparing for one-on-ones at work or just
          keeping track of what I&apos;ve been up to.
        </li>
      </ul>
      <p>
        If I need a piece of information, I just ask for it. The LLM does a
        better job than a simple string search because it&apos;s able to connect
        the dots between notes even when they don&apos;t necessarily use the
        same keywords.
      </p>

      <p>
        Maybe even more exciting to me is how it&apos;s allowed me to loosen up
        with my note-taking. I can just write down whatever I want, and Mem will
        have that information for me later. I used to be strict about including
        a title for every note, but now I don&apos;t feel the need to do that
        every time. I&apos;ve even started to dictate notes for the first time.
      </p>

      <p>
        What I&apos;m saying is, Mem lets my notes be notes and not an
        aspirational wiki. I&apos;m tired of that, and while I previously saw it
        as a personal failing, now I say: embrace it and use a tool that does
        that work for you.
      </p>

      <p>
        <A href="https://get.mem.ai/">Mem</A> finally lets note-taking be just
        that. Note-taking.
      </p>

      <p>
        <em>
          Note: This is my opinion. I hold that LLMs are much more interesting
          for human-to-computer interaction than for human-to-human interaction
          (
          <Link href="/writing/where-gpt-belongs">
            Microsoft Is Using GPT-4 Wrong
          </Link>
          ), as is the case here. If you have thoughts or concerns, that&apos;s
          fine - feel free to{" "}
          <a href="https://mastodon.social/@mknepprath">message me</a>.
        </em>
      </p>
    </BlogPage>
  );
}
