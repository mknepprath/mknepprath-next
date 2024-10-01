import { parse } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import playwright from "playwright-core"; // Use playwright-core for browser automation

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "PSN username is required" });
  }

  const psnLogUrl = `https://psnprofiles.com/${username}/log`;

  let browser: playwright.Browser | null = null;

  try {
    // Launch Playwright browser
    browser = await playwright.chromium.launch({
      headless: true, // Always run in headless mode
    });

    const page = await browser.newPage();

    // Navigate to the PSNProfiles log page for the user
    await page.goto(psnLogUrl, { waitUntil: "networkidle" });

    // Scrape the trophy log data
    const trophies = await page.evaluate(() => {
      const rows = document.querySelectorAll("tr"); // Select all table rows (each row represents a trophy log)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Array.from(rows).map((el: any) => {
        const gameImg = el.querySelector("img.game")?.src || ""; // Game image
        const trophyImg = el.querySelector("img.trophy")?.src || ""; // Trophy image
        const gameUrl = el.querySelector('a[href*="/trophies/"]')?.href || ""; // Game URL
        const trophyUrl = el.querySelector('a[href*="/trophy/"]')?.href || ""; // Trophy URL
        const trophyTitle =
          el.querySelector(".title")?.textContent?.trim() || ""; // Trophy title
        const trophyDesc =
          el
            .querySelector(".title")
            ?.parentElement?.innerHTML.split("<br>")[1]
            ?.trim() || "";
        const rank = el.querySelector("b")?.textContent?.trim() || ""; // Rank
        const earnedDate =
          el.querySelector(".typo-top-date")?.textContent?.trim() || ""; // Earned date
        const earnedTime =
          el.querySelector(".typo-bottom-date")?.textContent?.trim() || ""; // Earned time
        const achievers =
          el.querySelector(".typo-top")?.textContent?.trim() || ""; // Achievers
        const owners =
          el.querySelectorAll(".typo-top")[1]?.textContent?.trim() || ""; // Owners
        const rarity =
          el.querySelectorAll(".typo-top")[2]?.textContent?.trim() || ""; // Rarity percentage
        const rarityType =
          el.querySelectorAll(".typo-bottom nobr")[2]?.textContent?.trim() ||
          ""; // Rarity type (Common, Rare, etc.)
        const trophyType = el.querySelector("img[title]")?.title || ""; // Trophy type (Bronze, Silver, etc.)

        return {
          gameImg,
          trophyImg,
          gameUrl,
          trophyUrl,
          trophyTitle,
          trophyDesc,
          rank,
          earnedDate,
          earnedTime,
          achievers,
          owners,
          rarity,
          rarityType,
          trophyType,
        };
      });
    });

    await browser.close();

    // Use date-fns to parse the earned date and time into a proper timestamp
    const formattedTrophies = trophies.map((trophy) => {
      const dateTimeString =
        `${trophy.earnedDate} ${trophy.earnedTime}`.replace(
          /(\d+)(st|nd|rd|th)/,
          "$1",
        ); // Remove ordinal suffixes
      const parsedDate = parse(
        dateTimeString,
        "d MMM yyyy h:mm:ss a",
        new Date(),
      ); // Using date-fns to parse the date
      const earnedTimestamp = parsedDate.toISOString();

      return {
        ...trophy,
        earnedTimestamp, // The ISO 8601 timestamp
      };
    });

    // Filter out empty entries (in case of header rows or invalid entries)
    const filteredTrophies = formattedTrophies.filter(
      (trophy) => trophy.trophyTitle,
    );

    // Return the scraped trophy log data
    res.status(200).json(filteredTrophies);
  } catch (error) {
    console.error("Error scraping PSNProfiles log:", error);

    if (browser) {
      await browser.close();
    }

    res.status(500).json({ error: "Failed to scrape trophy log data" });
  }
}
