import Head from "next/head";
import Link from "next/link";
import parse from "date-fns/parse";

import Page from "core/page";

import { posts } from "../posts.json";

export default () => (
  <Page>
    <Head>
      <title key="title">Michael Knepprath, Occasional Writer</title>
    </Head>

    <div className={"blog-container container"}>
      <h1>Writing</h1>
      <ul>
        {posts
          .filter(post => post.published)
          // The `sort` method can be conveniently used with function expressions:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
          .sort((a, b) => parse(b.date) - parse(a.date))
          .map(post => (
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
