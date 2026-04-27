"use client";

import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, quantity: 1 });
  };

  return (
    <Link href={`/product/${id}`} className="group block">
      <div className="bg-white rounded-[2.5rem] border border-[#ccd9cc] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 active:scale-95 relative">
        <div className="aspect-[3/4] bg-gray-50 overflow-hidden relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          
          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <button className="p-2 bg-white rounded-full shadow-lg text-gray-400 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="p-2 bg-[#2d5a27] rounded-full shadow-lg text-white hover:bg-[#1a3a17] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        
        <div className="p-5 flex flex-col gap-1 items-center text-center">
          <h3 className="text-sm font-bold text-gray-800 font-ornate tracking-wide italic line-clamp-1">
            {name}
          </h3>
          <p className="text-lg font-bold text-[#2d5a27]">{price} DA</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
