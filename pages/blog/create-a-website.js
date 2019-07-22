import Head from "next/head";

import Page from "../../core/page";

export default () => (
  <Page>
    <Head>
      <title key="title">Create a Simple Website with GitHub Pages</title>
    </Head>

    <div className={"container"}>
      <h1>Create a Simple Website with GitHub Pages</h1>

      <p>
        GitHub offers a free way to host websites called{" "}
        <a href="https://pages.github.com/">GitHub Pages</a>.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>
          A GitHub account. Sign up here:{" "}
          <a href="https://github.com/join">https://github.com/join</a>
        </li>
        <li>That's it??</li>
      </ul>

      <h2>Create a Repository</h2>
      <p>
        A GitHub Repository (repo) is where you store your code for a specific
        project. For instance, the code for my personal website is stored in a
        repo. Feel free to reference the GitHub Help{" "}
        <a href="https://help.github.com/en/articles/create-a-repo">
          Create a repo
        </a>{" "}
        page.
      </p>
      <ol>
        <li>
          Click the "+" icon at the top right and select{" "}
          <strong>New repository</strong>.
        </li>
        <li>
          Type in a <strong>Repository name</strong>.
        </li>
        <li>
          Click <strong>Create repository</strong>.
        </li>
      </ol>

      <h2>Build Your Website</h2>
      <p>
        You are now on the main page of your new repo. For now, you can ignore
        everything on this page except where it says "Get started by creating a
        new file..."
      </p>
    </div>
  </Page>
);
