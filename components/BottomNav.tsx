"use client";

import React from 'react';
import { Home, Heart, ShoppingBag as BagIcon } from 'lucide-react';
import { useCart } from './CartContext';

import Link from 'next/link';

const BottomNav = () => {
  const { cartCount, favoritesCount } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-nav-bg/95 backdrop-blur-md border-t-2 border-[#c9beda] px-4 py-2 pb-4 flex items-center justify-around shadow-[0_-5px_15px_rgba(0,0,0,0.03)] rounded-t-[3rem]">
      <Link href="/" className="flex flex-col items-center gap-0.5 group">
        <div className="p-0.5 rounded-xl bg-accent/20 text-accent group-hover:scale-110 transition-transform">
          <Home className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <span className="text-[9px] font-bold text-accent tracking-wider uppercase">Boutique</span>
      </Link>

      <Link href="/favorites" className="flex flex-col items-center gap-0.5 group relative">
        <div className="p-0.5 rounded-xl text-accent/50 group-hover:bg-accent/20 group-hover:text-accent transition-all">
          <Heart className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <span className="text-[9px] font-bold text-accent/50 tracking-wider uppercase">Favoris</span>
        {favoritesCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
            {favoritesCount}
          </span>
        )}
      </Link>

      <Link 
        href="/checkout"
        className="flex flex-col items-center gap-0.5 group relative"
      >
        <div className="p-0.5 rounded-xl text-accent/50 group-hover:bg-accent/20 group-hover:text-accent transition-all">
          <BagIcon className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <span className="text-[9px] font-bold text-accent/50 tracking-wider uppercase">Panier</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default BottomNav;
