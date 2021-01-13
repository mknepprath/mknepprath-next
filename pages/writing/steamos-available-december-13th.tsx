import BlogPage from "core/blog-page";

export const meta = {
  published: true,
  publishedAt: "2013-12-12",
  title: "SteamOS Available December 13th",
};

export default function SteamOs(): React.ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <p>
        <a href="http://cir.ca/s/MeJ">Anyone interested?</a> I have a lot of
        respect for Steam, and appreciate their contributions to the gaming
        community. I sense a bit of skepticism around their latest endeavors
        including SteamOS, Steam Machines, and their new controller – but if
        anyone is going to eat this stuff up, it’s Steam’s community.{" "}
      </p>
      <p>
        My question is, how many of these people already have their computer set
        up in their living room as their main device for consuming all digital
        media (films, games, etc)? I doubt they’d replace this set up with a
        Steam machine. Keyboards can be cumbersome on the couch, however, so I
        could see them getting the new controller if it is as precise as Steam
        says.
      </p>
    </BlogPage>
  );
}
