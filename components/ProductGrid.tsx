"use client";

import React from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import { useCart } from './CartContext';

const ProductGrid = () => {
  const { searchTerm } = useCart();
  
  const products = [
    { id: 1, name: "Robe de soirée élégante", price: 8500, image: "/product1.png" },
    { id: 2, name: "Ensemble Kimono Rose", price: 6500, image: "/product2.png" },
    { id: 3, name: "Veste en Tweed Chic", price: 9200, image: "/product1.png" },
    { id: 4, name: "Robe d'été Fleurie", price: 4500, image: "/product2.png" },
  ];

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-10 text-center animate-fade-in">
        <div className="bg-[#e2eee2] p-8 rounded-full mb-6 text-[#2d5a27]">
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
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
