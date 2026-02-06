import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface MLSearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export const MLSearchBar: React.FC<MLSearchBarProps> = ({
  placeholder = 'Buscar productos, marcas y más...',
  onSearch,
  className = '',
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex-1 max-w-[600px] ${className}`}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-2 pl-4 pr-12 text-sm bg-white border-0 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ml-blue"
        />
        <button
          type="submit"
          className="absolute right-0 h-full px-4 bg-white rounded-r-sm hover:bg-gray-50 transition-colors"
          aria-label="Buscar"
        >
          <Search className="w-5 h-5 text-ml-gray-medium" />
        </button>
      </div>
    </form>
  );
};

export default MLSearchBar;
