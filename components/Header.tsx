"use client";

import React from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';

const Header = () => {
  const { setIsCartOpen, cartCount, setIsMenuOpen, isSearchOpen, setIsSearchOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#e2eee2]/90 backdrop-blur-md border-b border-[#ccd9cc] px-4 py-1 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-1 hover:bg-[#ccd9cc] rounded-full transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="h-[80px] flex items-center">
          <img 
            src="/logo.png" 
            alt="Fatiha Style 18 Logo" 
            className="h-full w-auto object-contain"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className={`p-1 rounded-full transition-colors ${isSearchOpen ? 'bg-[#ccd9cc] text-[#2d5a27]' : 'hover:bg-[#ccd9cc]'}`}
        >
          <Search className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors relative"
        >
          <ShoppingBag className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-0 -right-0 bg-[#2d5a27] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
