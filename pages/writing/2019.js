import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/2019-in-review-1.png",
  published: true,
  publishedAt: "2019-12-29",
  summary: "A look at my accomplishments during the past year.",
  title: "2019 in Review"
};

export default () => (
  <BlogPage
    dateTime={meta.publishedAt}
    description={meta.summary}
    ogImage={meta.image}
    title={meta.title}
  >
    <header>
      <h1>{meta.title}</h1>
    </header>
    <p>
      I didn't officially record or publish any goals for 2019, so these are
      based on memory and hindsight - which means I accomplished most of them.
      Yay!
    </p>
    <img
      alt="Top 9 Instagram photos from 2019 (1-3)."
      className="blog-image"
      src="/assets/2019-in-review-1.png"
    />
    <h2>2019 Goals</h2>
    <h3>Get a new job ✅</h3>
    <p>
      This was a goal that had rolled over from 2018. With my wife starting
      medical school soon (a.k.a. this year), I was hoping to find a more
      remote-friendly company. I wanted to be free to easily move to wherever
      her school of choice would be. In February, I landed an interview at
      Walmart Labs and got a position on my first fully-remote team. I'm less
      than a year in, but enjoying it!
    </p>
    <h3>Read books ✅</h3>
    <p>
      I've been having a hard time reading books since college despite being an
      avid reader growing up. Notable books I read this year:
    </p>
    <ul>
      <li>
        <a href="https://www.goodreads.com/book/show/37976541-bad-blood">
          Bad Blood
        </a>{" "}
        by John Carreyrou
      </li>
      <li>
        <a href="https://www.goodreads.com/book/show/44573628-super-pumped">
          Super Pumped
        </a>{" "}
        by Mike Isaac
      </li>
      <li>
        <a href="https://www.goodreads.com/book/show/840.The_Design_of_Everyday_Things">
          The Design of Everyday Things
        </a>{" "}
        by Don Norman
      </li>
      <li>
        <a href="https://www.goodreads.com/book/show/6095883-design-as-art">
          Design as Art
        </a>{" "}
        by Bruno Munari
      </li>{" "}
    </ul>
    <p>
      I've been averaging less than 10 books a year, which is... not great. But
      I'm glad it's not nothing.
    </p>
    <h3>Blog ✅</h3>
    <p>
      My website included a link to Medium in lieu of a blog from ~2015 until
      recently.{" "}
      <a href="https://github.com/mknepprath/mknepprath-next/pull/10/files">
        That changed this year
      </a>{" "}
      for a few reasons. First, developing a blog from scratch seemed like a fun
      project. Second, Medium had become pretty aggressive with paywalls, etc,
      and I wanted to feel like I had ownership over my writing again. Finally,
      I hoped that doing this work would motivate me to do more writing - my
      Medium profile had become stagnant. This appears to be have been
      successful, since I didn't write any posts last year and wrote 5 this
      year:
    </p>
    <ul>
      <li>
        <a href="/writing/create-a-website">
          Create a Simple Website with GitHub Pages
        </a>
      </li>
      <li>
        <a href="/writing/breathe">Code Should Breathe</a>
      </li>
      <li>
        <a href="/writing/design-process">Thoughts on Design Process</a>
      </li>
      <li>
        <a href="/writing/sequential-art">Sequential Art™</a>
      </li>
      <li>2019 in Review (this post)</li>
    </ul>
    <p>
      Bonus: I hunted down old posts from previous iterations of my website
      using the Wayback Machine and <a href="/writing">included them here</a> as
      well.
    </p>
    <h3>Quit Facebook 🟡</h3>
    <p>
      While I didn't use Facebook all year, I still have an account. It's
      currently deactivated, but I can't consider this a success until it's
      gone... permanently.
    </p>
    <h3>Develop an iOS app 🔴</h3>
    <p>
      I had hoped to complete an iOS app I'd started working on in 2018 for
      tracking movies. I learned a lot, but it ended up being a bigger
      undertaking than I'd anticipated and I was no longer able to dedicate the
      time required to push it out. I released a working, unpolished beta to
      TestFlight, but that's as far as it got.
    </p>
    <h3>Illustrate ✅</h3>
    <p>
      I have an art/graphic design college degree, which means I feel
      unfulfilled if I don't illustrate <em>something</em> each year. This year
      I illustrated a few moths and posted them to{" "}
      <a href="https://dribbble.com/mknepprath">Dribbble</a>.
    </p>
    <img
      alt="Top 9 Instagram photos from 2019 (4-6)."
      className="blog-image"
      src="/assets/2019-in-review-2.png"
    />
    <h2>Cool Things</h2>
    <h3>Travel</h3>
    <p>
      On top of starting a new job, moving to a new state, and changing nearly
      everything else in our lives, I also traveled more than ever before.
      According to <a href="https://www.flightyapp.com/">Flighty</a>, I flew the
      equivalent of .9x around the earth this year alone.
    </p>
    <img
      alt="2019 in Flighty"
      className="blog-image"
      src="/assets/2019-in-review-flights.jpg"
    />
    <p>Some highlights:</p>
    <ul>
      <li>January, Imaging USA with White House Custom Colour</li>
      <li>March, Disneyland with my family</li>
      <li>April, Walmart Labs meetup in Carlsbad, CA</li>
      <li>September, another Walmart Labs meetup in SLC</li>
      <li>October, React Conf</li>
    </ul>
    <h3>Attended a local meetup</h3>
    <p>
      This wasn't available where I lived in Minnesota. It's been very cool to
      attend a React meetup in Cleveland with developers of varying levels of
      experience. I've met new friends and learned a lot from the few I've
      attended already. I look forward to continuing this in 2020.
    </p>
    <h3>Twitter bots</h3>
    <p>
      I don't have much to show for it, but I worked on my Twitter bots quite a
      bit. <a href="https://twitter.com/FamiliarLilt">Lilt</a> was almost{" "}
      <a href="https://github.com/mknepprath/lilt/commit/285034e77ef43505c119f6f459c87695eff51719">
        entirely rewritten
      </a>{" "}
      and the game itself has been expanded. I hope to do more before formally
      announcing it, however.
    </p>
    <img
      alt="Top 9 Instagram photos from 2019 (7-9)."
      className="blog-image"
      src="/assets/2019-in-review-3.png"
    />
    <h2>2020 Goals</h2>
    <p>
      For the first time ever, here's my list of what I'd like to accomplish
      during the next year.
    </p>
    <h3>Read 10 books</h3>
    <p>
      I've been averaging less than 10 books per year. If I can make it to 10,
      I'll be happy.
    </p>
    <h3>Write 10 blog posts</h3>
    <p>
      I added this blog to my website in August and averaged one post per month.
      This should be achievable.
    </p>
    <h3>Release the next chapter of Lilt</h3>
    <p>
      I have a couple goals for{" "}
      <a href="https://twitter.com/familiarlilt">Lilt</a>. First, I hope to
      develop a user interface to help manage moves, locations, and items in the
      game (likely with React). Second, I want to introduce more areas to
      explore. While the interface would be nice for me, it doesn't add anything
      of interest for Lilt's players. This is why I want to focus on expanding
      the game first.
    </p>
    <h3>Complete 3 online courses</h3>
    <p>
      I've purchased a bunch of online courses over the years that I'd like to
      finish. I hope to finish at least three of these during 2020:
    </p>
    <ul>
      <li>
        <a href="https://www.3dfordesigners.com/">3D for Designers</a> by Devon
        Ko
      </li>
      <li>
        <a href="https://testingjavascript.com/">Testing JavaScript</a> with
        Kent C. Dodds
      </li>
      <li>5 courses on Udemy (Swift, React, Python, TensorFlow...)</li>
    </ul>
    <h3>Draw, illustrate, animate!</h3>
    <p>
      I want to draw some more comics, create some short animations, etc. I
      don't care all that much about the format as long as I do some cool visual
      work. I may even dabble in capital "A" Art again.
    </p>
    <h2>Tracking My Goals</h2>
    <p>
      I haven't decided how I'd like to track all of this yet. I'm leaning
      towards posting a bimonthly update to my blog. That would count towards my
      blogging goal, right??
    </p>
    <p>👋</p>
  </BlogPage>
);
