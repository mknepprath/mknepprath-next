export interface BlogPost {
  publishedAt: string;
  id: string;
  image?: string;
  summary?: string;
  tags?: string[];
  title: string;
  contentHtml?: string;
}
