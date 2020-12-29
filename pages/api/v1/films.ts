import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";
import xml2js from "xml2js";

const LETTERBOXD_RSS = `https://letterboxd.com/mknepprath/rss/`;

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const films: Film[] = [];
  await fetch(LETTERBOXD_RSS)
    .then((response) => response.text())
    .then((body) => {
      xml2js.parseString(body, function (error, response) {
        if (error) console.error(error);
        console.info("Getting Film List from Letterboxd API");
        const filmList = response.rss.channel[0].item;
        for (let i = 0; i < filmList.length; i++) {
          films.push({
            title: filmList[i]["letterboxd:filmTitle"][0],
            year: filmList[i]["letterboxd:filmYear"][0],
            image_url: filmList[i].description[0],
            link: filmList[i].link[0],
            rating: filmList[i]["letterboxd:memberRating"]?.[0],
          });
        }
      });
    })
    .catch((error) => console.error(error));

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=86400");
  res.end(JSON.stringify(films.filter((film) => +film.rating > 3).slice(0, 6)));
};
