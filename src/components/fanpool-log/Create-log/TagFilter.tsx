import { Text } from '@/components/common/Text';
import { usePathname } from 'next/navigation';
import React from 'react';

type TagFilterProps = {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
};

export default function TagFilter({
  tags,
  selectedTags,
  onTagSelect,
}: TagFilterProps) {
  const pathname = usePathname();

  return (
    <div
      className={`flex gap-8pxr mt-11pxr ${
        pathname === '/fanpool-log' ? 'flex-nowrap overflow-x-auto' : 'flex-wrap'
      }`}
    >
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`px-10pxr py-4pxr rounded-full border ${
            selectedTags.includes(tag)
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700'
          }`}
        >
        <Text fontSize={14} fontWeight={400}>{tag}</Text>
        </button>
      ))}
    </div>
  );
}
