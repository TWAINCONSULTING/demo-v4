import React from 'react';
import { BasePostForm } from './BasePostForm';
import { Select } from '../../ui/Select';
import { Input } from '../../ui/Input';
import { POST_CATEGORIES } from '../../../config/postCategories';
import type { PostFormProps, MarketplaceType } from '../../../types/forum';

const marketplaceTypes = [
  { value: 'sell', label: 'Til salgs' },
  { value: 'give', label: 'Gis bort' },
  { value: 'borrow', label: 'Til utlån' },
  { value: 'wanted', label: 'Ønskes' }
] as const;

export function MarketplaceForm({ onSubmit, onCancel }: PostFormProps) {
  const handleSubmit = (data: any) => {
    onSubmit({
      type: 'marketplace',
      ...data
    });
  };

  return (
    <BasePostForm
      onSubmit={handleSubmit}
      onCancel={onCancel}
      categories={POST_CATEGORIES.marketplace}
      initialData={{ marketplaceType: 'sell' }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-center w-full ">
          <Select
            label="Type annonse"
            value="sell"
            onChange={() => {}}
            options={marketplaceTypes}
            className="w-full sm:!text-base mt-2"
          />
        </div>
        <div className="flex flex-col justify-center w-full">
          <Input
            label="Pris (kr)"
            type="number"
            placeholder="0"
            className="w-full"
          />
        </div>
      </div>
    </BasePostForm>
  );
}