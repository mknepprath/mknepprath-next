import Image from "next/image";

import A from "core/a";
import BlogPage from "core/blog-page";

export const meta = {
  image: "/assets/dependabot.jpg",
  published: true,
  publishedAt: "2021-01-12",
  summary: "How I learned to stop worrying and love the bot.",
  title: "Auto-Merging Dependabot Pull Requests",
};

export default function AutomergingDependabotPullRequests(): React.ReactNode {
  return (
    <BlogPage
      dateTime={meta.publishedAt}
      description={meta.summary}
      ogImage={meta.image}
      title={meta.title}
    >
      <header>
        <h1>{meta.title}</h1>
      </header>
      <p>
        There are few things less fun than keeping all of my websites&apos;
        dependencies up to date. About a year ago, I added{" "}
        <A href="https://dependabot.com">Dependabot</A> to my personal
        projects...
      </p>
      <blockquote>
        <p>
          Dependabot pulls down your dependency files and looks for any outdated
          or insecure requirements. If any of your dependencies are out-of-date,
          Dependabot opens individual pull requests to update each one.
        </p>
      </blockquote>
      <p>
        This made the process <em>way</em> easier. Thanks to{" "}
        <A href="https://vercel.com/docs/git/vercel-for-github">
          Vercel for GitHub
        </A>
        , all of my pull requests included a preview URL where I could verify
        everything was working as expected before I merged my changes. So at
        this point, I&apos;d open the preview URL, verify everything looked
        good, and click the merge button.
      </p>
      <p>
        I was feeling great! ... But then{" "}
        <A href="https://twitter.com/brian_lovin/status/1205284197679665154">
          Brian Lovin
        </A>{" "}
        suggested a way to make it even better.
      </p>
      <blockquote className="twitter-tweet">
        <p lang="en" dir="ltr">
          Add some tests + auto merging + auto deploying and put that on
          autopilot 🚀
        </p>
        &mdash; Brian Lovin (@brian_lovin){" "}
        <a href="https://twitter.com/brian_lovin/status/1205284197679665154?ref_src=twsrc%5Etfw">
          December 13, 2019
        </a>
      </blockquote>
      <p>
        A year later, I was nearing the end of 2020 with a huge backlog of PRs.
        Despite how easy I had made it for myself, it was still a pain to verify
        and merge all of them one at a time. I decided to give Brian&apos;s
        suggestion a shot.
      </p>

      <h2>Add Some Tests</h2>
      <p>First problem: I had zero tests.</p>
      <p>
        When manually checking Vercel&apos;s preview URL, I&apos;d typically
        verify a few things, but for the most part, I&apos;d just check to make
        sure my site loaded up successfully.
      </p>
      <p>
        I decided to set up some tests with Cypress to check this instead. Most
        of the tests simply verify that the pages load - but some also check the
        content to make sure it&apos;s loading in a way I&apos;d expect.
      </p>
      <p>
        I then followed a guide to add the{" "}
        <A href="https://github.com/mknepprath/mknepprath-next/blob/master/.github/workflows/ci.yml">
          Cypress GitHub Action
        </A>{" "}
        to run these tests on every commit to GitHub. This was the first GitHub
        Action I ever implemented!
      </p>

      <h2>Auto-Merging</h2>
      <p>Now, the fun part.</p>
      <p>
        I had a lot of issues finding a GitHub Action that would work for me.
        While researching this, I discovered it was a feature that had been
        removed from Dependabot post-GitHub acquisition.{" "}
        <A href="https://github.community/t/allowing-github-actions-bot-to-push-to-protected-branch/16536/2">
          GitHub&apos;s reasoning
        </A>
        :
      </p>
      <blockquote>
        If we enabled GitHub Actions to push to a protected branch then any
        collaborator in your repo could push any code to any branch they wanted
        simply by creating a branch and coding the workflow to push to some
        other branch.
      </blockquote>
      <p>
        If you want to push to a protected branch, you have to have explicit
        permission to push to that branch. Bots not excluded.
      </p>
      <p>
        I spent some time trying to figure out how to give Dependabot push
        access to no avail. I did find a{" "}
        <A href="https://github.community/t/how-to-push-to-protected-branches-in-a-github-action/16101/11">
          different workaround
        </A>
        , however. Instead of giving push access to the bot, I set up the
        automation using an account that already had push access. Mine.
      </p>
      <p>
        You can check out this GitHub Action{" "}
        <A href="https://github.com/mknepprath/mknepprath-next/blob/master/.github/workflows/auto-merge.yml">
          here
        </A>
        .
      </p>
      <Image
        alt="My GitHub Action in action."
        className="corner-radius-8 bordered-image"
        height={1100}
        layout="responsive"
        priority
        src={meta.image}
        width={1880}
      />
      <p>
        After tweeting about this issue,{" "}
        <A href="https://twitter.com/FloFi/status/1348894135705612288?s=20">
          Florian Fittschen
        </A>{" "}
        suggested another (probably better) solution: using a GitHub Action to
        generate the token. I haven&apos;t tried this yet, but I&apos;d
        recommend looking into this for future auto-merge workflows.
      </p>

      <h2>Autopilot</h2>
      <p>
        This worked so well, I quickly added these same GitHub Actions to all of
        my other sites. Updates and security patches are now submitted, tested,
        merged, and deployed without any hand-holding from me - all I see are
        the merge notifications after the fact. Nice!
      </p>
      <blockquote className="twitter-tweet" data-conversation="none">
        <p lang="en" dir="ltr">
          Copied that action over to a couple of my repos yesterday, can&#39;t
          wait for the automerge magic to begin!
        </p>
        &mdash; Brian Lovin (@brian_lovin){" "}
        <a href="https://twitter.com/brian_lovin/status/1346529191622111233?ref_src=twsrc%5Etfw">
          January 5, 2021
        </a>
      </blockquote>
    </BlogPage>
  );
}
