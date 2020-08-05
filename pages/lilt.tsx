import Page from "core/page";

const Lilt = () => {
  return (
    <Page className="container" title="Lilt">
      <article>
        <header>
          <h1>Lilt</h1>
        </header>

        <img alt="Lilt logo" src="/assets/lilt.png" />

        <p>Every game should have a guidebook. Here's <a href="https://twitter.com/familiarlilt" rel="noopener noreferrer" target="_blank">Lilt</a>'s.</p>

        <h2>The Goal</h2>
        <p>You find yourself trapped in a mysterious room. How do you get out?</p>

        <h2>Tips</h2>
        <p>While Lilt attempts to allow you to use natural language messages, it works best if you follow certain patterns: "look at the tree", "pick up the coin", "use water on the flower", and so on.</p>
        <p>It's also possible to give items to other people who are playing the game: "Give @frederick an apple."</p>
      </article>
    </Page>
  );
};

export default Lilt;
