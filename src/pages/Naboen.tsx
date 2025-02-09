import React, { useState, useMemo, useRef } from 'react';
import { PageWrapper } from '../components/ui/PageWrapper';
import { ForumPost } from '../components/Forum/ForumPost';
import { ForumFilters } from '../components/Forum/ForumFilters';
import { NaboIntro } from '../components/Forum/NaboIntro';
import { NewPostDialog } from '../components/Forum/NewPostDialog';
import { PopularGroups } from '../components/Forum/PopularGroups/index';
import { sectionIntros } from '../data/sectionIntros';
import type { ForumFilter, PostType, NewPost } from '../types/forum';
import { filterPosts, sortPosts } from '../utils/forum';
import { mockPosts } from '../data/mockPosts';
import { Button } from '../components/ui/Button';
import { Users } from 'lucide-react';
import { useForumStore } from '../stores/useForumStore';

export default function Naboen() {
  const [filters, setFilters] = useState<ForumFilter>({
    category: undefined,
    scope: undefined,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [newPostType, setNewPostType] = useState<PostType | null>(null);
  const { likePost } = useForumStore();
  const groupsRef = useRef<HTMLDivElement>(null);

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = filterPosts(mockPosts, filters);
    return sortPosts(filtered, filters.sortBy, filters.sortOrder);
  }, [filters]);

  const handleLike = (postId: string) => {
    likePost(postId);
  };

  const handleNewPost = (post: NewPost) => {
    console.log('Create new post:', post);
    setNewPostType(null);
  };

  const scrollToGroups = () => {
    if (groupsRef.current) {
      groupsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <PageWrapper intro={sectionIntros.naboen}>
      <div className="max-w-7xl mx-auto">
        <NaboIntro onFeatureClick={setNewPostType} />

        {/* Group Button - Mobile only */}
        <div className="flex justify-between items-center gap-4 px-2 mt-2 sm:hidden">
          <Button 
            onClick={scrollToGroups}
            className="flex-1 border shadow-[0_1px_2px_0_rgba(0,87,80,0.05)] text-condo-dark border-2 border-condo-light 
            bg-base-white hover:bg-condo-light text-sm">
            <Users className="h-4 w-4 mr-2" />
            Utforsk grupper
          </Button>
        </div>

        <div className="sm:mt-4 mt-2">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <ForumFilters 
                filters={filters} 
                onFilterChange={setFilters} 
                onNewPost={() => setNewPostType('discussion')}
              />
              <div className="sm:mt-4 sm:space-y-4">
                {filteredAndSortedPosts.map((post) => (
                  <ForumPost 
                    key={post.id}
                    post={post} 
                    onVote={handleLike}
                    onComment={() => {}}
                  />
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
              <div className="sticky top-4">
                {/* Group Button - Desktop only */}
                <div className="hidden sm:block mb-4">
                  <Button 
                    onClick={() => console.log('Explore groups')}
                    variant="forum"
                    className="w-full text-sm"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Utforsk grupper
                  </Button>
                </div>
                <div ref={groupsRef}>
                  <PopularGroups />
                </div>
              </div>
            </div>
          </div>
        </div>

        {newPostType && (
          <NewPostDialog
            type={newPostType}
            onClose={() => setNewPostType(null)}
            onSubmit={handleNewPost}
          />
        )}
      </div>
    </PageWrapper>
  );
}