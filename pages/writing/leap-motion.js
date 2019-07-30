import Head from "next/head";

import Page from "core/page";

export default () => (
  <Page className={"container"}>
    <Head>
      <title key="title">Leap Motion: Give Your Mouse A Break</title>
    </Head>

    <article>
      <header>
        <h1>Leap Motion: Give Your Mouse A Break</h1>
      </header>

      <p>
        You were going to hear about{" "}
        <a href="https://leapmotion.com/">Leap Motion</a> sooner or later, so it
        might as well be now. Leap Motion is a touch-free, 3D motion technology
        that is slated for release early this year.
      </p>

      <p>
        And apparently it will only cost $75. Leap Motion is basically a Kinect
        with pinpoint precision that hooks up to your computer. What’s so
        amazing about this?
      </p>
      <p>
        1. You can “physically” interact with objects on your computer screen.
        The best example I’ve found of this can be seen in the video below.
      </p>
      <p>
        <iframe
          src="http://www.youtube.com/embed/1x-eAvASIFc?rel=0"
          height="326"
          width="580"
          allowFullScreen=""
          frameBorder="0"
        />
      </p>
      <p>
        2. You can create artwork in 2D or 3D with no extra peripherals. In some
        of the demo videos, they actually use a pencil as a stylus and the Leap
        Motion was able to recognize it as a writing tool.
      </p>
      <p>
        <iframe
          src="http://www.youtube.com/embed/_d6KuiuteIA?rel=0"
          height="326"
          width="580"
          allowFullScreen=""
          frameBorder="0"
        />
      </p>
      <p>
        3. It’s backwards compatible with touch screen applications, so it
        already works with a ton of different programs. One example is the
        ability to scroll down a web page simply by swiping it up with a finger.
      </p>
      <p>
        <iframe
          src="http://www.youtube.com/embed/mQkKyOOyLSs?rel=0"
          height="326"
          width="580"
          allowFullScreen=""
          frameBorder="0"
        />
      </p>
      <p>
        I’m very excited about having a new way to interact with my iMac and
        finally{" "}
        <a href="http://mknepprath.com/2012/10/the-limitations-of-the-mouse/">
          free myself from the mouse
        </a>
        !
      </p>

      <p className={"blog-time"}>
        <time dateTime="2013-01-02">January 2, 2013</time>
      </p>
    </article>
  </Page>
);
