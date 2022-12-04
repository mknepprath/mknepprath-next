import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";
import xml2js from "xml2js";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const toots: TootRss[] = [];
  await fetch(`https://mastodon.social/@mknepprath.rss`)
    .then((response) => response.text())
    .then((body) => {
      xml2js.parseString(body, function (error, response) {
        if (error) console.error(error);
        const tootList = response.rss.channel[0].item;
        for (let i = 0; i < tootList.length; i++) {
          toots.push({
            description: tootList[i].description[0],
            id: tootList[i].guid[0]._,
            image: tootList[i]?.["media:content"]?.[0].$.url,
            published_at: tootList[i].pubDate[0],
          });
        }
      });
    })
    .catch((error) => console.error(error));

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV === "production")
    res.setHeader(
      "Cache-Control",
      "max-age=0, s-maxage=1, stale-while-revalidate"
    );
  res.end(JSON.stringify(toots));
};
