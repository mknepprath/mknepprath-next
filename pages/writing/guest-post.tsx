import fetch from "isomorphic-unfetch";
import Markov from "markov-strings";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

import A from "@core/a";
import BlogPage from "@core/blog-page";

interface MarkovResult {
  string: string;
  score: number;
  tries: number;
  refs: Array<{ [key: string]: string }>;
}

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

const options = {
  maxTries: 100,

  // You'll often need to manually filter raw results to get something that fits your needs.
  filter: (result: MarkovResult) => {
    return result.string.split(" ").length >= 5;
  },
};

/* To Title Case © 2018 David Gouch | https://github.com/gouch/to-title-case */
function toTitleCase(str: string) {
  const smallWords =
    /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;
  const alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/;
  const wordSeparators = /([ :–—-])/;

  return str
    .split(wordSeparators)
    .map(function (current, index, array) {
      if (
        /* Check for small words */
        current.search(smallWords) > -1 &&
        /* Skip first and last word */
        index !== 0 &&
        index !== array.length - 1 &&
        /* Ignore title end and subtitle start */
        array[index - 3] !== ":" &&
        array[index + 1] !== ":" &&
        /* Ignore small words that start a hyphenated phrase */
        (array[index + 1] !== "-" ||
          (array[index - 1] === "-" && array[index + 1] === "-"))
      ) {
        return current.toLowerCase();
      }

      /* Ignore intentional capitalization */
      if (current.substr(1).search(/[A-Z]|\../) > -1) {
        return current;
      }

      /* Ignore URLs */
      if (array[index + 1] === ":" && array[index + 2] !== "") {
        return current;
      }

      /* Capitalize the first letter */
      return current.replace(alphanumericPattern, function (match) {
        return match.toUpperCase();
      });
    })
    .join("");
}

function shuffle(array: Media[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const punctuate = (s: string) =>
  !s.endsWith(".") && !s.endsWith("!") && !s.endsWith("?");

const cleanUp = (s = "") =>
  s
    .split(" ")
    .filter((t) => !t.startsWith("@") && !t.startsWith("https://"))
    .join(" ")
    .replace("&amp;", "&");

export const meta = {
  image: "/assets/guest-post.jpg",
  published: false,
  publishedAt: "2021-01-25",
  summary: "A blog post written by @robot_mk.",
  title: "The Guest Post",
  tweetId: "1353885918655082496",
};

export default function BillsPc(): React.ReactNode {
  const [userId, setUserId] = useState("15332057");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<Media>();
  const [lines, setLines] = useState<MarkovResult[]>([]);

  const { data: tweets } = useSWR<Tweets>(
    `/api/v1/timeline/${userId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (tweets?.data) {
      const results = [];
      const markov = new Markov({ stateSize: 1 });
      for (let i = 0; i <= 17; i++) {
        markov.addData(tweets?.data.map((d) => d.text));
        const result = markov.generate(options);
        results.push(result);
        setTitle(cleanUp(result.string));
      }
      setLines(results);

      const media = shuffle(tweets.includes.media).find(
        (m) => m.type === "photo"
      );
      setImage(media);
    }
  }, [tweets?.data, tweets?.includes.media]);

  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={cleanUp(lines[0]?.string)}
      ogImage={meta.image}
      title={toTitleCase(title)}
      tweetId={meta.tweetId}
    >
      {image ? (
        <Image
          alt="An image from Twitter."
          className="corner-radius-8"
          height={image.height}
          layout="responsive"
          priority
          src={image.url}
          width={image.width}
        />
      ) : null}

      <header>
        <h1>{toTitleCase(title)}</h1>
      </header>

      <p>
        {lines.slice(0, 5).map(({ string }, index) => (
          <Fragment key={index}>
            {cleanUp(string)}
            {punctuate(cleanUp(string)) ? "." : ""}{" "}
          </Fragment>
        ))}
      </p>

      <p>
        {lines.slice(5, 12).map(({ string }, index) => (
          <Fragment key={index}>
            {cleanUp(string)}
            {punctuate(cleanUp(string)) ? "." : ""}{" "}
          </Fragment>
        ))}
      </p>

      <p>
        {lines.slice(12).map(({ string }, index) => (
          <Fragment key={index}>
            {cleanUp(string)}
            {punctuate(cleanUp(string)) ? "." : ""}{" "}
          </Fragment>
        ))}
      </p>

      <p>
        <em>
          This guest blog post was written by{" "}
          <A href="https://twitter.com/robot_mk">@robot_mk</A>.
        </em>
      </p>

      <hr />

      <small>
        <label htmlFor="twitterId">Twitter ID</label>
        <input
          id="twitterId"
          onChange={(event) => setUserId(event.target.value)}
          value={userId}
        />
      </small>
    </BlogPage>
  );
}
