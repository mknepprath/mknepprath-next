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
    | "HIGHLIGHT"
    | "TROPHY";
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

interface Trophy {
  gameImg: string; // URL for the game's image
  trophyImg: string; // URL for the trophy's image
  gameUrl: string; // Full URL to the game's trophy page
  trophyUrl: string; // Full URL to the specific trophy
  trophyTitle: string; // Title of the trophy
  trophyDesc: string; // Description of the trophy
  rank: string; // Rank or position (e.g., "#158")
  earnedDate: string; // Date when the trophy was earned
  earnedTime: string; // Time when the trophy was earned
  earnedTimestamp: string; // ISO 8601 timestamp of the earned date and time
  achievers: string; // Number of players who earned the trophy
  owners: string; // Number of players who own the game
  rarity: string; // Percentage of players who earned the trophy
  rarityType: string; // Type of rarity (e.g., "Common", "Rare")
  trophyType: string; // Trophy type (e.g., "Bronze", "Silver", "Gold")
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

interface Run {
  resource_state: number;
  athlete: {
    id: number;
    resource_state: number;
  };
  name: string;
  distance: number; // Distance in meters
  moving_time: number; // Moving time in seconds
  elapsed_time: number; // Elapsed time in seconds
  total_elevation_gain: number; // Elevation gain in meters
  type: string; // Activity type, e.g., "Run", "Walk"
  sport_type: string; // Sport type, e.g., "Run", "Walk"
  id: number;
  start_date: string; // ISO 8601 date string
  start_date_local: string; // Local start date as ISO 8601 string
  timezone: string; // Timezone of the activity
  utc_offset: number; // Offset in seconds from UTC
  location_city: string | null; // City of the activity, if available
  location_state: string | null; // State of the activity, if available
  location_country: string | null; // Country of the activity
  achievement_count: number; // Number of achievements
  kudos_count: number; // Number of kudos received
  comment_count: number; // Number of comments
  athlete_count: number; // Number of athletes in the activity
  photo_count: number; // Number of photos
  map: {
    id: string;
    summary_polyline: string; // Encoded polyline of the route
    resource_state: number;
  };
  trainer: boolean; // Indicates if the activity was done on a trainer
  commute: boolean; // Indicates if the activity was a commute
  manual: boolean; // Indicates if the activity was manually entered
  private: boolean; // Privacy flag
  visibility: string; // Visibility setting, e.g., "everyone", "only_me"
  flagged: boolean; // Indicates if the activity was flagged
  gear_id: string | null; // ID of the gear used, if any
  start_latlng: [number, number] | []; // Start latitude and longitude
  end_latlng: [number, number] | []; // End latitude and longitude
  average_speed: number; // Average speed in m/s
  max_speed: number; // Maximum speed in m/s
  has_heartrate: boolean; // Indicates if heartrate data is available
  heartrate_opt_out: boolean; // Indicates if the user opted out of heartrate tracking
  display_hide_heartrate_option: boolean; // Indicates if the heartrate display option is hidden
  elev_high: number | null; // Highest elevation point
  elev_low: number | null; // Lowest elevation point
  upload_id: number; // Upload ID
  upload_id_str: string; // Upload ID as a string
  external_id: string | null; // External ID of the activity
  from_accepted_tag: boolean; // Indicates if the activity was created from an accepted tag
  pr_count: number; // Personal records count
  total_photo_count: number; // Total number of photos
  has_kudoed: boolean; // Indicates if the user has kudoed the activity
  workout_type?: number | null; // Optional workout type, if available
}
