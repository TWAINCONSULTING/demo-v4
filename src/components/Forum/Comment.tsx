import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale';
import { LikeButton } from './LikeButton';
import type { Comment as CommentType } from '../../types/forum';

interface CommentProps {
  comment: CommentType;
  onLike: (commentId: string) => void;
}

export function Comment({ comment, onLike }: CommentProps) {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(comment.id);
  };

  return (
    <div className="space-y-2">
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-sm">{comment.authorName}</span>
          <time className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
              locale: nb
            })}
          </time>
        </div>
        <p className="text-gray-700 text-sm">{comment.content}</p>
      </div>
      <div className="flex items-center gap-4 px-3">
        <LikeButton
          likes={comment.likes}
          hasLiked={comment.hasLiked}
          onClick={handleLike}
          size="sm"
        />
        <button 
          onClick={(e) => e.stopPropagation()}
          className="text-xs text-gray-500 hover:text-blue-600"
        >
          Svar
        </button>
      </div>
    </div>
  );
}