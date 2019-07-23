import Head from "next/head";
import Link from "next/link";

import Page from "../core/page";

import { posts } from "../posts.json";

export default () => (
  <Page>
    <Head>
      <title key="title">Michael Knepprath, Occasional Writer</title>
    </Head>

    <div className={"blog-container container"}>
      <h1>Writings</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/writing/${post.id}`}>
              <a>{post.title}</a>
            </Link>{" "}
            {post.date}
          </li>
        ))}
      </ul>
    </div>
  </Page>
);
