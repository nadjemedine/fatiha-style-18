"use client";

import React from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { useCart } from './CartContext';

import { client } from '@/sanity/lib/client';

const ProductGrid = () => {
  const { searchTerm, selectedCategory } = useCart();
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
    return matchesSearch && matchesCategory;
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pb-24">
      {filteredProducts.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
