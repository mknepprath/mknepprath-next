import A from "@core/a";
import BlogPage from "@core/blog-page";
import Image from "next/image";

import styles from "./2025.module.css";

export const meta: Meta = {
  image: "/assets/2025-in-review-1.jpg",
  published: true,
  publishedAt: "2026-05-20",
  summary: "A look at my accomplishments during the past year.",
  title: "2025 in Review",
};

export default function ReviewOf2025(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
    >
      <Image
        alt="Disney World's Main Street at night"
        className="corner-radius-8"
        height={1200}
        priority
        src="/assets/2025-in-review-1.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1600}
      />

      <header>
        <h1>{meta.title}</h1>
      </header>

      <p className={styles.noDropCap}>Oof.</p>

      <p>
        I know nearly halfway through the year is an odd time to drop a
        year-in-review for the previous year, but, I&apos;ll be honest, writing
        a review of all the fun things I did in 2025 felt borderline
        irresponsible in early 2026. Each time I sat down to write, another
        American citizen would be shot or killed by ICE, the goon squad sent to
        my home state under false pretenses - that it was full of undocumented
        immigrants, which itself is national policy backed by false pretenses -
        that immigrants are by and large dangerous, a fact not borne out by any
        measure of evidence.
      </p>

      <p>
        If ever I was going to slip into single-issue voter territory, it would
        be on the issue of immigration due to the maximalist level of pain we
        are inflicting on innocent families; adults and children, citizens and
        non-citizens alike. They are being scapegoated in the most biblical
        sense, death marched into camps and out of our country to carry the sins
        of our discordance.
      </p>

      <p>
        While I&apos;m technically a voter without a party on this issue, I have
        to give credit to Donald J. Trump for identifying how to hook people by
        their virtues and vices in order to unleash a level of cruelty unlike
        any man has been capable in centuries, save for perhaps one.
      </p>

      <h2>Travel</h2>

      <Image
        alt="Flighty travel map showing 2025 flights"
        className="corner-radius-8"
        height={1004}
        src="/assets/2025-travel-map.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1320}
      />

      <h3>February: Minnesota</h3>

      <div className={styles.imagePair}>
        <Image
          alt="Bowling in Minnesota"
          className="corner-radius-8"
          height={1066}
          src="/assets/2025-minnesota-bowling.jpg"
          style={{ width: "100%", height: "auto" }}
          width={1600}
        />
        <Image
          alt="Playing Legos with family in Minnesota"
          className="corner-radius-8"
          height={1066}
          src="/assets/2025-minnesota-legos.jpg"
          style={{ width: "100%", height: "auto" }}
          width={1600}
        />
      </div>

      <Image
        alt="Winter morning in Minnesota"
        className="corner-radius-8"
        height={1066}
        src="/assets/2025-minnesota-winter.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1600}
      />

      <h3>March: Houston</h3>

      <Image
        alt="Family in front of a castle reflected in a pond near Houston"
        className="corner-radius-8"
        height={1066}
        src="/assets/2025-houston-castle.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1600}
      />

      <div className={styles.imagePair}>
        <Image
          alt="Jill among Texas bluebonnets"
          className="corner-radius-8"
          height={1066}
          src="/assets/2025-houston-bluebonnets.jpg"
          style={{ width: "100%", height: "auto" }}
          width={1600}
        />
        <Image
          alt="Owen with a Blue Bell ice cream hat"
          className="corner-radius-8"
          height={1066}
          src="/assets/2025-houston-owen.jpg"
          style={{ width: "100%", height: "auto" }}
          width={1600}
        />
      </div>

      <h3>May: New Mexico</h3>

      <p>
        Part of that was because my last living grandparent passed away. This
        was not a surprise, and I was given the opportunity to visit her shortly
        before. Trips to visit her as a child are some of my favorite memories.
        We&apos;d drive across the country, seeing landscapes and culture we were
        unfamiliar with being from the Midwest. She would always have the SNES
        set up, I had assumed for us, but I later learned that she was a gamer
        herself. Per my aunt, &ldquo;She beat both Super Mario and The Legend of
        Zelda on SNES. SHE BEAT THEM BOTH. Final boss, vanquished.&rdquo;
      </p>

      <p>
        I visited Albuquerque again in May to attend the funeral. Got to see a
        lot of family that I hadn&apos;t seen since I was a child myself.
      </p>

      <Image
        alt="Family gathered in Albuquerque"
        className="corner-radius-8"
        height={1200}
        src="/assets/2025-albuquerque-family.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1600}
      />

      <h3>June: Michigan</h3>

      <p>My parents retired.</p>

      <div className={styles.imagePair}>
        <Image
          alt="Dad at the retirement party"
          className="corner-radius-8"
          height={1066}
          src="/assets/2025-michigan-retirement-party.jpg"
          style={{ width: "100%", height: "auto" }}
          width={1600}
        />
        <Image
          alt="Family gathered for the retirement celebration"
          className="corner-radius-8"
          height={1066}
          src="/assets/2025-michigan-retirement-family.jpg"
          style={{ width: "100%", height: "auto" }}
          width={1600}
        />
      </div>

      <h3>August: Japan</h3>

      <p>
        We took a joint trip with my cousin and his family from Osaka to Kyoto
        to Tokyo and ended in Tokyo Disneyland.
      </p>

      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        frameBorder="0"
        height="353"
        src="https://www.youtube.com/embed/WLrm3qDLxmo"
        title="Japan 2025"
        width="100%"
      ></iframe>

      <h3>October: Michigan</h3>

      <h3>October/November: Disney World</h3>

      <p>
        Then we went back to Disney and took full advantage of our park hopper
        tickets. We saw Cirque du Soleil.
      </p>

      <Image
        alt="Mickey's Not-So-Scary Halloween Party spooktacular show"
        className="corner-radius-8"
        height={1200}
        src="/assets/2025-disney-spooktacular.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1600}
      />

      <div className={styles.imagePair}>
        <Image
          alt="Owen with the Mandalorian at Disney World"
          className="corner-radius-8"
          height={1000}
          src="/assets/2025-disney-mandalorian.jpg"
          style={{ width: "100%", height: "auto" }}
          width={750}
        />
        <Image
          alt="Owen with a Star Wars droid at Disney World"
          className="corner-radius-8"
          height={1000}
          src="/assets/2025-disney-star-wars-droid.jpg"
          style={{ width: "100%", height: "auto" }}
          width={750}
        />
      </div>

      <h3>December: El Paso &amp; Cancun</h3>

      <p>
        Visited family and then our family split to relax on the beaches of
        Cancun.
      </p>

      <div className={styles.imagePair}>
        <Image
          alt="Hiking through a canyon in El Paso"
          className="corner-radius-8"
          height={1000}
          src="/assets/2025-el-paso-hike.jpg"
          style={{ width: "100%", height: "auto" }}
          width={750}
        />
        <Image
          alt="Family resting during the El Paso hike"
          className="corner-radius-8"
          height={1000}
          src="/assets/2025-el-paso-family.jpg"
          style={{ width: "100%", height: "auto" }}
          width={750}
        />
      </div>

      <Image
        alt="Owen relaxing at the Cancun resort"
        className="corner-radius-8"
        height={1199}
        src="/assets/2025-cancun.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1600}
      />

      <h2>2025 in Film</h2>

      <h3>Superman (2025)</h3>

      <p>
        In early 2024, a casting call for Cleveland-based extras came through my
        feed and after a bit of digging I learned that it was, in fact, James
        Gunn&apos;s next film: Superman. Only a month or two after submitting
        Owen&apos;s application, we learned that he had been selected to appear
        in the film. We spent a day in July on set and got to see Gunn at work.
        It was awesome seeing Cleveland fully decked out as Metropolis.
      </p>

      <p>
        Opening day, July 2025, our whole family waited in the theater
        impatiently wondering if Owen had made the final cut. At a little over an
        hour in, there he was! You can spot him in a line of extras hopping on a
        bus to escape Metropolis.
      </p>

      <Image
        alt="Cleveland's The Arcade dressed as Metropolis for the Superman film"
        className="corner-radius-8"
        height={1200}
        src="/assets/2025-superman-arcade.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1600}
      />

      <h3>CIFF49</h3>

      <p>
        2024 was the first CIFF I attended, 2025 was my first CIFF on the
        screening team. Each week, I was assigned a slate of short and
        feature-length films to watch and review, ultimately helping to decide
        what would be shown at the festival.
      </p>

      <h3>Ghibli Park</h3>

      <p>
        Our journey with the work of Miyazaki and his compatriots continued
        during our trip to Japan where we did a day trip to visit Ghibli Park, a
        full theme park based on Studio Ghibli films.
      </p>

      <div className={styles.imagePair}>
        <Image
          alt="Family in front of Kiki's bakery at Ghibli Park"
          className="corner-radius-8"
          height={1200}
          src="/assets/2025-ghibli-family.jpg"
          style={{ width: "100%", height: "auto" }}
          width={1600}
        />
        <Image
          alt="Owen and Jill sitting with a large Totoro at Ghibli Park"
          className="corner-radius-8"
          height={1200}
          src="/assets/2025-ghibli-totoro.jpg"
          style={{ width: "100%", height: "auto" }}
          width={1600}
        />
      </div>

      <h3>Reviews</h3>

      <ul>
        <li>
          <strong>Superman (2025)</strong>: It&apos;s corny, episodic,
          throwaway, a single-issue comic brought to life. It embraces the
          freedom comics have always had to experiment, be messy, speak to the
          moment, be idealistic, naive, optimistic, and colorful.
        </li>
        <li>
          <strong>Sinners (2025)</strong>: Coogler&apos;s made some of my
          favorite movies, yet I still didn&apos;t realize he had something like
          this in him. Has all the trappings of a blockbuster hit and the depth
          of the most intimate autobiography. Deserves an essay, but I&apos;ll
          save that for a future review. He cashed that check!!
        </li>
        <li>
          <strong>I&apos;m Still Here (2025)</strong>: The first hour is
          crucial, as it makes you feel the hole that&apos;s torn through their
          lives more than if they&apos;d jumped right into the action, and
          it&apos;s a major credit to the cast that they were charming enough to
          make it work. I didn&apos;t know about this time period in Brazil. I
          feel like I&apos;ve lived an entire life. Seeing the real photos at
          the end was a real gut punch.
        </li>
        <li>
          <strong>The Apartment (1960)</strong>: The best movies aren&apos;t
          puzzle boxes. They aren&apos;t thrill rides or epics. While movies can
          be all of these things, the best ones are those that plumb the depths
          of humanity for that which can&apos;t be mathed out. They uncover the
          spark within each of us—a universal yearning to be, simply, perceived
        </li>
        <li>
          <strong>Stop Making Sense (1984)</strong>: Crescendos perfectly.
        </li>
        <li>
          <strong>Grizzly Man (2005)</strong>: Herzog crafted this film like the
          shield of Perseus, diluting the cursed events through refraction in
          such a way that we can study, or at least gawk, at them. Like
          Treadwell, you can feel Herzog being drawn to the void for answers:
          &ldquo;I discover no kinship, no understanding, no mercy.&rdquo; He
          sees a man who overdosed on peering into it and takes a hit himself.
          No moment captures this better than when we&apos;re watching him
          listen to the audio tape from Treadwell&apos;s final moments:{" "}
          &ldquo;I think you should not keep it. You should destroy it.&rdquo;
          This was my first Herzog, yet this was so competently made that I
          didn&apos;t believe for an instant that the interviews being shot like
          a man investigating and even admiring wild animals were anything but
          intentional.
        </li>
        <li>
          <strong>John Carpenter</strong>: I was very prepared for
          Carpenter&apos;s later films to be a slog to get through, but I was
          having the time of my life. It struck me that his raw shooting style
          would have really lent itself to a Ranown-like series of westerns, and
          it&apos;s too bad his career was completely misaligned with the time
          when westerns could actually get made. Carpenter just knows how to
          shoot a movie. Didn&apos;t think I&apos;d come out of this one
          thinking he should come back for another, but… he totally should.
          Carpenter passed Buster Keaton to be my most watched director in 2025.
        </li>
        <li>
          <strong>Buster Keaton</strong>: My most watched actor, once again.
          Buster is a director torn between practical stunts and fantasy, the
          latter having the potential to detract from the former, despite his
          clear love for both. The challenge for Buster, then, is balancing how
          many superhuman stunts, extraordinary people, and fantastical places
          he can include without diminishing the spectacle of these elements.
          Stunts require grounding, as anything can happen in a heightened
          unreality. I think he found that balance.
        </li>
      </ul>

      <h2>Books</h2>

      <ul>
        <li>
          <A href="https://www.goodreads.com/book/show/4153.Reconstruction_America_s_Unfinished_Revolution_1863_1877">
            Reconstruction
          </A>{" "}
          by Eric Foner, a long-running battle to get through
        </li>
        <li>
          <A href="https://www.goodreads.com/book/show/33917107-on-tyranny">
            On Tyranny
          </A>{" "}
          by Timothy Snyder
        </li>
        <li>
          <A href="https://www.goodreads.com/series/64016-astro-boy">
            Astro Boy
          </A>{" "}
          by Osamu Tezuka
        </li>
        <li>
          <A href="https://www.goodreads.com/book/show/485894.The_Metamorphosis">
            The Metamorphosis
          </A>
          , Kafka while running
        </li>
        <li>
          <A href="https://www.goodreads.com/book/show/93389.Something_Like_an_Autobiography">
            Something Like an Autobiography
          </A>{" "}
          by Akira Kurosawa
        </li>
        <li>
          <A href="https://www.goodreads.com/series/191900-the-murderbot-diaries">
            Murderbot
          </A>{" "}
          by Martha Wells
        </li>
        <li>
          <A href="https://www.goodreads.com/book/show/222376640-enshittification">
            Enshittification
          </A>{" "}
          by Cory Doctorow
        </li>
      </ul>

      <h2>Highlights</h2>

      <ul>
        <li>
          <strong>Spamalot</strong> - went in not knowing it was literally The
          Holy Grail. luckily I had watched that movie with Owen within the last
          year. One of my favorites, hilarious play!
        </li>
        <li>
          <strong>House renovations</strong> - hired a carpenter to convert the
          office into a studio and the spare bedroom into an office with
          floor-to-ceiling shelves.
        </li>
        <li>
          <strong>Marathon training</strong> - My sister signed me up for a
          marathon in June, so I started training. Ran through the winter. If
          you&apos;ve seen my recent posts, you&apos;ll know the result - more
          details in the next year in review update.
        </li>
        <li>
          <strong>Kendrick Super Bowl, on artistry</strong> - I&apos;m obsessed
          with Kendrick&apos;s music, a true lyricist and artist. The Super Bowl
          was a real culminating moment. Not just a show, but a capstone to a
          year of incredible work.
        </li>
        <li>
          <strong>Biking</strong> - Had not owned bikes in ohio, bought a pair
          for me and my son. He learned fast.
        </li>
        <li>
          <strong>Walkabout</strong> - mini golf. new levels. great fun.
        </li>
      </ul>

      <div className={styles.imagePair}>
        <Image
          alt="New floor-to-ceiling library shelves in the renovated office"
          className="corner-radius-8"
          height={1000}
          src="/assets/2025-renovation-shelves-a.jpg"
          style={{ width: "100%", height: "auto" }}
          width={750}
        />
        <Image
          alt="Renovated office with built-in shelving"
          className="corner-radius-8"
          height={1000}
          src="/assets/2025-renovation-shelves-b.jpg"
          style={{ width: "100%", height: "auto" }}
          width={750}
        />
      </div>

      <Image
        alt="Taekwondo belt promotion"
        className="corner-radius-8"
        height={1200}
        src="/assets/2025-taekwondo.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1600}
      />

      <h2>Until Next Time</h2>

      <p>
        All of the technology cultivated by my heroes curdling into dystopian
        surveillance tools used for rampant rent-seeking, the mass roundup and
        black bag capture of the most needy among us, and the mistreatment and
        even murder of those who so much as make a wrong step.
      </p>

      <p>
        Social media is not a neutral mediator and removing that will only be
        positive, more direct interactions, hence more hanging out with my
        family, friends, neighbors.
      </p>

      <p>This is an invitation to reach out.</p>

      <Image
        alt="Christmas tree and decorations"
        className="corner-radius-8"
        height={1200}
        src="/assets/2025-winter-christmas.jpg"
        style={{ width: "100%", height: "auto" }}
        width={1600}
      />
    </BlogPage>
  );
}
