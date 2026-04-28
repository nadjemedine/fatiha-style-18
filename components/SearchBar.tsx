"use client";

import React from 'react';
import { Search } from 'lucide-react';
import { useCart } from './CartContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm, isSearchOpen } = useCart();

  if (!isSearchOpen) return null;

  return (
    <div className="w-full px-4 py-3 bg-background border-b border-accent/20 sticky top-[53px] z-40 animate-fade-in origin-top">
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-full bg-white border border-accent/20 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all shadow-sm font-medium"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600"
          >
            Effacer
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
