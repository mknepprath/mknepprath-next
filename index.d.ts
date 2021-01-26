interface Gif {
  id: string;
}

interface Post {
  publishedAt: string;
  id: string;
  image?: string;
  summary?: string;
  title: string;
}

interface PostListItem {
  date: string;
  id: string;
  image?: string;
  title: string;
}

interface Book {
  author: string;
  date_finished: string;
  date_started: string;
  image_url: string;
  isbn: string;
  large_image_url: string;
  link: string;
  rating: string;
  small_image_url: string;
  title: string;
}

interface Film {
  title: string;
  year: string;
  image_url: string;
  link: string;
  rating: string;
}

interface Tweet {
  data: {
    id: string;
    text: string;
    public_metrics: PublicMetrics;
  };
}

interface MediaTweet {
  id: string;
  text: string;
  attachments: {
    media_keys: MediaKey[];
  };
}

type MediaKey = string;

interface Media {
  width: number;
  type: "photo" | "video";
  media_key: MediaKey;
  url: string;
  height: number;
}

interface PublicMetrics {
  like_count: number;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
}

interface Tweets {
  data: MediaTweet[];
  includes: {
    media: Media[];
  };
}
