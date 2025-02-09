import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Link as LinkIcon, Image, ChevronDown } from 'lucide-react';
import type { PostScope } from '../../../types/forum';

interface BasePostFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  children?: React.ReactNode;
  categories: Array<{ value: string; label: string; }>;
  initialData?: any;
}

export function BasePostForm({ 
  onSubmit, 
  onCancel, 
  children, 
  categories,
  initialData = {} 
}: BasePostFormProps) {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: categories[0].value,
    scope: 'building' as PostScope,
    link: '',
    images: [] as File[],
    ...initialData
  });
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Tittel"
        value={form.title}
        onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
        required
        className="w-full rounded-lg border focus:outline-none border rounded-md focus:ring-1 focus:ring-condo-light px-3 py-2 sm:text-base text-sm"
      />

      <Select
        label="Kategori"
        value={form.category}
        onChange={category => setForm(prev => ({ ...prev, category }))}
        options={categories}
        className="w-full rounded-lg border focus:outline-none border rounded-md focus:ring-1 focus:ring-condo-light sm:px-3 sm:py-2 sm:text-base text-sm"
      />

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Innhold
          </label>
          <textarea
            value={form.content}
            onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
            onFocus={() => setIsTextareaFocused(true)}
            onBlur={() => setIsTextareaFocused(false)}
            className={`
              w-full rounded-lg border focus:outline-none border
              rounded-md focus:ring-1 focus:ring-condo-light 
              px-3 py-2 
              transition-[height,min-height] duration-200 ease-in-out
              sm:text-base text-sm
              ${isTextareaFocused ? 'min-h-[100px] leading-normal' : 'min-h-[20px] leading-[1]'}
              resize-none
            `}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => document.getElementById('image-upload')?.click()}
            className="flex items-center justify-center gap-2 px-4 py-1.5 
            text-sm text-condo-dark border rounded-md hover:bg-condo-light"
          >
            <Image className="h-4 w-4 text-condo-dark" />
            <span>Legg til bilde</span>
          </button>

          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <LinkIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="url"
              value={form.link}
              onChange={(e) => setForm(prev => ({ ...prev, link: e.target.value }))}
              placeholder="Legg til lenke"
              className="w-full !pl-8 pr-4 sm:py-3 py-2 rounded-md "
            />
          </div>
        </div>
      </div>

      {children}

      <div className="flex justify-between gap-3 border-gray-200">
        <Button variant="outline" onClick={onCancel}>Avbryt</Button>
        
        <div className="relative">
          <div className="flex">
            <Button type="submit" className="rounded-r-none px-6 sm:text-base text-sm">
              Publiser
            </Button>
            <button
              type="button"
              className="flex items-center px-2 bg-condo-dark hover:bg-condo-med text-condo-light border-l border-blue-500 rounded-r-lg"
              onClick={() => setShowScopeDropdown(!showScopeDropdown)}
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {showScopeDropdown && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                type="button"
                onClick={() => {
                  setForm(prev => ({ ...prev, scope: 'building' }));
                  setShowScopeDropdown(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                  form.scope === 'building' ? 'text-condo-dark' : 'text-gray-700'
                }`}
              >
                Publiser i Digitalgården
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(prev => ({ ...prev, scope: 'area' }));
                  setShowScopeDropdown(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                  form.scope === 'area' ? 'text-condo-dark' : 'text-gray-700'
                }`}
              >
                Publiser i området
              </button>
            </div>
          )}
        </div>
      </div>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => {
          const files = Array.from(e.target.files || []);
          setForm(prev => ({ ...prev, images: [...prev.images, ...files] }));
        }}
      />
    </form>
  );
}