"use client";

import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useCart } from './CartContext';

import { client } from '@/sanity/lib/client';

const ProductGrid = () => {
  const { searchTerm, selectedCategory, priceFilter } = useCart();
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(`*[_type == "product"]{
          ...,
          "categoryTitle": category->title
        } | order(_createdAt desc)`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tout" || p.categoryTitle === selectedCategory;
    
    // Price filter
    let matchesPrice = true;
    if (priceFilter && priceFilter !== 'all') {
      const [min, max] = priceFilter.split('-').map(Number);
      matchesPrice = p.price >= min && p.price <= max;
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Group products by category
  const productsByCategory = filteredProducts.reduce((acc: any, product) => {
    const category = product.categoryTitle || "أخرى";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  // Sort categories to put "أخرى" at the end if needed
  const categories = Object.keys(productsByCategory).sort((a, b) => {
    if (a === "أخرى") return 1;
    if (b === "أخرى") return -1;
    return a.localeCompare(b);
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-10 text-center animate-fade-in">
        <div className="bg-[#FEE4ED] p-8 rounded-full mb-6 text-[#c9beda]">
          <Search className="w-12 h-12" strokeWidth={1.5} />
        </div>
        <p className="text-gray-400 text-base font-medium font-ornate italic">
          {searchTerm 
            ? `Aucun produit trouvé pour "${searchTerm}"`
            : "Bientôt... Les produits sont en cours d'ajout"}
        </p>
      </div>
    );
  }

  return (
    <div className="pb-24 space-y-16">
      {categories.map((category) => (
        <section key={category} className="animate-fade-in">
          <div className="flex items-center gap-4 mb-8 px-4">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#c9beda]/30 to-[#c9beda]/50" />
            <h2 className="text-2xl font-bold text-gray-900 font-ornate italic px-6 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-[#c9beda]/20 shadow-sm whitespace-nowrap">
              {category}
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#c9beda]/30 to-[#c9beda]/50" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
            {productsByCategory[category].map((product: any) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductGrid;
