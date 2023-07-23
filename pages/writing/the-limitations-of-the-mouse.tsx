import BlogPage from "@core/blog-page";

export const meta: Meta = {
  published: true,
  publishedAt: "2012-10-17",
  title: "The Limitations of the Mouse",
};

export default function TheLimitationsOfTheMouse(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        Let&apos;s say your pen rolls off your desk during work. What do you do?
        Well, you certainly wouldn&apos;t use a{" "}
        <a
          title="...despite how awesome that would be."
          href="https://www.crocodilejoes.com/store/image/cache/data/63883%20T-Rex-500x500.jpg"
        >
          T-Rex grabber
        </a>
        , or try to direct{" "}
        <a href="https://www.youtube.com/watch?v=W9t5ZqeHcYk">The Claw</a> to
        pick it up for you. You might be surprised to learn, then, that you do
        this every day.
      </p>
      <p>
        More and more of our time is spent moving, copying, editing, and
        transferring files, opening menus, painting, and designing on our
        computers. But we&apos;re limited. We&apos;ve been trained to
        communicate with computers through a simple peripheral that allows us to
        direct a pointer around a 2-dimensional screen. The mouse hasn&apos;t
        changed a whole lot since the 60s. It&apos;s time for something new.
      </p>
      <p>
        <strong>Touch screens.</strong> These have been around for quite some
        time, but never really hit it off with humanity until the iPhone. These
        still aren&apos;t commonly found on desktop PCs, but just wait. This
        technology takes us one step closer to &apos;physically&apos; working
        with digital data.
      </p>
      <p>
        <strong>Bendable technology.</strong> Up until now, bending our phones,
        tablets, or computers would break them. Samsung is about to change{" "}
        <a href="https://www.youtube.com/watch?v=hZCiqkWCLqw">that</a>. Imagine
        you had a digital newspaper that shut down when you rolled it up. Or a
        flashlight app that turned on with a twist. We might finally see that
        Bop It app we&apos;ve all been waiting for!
      </p>
      <p>
        <strong>Voice recognition.</strong> While I wouldn&apos;t drop $100
        extra bucks on a phone to get this feature - I can&apos;t wait until I
        can just tell my phone when I want to wake up in the morning. Simple
        tasks like this are exponentially more difficult when having to flip
        through menus using a keypad. I&apos;d like to be able to walk into my
        office and say, &ldquo;All right, I need you to open Gmail, Illustrator,
        and Facebook.&rdquo; Yeah, that would be way easier.
      </p>
      <p>
        <strong>Augmented reality.</strong> Yes, my blog posts always seem to
        come back to this. Augmented reality is going to remove the need for a
        mediatory device by allowing us to deal with digital data the same way
        we handle objects in reality. I can&apos;t wait for this.
      </p>
      <p>
        Can you think of more ways we could communicate with our technology? Let
        me know below!
      </p>
    </BlogPage>
  );
}
