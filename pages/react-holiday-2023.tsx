import Page from "@core/page";
import React from "react";

const bodyText =
  "React has changed. Never content playing second fiddle to PHP, React has wormed it's way into the server-side.";

export default function ReactHoliday2023() {
  const [truncated, setTruncated] = React.useState(true);

  return (
    <Page title="React Holiday 2023">
      <h1>React Holiday 2023</h1>

      <button onClick={() => setTruncated(!truncated)}>
        {truncated ? "Show More" : "Show Less"}
      </button>

      <p>{bodyText.substring(0, truncated ? 10 : Infinity)}</p>
    </Page>
  );
}
