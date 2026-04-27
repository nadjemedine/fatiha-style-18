"use client";

import React from 'react';
import { Home, ShoppingBag as BagIcon } from 'lucide-react';
import { useCart } from './CartContext';

import Link from 'next/link';

const BottomNav = () => {
  const { cartCount } = useCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#e2eee2]/95 backdrop-blur-md border-t border-[#ccd9cc] px-6 py-3 pb-6 flex items-center justify-around shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
      <Link href="/" className="flex flex-col items-center gap-1 group">
        <div className="p-1 rounded-xl bg-[#ccd9cc] text-[#2d5a27] group-hover:scale-110 transition-transform">
          <Home className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <span className="text-[10px] font-bold text-[#2d5a27] tracking-wider">BOUTIQUE</span>
      </Link>

      <Link 
        href="/checkout"
        className="flex flex-col items-center gap-1 group relative"
      >
        <div className="p-1 rounded-xl text-gray-400 group-hover:bg-[#ccd9cc]/30 group-hover:text-gray-600 transition-all">
          <BagIcon className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <span className="text-[10px] font-bold text-gray-400 tracking-wider">PANIER</span>
        {cartCount > 0 && (
          <span className="absolute top-0 right-1 bg-[#2d5a27] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default BottomNav;
