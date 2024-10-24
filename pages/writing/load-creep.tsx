import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  image: "/assets/load-creep.jpg",
  published: true,
  publishedAt: "2024-10-05",
  title: "Load Creep",
  summary:
    "How do we ensure our domain doesn't exceed our capacity to manage it?",
};

export default function LoadCreep(): React.ReactNode {
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
        alt="A drawing of a neopolitan ice cream sandwich."
        className="corner-radius-8"
        height={1200}
        layout="responsive"
        priority
        src="/assets/load-creep.jpg"
        width={1600}
      />

      <p>
        In project management, we often talk about scope creep, but I&apos;d
        like to coin a new term: <strong>Load Creep</strong>.
      </p>
      <hr />
      <p>
        <strong>Load Creep</strong> <em>noun</em>
      </p>
      <p>
        The gradual increase in a team&apos;s ongoing maintenance and
        operational workload as new features or components are added to a
        project or system without corresponding adjustments in workload
        distribution or management strategy.
      </p>
      <p>
        <em>
          &ldquo;Our team is struggling with load creep due to the maintenance
          demands of those new features we&apos;ve recently added.&rdquo;
        </em>
      </p>
      <hr />
      <p>
        Imagine team capacity as a box; our domain must fit neatly inside. Every
        new feature, every extra dependency, expands that domain. Without
        careful management, the domain can exceed the box&apos;s limits, leading
        to breakdowns and inefficiencies.
      </p>
      <p>
        My concern is that it&apos;s easy to manage one&apos;s domain when
        things are working smoothly, but domain size can really catch us off
        guard when multiple elements start breaking at once. So, how do we avoid
        getting caught off guard?
      </p>
      <ol>
        <li>
          <strong>Measure the Domain Size:</strong> This is tough, but even a
          fuzzy number as a key indicator can help discussions around the issue.
        </li>
        <li>
          <strong>Assess Team Capacity:</strong> Once you have this, you can
          compare the two numbers and make informed decisions about taking on an
          expanded domain.
        </li>
        <li>
          <strong>Focus!</strong> Narrow down which parts of the domain must fit
          in the team capacity box. The requests and features that don&apos;t
          make it in can be leveraged to expand the team or even spin up a new
          one. (Thanks for this one, David!)
        </li>
      </ol>
      <p>
        Tracking load creep can help a team be more efficient and productive. It
        allows the team time to maintain existing tools and explore new
        opportunities, ultimately leading to happier developers, managers, and
        leadership alike.
      </p>
    </BlogPage>
  );
}
