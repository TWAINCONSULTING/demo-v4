export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateNewsItem {
  title: string;
  content: string;
  date: string;
  is_pinned?: boolean;
}