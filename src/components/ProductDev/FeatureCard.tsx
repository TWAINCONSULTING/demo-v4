import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Comment, CommentForm, LikeButton } from '../ui/Comments';
import type { Feature } from '../../types/features';
import { useFeatureStore } from '../../stores/useFeatureStore';

interface FeatureCardProps {
  feature: Feature;
  onComment: (id: string) => void;
}

const statusColors = {
  'PRODUKSJON': 'bg-condo-dark text-light-2',
  'KOMMER': 'bg-light-2 text-condo-dark',
  'UNDER_VURDERING': 'bg-yellow-2 text-orange-10'
};

const statusLabels = {
  'PRODUKSJON': 'I produksjon',
  'KOMMER': 'Kommer',
  'UNDER_VURDERING': 'Under vurdering'
};

export function FeatureCard({ feature, onComment }: FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { voteFeature, hasVoted, getVoteCount } = useFeatureStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(feature.id);
      setNewComment('');
    }
  };

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    voteFeature(feature.id);
  };

  const currentVotes = getVoteCount(feature.id);
  const userHasVoted = hasVoted(feature.id);

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

  return (
    <article
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white sm:rounded-xl border p-4 sm:p-6 lg:hover:border-condo-light transition-colors cursor-pointer active:bg-gray-50 lg:active:bg-white"
    >
      {/* Header with title and date */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold sm:text-base text-base">{feature.title}</h3>
        <div className="sm:text-sm text-xs text-gray-500">
          {formatDistanceToNow(new Date(feature.createdAt), { 
            addSuffix: true,
            locale: nb 
          })}
        </div>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-medium text-gray-700 sm:text-sm text-xs">{feature.author.name}</span>
        <span className={`sm:text-sm text-xs ${getRoleStyle(feature.author.role)}`}>
          {feature.author.role === 'Condo' ? 'Condo' : feature.author.role === 'board' ? 'Styret' : 'Beboer'}
        </span>
      </div>

      {/* Main content area with vote count and description */}
      <div className="flex gap-6 mb-4">
        {/* Vote count box */}
        <div className="flex-shrink-0">
          <div className="flex flex-col items-center justify-center p-3 bg-dark-1 rounded-lg text-center w-20">
            <div className="text-2xl font-bold text-condo-dark">{currentVotes}</div>
            <div className="text-xs text-gray-600">stemmer</div>
          </div>
        </div>

        {/* Description - Now vertically centered */}
        <div className="flex-1 flex -mt-2 items-center min-h-[84px]">
          <p className="text-gray-600 sm:text-base text-sm">{feature.description}</p>
        </div>
      </div>

      {/* Footer with actions and status */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 sm:text-base text-sm">
            <LikeButton 
              hasReacted={userHasVoted}
              onClick={handleVote}
              variant="product"
              label={userHasVoted ? 'Du har stemt!' : 'Stem på forslag'}
            />
            <div className="flex items-center gap-2 text-gray-500">
              <MessageCircle className="h-4 w-4" />
              <span>{feature.comments?.length || 0}</span>
              <span className="sm:inline hidden"> kommentarer</span>
            </div>
          </div>
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[feature.status]}`}>
            {statusLabels[feature.status]}
          </span>
        </div>

        {/* Comments section */}
        {isExpanded && feature.comments && (
          <div className="mt-4 pt-4 border-t space-y-4">
            {feature.comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onLike={(commentId) => console.log('Like comment:', commentId)}
                variant="product"
              />
            ))}
            <CommentForm
              value={newComment}
              onChange={setNewComment}
              onSubmit={handleSubmit}
              variant="product"
            />
          </div>
        )}
      </div>
    </article>
  );
}