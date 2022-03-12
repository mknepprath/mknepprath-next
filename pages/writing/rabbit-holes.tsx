import Image from "next/image";

import BlogPage from "@core/blog-page";

export const meta = {
  image: "/assets/sherlock-codes.jpg",
  published: false,
  publishedAt: "2021-02-18",
  summary: "Mystery game mechanics as an allegory for debugging.",
  title: "10x Detective",
  // tweetId: "1361426223470170117",
};

export default function RabbitHoles(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
      // tweetId={meta.tweetId}
    >
      <Image
        alt="Bug Detective"
        className="bordered-image corner-radius-8"
        height={690}
        src={meta.image}
        layout="responsive"
        priority
        width={1200}
      />
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        Every fandom, every hobby can become a rabbit hole. Take Pokémon cards
        for example.
        <code>
          {`
        Yeah hahaa
I suppose those are like a window into the meta from like 2 years ago
WeSkillNow01/25/2021
I've often found that when I actaully get into a game and talk to the people that have been in the competitive scene, they know a lot
You always think you're good until...
mk01/25/2021
Nothing has been more eye opening to me in that regard than reading comments by people talking about the Pokémon meta
Core series, not pogo
I’m like what are you even saying
WeSkillNow01/25/2021
Every community goes hard
mk01/25/2021
But I just apply that to everything now, what I know barely scratches the surface of any of this stuff
Yeah`}
        </code>
      </p>
      <p>
        I also recently got into a discusson about movies recently where a
        friend was getting frustrated with people taking ire at Scorsese&apos;s
        comments about superhero movies. This friend loves film as an artform,
        and would be the equivalent to a Pokémon TCG championship player but for
        film.
      </p>
      <p>
        It is interesting, because these groups have always existed - and we’re
        probably in the 95th percentile of how much people think about movies,
        so we are and have always been the minority here. And this dynamic plays
        out for every topic imaginable. I think, when on the internet, there has
        to be some understanding from the people who have very specific in-depth
        knowledge… that not everyone has that.
      </p>
    </BlogPage>
  );
}
