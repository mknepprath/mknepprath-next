import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  });

  // get repo list
  const repos = await octokit.request("GET /user/repos", {
    owner: "mknepprath",
    sort: "updated",
    direction: "desc",
    visibility: "all",
  });

  // get commits for each repo
  const reposAndLastCommit = await Promise.all(
    repos.data
      .filter((repo) => !repo.fork)
      .map(async (repo) => {
        const commits = await octokit.request(
          "GET /repos/{owner}/{repo}/commits",
          {
            owner: repo.owner.login,
            repo: repo.name,
          }
        );
        // get last commit by me
        const lastCommit = commits.data.find(
          (commit) => commit?.author?.login === "mknepprath"
        );

        return {
          pushed_at: repo.pushed_at,
          id: repo.id,
          description: repo.description,
          name: repo.name,
          homepage: repo.homepage,
          html_url: repo.html_url,
          last_commit: lastCommit?.commit?.committer?.date,
        };
      })
  );

  const filteredRepos = reposAndLastCommit.filter((repo) => repo.last_commit);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV === "production")
    res.setHeader("Cache-Control", "max-age=86400");
  res.end(JSON.stringify(filteredRepos));
};
