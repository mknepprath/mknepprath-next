// WIP

import Link from "next/link";

import Footer from "../core/footer";
import Head from "../core/head";
import Nav from "../core/nav";

export const blogPosts = [
  {
    id: "a",
    name: "First Post",
    summary: "Some text for the first blog post."
  },
  {
    id: "b",
    name: "Second Post",
    summary: "Second blog post content here."
  }
];

const PostLink = ({ post }) => (
  <li key={post.id}>
    <Link href="/blog/[id]" as={`/blog/${post.id}`}>
      <a>{post.name}</a>
    </Link>
  </li>
);

export default () => (
  <div>
    <Head title={"Michael Knepprath, Occasional Blogger"} />
    <Nav />

    <div className={"container"}>
      <h1>My Blog</h1>
      <ul>
        {blogPosts.map(post => (
          <PostLink key={post.id} post={post} />
        ))}
      </ul>
    </div>

    <Footer />
  </div>
);
