import Page from "@core/page";
import Prism from "prismjs";
import React, { useEffect } from "react";

export default function Guide(): React.JSX.Element {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Page title="Build Your Website with Claude Code">
      <article>
        <header>
          <h1>Build Your Website with Claude Code</h1>
        </header>

        <p>
          So you want a website that does more than what Squarespace lets you do,
          but you don&apos;t want to learn to code. Good news: you don&apos;t
          have to. Claude Code is an AI that lives in your terminal and builds
          things for you. You describe what you want, it writes the code, and
          your site updates automatically.
        </p>
        <p>
          This guide will walk you through the one-time setup and then show you
          the day-to-day workflow. The setup takes about an hour. After that,
          making changes to your site takes minutes.
        </p>

        <h2>Cost, Up Front</h2>
        <p>
          Let&apos;s get this out of the way first so you can decide if
          it&apos;s worth it:
        </p>
        <ul>
          <li>
            <strong>Claude Pro subscription: $20/month</strong> &mdash; this
            gives you access to Claude Code. This is the main cost. The Max plan
            ($100/month) gives you more usage if you hit limits, but Pro is
            fine to start.
          </li>
          <li>
            <strong>Vercel hosting: free</strong> &mdash; for personal sites,
            you won&apos;t pay anything.
          </li>
          <li>
            <strong>Domain name: you already have one.</strong> You&apos;ll
            point it at Vercel instead of Squarespace. This is a one-time
            change in your domain registrar&apos;s settings (wherever you
            bought the domain). Claude can walk you through it, or Vercel has a{" "}
            <a href="https://vercel.com/docs/projects/domains">step-by-step guide</a>.
          </li>
          <li>
            <strong>GitHub: free</strong>
          </li>
        </ul>
        <p>
          So realistically: <strong>$20/month</strong>, compared to Squarespace
          at $16-49/month. The difference is that Claude Code gives you
          unlimited flexibility and you actually own everything. No lock-in, no
          &ldquo;upgrade to Business to unlock this feature.&rdquo; And once
          your site is built, you can cancel Claude Pro and only resubscribe
          when you want to make changes.
        </p>

        <h2>About the Terminal</h2>
        <p>
          Most of this guide happens in the terminal, which is the
          black-and-white text window developers use. If that sounds
          intimidating, here&apos;s the thing: <strong>you barely need to learn
          it.</strong> You need to know how to:
        </p>
        <ol>
          <li>Open it (search &ldquo;Terminal&rdquo; on Mac)</li>
          <li>Paste a command and press Enter</li>
          <li>Type <code>claude</code> to start talking to Claude Code</li>
        </ol>
        <p>
          That&apos;s it. Once Claude Code is running, you&apos;re just having a
          conversation in plain English. It handles all the technical stuff. If
          something goes wrong, you can literally say &ldquo;something went
          wrong, help&rdquo; and it will fix it.
        </p>
        <p>
          You will never need to read or write code. Claude Code reads and
          writes it for you. The terminal is just where you talk to it.
        </p>

        <h2>What You&apos;ll End Up With</h2>
        <ul>
          <li>A website you fully own and control</li>
          <li>Free hosting on Vercel (handles millions of visitors)</li>
          <li>
            The ability to change anything by describing what you want in plain
            English
          </li>
          <li>No monthly platform fees beyond the Claude subscription</li>
        </ul>

        <h2>Part 1: One-Time Setup</h2>
        <p>
          This is the only part that feels &ldquo;technical.&rdquo; You&apos;re
          installing a few tools. You only do this once. If you have a
          technical friend, this is a great thing to do together over a call.
        </p>

        <h3>Step 1: Create Accounts</h3>
        <p>You need two free accounts:</p>
        <ol>
          <li>
            <strong>GitHub</strong> &mdash;{" "}
            <a href="https://github.com/signup">github.com/signup</a>. This is
            where your site&apos;s files live. Think of it as a folder in the
            cloud that keeps a history of every change you&apos;ve ever made.
          </li>
          <li>
            <strong>Vercel</strong> &mdash;{" "}
            <a href="https://vercel.com/signup">vercel.com/signup</a>. Sign up
            with your GitHub account. This is what puts your site on the
            internet. Every time you make a change, Vercel automatically updates
            your live site.
          </li>
        </ol>

        <h3>Step 2: Install Tools</h3>
        <p>
          Open Terminal (on Mac, press Cmd+Space and type
          &ldquo;Terminal&rdquo;).
        </p>
        <p>
          Copy and paste each of these commands one at a time. Press Enter after
          each one and wait for it to finish before running the next.
        </p>

        <h4>Install Homebrew (a tool installer for Mac)</h4>
        <pre>
          <code className="language-bash">
            /bin/bash -c &quot;$(curl -fsSL
            https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)&quot;
          </code>
        </pre>
        <p>
          Follow any instructions it gives you at the end. It may ask you to
          paste two more commands to finish setup.
        </p>

        <h4>Install Node.js and Git</h4>
        <pre>
          <code className="language-bash">brew install node git</code>
        </pre>

        <h4>Install Claude Code</h4>
        <pre>
          <code className="language-bash">npm install -g @anthropic-ai/claude-code</code>
        </pre>

        <h3>Step 3: Create Your Site</h3>
        <p>Still in the terminal:</p>
        <pre>
          <code className="language-bash">
            {`npx create-next-app@latest my-site
cd my-site`}
          </code>
        </pre>
        <p>
          When it asks you questions, just press Enter to accept the defaults.
          This creates a starter website on your computer.
        </p>

        <h3>Step 4: Put It Online</h3>
        <pre>
          <code className="language-bash">
            {`git init
git add .
git commit -m "Initial site"
gh repo create my-site --public --push`}
          </code>
        </pre>
        <p>
          Now go to{" "}
          <a href="https://vercel.com/new">vercel.com/new</a>, click{" "}
          &ldquo;Import Git Repository,&rdquo; and select the repo you just
          created. Click Deploy. Your site is now live at a URL like{" "}
          <code>my-site.vercel.app</code>.
        </p>
        <p>
          Once you&apos;re happy with the site, you can point your existing
          domain at Vercel. Don&apos;t do this until your new site is ready
          though &mdash; your Squarespace site will keep working in the
          meantime.
        </p>

        <h2>Part 2: The Fun Part</h2>
        <p>
          From now on, this is your entire workflow for making changes to your
          site:
        </p>

        <h3>1. Open your project</h3>
        <pre>
          <code className="language-bash">
            {`cd my-site
claude`}
          </code>
        </pre>
        <p>
          This opens Claude Code. You&apos;re now in a conversation. It can see
          all your site&apos;s files and knows how to change them.
        </p>

        <h3>2. Tell it what you want</h3>
        <p>Just type what you want in plain English. For example:</p>
        <ul>
          <li>&ldquo;Add an About page with a photo of me and a short bio&rdquo;</li>
          <li>&ldquo;Make the navigation bar sticky so it stays at the top when I scroll&rdquo;</li>
          <li>&ldquo;Change the font to something more modern&rdquo;</li>
          <li>&ldquo;Add a grid of my portfolio projects with images and descriptions&rdquo;</li>
          <li>&ldquo;Make the site look good on mobile&rdquo;</li>
          <li>&ldquo;Add a contact form that sends me an email&rdquo;</li>
          <li>&ldquo;I don&apos;t like the color scheme, make it more warm and earthy&rdquo;</li>
        </ul>
        <p>
          Claude will make the changes and show you what it did. If you
          don&apos;t like something, just say so: &ldquo;actually make the
          header smaller&rdquo; or &ldquo;undo that.&rdquo;
        </p>

        <h3>3. Preview your changes</h3>
        <p>Open another terminal tab (Cmd+T) and run:</p>
        <pre>
          <code className="language-bash">npm run dev</code>
        </pre>
        <p>
          Then open{" "}
          <a href="http://localhost:3000">localhost:3000</a> in your browser.
          This is a live preview of your site. Every time Claude makes a change,
          refresh the page to see it.
        </p>

        <h3>4. Publish</h3>
        <p>When you&apos;re happy with the changes, tell Claude:</p>
        <ul>
          <li>&ldquo;Commit this and push it&rdquo;</li>
        </ul>
        <p>
          That&apos;s it. Vercel will automatically detect the change and update
          your live site within about a minute.
        </p>

        <h2>Start with a Spec</h2>
        <p>
          Before you start building, write down what you want your site to be.
          This doesn&apos;t need to be fancy. A few bullet points in a text file
          is perfect. Something like:
        </p>
        <pre>
          <code className="language-bash">
            {`# My Website
- Homepage with my name, a short intro, and a photo
- Portfolio page with a grid of my work (6 projects)
- About page with bio and contact info
- Simple navigation between pages
- Clean, minimal design. Light background, dark text.
- Colors: navy blue and white
- Font: something clean and modern`}
          </code>
        </pre>
        <p>
          Save this as a file called <code>SPEC.md</code> in your project
          folder. Then when you open Claude Code, start with:
        </p>
        <ul>
          <li>&ldquo;Read SPEC.md and build this site for me&rdquo;</li>
        </ul>
        <p>
          Claude will read your spec and start building. You can watch it work,
          and jump in with feedback as it goes. This is much more effective than
          giving one-off instructions because Claude understands the big
          picture.
        </p>
        <p>
          As your site evolves, update the spec. It&apos;s your source of truth
          for what the site should be.
        </p>

        <h2>Tips</h2>
        <ul>
          <li>
            <strong>Be specific.</strong> &ldquo;Add a gallery page&rdquo; is
            fine. &ldquo;Add a gallery page with a masonry grid layout and a
            lightbox when you click an image&rdquo; is better.
          </li>
          <li>
            <strong>Send screenshots.</strong> If you see something you
            don&apos;t like, take a screenshot and drag it into the Claude Code
            terminal. Then say &ldquo;fix this&rdquo; or &ldquo;I want it to
            look more like [description].&rdquo;
          </li>
          <li>
            <strong>Reference other sites.</strong> &ldquo;Make my portfolio
            look like [some site you like]&rdquo; is a perfectly valid request.
          </li>
          <li>
            <strong>Don&apos;t worry about breaking things.</strong> Everything
            is saved in git, which keeps a history of every version. If
            something goes wrong, you can say &ldquo;undo the last change&rdquo;
            and Claude will revert it.
          </li>
          <li>
            <strong>Start simple.</strong> Get the basics up first (pages,
            content, navigation), then layer on design and features.
          </li>
          <li>
            <strong>Keep your spec updated.</strong> When you add a new feature
            or change direction, update <code>SPEC.md</code> so Claude always
            knows what the site should be.
          </li>
        </ul>

        <h2>Adding Content</h2>
        <p>
          To add new pages, blog posts, images, or anything else, just tell
          Claude:
        </p>
        <ul>
          <li>&ldquo;Add a new blog post called [title] with this content: [paste your text]&rdquo;</li>
          <li>&ldquo;Add this image to the about page&rdquo; (drag the image file into the terminal)</li>
          <li>&ldquo;Create a new project page for [project name]&rdquo;</li>
        </ul>

        <h2>Getting Help</h2>
        <p>
          If you get stuck at any point, you have two options:
        </p>
        <ol>
          <li>
            <strong>Ask Claude.</strong>{" "}It can explain what&apos;s happening,
            fix errors, and walk you through anything. You can say &ldquo;I
            don&apos;t understand what just happened&rdquo; and it will explain
            in plain English.
          </li>
          <li>
            <strong>Ask a friend.</strong>{" "}If you know someone technical, the
            setup is the hardest part. Once that&apos;s done, you&apos;re
            self-sufficient.
          </li>
        </ol>
      </article>
    </Page>
  );
}
