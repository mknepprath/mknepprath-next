import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";
import xml2js from "xml2js";

const LETTERBOXD_RSS = `https://letterboxd.com/mknepprath/rss/`;

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { max_results, min_rating } = req.query;
  const films: Film[] = [];
  await fetch(LETTERBOXD_RSS)
    .then((response) => response.text())
    .then((body) => {
      xml2js.parseString(body, function (error, response) {
        if (error) console.error(error);
        const filmList = response.rss.channel[0].item;
        for (let i = 0; i < filmList.length; i++) {
          const review = filmList[i].description[0].split(`</p>`);
          review.shift();
          films.push({
            image_url: filmList[i].description[0].split(`"`)[1],
            link: filmList[i].link[0],
            // published_at: filmList[i]["letterboxd:watchedDate"]?.[0],
            published_at: filmList[i].pubDate[0],
            rating: filmList[i]["letterboxd:memberRating"]?.[0],
            review: review.join(`</p>`),
            title: filmList[i]["letterboxd:filmTitle"]?.[0],
            year: filmList[i]["letterboxd:filmYear"]?.[0],
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
  res.end(
    JSON.stringify(
      films
        .filter(
          (film) =>
            +film.rating > (min_rating ? parseInt(min_rating as string) : 3)
        )
        .slice(0, max_results ? parseInt(max_results as string) : 6)
    )
  );
};
