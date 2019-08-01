import Page from "core/page";

export default () => (
  <Page className={"container"} title={"oh my god i am in ant jail"}>
    <article>
      <header>
        <h1>Lilt</h1>
      </header>

      {/*
        TODO: Put this into a component
        Interface: name, username, tweet ID, date
        Script can be move to page-level
      */}
      <blockquote>
        <p>oh my god i am in ant jail</p>
        &mdash; Devon Ko (@3dfordesigners){" "}
        <a href="https://twitter.com/3dfordesigners/status/954103363918028801">
          January 18, 2018
        </a>
      </blockquote>

      <p>
        <time dateTime="2019-07-22">July 22, 2019</time>
      </p>
    </article>
  </Page>
);
