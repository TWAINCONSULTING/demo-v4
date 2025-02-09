import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { HelpArticle } from '../../types/help';

interface ArticleItemProps {
  article: HelpArticle;
}

export function ArticleItem({ article }: ArticleItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-medium">{article.title}</h3>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
        )}
      </div>
      
      {isExpanded && (
        <p className="mt-2 text-gray-600 text-sm">{article.content}</p>
      )}
    </button>
  );
}