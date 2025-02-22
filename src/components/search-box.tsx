'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBox({ onSearch, placeholder = 'Search for commodities...' }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-4 pr-12 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-2 hover:bg-transparent"
        >
          <Search className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
    </form>
  );
}
