import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  image: "/assets/sunsquints.png",
  published: true,
  publishedAt: "2024-06-07",
  summary: "Looking back at a band that barely existed.",
  title: "Sunsquints",
};

export default function Sunsquints(): React.ReactNode {
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

      <blockquote>
        “‘You’re nobody, till somebody loves you.’ Of course, he was somebody.”
        — <em>bbunks</em>
      </blockquote>

      <p>
        I just did some internet sleuthing and had to share my findings. This
        might end up being the one definitive post about Sunsquints, a band I
        was obsessed with briefly in college over a decade ago.
      </p>

      <p>
        Sunsquints created music that I can only describe as sun-drenched,
        glowing; sort of Angels & Airwaves or Tame Impala-adjacent, but radiant.
        It felt like music one could legitimately bask in.
      </p>

      <p>
        Unfortunately, they only ever had a few tracks. By the time I was
        listening to them, they had vanished and their music was disappearing
        from the internet. Luckily, I’d saved all the tracks I could find to my
        iPod and still have them today.
      </p>

      <Image
        alt="Sunsquints playing on my car radio."
        className="corner-radius-8"
        height={1040}
        src="/assets/sunsquints.png"
        layout="responsive"
        priority
        width={1642}
      />

      <p>
        And this is where the sleuthing kicks in. Yesterday, I was scrolling
        some old photos and found a picture of my car radio playing a Sunsquints
        track. Every time I’m reminded of them, I do a quick search to see if
        anything new has popped up.
      </p>

      <p>
        This time, unlike past searches, something did! I found a
        drumming-related forum post from 2010 by a user, “bbunks”, proudly
        bragging about their son’s new music.
      </p>

      <blockquote>
        “Not my effort, but that of my son & a few of his buddies. Now I know
        why he’s been on Garageband 24/7.” - <em>bbunks</em>
      </blockquote>

      <p>
        The title of the forum post: <strong>Sunsquints</strong>.
      </p>

      <p>
        I ended up finding another post by this user commemorating their father
        who had recently passed, which revealed “bbunks” real last name,
        Bunkers.
      </p>

      <p>
        Continuing my odyssey across this decaying internet, I added Bunkers to
        my search query and found an archived 2013 post on a radio station’s
        website titled ”Monday Mixer”:
      </p>

      <blockquote>
        ”This song is another shout-out to my hometown of Oak Park, as that is
        also the hometown of Chris Bunkers, who is the mastermind behind
        Edithbeake. He and his friends originally recorded some songs under the
        name of Sunsquints, which were also good.”
      </blockquote>

      <p>Boom! Chris Bunkers!</p>

      <p>
        You’d think I’d cracked this case wide open now that I had a full name,
        but there still wasn’t much out there. What I did find was pretty cool,
        however.
      </p>

      <p>
        From a 2017 Billboard interview with Knox Fortune, a singer and producer
        who had a new album out that year:{" "}
      </p>

      <blockquote>
        ”One of my best friends, Chris Bunkers, this is his debut in popular
        music. He has a 9-5 job, he’s not grinding for this, but he’s an amazing
        musician, so I brought him in on a lot of tracks.” - Knox Fortune
      </blockquote>

      <Image
        alt="Chris Bunkers credited on Knox Fortune's album, Paradise."
        className="corner-radius-8"
        height={1388}
        src="/assets/sunsquints-bunkers.png"
        layout="responsive"
        priority
        width={1612}
      />

      <p>
        Amazing musician, indeed. I listened to Fortune’s album,{" "}
        <em>Paradise</em>, and enjoyed it. Chris Bunkers’ been killing it for
        years.
      </p>

      <p>
        Not sure what I was hoping to get out of all this. I emailed Knox
        Fortune hoping to get more information about what Chris is up to.
        Whatever he’s doing in music, I’m there! I’d also love to see
        Sunsquints’ music back online.
      </p>

      <p>
        If nothing else, my next project will be figuring out how to get his
        music off of my iPod so that it isn’t lost to time. I’ll keep you
        posted.
      </p>

      <Image
        alt="An illustration by me of Sunsquints lyrics."
        className="corner-radius-8"
        height={911}
        src="/assets/sunsquints-soalive.jpg"
        layout="responsive"
        priority
        width={600}
      />
      <p>
        <em>A 2012 illustration I created based on Sunsquints lyrics.</em>
      </p>
    </BlogPage>
  );
}
