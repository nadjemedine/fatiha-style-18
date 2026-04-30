"use client";

import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useCart } from './CartContext';

import { client } from '@/sanity/lib/client';

const PRODUCTS_PER_PAGE = 8;

const ProductGrid = () => {
  const { searchTerm, selectedCategory } = useCart();
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

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

  // Reset to page 1 when search or category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tout" || p.categoryTitle === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

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
    <div className="pb-24">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 px-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border-2 border-[#c9beda] text-[#c9beda] hover:bg-[#FEE4ED] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                  currentPage === page
                    ? 'bg-[#c9beda] text-white shadow-md'
                    : 'border-2 border-[#c9beda] text-[#c9beda] hover:bg-[#FEE4ED]'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border-2 border-[#c9beda] text-[#c9beda] hover:bg-[#FEE4ED] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
