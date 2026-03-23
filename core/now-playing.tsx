import React from "react";
import useSWR from "swr";

import styles from "./now-playing.module.css";

interface NowPlayingData {
  item: Music | null;
}

const fetcher = (url: RequestInfo) =>
  fetch(url).then((response) => response.json());

export default function NowPlaying(): React.JSX.Element | null {
  const { data } = useSWR<NowPlayingData>("/api/v1/now-playing", fetcher, {
    refreshInterval: 30000,
  });

  if (!data?.item) return null;

  const track = data.item.track;
  const artist = track.artists.map((a) => a.name).join(", ");

  return (
    <span className={styles.nowPlaying}>
      <span className={styles.equalizer}>
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </span>
      <span className={styles.trackInfo}>
        {track.name} — {artist}
      </span>
    </span>
  );
}
