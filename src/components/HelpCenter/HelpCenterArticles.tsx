import React from 'react';
import { helpArticles } from '../../data/helpArticles';
import { ArticleItem } from './ArticleItem';

interface HelpCenterArticlesProps {
  searchQuery: string;
  selectedCategory: string | null;
}

export function HelpCenterArticles({ searchQuery, selectedCategory }: HelpCenterArticlesProps) {
  // Filter articles based on both search query and selected category
  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {selectedCategory 
          ? 'Ingen artikler funnet i denne kategorien. Prøv å velge en annen kategori.'
          : 'Ingen artikler funnet. Prøv å søke på noe annet eller velg en kategori.'}
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-2">
        {filteredArticles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}