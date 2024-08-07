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

// TODO: Split the Post interface into two interfaces
interface PostListItem {
  action?: string;
  date: string;
  id: string;
  image?: string;
  summary?: string;
  title: string;
  type?:
    | "FILM"
    | "TWEET"
    | "REPO"
    | "POST"
    | "BOOK"
    | "TOOT"
    | "PHOTO"
    | "MUSIC"
    | "HIGHLIGHT";
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
  review: string;
  small_image_url: string;
  title: string;
}

interface Film {
  id: string;
  image_url: string;
  link: string;
  published_at: string;
  rating: string;
  review: string;
  rewatched: boolean;
  title: string;
  year: string;
}

interface TootRss {
  description: string;
  id: string;
  image: string;
  published_at: string;
}

interface Toot {
  id: string;
  created_at: string;
  content: string;
  favourites_count: number;
  media_attachments: {
    blurhash: string;
    description: string;
    id: string;
    meta: {
      original: {
        width: number;
        height: number;
        size: string;
        aspect: number;
      };
      small: {
        width: number;
        height: number;
        size: string;
        aspect: number;
      };
      focus: { x: 0; y: 0 };
    };
    preview_remote_url?: string;
    preview_url: string;
    remote_url?: string;
    text_url?: string;
    type: "image" | "gifv";
    url: string;
  }[];
  url: string;
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

interface RecentPlayed {
  id: string;
  type: "albums" | "stations" | "library-playlists";
  href: string;
  attributes: {
    copyright: string;
    genreNames: string[];
    releaseDate: string;
    upc: string;
    isMasteredForItunes: boolean;
    artwork: {
      width: number;
      height: number;
      url: string;
      bgColor: string;
      textColor1: string;
      textColor2: string;
      textColor3: string;
      textColor4: string;
    };
    playParams: {
      globalId?: string;
      id: string;
      isLibrary?: boolean;
      kind: "album" | "radioStation" | "playlist";
    };
    url: string;
    recordLabel: string;
    trackCount: number;
    isCompilation: boolean;
    isSingle: boolean;
    name: string;
    contentRating: string;
    artistName: string;
    editorialNotes: {
      standard: string;
      short: string;
    };
    isComplete: boolean;
  };
}

interface Music {
  id: string;
  type: "library-albums" | "library-songs" | "library-playlists";
  href: string;
  attributes: {
    isPublic?: boolean;
    trackCount: number;
    genreNames: string[];
    releaseDate: string;
    name: string;
    artistName: string;
    artwork: {
      width: number;
      height: number;
      url: string;
    };
    playParams: {
      id: string;
      kind: "album" | "song" | "playlist";
      isLibrary: boolean;
      globalId?: string;
    };
    dateAdded: string;
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

interface Highlight {
  id: number;
  text: string;
  note: string;
  location: number;
  location_type: string;
  highlighted_at: string;
  url: string;
  color: string;
  updated: string;
  book_id: number;
  tags: {
    id: number;
    name: string;
  }[];
  book: HighlightBook;
}

interface HighlightBook {
  id: number;
  title: string;
  author: string;
  category: string;
  source: string;
  num_highlights: number;
  last_highlight_at: string;
  updated: string;
  cover_image_url: string;
  highlights_url: string;
  source_url: string;
  asin: string;
  tags: {
    id: number;
    name: string;
  }[];
  document_note: string;
}

interface Meta {
  image?: string;
  published: boolean;
  publishedAt: string;
  summary?: string;
  title: string;
  tweetId?: string;
}
