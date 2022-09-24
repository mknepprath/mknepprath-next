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
  summary?: string;
  title: string;
  type?: "FILM" | "TWEET" | "REPO" | "POST";
  url?: string;
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
  image_url: string;
  link: string;
  published_at: string;
  rating: string;
  review: string;
  title: string;
  year: string;
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
  created_at: string;
  attachments: {
    media_keys: MediaKey[];
  };
  entities: {
    urls: {
      display_url: string;
      end: number;
      expanded_url: string;
      media_key: string;
      start: number;
      url: string;
    }[];
  };
  public_metrics: PublicMetrics;
}

type MediaKey = string;

interface Media {
  height: number;
  media_key: MediaKey;
  preview_image_url: string;
  type: "photo" | "video";
  url: string;
  width: number;
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

interface Playlist {
  href: string;
  id: string;
  type: "albums" | "stations" | "library-playlists";
  attributes: {
    artwork: {
      height?: number;
      url: string;
      width?: number;
    };
    canEdit: boolean;
    dateAdded: string;
    description: {
      standard: string;
    };
    hasCatalog: boolean;
    name: string;
    playParams: {
      globalId: string;
      id: string;
      isLibrary: boolean;
      kind: "album" | "radioStation" | "playlist";
    };
    url?: string;
  };
}

interface Shot {
  animated: boolean;
  description: string;
  height: number;
  html_url: string;
  id: number;
  images: {
    hidpi: string;
    normal: string;
    one_x: string;
    two_x: string;
    four_x: string;
    teaser: string;
  };
  low_profile: boolean;
  tags: string[];
  title: string;
  width: number;
  published_at: string;
  updated_at: string;
  attachments: unknown[];
  projects: unknown[];
  video: unknown;
}
interface Repo {
  id: string;
  name: string;
  pushed_at: string;
  html_url: string;
  description: string;
  homepage: string;
}
