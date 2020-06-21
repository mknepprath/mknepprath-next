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
  title: string;
}
