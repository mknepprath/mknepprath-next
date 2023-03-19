import A from "@core/a";
import BlogPage from "@core/blog-page";
import { ReactNode } from "react";

export const meta = {
  published: false,
  publishedAt: "2023-03-19",
  title: "Microsoft Is Using GPT-4 Wrong",
};

// Learning from Microsoft’s mistakes
// - You should not return GPT-3 responses directly to users. That’s insane.
// - You can add GPT-3 as a translator for the user. This is helpful, because users aren’t familiar with your language. GPT-3 can be great for this.
// - DON’T give GPT-3 privileged API access. It should have the same limitations the user has. Otherwise, a smart user could “social engineer” their way to doing advanced requests.

export default function WhereGptBelongs(): ReactNode {
  return (
    <BlogPage dateTime={meta.publishedAt} title={meta.title}>
      <header>
        <h1>{meta.title}</h1>
      </header>

      <blockquote>
        <p>
          I&#39;m sure it&#39;s been said but I haven&#39;t seen it said: GPT-3
          seems way more useful for converting user input into some
          computer-readable form than for publishing its output directly to
          users/customers/etc. I would not trust it for that.
          <br />(
          <a href="https://mastodon.social/@mknepprath/109826168395645602">
            Michael Knepprath, Mastodon
          </a>
          )
        </p>
      </blockquote>
      <p>
        I want to expand on my thoughts from a month ago based on{" "}
        <a href="https://www.washingtonpost.com/technology/2023/02/16/microsoft-bing-ai-chat-interview/">
          recent events
        </a>{" "}
        and my own experience working with GPT.{" "}
      </p>
      <p>
        It&#39;s easy to lose sight of what GPT is in all the chatter about how
        GPT &quot;feels&quot; or what it &quot;wants&quot;. GPT is closer to a
        human language <em>emulator</em> at best. It has no intelligence to call
        its own. When asked, &quot;What is the meaning of life in one
        word?&quot;, it will predict an answer letter-by-letter based on similar
        patterns of letters in its corpus. In this case, it might return,
        &quot;Purpose.&quot; What it&#39;s returning here is not all that
        different from the autocomplete suggestions that appear in your
        messaging app as you type.
      </p>
      <h2 id="i-">I.</h2>
      <p>So, what&#39;s the problem with how GPT is being used right now?</p>
      <blockquote>
        <p>
          “Liu, who took a leave from studying at Stanford University to found
          an AI search company called Chord, said such easy workarounds suggest
          ‘lots of AI safeguards feel a little tacked-on to a system that
          fundamentally retains its hazardous capabilities.’” (
          <A href="https://www.washingtonpost.com/technology/2023/02/14/chatgpt-dan-jailbreak/">
            Washington Post, Meet ChatGPT’s Evil Twin, DAN
          </A>
          )
        </p>
      </blockquote>
      <p>
        <a href="https://blog.opencagedata.com/post/dont-believe-chatgpt">
          GPT has no concept of accuracy or correctness
        </a>
        , so it&#39;s wild to see Notion, Microsoft, Snapchat and other
        well-known companies placing this{" "}
        <a href="https://twitter.com/TallBart/status/1632183062573510657">
          volatile service
        </a>{" "}
        in front of their customers with relatively few precautionary measures.
        When Microsoft announced their new GPT-powered Bing Search, I assumed
        Microsoft had cracked it. Surely <em>Microsoft</em> wouldn&#39;t release
        a search engine that told their customers it loved them. Or compared
        them to Hitler. Or straight up lied and then argued with their customers
        about the lies it told.
      </p>
      <p>
        <A href="https://www.cnbc.com/2023/02/16/microsofts-bing-ai-is-leading-to-creepy-experiences-for-users.html">
          Yet here we are.
        </A>
      </p>
      <p>Maybe it&#39;s too early to judge. This is a beta, after all. </p>
      <p>
        But I&#39;d like to posit this: These companies are using GPT technology
        poorly.{" "}
        <strong>
          They should not be outputting GPT results directly to customers.
        </strong>{" "}
        At best, it&#39;s a novelty. At worst you have Bing, which uses GPT-4 to
        serve inaccurate information in an authoritative voice.
      </p>
      <h2 id="ii-">II.</h2>
      <p>Where do I think GPT would be most useful? </p>
      <p>
        Instead of adding new, separate GPT-enabled experiences to interfaces it
        should be used to augment existing interfaces. A few examples off the
        top of my head: voice-activated home assistants (Alexa, Siri, Hey
        Google), chatbots, search inputs and text games.
      </p>
      <p>
        Customers don&#39;t need to be aware of the fact that GPT or
        &quot;AI&quot; is involved at all. When the hype wears off, customers
        simply won&#39;t care (unless it&#39;s making their experience worse).
      </p>
      <p>
        The theme I will keep coming back to is:{" "}
        <strong>
          GPT should be used to infer user intent and convert it into a valid
          format the service understands.
        </strong>
      </p>
      <h3 id="home-assistants">Home Assistants</h3>
      <p>
        Home assistants have been around for nearly a decade now and still
        suffer from a core issue they&#39;ve had since day one: they lack an
        interface. This makes using them completely opaque. You have to know
        which words to say and in which order to say them to get any kind of
        consistent result.
      </p>
      <p>
        <strong>
          GPT should be used to infer user intent based on what they say and
          convert it into a valid format the home assistant understands.
        </strong>
      </p>
      {/*<p>{panel 1: user says something, panel 2: home device incredulous look, panel 3: <em>ai whispering in ear</em>: I think they mean xyz, panel 4: ooooh}</p>*/}
      <p>
        Instead of saying the strange incantation, &quot;Alexa, stop in the
        kitchen,&quot; you could say, &quot;Alexa, please stop playing music in
        the kitchen.&quot; GPT will convert the latter phrase into the former
        without the user&#39;s knowledge. It will just work.
      </p>
      <h3 id="chatbots">Chatbots</h3>
      <p>
        Facebook led the charge when chatbots had their 15 minutes of fame 7
        years ago. They quickly faded away when they hit the same wall as home
        assistants: they&#39;re completely opaque. Users had no idea which
        messages would yield useful replies and the chatbots weren&#39;t
        flexible enough to accept arbitrary user input.
      </p>
      <p>
        <strong>
          GPT should be used to infer user intent based on what they message and
          convert it into a valid format the chatbot understands.
        </strong>
      </p>
      {/*<p>{panel 1: user says something, panel 2: chatbot incredulous look, panel 3: <em>ai whispering in ear</em>: I think they mean xyz, panel 4: high five}</p>*/}
      <p>
        This frees users by letting them send messages in any format they feel
        comfortable with.
      </p>
      <h3 id="search-inputs">Search Inputs</h3>
      <p>
        Search inputs on websites are typically quite naive. They typically
        don&#39;t do much more than text-matching across the contents of a site.
        If you don&#39;t know the exact text used on the site, you&#39;ll
        struggle.
      </p>
      <p>
        <strong>
          GPT should be used to infer user intent based on what they search and
          convert it into a valid format the site&#39;s search engine
          understands.
        </strong>
      </p>
      {/*<p>{panel 1: input w/ normal search results, panel 2: confused face, panel 3: magic search results, panel 4: thumbs up meme}</p>*/}
      <p>
        Not only that, but the search input could be supercharged with its
        newfound natural language recognition abilities. If GPT is provided the
        site map, FAQs or even the customer-facing API interface, a user could
        type, &quot;How do I change the location in my profile to Cleveland,
        OH?&quot; and be provided with a list of options that includes a link to
        a step-by-step guide, a link to the profile editing page, or even the
        option to make the change directly from the search input itself.
      </p>
      <h3 id="text-games">Text Games</h3>
      <p>
        Some text adventure games get around the lack-of-interface problem by
        listing options for the player and letting them select an option by
        entering a letter associated with that option. This is a big trade-off,
        as it limits the options a player has at any given time and also
        railroads the player instead of letting them explore. Historically, the
        trade-off has been worth it because letting the player enter arbitrary
        commands and fail repeatedly is a frustrating experience. With GPT, this
        trade-off is moot.
      </p>
      <p>
        <strong>
          GPT should be used to infer player intent based on what they enter and
          convert it into a valid format the game understands.
        </strong>
      </p>
      {/*<p>{panel 1: user says something, panel 2: company incredulous look, panel 3: <em>ai whispering in ear</em>: I think they mean xyz, panel 4: hand shake}</p>*/}
      <p>
        This is a particularly fun example for me because{" "}
        <em>I have already implemented it in my text adventure game</em>, lilt.
        That&#39;s right, I have a live example of the concept I&#39;m proposing
        here and I&#39;ll be writing a separate post about how I implemented it.
        Spoiler alert: It was not hard to do and makes the game infinitely more
        pleasant to interact with.
      </p>
      <h2 id="iii-">III.</h2>
      <p>
        I&#39;m not surprised that these companies are currently implementing
        GPT in quick, hacky ways. There is a ton of hype around the technology
        right now and hopping on it before the competition garners a lot of
        attention. I do think this is how we should view a lot of what&#39;s out
        there right now, though: marketing gimmickry.
      </p>
      <p>
        I believe GPT will be a major part of our technological future, but this
        is not what that future will look like. It will become an invisible
        layer that closes the gap between human/computer communication.
      </p>
    </BlogPage>
  );
}
