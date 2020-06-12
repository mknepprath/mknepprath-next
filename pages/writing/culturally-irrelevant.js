import Prism from "prismjs";

import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/culturally-irrelevant-11.jpg",
  published: true,
  publishedAt: "2020-06-10",
  summary: "The podcast is over, but the legacy continues.",
  title: "Building a Culturally Irrelevant Recommendation Board",
  url: "/writing/culturally-irrelevant",
};

export default function CulturallyIrrelevant() {
  React.useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
    >
      <img
        alt="The hosts of Culturally Irrelevant."
        className="blog-image"
        src="/assets/culturally-irrelevant-1.jpg"
      />

      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        For a few years, I was the honorary producer and infrequent guest of a
        podcast called Culturally Irrelevant. In it, four friends each picked a
        movie, video game, book... anything overlooked by pop culture at large
        to share and discuss.
      </p>
      <blockquote>
        <p>
          <b>
            <a
              href="https://twitter.com/NerdAtWar"
              rel="noopener noreferrer"
              target="_blank"
            >
              Tyler Driscoll
            </a>
          </b>
          <br />
          Born in the cold of Michigan and shown Star Wars by his father; Tyler
          developed into a full-blown nerd. Star Wars, Marvel, and cinema
          galore. I'm Tyler.
        </p>
        <p>
          <b>
            <a
              href="https://twitter.com/benlundsten"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ben Lundsten
            </a>
          </b>
          <br />A father of two future superheroes and a victim of male pattern
          baldness. His specialties are Halo 1 and films you've never heard of.
        </p>
        <p>
          <b>
            <a
              href="https://twitter.com/JoshWWhat"
              rel="noopener noreferrer"
              target="_blank"
            >
              Josh Wierschke
            </a>
          </b>
          <br />
          Your friendly neighborhood Josh has been reading comics since before
          he could… well, read. But this nerd won't be put in a box.
        </p>
        <p>
          <b>
            <a
              href="http://thirstycatcollection.blogspot.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Dane Christenson
            </a>
          </b>
          <br />
          An unapologetic Sega fanboy from WI who always roots for the underdog,
          making him the most irrelevant of the bunch. P.S. Stanley Kubrick.
        </p>
        <p>— Excerpts taken from the old Culturally Irrelevant website.</p>
      </blockquote>
      <p>
        Tyler, Ben, Josh, Dane and myself were friends since college and bonded
        over our love for film, theater, and media in general. The podcast was a
        way for us to continue those conversations that were harder to come by
        now that we were out of school.
      </p>
      <blockquote>
        <p>
          <b>Ben:</b> "This is the point of the whole show. We're trying to draw
          things out of ambiguity. And it's going to be anything, it might be
          video games. Hey, we're going to bring a video game to the table!
          Tyler's got one and on the level of ambiguity, it's, you know, you've
          heard of it. But you might not have played it. And there's some that
          Dane will bring and it's going to be from the depths of like..."
        </p>
        <p>
          <b>Dane:</b> "Oh, you have no idea. You have no idea what I've got to
          bring."
        </p>
        <p>
          <em>— Episode #1 - I Gotta Go Back To Wisconsin (March 6, 2015)</em>
        </p>
      </blockquote>
      <p>
        The podcast ended its run after 42 episodes and 166+ recommendations on
        December 6, 2018. Not long after, the domain expired, and the podcast
        was lost to the internet.
      </p>
      <p>
        On a personal note, I will be revisiting Culturally Irrelevant for the
        rest of my life. It was a joy to listen to and there are dozens of
        recommendations that I still plan on checking out. Last week, I put on{" "}
        <a
          href="https://www.imdb.com/title/tt8006786/?ref_=nv_sr_srsg_0"
          rel="noopener noreferrer"
          target="_blank"
        >
          Big Dreams, Small Spaces
        </a>
        , a British gardening show recommended by Ben in episode 41. I'd never
        watched it before, but I found it fun and relaxing. If not for the
        podcast, I never would have heard of it, let alone watched it.
      </p>
      <p>
        Beyond the recommendations, it was a thrill to listen to the hosts cheer
        each other on when they brought interesting and exciting topics or rib
        each other about which of their topics was the most relevant.
      </p>
      <p>
        The hosts poured their hearts and souls into this show, even going so
        far as to chat the creators of some of the things they brought including
        an hour-long interview with the{" "}
        <a
          href="http://www.georgiaraefamilyband.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Georgia Rae Family Band
        </a>
        . This podcast was special.
      </p>
      <p>In April of 2020, Dane died in a car accident.</p>
      <p>
        While the podcast was a relatively minor achievement in his life, it was
        one of my favorite projects of his. It showcased many of his favorite
        things. He talked about film, books and video games. He talked about
        family and faith.
      </p>
      <p>I decided that, at least for myself, I had to preserve the podcast.</p>

      <h2 id="preserving-the-podcast">Preserving the Podcast</h2>
      <p>
        After discussing it with the hosts, it became clear to me that I could
        do more than republish the episodes. The goal of the podcast was to
        shine a light on media most had missed. Instead of having that end with
        the podcast, I thought it'd be cool to expand its scope by creating a
        website where anyone can submit their own overlooked recommendations.
      </p>
      <p>
        I simultaneously relistened to the entire podcast, collected audio clips
        (one for each recommendation, plus more), and built the website.
      </p>
      <img
        alt="Podcast recommendations in Airtable."
        className="blog-image"
        src="/assets/culturally-irrelevant-2.png"
      />
      <p>
        I used{" "}
        <a
          href="https://marco.org/2019/04/27/overcast-clip-sharing"
          rel="noopener noreferrer"
          target="_blank"
        >
          Overcast's clip sharing feature
        </a>{" "}
        to collect over 400 clips and uploaded them all to{" "}
        <a
          href="https://airtable.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Airtable
        </a>
        . I was then able to use{" "}
        <a href="https://swr.now.sh/" rel="noopener noreferrer" target="_blank">
          Vercel's SWR data fetching library
        </a>{" "}
        to pull all of that data into the website.
      </p>
      <pre className="language-js">
        <code>
          {`
import useSWR from "swr";
import fetch from "isomorphic-unfetch";

function fetcher(...args) {
  return fetch(...args).then((response) => response.json());
}

export default function Home() {
  const { data: recommendations, error } = useSWR(
    "/api/recommendations",
    fetcher
  );
  ...
          `}
        </code>
      </pre>

      <h2 id="the-recommendation-board">The Recommendation Board</h2>
      <p>
        Big things have small beginnings. The website started as a simple list
        of recommendations laid out with{" "}
        <a
          href="https://css-tricks.com/snippets/css/complete-guide-grid/"
          rel="noopener noreferrer"
          target="_blank"
        >
          CSS grid
        </a>
        .
      </p>
      <img
        alt="The first iteration of the Culturally Irrelevant website that includes the tagline: For learning, teaching, sharing and remembering."
        className="blog-image bordered-image"
        src="/assets/culturally-irrelevant-3.png"
      />
      <p>
        While the tagline above is not in the current iteration of the website,
        I still appreciate the idea behind it. My thinking was that each word
        would represent each host of the show.
      </p>
      <blockquote>
        <p>
          <em>
            <b>Tyler:</b> "What do you want from this podcast, and what are you
            putting into it, and what are you expecting from it?"
          </em>
        </p>
        <p>
          <b>Josh:</b> "It's less of me trying to bestow knowledge upon the
          masses. I want this to be a learning experience for me, too. I want to
          hear about stuff I've never heard of from you guys, and I hope that
          our 3+ listeners feel the same way. That's it for me. I want to
          broaden my horizons more than I've done already."
        </p>
        <p>
          <b>Dane:</b> "Well, I guess for me, I've always been someone to root
          for the underdog. Perfect example, I grew up a Sega fanboy. I've
          always naturally been drawn to the lesser-known things that aren't
          quite as popular. I feel that, yes, this is me bestowing my
          intelligence that I've gained of these different things. To me, it's
          about spreading that, because I feel that these things deserve
          attention."
        </p>
        <p>
          <b>Ben:</b> "For me, the real catalyst moments are when I find a film
          I would've never heard of, when someone in passing who has weird taste
          is like 'dude, watch this.' Hopefully, I can turn one person on to
          something that they've never heard of. It just opens a portal for
          people, and that's what I want this to be. I want it to be a portal
          that you can take down to a whole new world of holy-crap-awesomeness."
        </p>
        <p>
          <b>Tyler:</b> "I mean, this is an idea I've had for many different
          things, like a podcast with Dane before, or doing a blog. What pushed
          me into being nerdy about stuff was, really, my dad sitting me down
          with these movies that he loved. To me, this has been a lifelong
          experience. This has been something that's been building since I was a
          little kid. For me, this is an expression of who I am as a human
          being. I'm excited."
        </p>
        <p>
          <em>— Episode #1 - I Gotta Go Back To Wisconsin (March 6, 2015)</em>
        </p>
      </blockquote>

      <h3 id="styling-the-board">Styling the Board</h3>
      <p>
        One issue became immediately obvious, that being the inability to tell
        the difference between recommendations made on the podcast and
        visitor-submitted ones. I quickly iterated on the styles, adding color
        to try to distinguish between them. I wanted to make it bold and fun,
        true to the podcast.
      </p>
      <img
        alt="The first iteration of the Culturally Irrelevant website that includes the tagline: For learning, teaching, sharing and remembering."
        className="blog-image bordered-image"
        src="/assets/culturally-irrelevant-4.png"
      />
      <p>
        I used transforms and shadows to replicate the podcast logo on hover.
      </p>
      <img
        alt="The first iteration of the Culturally Irrelevant website that includes the tagline: For learning, teaching, sharing and remembering."
        className="blog-image bordered-image"
        src="/assets/culturally-irrelevant-5.png"
      />

      <h3 id="audio-clips">Audio Clips</h3>
      <p>
        I was excited to discover that embedding the Overcast audio clips I'd
        created would be fairly simple. Airtable returns a bunch of useful data
        for each uploaded file:
      </p>
      <pre className="language-js">
        <code>
          {`
{
  "id": "att1j2FFkw015fbJU",
  "url": "https://dl.airtable.com/.attachments/c53490a528e644d4ff56962415a3ecc6/7d856aca/tyler-driscoll-grim-fandango.mp3",
  "filename": "tyler-driscoll-grim-fandango.mp3",
  "size": 455726,
  "type": "audio/mpeg"
}
          `}
        </code>
      </pre>
      <p>
        I placed that URL in an <code className="language-html">audio</code>{" "}
        element, and that was that.
      </p>

      <h3 id="submitting-recommendations">Submitting Recommendations</h3>
      <p>
        Next up, I needed to set up a way for visitors to submit their
        recommendations. I created an{" "}
        <a
          href="https://github.com/mknepprath/culturally-irrelevant/blob/master/pages/api/recommendation.js"
          rel="noopener noreferrer"
          target="_blank"
        >
          API route for posting to Airtable
        </a>{" "}
        and hooked it up to a{" "}
        <a
          href="https://jaredpalmer.com/formik/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Formik
        </a>{" "}
        form that I placed in a{" "}
        <a
          href="https://reacttraining.com/reach-ui/dialog/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Reach UI dialog
        </a>
        . I don't typically lean so heavily on libraries, but I was moving fast
        and these got the job done.
      </p>
      <video className="blog-image" controls>
        <source src="/assets/culturally-irrelevant-6.mp4" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>

      <h3 id="dark-mode">Dark Mode</h3>
      <p>
        I felt obligated to add dark mode to this site, and I didn't want it to
        be an afterthought. Suffice it to say, I didn't simply invert some
        colors.
      </p>
      <p>
        I also made sure to respect visitors' system-level settings. If your
        phone or computer is set to dark mode, the website will follow suit.
      </p>
      <video className="blog-image" controls>
        <source src="/assets/culturally-irrelevant-7.mp4" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>

      <h3 id="lazy-loading">Lazy Loading</h3>
      <p>
        Initially, I was displaying all of the recommendations on page load. It
        wasn't <em>that</em> bad until I had all of the audio clips uploaded, at
        which point I was making visitors immediately download over a hundred
        audio clips.
      </p>
      <p>
        My first thought was that I should paginate Airtable's response - that
        is, fetch a limited amount until explicitly asked to fetch more. It took
        me a while to realize that this solution was unnecessarily complicated.
        Airtable's response wasn't that large - the issue occurred when the
        website would read the audio URLs and load them all in at once. Instead
        of limited the data I was getting, I could instead limit how much of
        that data I was displaying on the page.
      </p>
      <p>
        I now display 16 recommendations on page load, then add 32 more each
        time a visitor clicks the new Load More button.
      </p>
      <img
        alt="The Load More button."
        className="blog-image"
        src="/assets/culturally-irrelevant-8.png"
      />

      <h3 id="loading-indicators">Loading Indicators</h3>
      <p>
        The podcast had a lot of fun tangents and in-jokes, including a
        long-running thread about carrier pigeons and another about Dane's love
        for LaserDisc. I added loading indicators that referenced these - a
        random one is displayed each time.
      </p>
      <video className="blog-image bordered-image" controls>
        <source src="/assets/culturally-irrelevant-9.mp4" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>

      <h3 id="search">Search</h3>
      <p>
        The last major feature I added was a search bar. This felt magical, as
        it had never been this easy to see all of the podcast recommendations
        from a specific year or medium.
      </p>
      <p>
        The{" "}
        <a
          href="https://github.com/mknepprath/culturally-irrelevant/blob/master/libs/filter.js"
          rel="noopener noreferrer"
          target="_blank"
        >
          filter function
        </a>{" "}
        I wrote to do this is not magic - but I had a lot of fun writing it.
      </p>
      <img
        alt="The search bar."
        className="blog-image bordered-image"
        src="/assets/culturally-irrelevant-10.png"
      />

      <h2 id="thats-not-all">And That's Not All</h2>
      <p>
        Please visit the website for the full experience, including features
        like{" "}
        <a
          href="https://culturallyirrelevant.net/mixtape"
          rel="noopener noreferrer"
          target="_blank"
        >
          The Irrelevant Mixtape
        </a>{" "}
        - a randomized "Best Of" playlist that includes recommendations and
        other fun bits. If you have a lesser-known movie, video game, comic
        book, television show, book, board game, artist, podcast, miniseries,
        band, etc, that you'd like to share, visit{" "}
        <a
          href="https://culturallyirrelevant.net"
          rel="noopener noreferrer"
          target="_blank"
        >
          Culturally Irrelevant
        </a>{" "}
        and do so!
      </p>
      <blockquote>
        <p>
          <b>Dane:</b> "It seems like some things you either fall into, you just
          slowly realize you love it the more and more you get into it, whereas
          in other things there's one key thing where it's like 'I saw this
          movie' or 'I listened to this record' or whatever it be 'and from that
          point on my life was changed.' I also had one of those moments and it
          was actually around the time I was in high school. For me, it was
          2001: A Space Odyssey that completely switched me over."
        </p>
        <p>
          <em>— Episode #5 - Musical Interludes (June 5, 2015)</em>
        </p>
      </blockquote>
      <img
        alt="A Culturally Irrelevant mug."
        className="blog-image"
        src="/assets/culturally-irrelevant-11.jpg"
      />
    </BlogPage>
  );
}
