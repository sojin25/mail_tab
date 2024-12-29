import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="メールを検索..."
        className="pl-9 pr-4 py-1.5 w-64 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    </form>
  );
}