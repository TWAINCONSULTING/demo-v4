export type FeatureStatus = 'LANSERT' | 'PRODUKSJON' | 'UNDER_VURDERING' | 'KOMMER';
export type AuthorRole = 'Condo' | 'Bruker';

export interface FeatureComment {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
  likes: number;
  hasLiked: boolean;
}

export interface FeatureAuthor {
  name: string;
  role: AuthorRole;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  votes: number;
  hasVoted?: boolean;
  comments: FeatureComment[];
  createdAt: string;
  author: FeatureAuthor;
}

export interface NewFeature {
  title: string;
  description: string;
  category?: string;
}