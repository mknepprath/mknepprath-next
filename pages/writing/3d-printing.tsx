import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

export const meta: Meta = {
  image: "/assets/3dprinting.jpg",
  published: true,
  publishedAt: "2012-08-13",
  title: "3D Printing and the End of the Industrial Age",
};

export default function ThreeDimensionalPrinting(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      ogImage={meta.image}
      title={meta.title}
    >
      <Image
        alt="3D printed cube illustration"
        className="corner-radius-8"
        height={471}
        layout="responsive"
        priority
        src="/assets/3dprinting.jpg"
        width={700}
      />

      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        3D printing, or{" "}
        <a href="http://en.wikipedia.org/wiki/3D_printing">
          additive manufacturing
        </a>
        , has been{" "}
        <a href="http://mashable.com/follow/search/?q=3d+printing&amp;commit=Search">
          in the news
        </a>{" "}
        more and more lately, and for good reason. It’s allowing people to build
        amazing things, such as a{" "}
        <a href="http://mashable.com/2012/08/10/japanese-printing-live-fetus/">
          3D replica of a live fetus
        </a>
        , or a{" "}
        <a href="http://mashable.com/2012/08/03/3d-printed-magic-arms/">
          robotic exoskeleton
        </a>
        . These are fantastic uses for this breakthrough technology.
      </p>
      <p>
        If this is something you are extremely excited about, it’s possible to
        buy one{" "}
        <a href="http://www.ebay.com/sch/i.html?_nkw=3d+printer">right now</a>.
        3D printers are relatively small and becoming more affordable every day,
        so I don’t think it’s not too much of a stretch to say that there may be
        a 3D printer in every household in the not-so-distant future. Here are a
        few changes I think will come with this device as it becomes more
        common.
      </p>
      <ol>
        <li>
          <b>Materials can and will be purchased in bulk.</b> Rather than buying
          plates, cups, decorations, brackets, etc, we will be capable of buying
          materials like plastic in bulk the same way we buy paper and ink for
          printing. By always having these raw materials available, we are only
          limited by the number of 3D models available online. If you know how
          to use a 3D modeling program, you may not be limited at all.
        </li>
        <li>
          <b>
            Mass production of small items will be much less common, if not
            entirely unnecessary.
          </b>{" "}
          Instead of producing a million copies of a product and hoping they’ll
          sell, household 3D printers allow for an on-demand system. As
          consumers, we will no longer have to go to the store and hope they
          have a particular item we want in stock. We can browse online and
          print it ourselves, and even design it ourselves with the proper
          training.
        </li>
        <li>
          <b>3D printer-friendly digital models will become a big market.</b> As
          mentioned above, a large online market will form around printable 3D
          models. There will be many open source models available, many of them
          meeting the basic needs of individuals, such as a full dining set.
        </li>
        <li>
          <b>It will be much easier to be a stop-motion hobbyist.</b> This one’s
          not for everyone, but 3D printers will most likely bring about a big
          wave of aspiring animators. What level of animation can be achieved
          with 3D printers? Watch Coraline and{" "}
          <a href="http://images.businessweek.com/ss/09/04/0415_how_to_innovate/9.htm">
            you’ll see
          </a>
          .
        </li>
        <li>
          <b>
            Recycling materials within the household will become more common.
          </b>{" "}
          Getting sick of your old decorations? Why not stick them back into
          your 3D printer and create something new? Not only that, but if you
          absolutely need a plate for a guest, you can stick anything you no
          longer need of that particular material in it, and voilà!
        </li>
      </ol>
      <p>
        In the end, I believe the greatest change this technology will bring is
        an end to most labor-intensive factory jobs. While the potential is
        great, there are many issues that will need to be covered, such as{" "}
        <a href="http://thenextweb.com/shareables/2012/07/26/the-worlds-first-3d-printed-gun-is-a-terrifying-thing/">
          the creation of weaponry
        </a>
        . What do you think could be a potential use or misuse of 3D printing?
      </p>
    </BlogPage>
  );
}
