import { ForumPost, ForumFilter } from '../types/forum';

type SortBy = 'date' | 'likes' | 'trending' | 'rating';

// Calculate engagement score for trending posts
export function calculateEngagement(post: ForumPost): number {
  const hoursAgo = (new Date().getTime() - new Date(post.createdAt).getTime()) / (1000 * 60 * 60);
  const timeDecay = Math.pow(0.5, hoursAgo / 24);
  return (post.likes * 2 + (post.comments?.length || 0) * 3) * timeDecay;
}

// Filter posts based on category and scope
export function filterPosts(posts: ForumPost[], filters: ForumFilter): ForumPost[] {
  return posts.filter(post => {
    if (filters.category && post.category !== filters.category) return false;
    if (filters.scope && post.scope !== filters.scope) return false;
    return true;
  });
}

// Sort posts based on selected criteria
export function sortPosts(posts: ForumPost[], sortBy: SortBy, sortOrder: 'asc' | 'desc'): ForumPost[] {
  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'likes':
        return a.likes - b.likes;
      case 'trending':
        return calculateEngagement(a) - calculateEngagement(b);
      case 'rating':
        return (a.rating || 0) - (b.rating || 0);
      default:
        return 0;
    }
  });

  return sortOrder === 'desc' ? sortedPosts.reverse() : sortedPosts;
}