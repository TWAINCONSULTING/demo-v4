import React from 'react';
import { BasePostForm } from './BasePostForm';
import { POST_CATEGORIES } from '../../../config/postCategories';
import type { PostFormProps } from '../../../types/forum';

export function DiscussionForm({ onSubmit, onCancel }: PostFormProps) {
  const handleSubmit = (data: any) => {
    onSubmit({
      type: 'discussion',
      ...data
    });
  };

  return (
    <BasePostForm
      onSubmit={handleSubmit}
      onCancel={onCancel}
      categories={POST_CATEGORIES.discussion}
    />
  );
}