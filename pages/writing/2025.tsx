import A from "@core/a";
import BlogPage from "@core/blog-page";

export const meta: Meta = {
  image: "/assets/2025-in-review-1.jpg",
  published: false,
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
      {/* TODO: add hero photo */}

      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        Oof. I know nearly halfway through the year is an odd time to drop a
        year-in-review for the previous year, but, I&apos;ll be honest, writing
        a review of all the fun things I did in 2025 felt borderline
        irresponsible in early 2026. Each time I sat down to write, another
        American citizen would be shot or killed by ICE, the goon squad sent to
        my home state under false pretenses — that it was full of undocumented
        immigrants, which itself is national policy backed by false pretenses —
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

      <p>
        All that said, it was a remarkable year for travel, and I&apos;d be
        doing myself a disservice not to document it.
      </p>

      {/* TODO: add travel photo */}

      <h3>February: Minnesota</h3>

      <h3>March: Houston</h3>

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

      {/* TODO: add New Mexico photo */}

      <h3>June: Michigan</h3>

      <p>My parents retired!</p>

      {/* TODO: add Michigan photo */}

      <h3>August: Japan</h3>

      <p>
        A joint trip with my cousin and his family took us from Osaka to Kyoto
        to Tokyo, ending in Tokyo Disneyland.
      </p>

      {/* TODO: add Japan photo */}

      <h3>October: Michigan</h3>

      <h3>October/November: Disney World</h3>

      <p>
        We went back to Disney and took full advantage of our park hopper
        tickets. We also saw Cirque du Soleil.
      </p>

      {/* TODO: add Disney photo */}

      <h3>December: El Paso &amp; Cancún</h3>

      <p>
        Visited family in El Paso and then our family split off to relax on the
        beaches of Cancún.
      </p>

      {/* TODO: add El Paso/Cancún photo */}

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

      {/* TODO: add Superman photo */}

      <h3>CIFF49</h3>

      <p>
        2024 was the first CIFF I attended; 2025 was my first CIFF on the
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

      {/* TODO: add Ghibli Park photo */}

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
          spark within each of us — a universal yearning to be, simply,
          perceived.
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

      {/* TODO: add film photo */}

      <h2>Books</h2>

      <ul>
        <li>
          <A href="https://www.goodreads.com/book/show/4153.Reconstruction_America_s_Unfinished_Revolution_1863_1877">
            Reconstruction
          </A>{" "}
          — a long-running battle to get through
        </li>
        <li>
          <A href="https://www.goodreads.com/book/show/33917107-on-tyranny">
            On Tyranny
          </A>
        </li>
        <li>Astro Boy</li>
        <li>The Metamorphosis by Kafka — listened while running</li>
        <li>Something Like an Autobiography</li>
        <li>Murderbot</li>
        <li>Enshittification</li>
      </ul>

      <h2>Highlights</h2>

      <ul>
        <li>
          <strong>Spamalot</strong> — went in not knowing it was literally The
          Holy Grail. Luckily I had watched that movie with Owen within the last
          year. One of my favorites; hilarious play!
        </li>
        <li>
          <strong>House renovations</strong> — hired a carpenter to convert the
          office into a studio and the spare bedroom into an office with
          floor-to-ceiling shelves.
        </li>
        <li>
          <strong>Marathon training</strong> — my sister signed me up for a
          marathon in June, so I started training. Ran through the winter. More
          details in the next year-in-review update.
        </li>
        <li>
          <strong>Kendrick&apos;s Super Bowl halftime show</strong> — I&apos;m
          obsessed with Kendrick&apos;s music; a true lyricist and artist. The
          Super Bowl was a real culminating moment. Not just a show, but a
          capstone to a year of incredible work.
        </li>
        <li>
          <strong>Biking</strong> — hadn&apos;t owned bikes in Ohio, bought a
          pair for me and my son. He learned fast.
        </li>
        <li>
          <strong>Walkabout</strong> — mini golf, new levels, great fun.
        </li>
      </ul>

      {/* TODO: add highlights photo */}

      <h2>The Neutral Mediator</h2>

      <p>
        All of the technology cultivated by my heroes curdling into dystopian
        surveillance tools used for rampant rent-seeking, the mass roundup and
        black bag capture of the most needy among us, and the mistreatment and
        even murder of those who so much as make a wrong step.
      </p>

      <p>
        Social media is not a neutral mediator, and removing that from my life
        will only be positive — more direct interactions, hence more hanging out
        with my family, friends, and neighbors.
      </p>

      <p>This is an invitation to reach out.</p>

      {/* TODO: add closing photo */}
    </BlogPage>
  );
}
