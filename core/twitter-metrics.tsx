import React from "react";

import A from "core/a";
import RepliesIcon from "core/icon-replies";

interface Props {
  like_count: number;
  reply_count: number;
  tweetId?: string;
}

export default function SocialMetrics({
  like_count,
  reply_count,
  tweetId,
}: Props): JSX.Element {
  return (
    <>
      {like_count ? (
        <A href={`https://twitter.com/mknepprath/status/${tweetId}`}>
          ♥ {like_count} {like_count === 1 ? "like" : "likes"}
        </A>
      ) : null}
      {reply_count ? (
        <A href={`https://twitter.com/mknepprath/status/${tweetId}`}>
          <RepliesIcon /> {reply_count}{" "}
          {reply_count === 1 ? "reply" : "replies"}
        </A>
      ) : null}
    </>
  );
}
