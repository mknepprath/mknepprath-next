import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2012-09-17",
  title: "How I Get Things Done",
};

export default function GetThingsDone(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        I recently read the book{" "}
        <a href="http://99u.com/book">Making Ideas Happen</a> by{" "}
        <a href="https://twitter.com/scottbelsky">Scott Belsky</a>. While I’d
        highly recommend that you read it, I know that you probably don’t have
        time. If this is so, then this is the perfect book for you!
      </p>
      <p>Catch-22?</p>
      <p>
        The main area this book helped me was in my note-taking habits. During
        meetings, everything I deemed important would be scribbled down in my
        notebook for later review. It became difficult to pull the tasks that
        actually needed to be done from the pages.
      </p>
      <p>
        The book recommended a new method. The{" "}
        <a href="http://www.actionmethod.com/methodology">Action Method</a>.
        Here’s how I use it.
      </p>
      <ul>
        <li>
          First, one page is dedicated to each project, no matter how small.
          Trying to organize five different projects on one page was not ideal
          and unnecessary.
        </li>
        <li>
          Most of each page, save the top and bottom right corners, are open for
          notes.
        </li>
        <li>
          Anytime a task that can be completed is mentioned, it gets placed in a
          list at the top right corner. Each task should begin with a verb, as I
          am going to be taking action and completing them after the meeting is
          over. I make sure they are fairly simple. “Build an entire website.”
          does not work, while “Pick out colors for website.” does. I break
          every project down to steps like this.
        </li>
        <li>
          Finally, the bottom right of the page is dedicated to backburner
          items. These are projects or tasks that I or somebody else thought up,
          but can’t or shouldn’t take action on right now. These get compiled
          later and are reviewed monthly.
        </li>
      </ul>
      <p>
        This was not mentioned in Making Ideas Happen, but I believe this is
        important, nonetheless. Make sure you purchase a nice notebook, because
        you won’t value it as highly if you don’t. I used to take notes on
        everything, but having a nice new notebook has motivated me to have it
        with me at all times.
      </p>
      <p>How do you get things done?</p>
    </BlogPage>
  );
}
