import BlogPage from "core/blog-page";

export default () => (
  <BlogPage dateTime="2015-06-04" title="Lots of Little Improvements">
    <header>
      <h1>Lots of Little Improvements</h1>
    </header>

    <p>
      I once had a co-worker tell me that using Apple Pay could only be
      attributed to laziness. They’d say, “what, is pulling out your card and
      swiping it so hard?” My answer would be no, and certainly not compared to
      past systems that would involve pulling out and counting cash manually, or
      even farther back when we’d be bartering furs for food. But at what point
      did we decide credit cards were good enough? Or any of the other systems
      we’ve put in placed,{" "}
      <a href="http://www.ted.com/talks/tony_fadell_the_first_secret_of_design_is_noticing">
        such as putting bar codes on fruit
      </a>
      ?
    </p>
    <p>
      My math will be very rough here as this is just for the sake of example,
      but let’s say a normal checkout experience takes 60 seconds and checkout
      with Apple Pay takes 45. If I live til I’m 80 making at least 2 purchases
      a day, that adds up to nearly a full week (two, if you account for the
      fact that I’d still want to sleep at night). Now multiply that by every
      other task that could potentially be sped up by 15 seconds, or
      significantly more.
    </p>
    <p>
      In brief, time is one of our most limited resources, and I’d rather not
      spend even a few days of it doing a repetitive, meaningless task.
    </p>
  </BlogPage>
);
