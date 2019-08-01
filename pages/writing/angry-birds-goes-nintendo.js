import Page from "core/page";

export default () => (
  <Page className={"container"} title={"Angry Birds Goes Nintendo"}>
    <article>
      <header>
        <h1>Angry Birds Goes Nintendo</h1>
      </header>

      <p>
        Rovio just released{" "}
        <a href="https://itunes.apple.com/us/app/angry-birds-go!/id642821482?mt=8">
          Angry Birds Go!
        </a>{" "}
        for iOS, and I wonder if their decision to develop this had anything to
        do with Nintendo saying they would never develop for mobile phones. The
        longer Nintendo waits, the more chances other developers will have to
        jump in and{" "}
        <a href="https://itunes.apple.com/us/app/oceanhorn/id708196645?mt=8">
          take their rupees
        </a>
        .
      </p>

      <p>
        <time dateTime="2013-12-16">December 16, 2013</time>
      </p>
    </article>
  </Page>
);
