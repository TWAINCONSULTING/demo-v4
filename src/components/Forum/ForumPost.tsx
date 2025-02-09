import React, { useState } from 'react';
import { MessageCircle, Calendar, Check, Plus } from 'lucide-react';
import { formatDistanceToNow, format, parseISO, setYear } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Comment, CommentForm, LikeButton } from '../ui/Comments';
import { categoryLabels } from '../../constants/forum';
import { useEventStore } from '../../stores/useEventStore';
import { useForumStore } from '../../stores/useForumStore';
import type { ForumPost as ForumPostType } from '../../types/forum';

interface ForumPostProps {
  post: ForumPostType;
  onVote: (id: string) => void;
  onComment: (id: string) => void;
}

export function ForumPost({ post, onVote, onComment }: ForumPostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const categoryInfo = categoryLabels[post.category];
  const isEvent = post.category === 'event' && post.eventDate;
  const { addEvent, removeEvent, isEventAdded } = useEventStore();
  const { getLikeCount, hasLiked } = useForumStore();
  const isAdded = isEventAdded(post.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(post.id);
      setNewComment('');
    }
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    onVote(post.id);
  };

  const handleToggleEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.eventDate && post.eventTime) {
      if (isAdded) {
        removeEvent(post.id);
      } else {
        addEvent({
          id: post.id,
          title: post.title,
          date: post.eventDate,
          time: post.eventTime,
          highlight: true
        });
      }
    }
  };

  const currentLikes = getLikeCount(post.id);
  const userHasLiked = hasLiked(post.id);

  const getRoleStyle = (authorId: string) => {
    switch (authorId) {
      case 'board':
        return 'text-condo-dark';
      case 'condo':
        return 'text-condo-med';
      default:
        return 'text-gray-600';
    }
  };

 const getFormattedDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { 
      addSuffix: true,
      locale: nb
    });
  } catch (error) {
    console.error('Invalid date format:', dateString);
    return 'Invalid date';
  }
};

  const getEventDate = (dateString: string | undefined) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString); // Direct Date constructor instead of parseISO
      return {
        month: format(date, 'MMM', { locale: nb }).toUpperCase(),
        day: format(date, 'd')
      };
    } catch (error) {
      console.error('Invalid event date format:', dateString);
      return null;
    }
  };

  const eventDate = isEvent ? getEventDate(post.eventDate) : null;
  const timeAgo = getFormattedDate(post.createdAt);

  return (
    <article
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white sm:rounded-xl border p-4 mb-3 sm:p-6 lg:hover:border-condo-light transition-colors cursor-pointer active:bg-gray-50 lg:active:bg-white flex flex-col sm:flex-row"
    >
      <div className="flex flex-col w-full">
        <div className="sm:space-y-4 space-y-2 flex-col flex w-full">
          <div className="flex items-center gap-3 w-full block pb-2 sm:pt-2">
            {isEvent && eventDate && (
              <div className="flex-shrink-0">
                <div className="bg-condo-light text-condo-dark rounded-lg flex-col flex justify-center
                  text-center w-[50px] p-1 sm:w-[60px] sm:h-[60px]">
                  <div className="text-xs font-medium">{eventDate.month}</div>
                  <div className="text-xl font-bold">{eventDate.day}</div>
                </div>
              </div>
            )}
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col justify-evenly">
                <h3 className="font-semibold sm:text-base text-base">{post.title}</h3>
                    {isEvent && (
                <button
                  onClick={handleToggleEvent}
                  className={`
                    flex items-center gap-2 text-sm sm:mt-1 transition-colors
                    ${isAdded
                      ? 'text-condo-med hover:text-condo-light'
                      : 'text-condo-dark hover:text-condo-med'
                    }
                  `}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Lagt til i kommende hendelser</span>
                    </>
                  ) : (
                    <>
                      <span>Legg til i kommende hendelser</span>
                    </>
                  )}
                </button>
              )}
              </div>
            <div className="sm:text-sm text-xs text-gray-500">
              {timeAgo}
            </div>
          </div>

          </div>
        </div>

        {/* Author info and date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 sm:text-sm text-xs">{post.authorName}</span>
            {post.authorId && (
              <span className={`sm:text-sm text-xs ${getRoleStyle(post.authorId)}`}>
                {post.authorId === 'condo' ? 'Condo' : post.authorId === 'board' ? 'Styret' : 'Beboer'}
              </span>
            )}
          </div>
        </div>
        
        <div className="pl-0 flex">
          <p className="text-gray-600 mb-4 sm:text-base text-sm">{post.content}</p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:text-base text-sm">
              <LikeButton 
                count={currentLikes}
                hasReacted={userHasLiked}
                onClick={handleVote}
                variant="forum"
              />
              <div className="flex items-center gap-1 text-gray-500">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments?.length || 0} kommentarer</span>
              </div>
            </div>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryInfo.classes}`}>
              {categoryInfo.label}
            </span>
          </div>

          {isExpanded && post.comments && (
            <div className="mt-4 pt-4 border-t space-y-4">
              {post.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onLike={(commentId) => console.log('Like comment:', commentId)}
                  variant="forum"
                />
              ))}
              <CommentForm
                value={newComment}
                onChange={setNewComment}
                onSubmit={handleSubmit}
                variant="forum"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}