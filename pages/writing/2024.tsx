import A from "@core/a";
import BlogPage from "@core/blog-page";
import Card from "@core/card";
import { FilmPost } from "@core/post";
import Image from "next/legacy/image";
import Link from "next/link";

import styles from "./2024.module.css";

export const meta: Meta = {
  image: "/assets/2024-in-review-6.jpg",
  published: true,
  publishedAt: "2025-01-12",
  summary: "A look at my accomplishments during the past year.",
  title: "2024 in Review",
};

export default function ReviewOf2024(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-6.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>Happy New Year, folks!</p>

      <p>
        Even though I’m a couple weeks late, I’m taking this opportunity to
        fully convert this status report into a Christmas letter. My earlier
        annual updates were fun, I hope, but also very analytical. I’m not about
        that anymore. As “AI” takes a more integral role in all of our lives,
        it’s time to embrace being human. Here’s how my 2024 went:
      </p>

      <h2>Family Moments</h2>

      <ul>
        <li>
          My wife finished her first year as a surgery resident and is halfway
          through her second year. So proud of her!
        </li>
        <li>
          My son started Taekwondo and earned a yellow belt. He also got big
          into Pokémon cards and won 1st place in a local Pokémon League
          tournament.
        </li>
        <li>I ran a 5K in September and placed 75th out of 186 runners.</li>
        <li>
          Cleveland was in the path of totality in April 2024. My son and I took
          a tram to a park where a crowd had gathered to experience the eclipse
          together.
        </li>
        <li>
          My son spent weeks staying after school with his whole class to
          prepare for a production of <em>Beauty and the Beast Jr.</em> We went
          to every show!
        </li>
        <li>
          I saw <em>My Brother, My Brother and Me</em> live during their Twenty
          Fungalore tour. 🍄
        </li>
      </ul>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-13.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <ul>
        <li>
          My wife and I went to The Cleveland Museum of Natural History’s grand
          opening after it had been under renovation for years.
        </li>
        <li>
          I took my son to the Greater Cleveland Aquarium and saw sharks!!!
        </li>
        <li>
          We got into LEGO and worked together to build the Super Mario 64
          Question Mark Block, the Sanderson Sisters’ Cottage, the Medieval Town
          Square, and more.
        </li>
      </ul>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-8.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>Beyond these, 2024 was primarily a year of travel and film.</p>

      <h2>Travel</h2>

      <p>
        Early in the year, I bought a Fujifilm X-E4, my first camera beyond a
        phone. I packed it for all our trips, capturing moments from Michigan to
        Hawaii.
      </p>

      <h3>March: Hawaii</h3>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-2.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        This was our second trip to Hawaii, my son’s first, and he adored it.
        While we went whale-watching and horseback riding, his favorite part was
        just hanging out on the beach.
      </p>

      <h3>June: Disney World</h3>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-5.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        I’m the only one in my family who had been to Disney World, so we took
        the rare Cleveland direct flight down and spent five days exploring each
        of the parks. Highlights were Rise of the Resistance, Remi’s Ratatouille
        Adventure, and Flight of Passage.
      </p>

      <h3>June: Michigan</h3>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-7.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        We drove up to Michigan to visit my family and enjoyed some great
        weather and fun outdoor activities. In the evening, we played the board
        game Splendor.
      </p>

      <h3>August: New Mexico</h3>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-10.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        Finally, we flew down to Albuquerque to visit my grandmother. We went to
        the zoo and took a tram up to the top of the Sandia Mountains.
      </p>

      <h2>Film Highlights</h2>

      <h3>CIFF48</h3>

      <p>
        In 2023, I discovered the Cleveland International Film Festival (CIFF)
        after wandering past its headquarters. This quickly escalated to me
        becoming a member and attending the festival in April. I saw a ton of
        great movies, including the French film Infested, Ghostlight, Humanist
        Vampire Seeking Consenting Suicidal Person, and my favorite of the
        festival, Secret Mall Apartment. This last one is a documentary about a
        group of artists who find an open but difficult-to-access space within
        the negative space of a mall structure and decide to move in. Equal
        parts protest cinema and performance art, I had a lot of fun watching it
        and even had the good fortune of chatting with the primary subject and
        star of the film, Michael Townsend. My review:
      </p>

      <FilmPost
        url="https://letterboxd.com/mknepprath/film/secret-mall-apartment/"
        title="Secret Mall Apartment"
        summary="A little bit Nathan Fielder, without any of the cynicism. I expected a
        good time, but I was surprised by how much it turned into a personal
        nostalgia trip. It brought back memories of me and my art friends
        sneaking around the tunnels beneath our college campus.."
        date="2024-04-12"
        id="secret-mall-apartment"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/film-poster/1/1/2/1/2/4/6/1121246-secret-mall-apartment-2024-0-230-0-345-crop.jpg"
      />

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-3.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <p>
        My journey with CIFF did not end there. Later in the year, I had the
        honor of joining CIFF as a screening judge, helping to select films for
        CIFF49. It’s been a rewarding experience.
      </p>

      <h3>The ‘Hundreds of Beavers’ Great Lakes Roadshow</h3>

      <p>
        Yes, this deserves its own dedicated section in my 2024 review. I’d been
        anticipating this film for months, maybe even years, obsessively
        rewatching the trailer when I discovered it would be playing at our
        local cinematheque as a part of a tour they deemed the Great Lakes
        Roadshow. I immediately bought a poster and tickets and dragged my
        family out to see it. The director and star were there for a Q&A
        alongside a collection of costumed animals running around, causing a
        ruckus. We had so much fun, and I have the signed poster hanging next to
        me on the wall as I type this right now.
      </p>

      <FilmPost
        url="https://letterboxd.com/mknepprath/film/hundreds-of-beavers/"
        title="Hundreds of Beavers (2022)"
        summary="Watched at the Cleveland Cinematheque. Congratulations to all involved
        for saving silent cinema! Delivers on every level, and the tour
        experience with the cast and characters present rocked. You haven’t
        lived until you’ve had Cheslik scream at you about stop-motion.
        My 10-year-old’s review: I loved it, five stars. It’s just so epic, so
        many laughs. Many, many laughs. I think it was really good because it
        wasn’t made by a giant company. It shows some inspiration that people
        can do a lot with what they have."
        date="2024-02-04"
        id="hundreds-of-beavers"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/film-poster/9/1/9/0/6/8/919068-hundreds-of-beavers-0-230-0-345-crop.jpg"
      />

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-14.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h3>Buster Keaton</h3>

      <p>
        After years of watching Buster Keaton’s films on repeat, I finally saw
        Sherlock Jr. on the big screen—exactly 100 years after its release. My
        son was the youngest attendee by far, but he loved it. Seeing it in a
        theater was magical, especially since the film itself takes place in a
        movie theater.
      </p>

      <FilmPost
        url="https://letterboxd.com/mknepprath/film/sherlock-jr/"
        title="Sherlock Jr. (1924)"
        summary="Watched at the Cleveland Cinematheque. Enjoyed hearing someone behind me
        go, “…what,” when Buster jumped through a man’s chest."
        date="2024-02-17"
        id="sherlock-jr"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/alternative-poster/5/1/1/7/7/p/yXYkE9m8R42i6H1YVVKLJoYTM6X-0-230-0-345-crop.jpg"
      />

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-9.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h3>Miyazaki and Studio Ghibli</h3>

      <p>
        Our family loves everything Miyazaki and made it out to see a couple of
        his films in theaters this year thanks to Ghibli Fest 2024. We saw
        Princess Mononoke in July and Ponyo in August. I snuck in a viewing of
        The Kingdom of Dreams and Madness before rewatching The Boy and the
        Heron with my son. Ponyo, in particular, really popped for me on the big
        screen.
      </p>

      <FilmPost
        url="https://letterboxd.com/mknepprath/film/ponyo/"
        title="Ponyo (2008)"
        summary="In theaters, subtitled. Felt like I was watching a completely new, much
        better film. Couldn’t stop staring at those backgrounds. Is this the
        best movie ever made?"
        date="2024-08-03"
        id="ponyo"
        action="Reviewed"
        image="https://a.ltrbxd.com/resized/alternative-poster/4/4/5/9/4/ptt/22444/ponyo-on-the-cliff-by-the-sea-md-web-0-230-0-345-crop.jpg"
      />

      <div className={styles.cardContainer}>
        <Card
          description="1997"
          href="https://letterboxd.com/mknepprath/film/princess-mononoke/"
          imgSrc="https://a.ltrbxd.com/resized/sm/upload/fu/5h/fp/mj/mNqZOtJIQfFQPjo3hmYLIn8Qqhf-0-230-0-345-crop.jpg"
          title="Princess Mononoke"
        />
        <Card
          description="2008"
          href="https://letterboxd.com/mknepprath/film/ponyo/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/4/5/9/4/44594-ponyo-0-230-0-345-crop.jpg"
          title="Ponyo"
        />
        <Card
          description="2023"
          href="https://letterboxd.com/mknepprath/film/the-boy-and-the-heron/"
          imgSrc="https://a.ltrbxd.com/resized/film-poster/4/3/8/6/9/2/438692-the-boy-and-the-heron-0-230-0-345-crop.jpg"
          title="The Boy and the Heron"
        />
        <Card
          description="2013"
          href="https://letterboxd.com/mknepprath/film/the-kingdom-of-dreams-and-madness/"
          imgSrc="https://a.ltrbxd.com/resized/sm/upload/i4/0m/gt/op/ajLRoEJ4TiNWMVWxVOSbGrPTv44-0-230-0-345-crop.jpg"
          title="The Kingdom of Dreams and Madness"
        />
      </div>

      <h3>Letterboxd Lists</h3>

      <p>
        I created several Letterboxd lists that detail out the rest of my film
        activities for the year.
      </p>

      <ul>
        <li>
          <strong>
            <A href="https://letterboxd.com/mknepprath/list/bonghive-2024/">
              #BongHive – 2024
            </A>
          </strong>
          : My film group picked out a diverse list of films, a few I hadn’t
          heard of before. I enjoyed them all! We’re kicking off 2025 with{" "}
          <em>The Worst Person in the World</em> (2021).
        </li>
        <li>
          <strong>
            <A href="https://letterboxd.com/mknepprath/list/o-kneppraths-favorites-star-wars/">
              O. Knepprath’s Favorites – Star Wars
            </A>
          </strong>
          : We watched all nine episodic Star Wars films plus <em>Rogue One</em>{" "}
          as a family in 2024. Our son also played through{" "}
          <em>LEGO Star Wars: The Skywalker Saga</em> as we watched them and
          loved it.
        </li>
        <li>
          <strong>
            <A href="https://letterboxd.com/mknepprath/list/films-in-sherlock-jr/">
              Films in Sherlock Jr.
            </A>
          </strong>
          : As mentioned earlier, 2024 marked one hundred years since the
          initial release of <em>Sherlock Jr.</em>, and it ended up being my
          most-watched film of the year. During one of these viewings, I noticed
          all the movie posters on the theater wall that opened the film and
          decided to track down as many as I could.
        </li>
        <li>
          <strong>
            <A href="https://letterboxd.com/mknepprath/list/the-knepprath-collection/">
              The Knepprath Collection
            </A>
          </strong>
          : This list has grown quite a bit this year as I’ve been building out
          my physical collection. I most recently added the new{" "}
          <em>Godzilla</em> (1954) Criterion 4K.
        </li>
        <li>
          <strong>
            <A href="https://letterboxd.com/mknepprath/list/m-kneppraths-100-favorite-films/">
              M. Knepprath’s 100 Favorite Films
            </A>
          </strong>
          : I filled out my top favorites list to be a nice, clean one hundred
          films. Miyazaki is the most represented director with five films.
        </li>
        <li>
          <strong>
            <A href="https://letterboxd.com/mknepprath/list/ciff48/">CIFF48</A>
          </strong>
          : Everything I watched at the 2024 Cleveland International Film
          Festival.
        </li>
        <li>
          <strong>
            <A href="https://letterboxd.com/thirstycat/films/diary/">
              Thirsty Cat
            </A>
          </strong>
          : I’m slowly moving Dane’s movie reviews from his blog to Letterboxd.
        </li>
      </ul>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-15.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h2>Stats</h2>

      <p>
        Okay, I can’t help myself. Here’s an abbreviated version of my annual
        progress report.
      </p>

      <ol>
        <li>
          <Link href="/writing/the-grand-budapest-hotel">
            My Review of The Grand Budapest Hotel (2014)
          </Link>
        </li>
        <li>
          <Link href="/writing/sunsquints">Sunsquints</Link>
        </li>
        <li>
          <Link href="/writing/vanilla-layer">The Vanilla Layer</Link>
        </li>
        <li>
          <Link href="/writing/load-creep">Load Creep</Link>
        </li>
        <li>
          <Link href="/writing/sometown-usa">“Life in Sometown, U.S.A.”</Link>
        </li>
      </ol>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-11.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h2>Books</h2>

      <ul>
        <li>
          <A href="https://www.goodreads.com/book/show/60784562-antimatter-blues">
            Antimatter Blues
          </A>{" "}
          by Edward Ashton
        </li>
        <li>
          <A href="https://www.goodreads.com/book/show/27415869-moon-girl-and-devil-dinosaur-vol-1">
            Moon Girl and Devil Dinosaur Vol. 1-8
          </A>
        </li>
        <li>
          Bram Stoker’s{" "}
          <A href="https://www.goodreads.com/book/show/17245.Dracula">
            Dracula
          </A>
        </li>
        <li>
          <A href="https://www.goodreads.com/book/show/20518872-the-three-body-problem">
            The Three-Body Problem
          </A>{" "}
          by Cixin Liu
        </li>
        <li>
          <A href="https://www.goodreads.com/book/show/198678736-co-intelligence">
            Co-intelligence
          </A>{" "}
          by Ethan Mollick
        </li>
        <li>
          <A href="https://www.goodreads.com/book/show/111537.Making_Movies">
            Making Movies
          </A>{" "}
          by Sidney Lumet
        </li>
      </ul>

      <blockquote>
        “Lumet is a candid and entertaining writer and this book is dense with
        raw insights from his career as a filmmaker. Absolutely worth diving
        into his head for a few days.”
      </blockquote>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-1.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h2>Games</h2>

      <p>
        I put 20+ hours into Star Wars Outlaws at this point and am about
        two-thirds of the way through. Having a great time with it. I also
        picked up a PlayStation VR2 and have been working through Horizon Call
        of the Mountain.
      </p>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-4.jpg"
        layout="responsive"
        priority
        width={1170}
      />

      <h2>Onward!</h2>

      <p>
        We have some big family plans for 2025, so I’m excited for that! I fell
        off of social media a bit over the past year or two, and I’m happier for
        it. Quite the change after starting out my career as a social media
        manager. If you can get away with it, I highly recommend it. More
        in-person connections, less doomscrolling. How’s that for a New Year’s
        resolution?
      </p>

      <Image
        alt="Three photos from 2024."
        className="corner-radius-8"
        height={384}
        src="/assets/2024-in-review-12.jpg"
        layout="responsive"
        priority
        width={1170}
      />
    </BlogPage>
  );
}
