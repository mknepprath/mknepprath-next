import A from "@core/a";
import BlogPage from "@core/blog-page";
import Image from "next/legacy/image";

// Styles
import styles from "./settings-done.module.css";

export const meta: Meta = {
  image: "/assets/settings-done.png",
  published: true,
  publishedAt: "2021-03-15",
  summary: "How the iOS apps I use implement their settings view.",
  title: "iOS App Settings: A Study",
  tweetId: "1371468417434288134",
};

export default function IosAppSettings(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
      tweetId={meta.tweetId}
    >
      <Image
        alt="TestFlight screenshot feedback"
        className="bordered-image corner-radius-8"
        height={690}
        src="/assets/settings-done.png"
        layout="responsive"
        priority
        width={1200}
      />
      <header>
        <h1>{meta.title}</h1>
      </header>
      <blockquote>
        <p>
          If I’m in settings on home, and then go to different tabs, and then
          return to the home tab, it’s still in the settings option.
        </p>
      </blockquote>
      <p>
        I gave a little cheer when I received this bug report from a TestFlight
        user of my app, <A href="https://lilydex.com">lily dex</A>. Finally, I
        had made an app worthy of scrutiny. This wasn&apos;t my first bit of
        feedback, but each one was a reminder that people actually use my app!
      </p>
      <p>
        This particular bit of feedback was different than most in that it
        wasn&apos;t describing something that was broken... my Settings view was
        working as I&apos;d intended it to, and (I&apos;d later discover) in the
        same way as many other apps&apos; Settings views.
      </p>

      <h2>The Bug</h2>
      <p>
        lily dex is pretty flat. Each tab in the menu bar at the bottom is
        associated with one page: Home, Wild, Caught, and Search. The only other
        page in the app is Settings, which is accessed by tapping the gear at
        the top right of Home. Unfortunately, when you tap into Settings the
        menu bar is still visible, allowing users to navigate to other pages
        while Settings is open. If you navigate away and then tap Home to go
        home, you will instead be greeted by the Settings view that was never
        dismissed.
      </p>

      <h2>The Research</h2>
      <p>
        I poked around a bit in Xcode to see what felt right, but quickly
        decided I needed to do some research into how other apps were handling
        their Settings views.
      </p>
      <p>
        This is a lazy study. My sample data set is made up of frequently used
        apps on my phone. I documented two things: the type of view the app used
        for its settings (a new view that slides in, a sheet, a dedicated tab,
        etc), and what navigation options were available from the settings view.{" "}
        <b>Leading</b> refers to the top left navigation and <b>Trailing</b>,
        top right. Here&apos;s what I found.
      </p>

      <h3>New View That Slides In</h3>
      <p>
        These apps work similarly to mine, as described above. All exhibit the
        same &ldquo;buggy&rdquo; behavior as lily dex.
      </p>
      <p></p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>App</th>
            <th>Leading</th>
            <th>Trailing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>lily dex</td>
            <td>{"< Home"}</td>
            <td></td>
          </tr>
          <tr>
            <td>GitHub</td>
            <td>{"< Back"}</td>
            <td></td>
          </tr>
          <tr>
            <td>Goodreads</td>
            <td>{"<"}</td>
            <td></td>
          </tr>
          <tr>
            <td>Starbucks</td>
            <td>{"<"}</td>
            <td></td>
          </tr>
          <tr>
            <td>Twitter</td>
            <td>{"<"}</td>
            <td></td>
          </tr>
          <tr>
            <td>Watch</td>
            <td>{"< {Watch name}"}</td>
            <td></td>
          </tr>
          <tr>
            <td>Jumbo</td>
            <td>{"< Back"}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <h3>New View That Slides In (Tab Bar Hidden)</h3>
      <p>
        A key component of this bug is that the user can navigate away from
        Settings using the app&apos;s tabs. The following apps remedy this by
        hiding the tab bar entirely while the settings are open.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>App</th>
            <th>Leading</th>
            <th>Trailing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dispo</td>
            <td>{"←"}</td>
            <td></td>
          </tr>
          <tr>
            <td>Overcast</td>
            <td>{"<"}</td>
            <td></td>
          </tr>
          <tr>
            <td>Vivint</td>
            <td>{"<"}</td>
            <td></td>
          </tr>
          <tr>
            <td>Zeitgeist</td>
            <td>{"< Zeitgeist"}</td>
            <td></td>
          </tr>
          <tr>
            <td>Walmart</td>
            <td>{"<"}</td>
            <td></td>
          </tr>
          <tr>
            <td>Google Photos</td>
            <td>{"<"}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <h3>New View</h3>
      <p>
        I discovered one app where it appeared that the team had built their own
        version of iOS&apos;s navigation. In practice, the Alexa app works the
        same as the apps in <b>New View That Slides In</b>... except the
        settings view doesn&apos;t slide in. It very noticeably flashes in.
      </p>
      <p>
        While ugly in this regard, the Alexa app does not suffer from the
        aforementioned bug.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>App</th>
            <th>Leading</th>
            <th>Trailing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Amazon Alexa</td>
            <td>{"<"}</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <h3>Sheet</h3>
      <p>
        I quickly ran into a new method of displaying settings - in a sheet (a
        view that appears over an existing view). Sheets slide in from the
        bottom of the screen and can be dismissed by pulling them down or
        (typically) tapping a Done button.
      </p>
      <p>
        Apps that use sheets for their settings do not include the bug since the
        sheet covers the whole app, blocking users from tapping the menu bar
        tabs.
      </p>
      <p>
        This ended up being the most popular method by far, even used by most of
        the Apple apps I checked.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>App</th>
            <th>Leading</th>
            <th>Trailing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apple Music</td>
            <td></td>
            <td>Done</td>
          </tr>
          <tr>
            <td>Apple TV</td>
            <td></td>
            <td>Done</td>
          </tr>
          <tr>
            <td>Letterboxd</td>
            <td>Cancel</td>
            <td>Save</td>
          </tr>
          <tr>
            <td>Deliveries</td>
            <td>Done</td>
            <td></td>
          </tr>
          <tr>
            <td>Grocery</td>
            <td>Done</td>
            <td></td>
          </tr>
          <tr>
            <td>Copilot</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Weather Line</td>
            <td></td>
            <td>Done</td>
          </tr>
          <tr>
            <td>Hey</td>
            <td>⌄</td>
            <td></td>
          </tr>
          <tr>
            <td>Fantastical</td>
            <td>Done</td>
            <td></td>
          </tr>
          <tr>
            <td>Slack</td>
            <td>✕</td>
            <td></td>
          </tr>
          <tr>
            <td>Opal*</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Halide*</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Apple News</td>
            <td></td>
            <td>Done</td>
          </tr>
          <tr>
            <td>App Store</td>
            <td></td>
            <td>Done</td>
          </tr>
          <tr>
            <td>Home</td>
            <td>{"< Rooms"}</td>
            <td>Done</td>
          </tr>
          <tr>
            <td>Connect</td>
            <td></td>
            <td>Done</td>
          </tr>
          <tr>
            <td>Flighty</td>
            <td></td>
            <td>Done</td>
          </tr>
          <tr>
            <td>Dark Sky</td>
            <td></td>
            <td>Done</td>
          </tr>
          <tr>
            <td>NetNewsWire</td>
            <td>Done</td>
            <td></td>
          </tr>
          <tr>
            <td>Animatic</td>
            <td></td>
            <td>Done</td>
          </tr>
        </tbody>
      </table>
      <p>* Indicates an app with a centered down arrow in the nav.</p>

      <h3>Full-Screen Cover</h3>
      <p>
        This one&apos;s the same as a sheet, except it fills the entire screen.
        Sheets typically leave some space at the top.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>App</th>
            <th>Leading</th>
            <th>Trailing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Notion</td>
            <td></td>
            <td>Done</td>
          </tr>
          <tr>
            <td>Instapaper</td>
            <td></td>
            <td>Done</td>
          </tr>
        </tbody>
      </table>

      <h3>Dedicated Tab</h3>
      <p>A few apps promoted the settings view to their menu bar.</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>App</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1Password</td>
          </tr>
          <tr>
            <td>Discord</td>
          </tr>
          <tr>
            <td>Apollo</td>
          </tr>
        </tbody>
      </table>

      <h3>Custom Modal</h3>
      <p>
        And finally, one team built a custom modal view to contain their app
        settings.
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>App</th>
            <th>Leading</th>
            <th>Trailing</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Things</td>
            <td></td>
            <td>Done</td>
          </tr>
        </tbody>
      </table>

      <h2>A Confession</h2>
      <p>The quote at the beginning of this post wasn&apos;t the full quote.</p>
      <blockquote>
        <p>
          If I’m in settings on home, and then go to different tabs, and then
          return to the home tab, it’s still in the settings option. And if you
          click the home tab again, it doesn’t go home. Just stays in settings.
        </p>
      </blockquote>
      <p>
        I primarily focused on the first sentence during this exploration, but
        there was a second part to the feedback I received: Tapping Home while
        viewing the nested Settings view didn&apos;t take you home. In
        hindsight, this was the bigger issue. It&apos;s implicit in the feedback
        that tapping Home multiple times should navigate <em>and then</em>{" "}
        dismiss nested views. Perhaps users are used to button-mashing their way
        to the root view.
      </p>
      <p>
        In all of the apps in the <b>New View That Slides In</b> section (and
        unlike my app), double-tapping the tab navigation dismisses the settings
        view.
      </p>

      <h2>My Takeaway</h2>
      <p>
        The sheet is far and away the most popular way to present settings.
        Navigation among this subset of apps is a bit of a mess, although all of
        Apple&apos;s apps in this category are 100% consistent with a trailing
        Done button. Shout out to Weather Line, Flighty, Dark Sky, and Animatic
        for following suit.
      </p>
      <p>
        Based on this study, I moved my settings into a sheet with a trailing
        Done button as well.
      </p>
      <p>
        Thanks to <A href="https://twitter.com/lmeilner">Luke</A> for the
        feedback that kicked this whole thing off!
      </p>
    </BlogPage>
  );
}
