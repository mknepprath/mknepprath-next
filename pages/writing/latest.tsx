import React from "react";

// Components
import Head from "core/head";
import Nav from "core/nav";

// Data
import posts from "data/posts";

export default function Latest() {
  React.useEffect(() => {
    window.location.href = `/writing/${posts[0].id}`;
  }, []);
  return (
    <div className="container">
      <Head title="Redirecting..." ogImage={posts[0].image} />
      <Nav />
    </div>
  );
}
