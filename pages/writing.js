import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import parse from "date-fns/parse";

import Page from "core/page";

import { posts } from "../posts.json";

class Writing extends React.Component {
  render() {
    const {
      router: { query }
    } = this.props;

    return (
      <Page>
        <Head>
          <title key="title">Michael Knepprath, Occasional Writer</title>
        </Head>

        <div className={"blog-container container"}>
          <h1>Writing</h1>
          <main>
            {posts
              // Including this query param will display all posts.
              // https://mknepprath.com/writing?all=true
              .filter(post => post.published || query.all)
              // The `sort` method can be conveniently used with function expressions:
              // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
              .sort((a, b) => parse(b.date) - parse(a.date))
              .map(post => (
                <article key={post.id}>
                  <header>
                    <Link href={`/writing/${post.id}`}>
                      <a>
                        <h2 style={{ marginBottom: 0 }}>{post.title}</h2>
                      </a>
                    </Link>{" "}
                    <small>{post.date}</small>
                  </header>
                </article>
              ))}
          </main>
        </div>
      </Page>
    );
  }
}

export default withRouter(Writing);
