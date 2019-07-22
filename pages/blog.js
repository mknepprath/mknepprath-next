// WIP
import Head from "next/head";
import Link from "next/link";

import Page from "../core/page";

import { posts } from "../posts.json";

export default () => (
  <Page>
    <Head>
      <title key="title">Michael Knepprath, Occasional Blogger</title>
    </Head>

    <div className={"container"}>
      <h1>My Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <a>{post.title}</a>
            </Link>{" "}
            {post.date}
          </li>
        ))}
      </ul>
    </div>
  </Page>
);
