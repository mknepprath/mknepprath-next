import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta = {
  published: true,
  publishedAt: "2012-07-13",
  title: "Augmented Reality and the Future of Gaming",
  ogImage: "/assets/AR.jpg",
};

export default function Ar(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      ogImage={meta.ogImage}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        It&apos;s no secret that I am thoroughly excited about the future of
        augmented reality. If you have not heard of this concept before, you can
        familiarize yourself with it through{" "}
        <a href="https://www.youtube.com/watch?v=D0ojxzS1fCw">the</a>{" "}
        <a href="https://www.youtube.com/watch?v=U2jSzmvm_WA">thousands</a>{" "}
        <a href="https://www.youtube.com/watch?v=cNu4CluFOcw">of</a>{" "}
        <a href="https://www.youtube.com/watch?v=D-A1l4Jn6EY">videos</a>{" "}
        <a href="https://www.youtube.com/watch?v=cARh0HrlgoY">on</a>{" "}
        <a href="https://www.youtube.com/watch?v=yCEHIkJanm4">Youtube</a>{" "}
        <a href="https://www.youtube.com/watch?v=zXWSpcTnKTw">about</a>{" "}
        <a href="https://www.youtube.com/watch?v=rB5xUStsUs4">it</a>.
        Essentially, it is digital information augmenting your view of the
        environment around you.
      </p>

      <p>
        <Image
          alt="AR glasses."
          className="corner-radius-8"
          height={471}
          layout="responsive"
          priority
          src={meta.ogImage}
          width={700}
        />
      </p>
      <p>
        Now, follow me as I share with you the near future of video gaming...
        and reality.
      </p>
      <p>
        Here&apos;s what we need to build a truly immersive augmented reality
        video game experience.
      </p>

      <ol>
        <li>
          <strong>
            Goggles,{" "}
            <a href="http://www.youtube.com/watch?v=JSnB06um5r4">glasses</a> or
            contact lenses featuring augmented reality
          </strong>
          . Contact lenses may be out of our reach currently, but if we can
          already fit augmented reality{" "}
          <a href="http://www.youtube.com/watch?v=yk3rSX-vOVw">this powerful</a>{" "}
          into our handheld gaming devices or{" "}
          <a href="http://www.youtube.com/watch?v=TL8bBeRCktQ">phones</a>, then
          goggles, or some other form of AR headgear, are already attainable.
          Because we&apos;re wearing these goggles, everything we see will be
          capable of having an overlay of digital data. The only problem is,
          augmented reality always needs some sort of{" "}
          <a href="http://www.youtube.com/watch?v=y6VPK-OyQwo">
            card or marker
          </a>{" "}
          to track. Right?
        </li>
        <li>
          <strong>
            PlayStation Vita-like{" "}
            <a href="https://kotaku.com/5891459/the-playstation-vita-somehow-makes-augmented-reality-look-amazing">
              markerless augmented reality
            </a>
          </strong>
          . PlayStation&apos;s device is actually able to read it&apos;s
          surroundings, placing markers at different points and placing virtual
          objects in relation to these points. You no longer need to bring a
          deck of cards with you wherever you go. You can look at a carpet, and
          your AR goggles will know that it is capable of placing a rubber duck
          (or anything else) there. But what happens when these objects move?
          And what happens when real objects are placed in front of the virtual
          ones?
        </li>
        <li>
          <strong>
            Kinect-like{" "}
            <a href="https://www.youtube.com/watch?v=qXcIZ1R68SQ">
              depth-sensing cameras
            </a>
          </strong>
          . The technology that fixes this issue already exists, and you&apos;ve
          heard of it. The Kinect has a depth-sensing camera, so when you want
          to catch, block or kick a virtual object, you totally can. This is
          key, as it allows you to interact with virtual objects in a very
          familiar way, with our hands. These cameras combined with markerless
          AR create a fully-mapped out digital copy of your physical surrounds
          and objects, stationary or otherwise. These new objects still
          won&apos;t feel entirely real, though, because any sounds they make
          will be fed through a pair of cheap headphones, or through speakers in
          the walls.
        </li>
        <li>
          <strong>
            Holophonic sound à la{" "}
            <a href="https://www.youtube.com/watch?v=vuA8DmYCJb0">
              the Virtual Barbershop
            </a>
          </strong>
          . Make sure you put on headphones and close your eyes before listening
          to that clip. It turns out that our sound problem was solved all the
          way back in 1980.{" "}
          <a href="https://www.youtube.com/watch?v=WYdIidUIbAs">
            This was recorded in 1983
          </a>
          . Yes, it is possible to get more realistic sound through your little
          headphones than through the most expensive surround sound system on
          the market today. Headphones can easily fit into your funky
          depth-sensing, environment-tracking goggles, so you now have the
          ability to throw a virtual object and hear it hit the wall with
          extreme realism.
        </li>
      </ol>

      <p>
        The first application I could see for a system like this would be a
        virtual paintball-like experience. This type of game would require a
        very simple controller, all it would require is a trigger-like
        mechanism. The players first walk through the area they are going to
        play in to map out the space. Then they play. The space they are playing
        in can be digitally altered to look like any sort of terrain. Physical
        barriers can be altered as well, but must still be present so that
        people don&apos;t run into them. The controller can be given a virtual
        skin of the type of gun you are using. Grenades can be thrown, and will
        ricochet off of virtual and physical objects. Oh, and because everything
        is being tracked virtually, you are even capable of seeing through
        walls, or being invisible yourself.
      </p>
      <p>
        The most exciting thing about this idea is that it&apos;s possible{" "}
        <em>right now</em>. As displayed above, we have all of the required
        technology. In future posts I will be discussing more specific game
        ideas I have (AR WoW?), and even a few practical uses for this
        technology.
      </p>
      <p>
        What do you envision this technology being used for in the future?
        Don&apos;t hesitate to share your ideas!
      </p>
    </BlogPage>
  );
}
