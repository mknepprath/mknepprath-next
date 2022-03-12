import BlogPage from "@core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2013-12-19",
  title: "Spotify App Adds Free Option",
};

export default function SpotifyGoesFree(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        You can finally listen to all of your Spotify playlists on your phone
        without paying for Premium. Only one catch – you have to listen to them
        on shuffle. Not bad.
      </p>
      <p>
        In other news, I hear their desktop client just went through a major
        redesign. Haven’t seen it yet, but I look forward to doing so!
      </p>
    </BlogPage>
  );
}
