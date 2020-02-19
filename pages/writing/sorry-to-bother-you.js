import Prism from "prismjs";

import BlogPage from "core/blog-page";

export const meta = {
  image: "",
  published: true,
  publishedAt: "2020-02-17",
  summary: "I tried to delete my Twitter Likes. Twitter didn't like that.",
  title: "Twitter Defeated Me"
};

export default () => {
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
      <img />
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        Earlier this month, you may have seen{" "}
        <a href="https://twitter.com/kmlefranc/status/1221869659139366912">
          this thread on Twitter
        </a>{" "}
        describing a company deploying dystopian tactics (a.k.a.{" "}
        <a href="https://www.youtube.com/watch?v=ARJ8cAGm6JE">
          an ill-conceived algorithm
        </a>
        ) to compile a background check out of this person's liked tweets.
      </p>
      <p>
        This got me thinking. What purpose do my Twitter likes serve? Do I need
        them?
      </p>
      <p>...Could I delete them all?</p>
      <h2 id="the-purpose-of-twitter-likes">The Purpose of Twitter Likes</h2>
      <p>
        First, some history. Pre-2015, Twitter likes were called{" "}
        <a href="https://www.theverge.com/2015/11/3/9661180/twitter-vine-favorite-fav-likes-hearts">
          favorites
        </a>{" "}
        and were denoted by a ⭐️, not a ❤️. They were initially meant to serve
        as a way to bookmark tweets (now{" "}
        <a href="https://techcrunch.com/2018/02/28/twitter-launches-bookmarks-a-private-way-to-save-tweets/">
          re-added
        </a>{" "}
        as a separate{" "}
        <a href="https://twitter.com/mknepprath/status/1200461462671708161">
          half-baked
        </a>{" "}
        <a href="https://twitter.com/mknepprath/status/1220007534578339840">
          feature
        </a>
        ). Since then, Twitter realized likes{" "}
        <a href="https://twitter.com/round/status/1161312657846296577">
          yield far more engagement
        </a>{" "}
        than favorites and switched. Twitter likes are not bookmarks. It would
        be{" "}
        <a href="https://twitter.com/cattheless/status/1220006748548947969">
          difficult to use them that way
        </a>{" "}
        even if one wanted to.
      </p>
      <p>
        Today, Twitter likes are simply that. A quick way to say, "I like this
        tweet." A social exchange - ephemeral in nature, but permanently
        recorded and published publicly by Twitter.
      </p>
      <p>
        Why? Perhaps the public list of likes is a vestigial feature, leftover
        from when likes were favorites were bookmarks. Regardless, given a
        relatively short period of time, a like is something neither I nor its
        recipient will reference or care about. I've reached around 66,000
        likes, none of which are meaningful beyond the most recent hundred or
        so.
      </p>
      <h2 id="so-do-i-need-em">So Do I Need 'Em?</h2>
      <p>Nah.</p>
      <p>
        At least not this many. In my ideal Twitter world, likes last long
        enough to convey appreciation, then disappear once they've served their
        purpose. To reach this ideal world, I'd need to write a script that
        loops through all of my tweets and unlikes any beyond the most recent
        hundred or so.
      </p>
      <h2 id="can-i-delete-em">Can I Delete 'Em?</h2>
      <p>
        Short answer, it's possible - but brutal. I am currently at war with
        Twitter.
      </p>
      <p>
        First, I gained access to the Twitter API by repeatedly emailing them
        until they gave it to me.
      </p>
      <p>Then I started hitting roadblocks.</p>
      <p>
        I wrote a Python script that began unliking all of my liked tweets, and
        it worked beautifully. Until it didn't. After a bit of research, I
        discovered{" "}
        <a href="https://www.wired.com/story/tweets-ephemeral-likes-forever/">
          this Wired piece
        </a>{" "}
        that described the exact roadblock I'd run into, "We've found that likes
        outside this 3,200 window can't be removed even if we get details on
        them from another source." I had reached this limit.
      </p>
      <p>
        And this quote is only half of the story - it's missing the reason likes
        can't be removed outside this window. The Twitter API simply does not
        recognize likes beyond the most recent 3,200. Once all of the liked
        tweets within this window are unliked, Twitter sends over an empty list.
        No way around it. Old likes are 100% inaccessible through the API.
      </p>
      <p>
        To unlike tweets outside of this window, I'd need to find another way.
      </p>
      <p>And therefore, two scripts.</p>
      <ol>
        <li>
          One that deletes all of my likes outside the 3,200 window from now
          until the beginning of time, a.k.a. 2008.
        </li>
        <li>
          Another that continuously runs and deletes stale likes over time.
        </li>
      </ol>
      <h3 id="delete-old-likes">Delete Old Likes</h3>
      <p>
        I found a few 3rd-party apps that claim to offer the ability to delete
        all likes, Circleboom being an example. Suffice it to say,{" "}
        <a href="https://blog.circleboom.com/can-you-bulk-delete-twitter-likes-yes-in-just-2-steps/">
          this blog post of theirs is a lie
        </a>
        . Their app is unable to see likes beyond the 3,200 window.
      </p>
      <p>
        After this, I made a shocking discovery. Twitter's own apps are affected
        by this limit. Whether viewing my liked tweets through Twitter's iOS app
        or website, likes outside of the 3,200 window aren't displayed as having
        been liked - the heart icons are empty.
      </p>
      <img
        alt="Likes displayed as unliked"
        className="blog-image"
        src="/assets/twitter-likes-6.png"
      />
      <p>
        Additionally, Twitter offers a JavaScript-free version of their site,
        and this fails to display likes outside of the 3,200 window entirely. If
        Twitter itself can't consistently access my Twitter likes, what hope do
        I have?
      </p>
      <p>
        One thing I noticed when interacting with the above UI - in order to
        remove an old tweet from my likes, I'd need to like it <em>again</em>{" "}
        before unliking it.
      </p>
      <p>
        This same pattern held true when interacting with likes through the
        Twitter API. Attempting to unlike one of these tweets through the API
        manually resulted in an error. Twitter simply did not recognize it as a
        tweet liked by me.
      </p>
      <p>
        In order to remove one of these likes through the API, I'd need to
        separately gather my Twitter likes from the website without using the
        API, then simulate this like/unlike pattern.
      </p>
      <p>Which I did.</p>
      <p>Here's a simplified snippet of that script...</p>
      <pre>
        <code className="language-python">
          {`
for likeId in likeIds:
  twitter.like(likeId)
  twitter.unlike(likeId)
  print("Liked & unliked " + likeId)
          `}
        </code>
      </pre>
      <p>...and the Terminal output when running it.</p>
      <img
        alt="Command line liked and unliked messages"
        className="blog-image"
        src="/assets/twitter-likes-1.png"
      />
      <p>
        This, however, has an unfortunate side effect. Every like causes a
        notification just like any other would (despite these being tweets I'd
        already liked in the past).
      </p>
      <img
        alt="Unwanted notifications #1"
        className="blog-image"
        src="/assets/twitter-likes-2.png"
      />
      <hr />
      <img
        alt="Unwanted notifications #2"
        className="blog-image"
        src="/assets/twitter-likes-3.png"
      />
      <hr />
      <img
        alt="Unwanted notifications #3"
        className="blog-image"
        src="/assets/twitter-likes-4.png"
      />
      <hr />
      <img
        alt="Unwanted notifications #4"
        className="blog-image"
        src="/assets/twitter-likes-5.png"
      />
      <p>
        And herein lies the dilemma. I <em>can</em> accomplish my goal. But it
        will spam the tweeps I've liked the most.
      </p>
      <p>A cruel irony indeed.</p>
      <p>
        Do I follow through? At this point, it seems unlikely. I'm only ~6%
        done. With rate limiting, this would likely be a months-long process.
        Ugh.
      </p>
      <img
        alt="I Defeated Twitter (Not)"
        className="blog-image"
        src="/assets/twitter-likes-7.png"
      />
      <h3 id="delete-stale-likes">Delete Stale Likes</h3>
      <p>It's not all bad.</p>
      <p>
        The goal of my second script is to delete likes as soon as they become
        useless. Therefore, this script only deals with recent likes that exist
        within the 3,200 window. No problem!
      </p>
      <p>Here's a snippet of this new script:</p>
      <pre>
        <code className="language-python">
          {`
for i, like in enumerate(likes):
  if i >= 10:
    twitter.unlike(like.id)
          `}
        </code>
      </pre>
      <p>
        There's more to it, but it boils down to this: It loops through all of
        my liked tweets (within the window) and unlikes any beyond the first 10.
        I initially had this script running every 30 minutes but have decreased
        the frequency to once per day. It's now a nightly cleanup routine.
      </p>
      <p>Another neat feature:</p>
      <pre>
        <code className="language-python">
          {`
twitter.dm_self("Unliking " + str(len(likes)) + " tweets ✌️")
          `}
        </code>
      </pre>
      <p>
        The script self-reports how many likes it's cleaning up when it runs!
        This is what I see in my DMs on Twitter.
      </p>
      <img
        alt="Unlike logs as direct messages"
        className="blog-image"
        src="/assets/twitter-likes-8.png"
      />
      <h2 id="now-what">Now What?</h2>
      <p>
        The dream of deleting all of my Twitter likes may be dead, but I did
        manage to remove all of them through October 2019, and am down to 61.4K
        likes. And that number won't be growing - all new likes are being
        scrubbed daily thanks to an AWS Lambda function.
      </p>
      <p>
        If you'd like to try it yourself,{" "}
        <a href="https://gist.github.com/mknepprath/e7cdafd078efffc5a27683a5017386e5">
          here's a gist
        </a>{" "}
        that contains a simplified version of the second script I talk about
        above.
      </p>
    </BlogPage>
  );
};
