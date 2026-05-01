"use client";

import React, { useState, useEffect } from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import ProductCard from '@/components/ProductCard';
import BottomNav from '@/components/BottomNav';

export default function FavoritesPage() {
  const { favorites } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        const data = await client.fetch(
          `*[_type == "product" && _id in $ids]`,
          { ids: favorites }
        );
        setProducts(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, [favorites]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-[#FEE4ED] p-4 flex items-center gap-4 border-b border-[#d6c9e8] sticky top-0 z-10">
        <Link href="/" className="p-2 hover:bg-[#d6c9e8] rounded-full transition-colors">
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 font-ornate italic">مفضلتي ({favorites.length})</h1>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="bg-[#FEE4ED] p-8 rounded-full mb-6">
              <Heart className="w-16 h-16 text-accent" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 font-ornate italic">مفضلتي فارغة حالياً</h2>
            <p className="text-gray-500 mb-8">استكشف المتجر وأضف منتجاتك المفضلة</p>
            <Link 
              href="/" 
              className="inline-block px-6 py-2.5 bg-gradient-to-r from-accent to-purple-400 text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all border-2 border-white/20 backdrop-blur-sm"
            >
              العودة إلى المتجر
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
