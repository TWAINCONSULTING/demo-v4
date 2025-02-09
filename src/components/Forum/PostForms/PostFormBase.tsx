import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { ImageUpload } from '../../ui/ImageUpload';
import { Select } from '../../ui/Select';
import type { PostScope } from '../../../types/forum';

//not used???

interface PostFormBaseProps {
  onSubmit: (data: {
    title: string;
    content: string;
    tags: string[];
    scope: PostScope;
    images: File[];
  }) => void;
  onCancel: () => void;
}

export function PostFormBase({ onSubmit, onCancel }: PostFormBaseProps) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: '',
    scope: 'building' as PostScope,
    images: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Tittel"
        value={form.title}
        color="focus:outline-none border rounded-md focus:ring-1 focus:ring-condo-light "
        onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Innhold
        </label>
        <textarea
          value={form.content}
          onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 min-h-[150px]"
          required
        />
      </div>

      <ImageUpload
        images={form.images}
        onChange={images => setForm(prev => ({ ...prev, images }))}
        layout="facebook"
      />

      <Input
        label="Tagger (kommaseparert)"
        value={form.tags}
        onChange={e => setForm(prev => ({ ...prev, tags: e.target.value }))}
        placeholder="f.eks: møbler, salg"
      />

      <Select
        label="Synlighet"
        value={form.scope}
        onChange={scope => setForm(prev => ({ ...prev, scope: scope as PostScope }))}
        options={[
          { value: 'building', label: 'Kun borettslaget' },
          { value: 'area', label: 'Nabolaget' }
        ]}
      />

      <div className="flex justify-between gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>Avbryt</Button>
        <Button type="submit">Publiser!!!</Button>
      </div>
    </form>
  );
}