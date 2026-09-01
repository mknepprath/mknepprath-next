import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

interface CommitNode {
  committedDate: string;
  message: string;
  author: { user: { login: string } | null } | null;
  committer: { email: string | null } | null;
}

interface RepoNode {
  databaseId: number;
  name: string;
  description: string | null;
  homepageUrl: string | null;
  url: string;
  defaultBranchRef: {
    target: { history: { nodes: CommitNode[] } };
  } | null;
}

interface GraphQLResponse {
  viewer: { repositories: { nodes: RepoNode[] } };
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN });

  const data = await octokit.graphql<GraphQLResponse>(`
    {
      viewer {
        repositories(
          first: 100
          isFork: false
          orderBy: { field: PUSHED_AT, direction: DESC }
        ) {
          nodes {
            databaseId
            name
            description
            homepageUrl
            url
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 10) {
                    nodes {
                      committedDate
                      message
                      author {
                        user { login }
                      }
                      committer {
                        email
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const repos = data.viewer.repositories.nodes
    .map((repo) => {
      const commits = repo.defaultBranchRef?.target?.history?.nodes ?? [];
      const lastCommit = commits.find(
        (c) => c.author?.user?.login === "mknepprath",
      );
      if (!lastCommit) return null;

      return {
        description: lastCommit.committer?.email?.includes("mknepprath")
          ? lastCommit.message
          : repo.description,
        homepage: repo.homepageUrl,
        html_url: repo.url,
        id: repo.databaseId,
        name: repo.name,
        pushed_at: lastCommit.committedDate,
      };
    })
    .filter((repo): repo is NonNullable<typeof repo> => repo !== null);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV === "production")
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=86400",
    );
  res.end(JSON.stringify(repos));
};
