import fetch from "isomorphic-unfetch";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

import BlogPage from "@core/blog-page";

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

interface Pokemon {
  evolvesFrom: number;
  id: number;
  name: string;
  types: string[];
}

export const meta = {
  image: "/assets/bills-pc.jpg",
  published: true,
  publishedAt: "2020-12-04",
  summary: "Using API routes to clean up data.",
  title: "Pokémon Data Munging",
  tweetId: "1335265057190649858",
};

export default function BillsPc(): React.ReactNode {
  const [pokemonId, setPokemonId] = useState(0);
  const { data: pokemons } = useSWR(`/api/v1/released-pokemon`, fetcher);

  useEffect(() => {
    if (pokemons?.length)
      setPokemonId(pokemons[Math.floor(Math.random() * pokemons.length)].id);
  }, [pokemons]);

  const pokemon = pokemons?.find((p: Pokemon) => p.id === pokemonId);

  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
      tweetId={meta.tweetId}
    >
      <Image
        alt="Colored lines."
        className="corner-radius-8"
        height={1040}
        layout="responsive"
        priority
        src={meta.image}
        width={2000}
      />
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        Tonight, I thought it&apos;d be fun to detail out a choice I made while
        building <Link href="/writing/lily-dex">lily dex</Link> that I had very
        little confidence in, but has been serving me well thus far.
      </p>
      <h2>The Problem</h2>
      <p>
        Early iterations of lily dex included the full list of Pokémon{" "}
        <em>in the app code</em>, therefore requiring an app update every single
        time a new Pokémon was added to Pokémon Go. I&apos;d have to open Xcode,
        update the app, push the update, wait for Apple&apos;s approval... and
        then players would have to manually update or wait for the automatic
        update to get the change.
      </p>
      <p>Every. Single. Time.</p>
      <p>
        This was the first thing that had to change once I decided lily dex was
        destined for The App Store.
      </p>
      <p>
        At this point, I was about three months into a SwiftUI course and had
        very limited experience with fetching and working with data in Swift.
        The API I wanted to use (PoGo API) would require a ton of this - it
        returned data as large objects and I wanted arrays.
      </p>
      <pre>
        <code className="language-js">
          {`
// PoGo API:
{
    "1": {
        "id": "1",
        "name": "Bulbasaur"
    },
    "2": {
        "id": "2",
        "name": "Ivysaur"
    },
}

// What I wanted:
[
    {
        "id": "1",
        "name": "Bulbasaur"
    },
    {
        "id": "2",
        "name": "Ivysaur"
    },
]

            `}
        </code>
      </pre>
      <p>
        I also wanted to add additional details for each Pokémon from other PoGo
        API endpoints. This would require a lot of data transformation and
        coercion - far beyond what I&apos;d learned during my Swift course at
        that point.
      </p>
      <h2>The Solution: An API Route</h2>
      <p>
        So, on one side, I had an API with a bunch of endpoints returning data I
        wanted to transform and merge. On the other, I had an app that needed to
        receive nicely-formatted data.
      </p>
      <p>
        Could I create a passthrough endpoint that consumed the PoGo API and
        returned the data in the structure I wanted?
      </p>
      <p>
        The framework my personal site is built on offers a feature called{" "}
        <a
          href="https://nextjs.org/learn/basics/api-routes"
          rel="noopener noreferrer"
          target="_blank"
        >
          API routes
        </a>
        , which lets you create API endpoints as a Node.js serverless functions.
        This seemed like a good candidate for what I was trying to accomplish -
        I created a new API route called{" "}
        <a
          href="https://github.com/mknepprath/mknepprath-next/blob/master/pages/api/v1/released-pokemon.ts"
          rel="noopener noreferrer"
          target="_blank"
        >
          released-pokemon.ts
        </a>{" "}
        where I started making calls to the PoGo API. I then transformed nearly
        all the responses and returned them as an array containing all the
        details I wanted in my app.
      </p>
      {pokemon ? (
        <>
          <p>Here&apos;s some data from this new endpoint:</p>
          <blockquote>
            {pokemon.name} is a {pokemon.types.join("/")}
            -type Pokémon.
            {pokemon.shinyReleased
              ? ` The shiny version has been released.`
              : null}
            {pokemon.candyRequired
              ? ` You need to collect ${
                  pokemon.candyRequired
                } candy to evolve ${
                  pokemons.find((p: Pokemon) => p.id === pokemon.evolvesFrom)
                    .name
                } into ${pokemon.name}.`
              : null}
            <button
              onClick={() =>
                setPokemonId(
                  pokemons[Math.floor(Math.random() * pokemons.length)].id
                )
              }
            >
              Refresh
            </button>
          </blockquote>
        </>
      ) : null}
      <p>
        As things currently stand, lily dex calls this endpoint, which calls the
        PoGo API. I&apos;m not sure sending all the data through my personal
        site makes sense... I could set up a lambda anywhere and accomplish the
        same thing. I could do all this data wrangling in the app. I feel
        insecure about these things.
      </p>
      <p>
        But this architecture works. I was able to set it up fast, and it gives
        me the flexibility to make API changes without having to muck with Xcode
        or App Store Connect. This has come in handy more than once!
      </p>
      <p>
        How would you handle this? Were my concerns that led me to building this
        Rube Goldbergian architecture overblown?{" "}
        <a
          href="https://twitter.com/mknepprath"
          rel="noopener noreferrer"
          target="_blank"
        >
          Let me know!
        </a>
      </p>
    </BlogPage>
  );
}
