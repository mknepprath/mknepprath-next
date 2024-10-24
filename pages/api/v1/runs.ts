import fetch from "isomorphic-unfetch";
import { NextApiRequest, NextApiResponse } from "next";

// State for tokens
let accessToken = "";
let refreshToken = process.env.STRAVA_REFRESH_TOKEN || "";

// Function to refresh the access token
async function refreshAccessToken(): Promise<void> {
  try {
    const response = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh access token: ${response.statusText}`);
    }

    const data = await response.json();
    accessToken = data.access_token;
    refreshToken = data.refresh_token; // Update with the latest refresh token
    console.log("Access token refreshed successfully.");
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Failed to refresh access token.");
  }
}

// Function to fetch recent runs
async function fetchRecentRuns(minMiles: number = 0): Promise<Run[]> {
  // Refresh token if access token is empty
  if (!accessToken) {
    await refreshAccessToken();
  }

  try {
    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=10`, // Fetch the latest 10 runs
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        // Handle expired token by refreshing and retrying
        await refreshAccessToken();
        return fetchRecentRuns(minMiles);
      } else {
        throw new Error(`Failed to fetch activities: ${response.statusText}`);
      }
    }

    const activities: Run[] = await response.json();

    // Convert miles to meters for filtering
    const minMeters = minMiles * 1609.34;

    // Filter for 'Run' type activities only, those meeting the min miles criteria,
    // and ensure activities are not private or restricted in visibility
    const runs = activities.filter(
      (activity) =>
        // activity.type === "Run" &&
        activity.distance > minMeters &&
        !activity.private && // Exclude private activities
        activity.visibility !== "only_me", // Exclude activities marked as visible to only the user
    );

    return runs;
  } catch (error) {
    console.error("Error fetching runs:", error);
    return [];
  }
}

// Next.js API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  // Get minMiles from query parameters, default to 0 if not provided
  const minMiles = parseFloat(req.query.minMiles as string) || 0;

  try {
    const runs = await fetchRecentRuns(minMiles);
    res.status(200).json(runs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching runs" });
  }
}
