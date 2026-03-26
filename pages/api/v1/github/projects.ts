import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const repos = req.query.repos;
  if (!repos || typeof repos !== "string") {
    res.status(400).json({ error: "repos query param required" });
    return;
  }

  const repoList = repos.split(",");

  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  });

  const result: Record<string, { pushedAt: string }> = {};

  await Promise.all(
    repoList.map(async (fullName) => {
      const [owner, repo] = fullName.split("/");
      if (!owner || !repo) return;
      try {
        const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
          owner,
          repo,
        });
        result[fullName] = { pushedAt: data.pushed_at };
      } catch {
        // Skip repos that can't be fetched
      }
    }),
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV === "production")
    res.setHeader(
      "Cache-Control",
      "max-age=0, s-maxage=3600, stale-while-revalidate",
    );
  res.end(JSON.stringify(result));
};
