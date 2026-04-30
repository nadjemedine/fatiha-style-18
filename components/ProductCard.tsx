"use client";

import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ _id, name, price, originalPrice, image }) => {
  const { addToCart, toggleFavorite, isFavorite, setQuickAddProduct } = useCart();
  const favorited = isFavorite(_id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickAddProduct({ _id, name, price, image });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(_id);
  };

  return (
    <Link href={`/product/${_id}`} className="group block">
      <div className="bg-white rounded-xl border border-accent/20 overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 active:scale-95 relative">
        <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative">
          <img 
            src={urlFor(image).url()} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <button 
              onClick={handleToggleFavorite}
              className={`p-2 bg-white rounded-full shadow-lg transition-colors ${favorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            >
              <Heart className="w-5 h-5" strokeWidth={1.5} fill={favorited ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="p-2 bg-accent rounded-full shadow-lg text-white hover:opacity-90 transition-opacity"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        
        <div className="p-5 flex flex-col gap-1 items-center text-center">
          <h3 className="text-sm font-bold text-gray-800 font-ornate tracking-wide italic line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-accent">{price} DA</p>
            {originalPrice && (
              <p className="text-sm text-gray-400 line-through font-medium">{originalPrice} DA</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
