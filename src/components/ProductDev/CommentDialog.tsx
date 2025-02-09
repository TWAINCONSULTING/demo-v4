import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Comment, CommentForm } from '../ui/Comments';
import type { FeatureComment } from '../../types/features';

interface CommentDialogProps {
  featureId: string;
  onClose: () => void;
  onLike?: (commentId: string) => void;
  onComment?: (content: string) => void;
}

const getCommentsForFeature = (featureId: string): FeatureComment[] => {
  switch (featureId) {
    case '1': // BankID og Vipps
      return [
        {
          id: '1-1',
          content: 'Dette vil gjøre betalingsprosessen mye enklere!',
          authorName: 'Ingrid Bakken',
          createdAt: '2024-03-19T15:30:00Z',
          likes: 8,
          hasLiked: false
        },
        {
          id: '1-2',
          content: 'Veldig bra forslag. Vipps er jo noe alle bruker.',
          authorName: 'Magnus Solberg',
          createdAt: '2024-03-19T16:00:00Z',
          likes: 5,
          hasLiked: true
        }
      ];
    case '2': // Boligmappa
      return [
        {
          id: '2-1',
          content: 'Smart løsning for å holde oversikt over dokumentasjonen.',
          authorName: 'Henrik Berntsen',
          createdAt: '2024-02-27T14:00:00Z',
          likes: 4,
          hasLiked: false
        }
      ];
    // Add more cases for other features...
    default:
      return [];
  }
};

export function CommentDialog({ featureId, onClose, onLike, onComment }: CommentDialogProps) {
  const [newComment, setNewComment] = useState('');
  const comments = getCommentsForFeature(featureId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && onComment) {
      onComment(newComment);
      setNewComment('');
    }
  };
  
<LikeButton 
  count={feature.count} 
  hasReacted={userHasVoted} 
  onClick={(e) => handleVoteClick(e, feature.id)} 
  variant="product" 
  label="Stemmer" 
/>


  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="max-w-lg w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Kommentarer</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onLike={() => onLike?.(comment.id)}
              />
            ))}
          </div>
          <CommentForm
            value={newComment}
            onChange={setNewComment}
            onSubmit={handleSubmit}
          />
        </div>
      </Card>
    </div>
  );
}