// WIP
// - Need to figure out how to get actual blog post content displayed.
// - My initial instict would be to make post content a component, and this
//   be a template similar to normal pages.
import Footer from "../../core/footer";
import Head from "../../core/head";
import Nav from "../../core/nav";

import { useRouter } from "next/router";

export default () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <Head title={"Michael Knepprath, Occasional Blogger"} />
      <Nav />

      <div className={"container"}>
        <h1>{router.query.id}</h1>
        <p>This is the blog post content.</p>
      </div>

      <Footer />
    </React.Fragment>
  );
};
