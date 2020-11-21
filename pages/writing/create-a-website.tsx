import Image from "next/image";

import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2019-07-22",
  summary: "A quick guide for setting up a new website with GitHub.",
  image: "/assets/create-a-website1.jpg",
  title: "Create a Simple Website with GitHub Pages",
};

export default function CreateAWebsite() {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      highlightCode
      ogImage={meta.image}
      title={meta.title}
    >
      <Image
        alt="Illustration of a browser window"
        height={826}
        src="/assets/create-a-website1.jpg"
        layout="responsive"
        priority
        width={1263}
      />

      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        GitHub offers a free way to host websites called{" "}
        <a title="Illustration of Octocat" href="https://pages.github.com/">
          GitHub Pages
        </a>
        .
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>
          A GitHub account. Sign up here:{" "}
          <a href="https://github.com/join">https://github.com/join</a>
        </li>
        <li>That's it!</li>
      </ul>

      <Image
        alt="Octocat's face"
        height={636}
        src="/assets/create-a-website2.jpg"
        layout="responsive"
        width={840}
      />

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
          Click the "+" icon at the top right and select <b>New repository</b>.
        </li>
        <li>
          Type in a <b>Repository name</b>.
        </li>
        <li>
          Click <b>Create repository</b>.
        </li>
      </ol>

      <h2>Build Your Website</h2>
      <p>
        You are now on the main page of your new repo. For now, you can ignore
        everything on this page except where it says "Get started by creating a
        new file..."
      </p>
      <ol>
        <li>
          Click <b>creating a new file</b>.
        </li>
        <li>
          Where it says <b>Name your file...</b>, enter{" "}
          <code className="language-text">index.html</code>.
        </li>
        <li>
          Populate the page with some HTML. See <b>index.html Example</b> below.
        </li>
        <li>
          Click <b>Commit new file</b> at the bottom.
        </li>
      </ol>

      <h2>index.html Example</h2>
      <pre>
        <code className="language-markup">
          {`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>My New Website</title>
    </head>

    <body>
      <h1>Welcome!</h1>
    </body>
  </html>
              `}
        </code>
      </pre>

      <Image
        alt="Illustration of rocketship"
        height={821}
        src="/assets/create-a-website3.jpg"
        layout="responsive"
        width={1040}
      />

      <h2 id="deploy-your-website">Deploy Your Website</h2>
      <p>
        You should be back on the main page of your repo, and you should see the
        new <code className="language-text">index.html</code> file you created.
      </p>
      <ul>
        <li>
          Go to <b>Settings</b> at the top right.
        </li>
        <li>
          Scroll all the way down to the <b>GitHub Pages</b> section - it will
          now display a URL that looks similar to this:
          https://github.com/username/example-site.
        </li>
        <li>Click on it to see your website.</li>
      </ul>

      <h2>Add a Custom Domain</h2>
      <p>
        Under the <b>GitHub Pages</b> section, there is a <b>Custom domain</b>{" "}
        section.
      </p>
      <ul>
        <li>Enter the domain you purchased into that field.</li>
        <li>
          On the domain provider side of things, GitHub provides{" "}
          <a href="https://help.github.com/en/articles/setting-up-an-apex-domain">
            some guidance here
          </a>
          . It's different for every provider, but it comes down to setting some
          records.
        </li>
      </ul>
    </BlogPage>
  );
}
