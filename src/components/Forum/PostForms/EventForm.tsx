import React from 'react';
import { BasePostForm } from './BasePostForm';
import { Input } from '../../ui/Input';
import { POST_CATEGORIES } from '../../../config/postCategories';
import type { PostFormProps } from '../../../types/forum';

export function EventForm({ onSubmit, onCancel }: PostFormProps) {
  const handleSubmit = (data: any) => {
    onSubmit({
      type: 'event',
      ...data
    });
  };

  return (
    <BasePostForm
      onSubmit={handleSubmit}
      onCancel={onCancel}
      categories={POST_CATEGORIES.event}
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Dato"
          type="date"
          required
          className="w-full rounded-lg border focus:outline-none border rounded-md focus:ring-1 focus:ring-condo-light px-3 py-2 sm:text-base text-sm"
        />
        <Input
          label="Tidspunkt"
          type="time"
          className="w-full rounded-lg border focus:outline-none border rounded-md focus:ring-1 focus:ring-condo-light px-3 py-2 sm:text-base text-sm"

          required
        />
      </div>
    </BasePostForm>
  );
}