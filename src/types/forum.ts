export type PostType = 'discussion' | 'marketplace' | 'event' | 'recommendations';
export type PostScope = 'building' | 'area';
export type MarketplaceType = 'sell' | 'give' | 'borrow' | 'wanted';

export interface ForumFilter {
  category?: PostType;
  scope?: PostScope;
  sortBy: 'date' | 'likes' | 'trending';
  sortOrder: 'asc' | 'desc';
}

export interface Comment {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
  likes: number;
  hasLiked: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: PostType;
  scope: PostScope;
  authorId: string;
  authorName: string;
  createdAt: string;
  likes: number;
  comments?: Comment[];
  hasLiked: boolean;
  tags?: string[];
  link?: string;
  eventDate?: string;
  eventTime?: string;
  marketplaceType?: MarketplaceType;
  images: string[];
  rating?: number;
}

export interface NewPost {
  type: PostType;
  title: string;
  content: string;
  category: string;
  scope: PostScope;
  link?: string;
  eventDate?: string;
  eventTime?: string;
  marketplaceType?: MarketplaceType;
  price?: number;
}