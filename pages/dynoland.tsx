import React, { SyntheticEvent } from "react";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

// Components
import Page from "core/page";

// Styles
import styles from "./dynoland.module.css";

function onClickToCopy(e: SyntheticEvent) {
  const text = e.currentTarget.getAttribute("data-clipboard-text") || "";
  const fakeElement = document.createElement("textarea");
  fakeElement.value = text;
  document.body.appendChild(fakeElement);
  fakeElement.select();
  fakeElement.setSelectionRange(0, fakeElement.value.length);
  let succeeded;
  try {
    succeeded = document.execCommand("copy");
  } catch (err) {
    succeeded = false;
  }
  if (succeeded)
    document.title = `Michael Knepprath, ${(
      e.currentTarget.id + "!"
    ).toUpperCase()}`;
  document.body.removeChild(fakeElement);
}

const SERVER_IP = "dynoland.space";

const fetcher = (url: RequestInfo) => fetch(url).then((r) => r.json());

export default function Dynoland() {
  const { data } = useSWR(
    `https://mcapi.us/server/status?ip=${SERVER_IP}`,
    fetcher,
    { refreshInterval: 30000 }
  );

  if (!data) return null;

  return (
    <Page className="container" title="Dynoland">
      <article>
        <header>
          <h1>Dynoland {data.online ? "" : "(Currently Offline)"}</h1>
        </header>

        {data.online ? (
          ""
        ) : (
          <p>
            If you were planning on playing right now,{" "}
            <a href="https://twitter.com/mknepprath">message me</a> and I will
            look into it as soon as I'm available.
          </p>
        )}

        <img
          alt="Dynoland rendered image"
          className="blog-image"
          src="/assets/dynoland.png"
        />

        <p>
          <button
            className={styles.button}
            data-clipboard-text={SERVER_IP}
            onClick={onClickToCopy}
            type="button"
          >
            Copy Server Address
          </button>
        </p>

        <p>
          This Minecraft server is set to Survival Mode. "Players must collect
          resources, build structures, battle mobs, manage hunger, and explore
          the world in an effort to thrive and survive."
        </p>
        <p>
          There are currently{" "}
          {data.players.now <= 0
            ? "no"
            : `${data.players.now}/${data.players.max}`}{" "}
          players online. If you would like to be whitelisted to access this
          server, contact <a href="https://twitter.com/mknepprath">Michael</a>.
        </p>

        <p>
          We're running version {data.server.name.replace("Spigot ", "")} of
          Minecraft, so you will need to ensure your client matches. Follow the
          directions on the{" "}
          <a
            href="https://help.mojang.com/customer/portal/articles/1475923-changing-game-versions"
            rel="noopener noreferrer"
            target="_blank"
          >
            Changing game versions
          </a>{" "}
          support page if it doesn't.
        </p>

        {/* <img alt="Dynoland favicon" src={data.server.favicon} /> */}
      </article>
    </Page>
  );
}
