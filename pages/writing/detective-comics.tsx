import Image from "next/legacy/image";

import BlogPage from "@core/blog-page";

export const meta = {
  image: "/assets/detective-comics.jpg",
  published: true,
  publishedAt: "2015-04-29",
  summary: "Prepare to get robbed.",
  title: "How DC Is Failing Us All",
};

export default function DetectiveComics(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
    >
      <Image
        alt="The Joker in a box office booth"
        className="corner-radius-8"
        height={675}
        layout="responsive"
        priority
        src="/assets/detective-comics.jpg"
        width={900}
      />

      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        I love Batman. The Dark Knight was one of my favorite superhero films of
        all time. I want to love Superman, and I want to believe that DC has the
        characters and the talent to put out quality films with gripping stories
        and incredible action.
      </p>
      <p>Regardless, prepare to get robbed.</p>
      <p>
        DC is in a great place. Marvel’s done all the legwork of putting
        together a expansive, yet cohesive, cinematic universe. It’s all there —
        the planning, the timing, the pacing… DC should be taking this roadmap
        and improving upon it. They even have the perfect hook — <b>Batman</b>.
        Instead, DC appears to be trying to copy Marvel as closely as it can.
        Poorly.
      </p>
      <p>
        Case in point: Zack Snyder. Snyder is not Whedon no matter how much DC
        wants to put him in that role. I have to imagine the decision to put him
        in charge was purely based on his ability to direct a cool action
        sequence, and the fact that he’d directed Watchmen. Yes, it’s a dark
        superhero ensemble film, and it was okay… But DC seems to have missed
        the rest of his track record. Snyder films have style, and in the case
        of both Watchmen and 300, this was their saving grace — and both
        borrowed heavily from their graphic novel counterparts to fill in the
        story and character development. But Snyder’s canary in the coal mine is
        Sucker Punch. Per Rotten Tomatoes (which gave it a generous 23%):
      </p>
      <blockquote>
        <p>
          It’s technically impressive and loaded with eye-catching images, but
          without characters or a plot to support them, all of Sucker Punch’s
          visual thrills are for naught.
        </p>
      </blockquote>
      <p>
        Now replace “Sucker Punch” with “Man of Steel.” Now go ahead and replace
        it with “Batman v Superman.” Snyder does style, big visuals, action,
        and… not much else beyond that. This will yield us some cool superhero
        footage, but will not give us the cohesive cinematic universe we want.
        What DC needs is someone whose strengths lie in character development,
        working with assemble casts… someone like Whedon. Hopefully they see
        that before it’s too late.
      </p>
      <p>
        Unfortunately, it may be too late very soon. DC is in a hurry to catch
        up to Marvel — Batman v Superman will feature the two titular characters
        along with Wonder Woman, Cyborg, Aquaman, Lex Luthor and countless other
        minor characters. This film is DC’s Avengers, but unlike The Avengers,
        most people aren’t going to know or care about these characters — and
        back to Snyder’s weaknesses, we’re not going to get any character
        development in this film to make up for the fact that there was no build
        up to it.
      </p>
      <p>
        But hey, at least it’ll be fun, right? I wouldn’t be so sure about that,
        either. DC seems to have doubled down on dark, gritty and serious. The
        working theory is that DC’s detour into the bright and colorful, Green
        Lantern, was a major flop, and their conclusion was that it was the fun
        tone that caused the failure — not the fact that it was just a bad
        movie. Whatever the reason, expect few jokes and even less fun.
      </p>
      <p>
        None of this addresses the biggest problem, however. DC doesn’t have to
        do anything about any of this, and they will still make a ton of money.
        This sucks, because this means we, the fans, are the ones getting
        cheated. They’ll lose our loyalty in the long run, but they’ll make bank
        in the meantime. It doesn’t take a stretch of the imagination to see
        which one they currently value more.
      </p>
    </BlogPage>
  );
}
