import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale';
import { LikeButton } from './LikeButton';

interface CommentProps {
  comment: {
    id: string;
    content: string;
    authorName: string;
    createdAt: string;
    likes: number;
    hasLiked: boolean;
  };
  onLike: (commentId: string) => void;
  variant?: 'forum' | 'product';
}

export function Comment({ comment, onLike, variant = 'forum' }: CommentProps) {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(comment.id);
  };

  return (
    <div className="space-y-2">
      <div className="sm:p-3 p-1">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-sm">{comment.authorName}</span>
          <time className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
              locale: nb
            })}
          </time>
        </div>
        <p className="text-sm">{comment.content}</p>
      </div>
      <div className="flex items-center gap-4 px-3">
        <LikeButton
          count={comment.likes}
          hasReacted={comment.hasLiked}
          onClick={handleLike}
          size="sm"
          variant={variant}
        />
        <button 
          onClick={(e) => e.stopPropagation()}
          className="text-xs text-gray-500 hover:text-condo-dark"
        >
          Svar
        </button>
      </div>
    </div>
  );
}