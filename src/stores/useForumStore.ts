import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ForumPost } from '../types/forum';
import { mockPosts as initialPosts } from '../data/mockPosts';

interface ForumStore {
  posts: ForumPost[];
  likedPosts: string[];
  likePost: (postId: string) => void;
  hasLiked: (postId: string) => boolean;
  getLikeCount: (postId: string) => number;
}

export const useForumStore = create<ForumStore>()(
  persist(
    (set, get) => ({
      posts: initialPosts,
      likedPosts: [],
      likePost: (postId: string) => 
        set((state) => {
          const hasLiked = state.likedPosts.includes(postId);
          
          // Toggle like
          const newLikedPosts = hasLiked
            ? state.likedPosts.filter(id => id !== postId)
            : [...state.likedPosts, postId];
          
          // Update post like count
          const newPosts = state.posts.map(post => {
            if (post.id === postId) {
              return {
                ...post,
                likes: post.likes + (hasLiked ? -1 : 1),
                hasLiked: !hasLiked
              };
            }
            return post;
          });

          return {
            likedPosts: newLikedPosts,
            posts: newPosts
          };
        }),
      hasLiked: (postId: string) => 
        get().likedPosts.includes(postId),
      getLikeCount: (postId: string) => {
        const post = get().posts.find(p => p.id === postId);
        return post?.likes || 0;
      }
    }),
    {
      name: 'forum-store',
      version: 1
    }
  )
);