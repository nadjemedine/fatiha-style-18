"use client";

import React from 'react';

import { client } from '@/sanity/lib/client';
import { useCart } from './CartContext';

const CategoryTabs = () => {
  const [categories, setCategories] = React.useState<string[]>(["Tout"]);
  const { selectedCategory, setSelectedCategory } = useCart();

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await client.fetch(`*[_type == "category"].title`);
        setCategories(["Tout", ...data]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 px-4 flex gap-3 whitespace-nowrap bg-background">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
            selectedCategory === category 
              ? 'bg-accent text-white shadow-md border border-transparent' 
              : 'bg-nav-bg/50 text-accent/70 border border-accent/10 hover:bg-nav-bg'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
