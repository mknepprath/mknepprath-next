import A from "core/a";
import Page from "core/page";

export default function Podcasts(): React.ReactNode {
  return (
    <Page className="container" title="Podcasts">
      <article data-cy="uses-page">
        <header>
          <h1>Podcasts</h1>
        </header>

        <p>I&apos;ve been featured in a number of podcasts over the years.</p>

        <h2>As a Guest</h2>

        <h3>Culturally Irrelevant</h3>
        <ul>
          <li>
            <A href="http://culturallyirrelevant.net">
              24: Producer in the House
            </A>
          </li>
          <li>
            <A href="http://culturallyirrelevant.net">
              39: Death of the Netflix Boy
            </A>
          </li>
        </ul>

        <h2>Mentions</h2>

        <h3>Design Details</h3>
        <ul>
          <li>
            <A href="https://designdetails.fm/episodes/195462">
              264: Oven Mittens
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/242701">
              277: Dribbble Stories (feat. Zack Onisko)
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/253698">279: TWIGBY</A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/297140">
              296: Google I/O
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/305408">
              307: iOS 13 Beta
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/311114">
              319: Content Strategy and Designing with Language (feat. Jonathon
              Colman)
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/311917">
              321: Illustrations and the Side Effects of Free Resources (feat.
              Meg Robichaud & Ryan Putnam)
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/312744">
              323: Designing Social Proof
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/313187">
              324: Interface Design and the Physical World
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/313468">
              325: Changing Roles in a Growing Company
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/314231">
              327: Organizing Component Systems
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/316807">
              334: Keylines and Scannable Designs
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/319028">
              342: Critiquing Our Early Work
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/319300">
              343: Over and Undervalued Design Skills
            </A>
          </li>
          <li>
            <A href="https://designdetails.fm/episodes/odJXcIY7">
              379: Shipping Personal Projects
            </A>
          </li>
        </ul>

        <h3>React Podcast</h3>
        <ul>
          <li>
            <A href="https://reactpodcast.simplecast.com/episodes/123">
              123: Cassidy Williams on Dreams and Disasters in 2020
            </A>
          </li>
        </ul>

        <h3>Isometric</h3>
        <ul>
          <li>
            <A href="https://www.relay.fm/isometric/32">
              32: Going Full Siracusa
            </A>{" "}
            - 1:47:14
          </li>
          <li>
            <A href="https://www.relay.fm/isometric/34">34: PokeRapper.com</A> -
            1:33:19
          </li>
          <li>
            <A href="https://www.relay.fm/isometric/38">
              38: Invite Him Over to Play Street Fighter
            </A>{" "}
            - 1:15:00
          </li>
        </ul>

        <h3>Shop Talk Show</h3>
        <ul>
          <li>
            <A href="http://shoptalkshow.com/episodes/148-nathaniel-deal/">
              148: WITH NATHANIEL DEAL
            </A>{" "}
            - 54:55
          </li>
        </ul>

        <h3>Immutable</h3>
        <ul>
          <li>
            <A href="https://podcasts.apple.com/us/podcast/51-i-value-tools/id1035147995?i=1000374196228">
              51: I Value Tools.
            </A>{" "}
            - Topics 1-4
          </li>
          <li>
            <A href="https://podcasts.apple.com/us/podcast/80-plane-zelda/id1035147995?i=1000382607897">
              80: Plane Zelda
            </A>
          </li>
          <li>
            <A href="https://podcasts.apple.com/us/podcast/82-quarry-fish/id1035147995?i=1000383225527">
              82: Quarry Fish
            </A>
          </li>
        </ul>

        <h3>WELS Tech</h3>
        <ul>
          <li>
            <A href="https://welstech.wels.net/2011/10/19/206-voip-for-beginners/">
              206: VoIP For Beginners
            </A>
          </li>
        </ul>

        <h3>This One Podcast</h3>
        <ul>
          <li>
            <A href="https://podcasts.apple.com/us/podcast/this-one-podcast/id495602592">
              A number of episodes
            </A>
          </li>
        </ul>
      </article>
    </Page>
  );
}
