import Page from "core/page";

export default () => (
  <Page className={"container"} title={"Dynoland"}>
    <article>
      <header>
        <h1>Dynoland</h1>
      </header>

      <img
        alt="Dynoland status"
        className="blog-image"
        src="https://minecraft.meloncube.net/index.php?r=status/1573.png"
      />

      <p>
        We have a{" "}
        <a href="https://www.facebook.com/groups/dynoland/">Facebook page</a>.
      </p>
    </article>
  </Page>
);
