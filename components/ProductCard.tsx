"use client";

import React, { useState } from 'react';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: any;
  gallery?: any[];
  stock?: any[];
  sizes?: string[];
  slug: { current: string };
}

const ProductCard: React.FC<ProductCardProps> = ({ _id, name, price, originalPrice, image, gallery, stock, sizes, slug }) => {
  const { toggleFavorite, isFavorite, setQuickAddProduct } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const favorited = isFavorite(_id);
  const allImages = [image, ...(gallery || [])];

  const isAllOutOfStock = sizes && sizes.length > 0 && 
    sizes.every((size: string) => {
      const stockItem = stock?.find((s: any) => s.size === size);
      return !stockItem || stockItem.quantity <= 0;
    });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAllOutOfStock) {
      setQuickAddProduct({ _id, name, price, image });
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(_id);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImage((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <Link href={`/product/${slug.current}`} className="group block">
      <div className="bg-white rounded-xl border border-accent/20 overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 active:scale-95 relative">
        <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative group/card">
          <img 
            src={urlFor(allImages[activeImage]).url()} 
            alt={name} 
            className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 ${isAllOutOfStock ? 'opacity-60 grayscale-[0.5]' : ''}`} 
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          
          {allImages.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 text-[#c9beda] transition-all opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 active:scale-90 z-20 hover:scale-125"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={3} />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#c9beda] transition-all opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 active:scale-90 z-20 hover:scale-125"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={3} />
              </button>
            </>
          )}
          
          {isAllOutOfStock && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-red-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl whitespace-nowrap">
                نفذ المنتج
              </div>
            </div>
          )}

          {/* Quick Actions - Always visible on all devices */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
            <button 
              onClick={handleToggleFavorite}
              className={`p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all active:scale-90 ${favorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} fill={favorited ? 'currentColor' : 'none'} />
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={isAllOutOfStock}
              className={`p-2 backdrop-blur-sm rounded-full shadow-lg transition-all active:scale-90 ${
                isAllOutOfStock 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed hidden' 
                  : 'bg-accent/90 text-white hover:opacity-90'
              }`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        
        <div className="p-5 flex flex-col gap-1 items-center text-center">
          <h3 className="text-sm font-bold text-gray-800 font-ornate tracking-wide italic line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <p className={`text-lg font-bold ${isAllOutOfStock ? 'text-gray-400' : 'text-accent'}`}>{price} DA</p>
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
