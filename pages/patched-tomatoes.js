import Page from "core/page";

export default () => (
  <Page className="container" title="Patched Tomatoes">
    <article>
      <img
        alt="Dynoland rendered image"
        src="/assets/patched-tomatoes.png"
        style={{ display: "block", margin: "0 auto" }}
      />

      <header>
        <h1>Patched Tomatoes</h1>
      </header>

      <p>
        <a href="https://github.com/mknepprath/patched-tomatoes">
          Patched Tomatoes
        </a>{" "}
        is a Chrome extension that replaces the Tomatometer score on Rotten
        Tomatoes with the Critics' Average Rating. It does the same for the
        Audience Score. I believe the Tomatometer score is calculated in a
        misleading way, and this extension aims to fix that.
      </p>
      <h2 id="how-rotten-tomatoes-works">How Rotten Tomatoes Works</h2>
      <p>
        Let's create some films for the sake of example. Each film received 5
        critic reviews. Here they are:
      </p>
      <table style={{ textAlign: "left", width: "100%" }}>
        <thead>
          <tr>
            <th>Film</th>
            <th>Emma</th>
            <th>Liam</th>
            <th>Olivia</th>
            <th>Noah</th>
            <th>Ava</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Frostbite</td>
            <td>4.5/10</td>
            <td>2.5/5</td>
            <td>4.5/10</td>
            <td>5/10</td>
            <td>5/10</td>
          </tr>
          <tr>
            <td>Blue Harvest</td>
            <td>1/10</td>
            <td>1/5</td>
            <td>1.5/10</td>
            <td>2/10</td>
            <td>1/10</td>
          </tr>
          <tr>
            <td>Prime Directive</td>
            <td>9/10</td>
            <td>5/5</td>
            <td>9.5/10</td>
            <td>9/10</td>
            <td>9/10</td>
          </tr>
          <tr>
            <td>Artemis</td>
            <td>5.5/10</td>
            <td>3/5</td>
            <td>5.5/10</td>
            <td>6/10</td>
            <td>6/10</td>
          </tr>
        </tbody>
      </table>
      <p>
        Upon reviewing these ratings - one might assume that Prime Directive is
        amazing, Blue Harvest is bad, and the remaining two films are similarly
        mediocre. What would Rotten Tomatoes say? Here's{" "}
        <a href="https://www.rottentomatoes.com/about">their definition</a> of a
        "Fresh" film:
      </p>
      <blockquote>
        The Tomatometer score represents the percentage of professional critic
        reviews that are positive for a given film or television show... When at
        least 60% of reviews for a movie or TV show are positive, a red tomato
        is displayed to indicate its Fresh status.
      </blockquote>
      <p>
        What does this mean for our example films? First, we need to convert
        each critic rating to a binary "positive" or "not positive" review. In
        most cases, Rotten Tomatoes considers 5.5/10 and above a "positive"
        review.
      </p>
      <table style={{ textAlign: "left", width: "100%" }}>
        <thead>
          <tr>
            <th>Film</th>
            <th>Emma</th>
            <th>Liam</th>
            <th>Olivia</th>
            <th>Noah</th>
            <th>Ava</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Frostbite</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Blue Harvest</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Prime Directive</td>
            <td>+</td>
            <td>+</td>
            <td>+</td>
            <td>+</td>
            <td>+</td>
          </tr>
          <tr>
            <td>Artemis</td>
            <td>+</td>
            <td>+</td>
            <td>+</td>
            <td>+</td>
            <td>+</td>
          </tr>
        </tbody>
      </table>
      <p>
        Per Rotten Tomatoes definition, both Frostbite and Blue Harvest would
        receive a rotten Tomatometer score of 0%, while Prime Directive and
        Artemis both receive a fresh score of 100%. Do you feel misled?
      </p>
      <h2 id="a-better-way">A Better Way</h2>
      <p>
        This is where Patched Tomatoes comes in. I find that simply looking at a
        film's average rating is much more interesting. Let's convert the critic
        ratings to percentages and calculate their average:
      </p>
      <table style={{ textAlign: "left", width: "100%" }}>
        <thead>
          <tr>
            <th>Film</th>
            <th>Emma</th>
            <th>Liam</th>
            <th>Olivia</th>
            <th>Noah</th>
            <th>Ava</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Frostbite</td>
            <td>45%</td>
            <td>50%</td>
            <td>45%</td>
            <td>50%</td>
            <td>50%</td>
          </tr>
          <tr>
            <td>Blue Harvest</td>
            <td>10%</td>
            <td>20%</td>
            <td>15%</td>
            <td>20%</td>
            <td>10%</td>
          </tr>
          <tr>
            <td>Prime Directive</td>
            <td>90%</td>
            <td>100%</td>
            <td>95%</td>
            <td>90%</td>
            <td>90%</td>
          </tr>
          <tr>
            <td>Artemis</td>
            <td>55%</td>
            <td>60%</td>
            <td>55%</td>
            <td>60%</td>
            <td>60%</td>
          </tr>
        </tbody>
      </table>
      <p>These average out to the following:</p>
      <ul>
        <li>Frostbite: 48%</li>
        <li>Blue Harvest: 15%</li>
        <li>Prime Directive: 93%</li>
        <li>Artemis: 58%</li>
      </ul>
      <p>
        Perhaps Artemis isn't the critically-acclaimed film Rotten Tomatoes
        indicated.
      </p>
      <p>
        One side effect of this is that it's a lot harder for a film to get a
        100% rating. In fact, the only way for this to happen would be if every
        single critic agreed that it was a perfect film - and this has never
        happened. The current highest-ranking films are Citizen Kane and The
        Wizard of Oz at ~94%.
      </p>
      <p>
        I posit that it's all the more impressive for a modern film to reach
        this level of consensus given the sheer number of critics rating films
        online today. Which number tells you more, that Parasite (with 356 total
        reviews) received a Tomatometer rating of 99%, or that Parasite's
        average rating is 93.7%?
      </p>
      <p>
        If you would like to install Patched Tomatoes for yourself, head to{" "}
        <a href="https://github.com/mknepprath/patched-tomatoes">
          mknepprath/patched-tomatoes
        </a>{" "}
        on GitHub and follow the instructions.
      </p>
    </article>
  </Page>
);
