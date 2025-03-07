import { Endpoints } from "@octokit/types";
import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  });

  // get repo list
  const repos: Endpoints["GET /user/repos"]["response"] = await octokit.request(
    "GET /user/repos",
    {
      owner: "mknepprath",
      sort: "updated",
      direction: "desc",
      visibility: "all",
    },
  );

  // get commits for each repo
  const reposAndLastCommit = await Promise.all(
    repos.data
      .filter((repo) => !repo.fork)
      .map(async (repo) => {
        const commits: Endpoints["GET /repos/{owner}/{repo}/commits"]["response"] =
          await octokit.request("GET /repos/{owner}/{repo}/commits", {
            owner: repo.owner.login,
            repo: repo.name,
          });
        // get last commit by me
        const lastCommit = commits.data.find(
          (commit) => commit?.author?.login === "mknepprath",
        );

        return {
          description: lastCommit?.commit?.committer?.email?.includes(
            "mknepprath",
          )
            ? lastCommit?.commit?.message
            : repo.description,
          homepage: repo.homepage,
          html_url: repo.html_url,
          id: repo.id,
          name: repo.name,
          pushed_at: lastCommit?.commit?.committer?.date,
        };
      }),
  );

  const filteredRepos = reposAndLastCommit.filter((repo) => repo.pushed_at);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV === "production")
    res.setHeader(
      "Cache-Control",
      "max-age=0, s-maxage=1, stale-while-revalidate",
    );
  res.end(JSON.stringify(filteredRepos));
};
