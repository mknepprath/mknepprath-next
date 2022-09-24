import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  });

  const result = await octokit.request("GET /user", {});
  // get repo list
  const repos = await octokit.request("GET /user/repos", {
    type: "owner",
    sort: "updated",
    direction: "desc",
  });

  // get commits for each repo
  const reposAndLastCommit = await Promise.all(
    repos.data.map(async (repo) => {
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

      return { ...repo, last_commit: lastCommit?.commit?.committer?.date };
    })
  );

  const filteredRepos = reposAndLastCommit
    .filter((repo) => !repo.fork && !repo.private && repo.last_commit)
    .map((repo) => ({
      description: repo.description,
      homepage: repo.homepage,
      html_url: repo.html_url,
      id: repo.id,
      name: repo.name,
      pushed_at: repo.last_commit,
    }));

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=86400");
  res.end(JSON.stringify(filteredRepos));
};
