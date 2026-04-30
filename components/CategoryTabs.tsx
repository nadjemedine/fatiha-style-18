"use client";

import React from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { useCart } from './CartContext';

const CategoryTabs = () => {
  const [categories, setCategories] = React.useState<string[]>(["Tout"]);
  const { selectedCategory, setSelectedCategory, priceFilter, setPriceFilter } = useCart();
  const [showCategoryDropdown, setShowCategoryDropdown] = React.useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const priceDropdownRef = React.useRef<HTMLDivElement>(null);

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

  // Close dropdowns on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target as Node)) {
        setShowPriceDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const priceOptions = [
    { label: 'جميع الأسعار', value: 'all' },
    { label: 'أقل من 2000 د.ج', value: '0-2000' },
    { label: '2000 - 4000 د.ج', value: '2000-4000' },
    { label: '4000 - 6000 د.ج', value: '4000-6000' },
    { label: 'أكثر من 6000 د.ج', value: '6000-999999' }
  ];

  const currentCategoryLabel = selectedCategory === 'Tout' ? 'Tout' : selectedCategory;
  const currentPriceLabel = priceOptions.find(p => p.value === priceFilter)?.label || 'Tout les prix';

  return (
    <div className="w-full py-3 px-4 bg-background flex gap-2 items-center">
      {/* Category Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#d6c9e8] text-sm font-bold text-gray-700 hover:border-[#c9beda] transition-all"
        >
          <Filter className="w-4 h-4" />
          <span>الفئات</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
        </button>
        
        {showCategoryDropdown && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-[#d6c9e8] rounded-xl shadow-lg z-50 min-w-[200px] max-h-[300px] overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowCategoryDropdown(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm font-bold transition-all hover:bg-gray-50 ${
                  selectedCategory === category 
                    ? 'bg-[#FEE4ED] text-[#c9beda]' 
                    : 'text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter Dropdown */}
      <div className="relative" ref={priceDropdownRef}>
        <button
          onClick={() => setShowPriceDropdown(!showPriceDropdown)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#d6c9e8] text-sm font-bold text-gray-700 hover:border-[#c9beda] transition-all"
        >
          <span>{currentPriceLabel}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showPriceDropdown ? 'rotate-180' : ''}`} />
        </button>
        
        {showPriceDropdown && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-[#d6c9e8] rounded-xl shadow-lg z-50 min-w-[220px]">
            {priceOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setPriceFilter(option.value);
                  setShowPriceDropdown(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm font-bold transition-all hover:bg-gray-50 ${
                  priceFilter === option.value 
                    ? 'bg-[#FEE4ED] text-[#c9beda]' 
                    : 'text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== 'Tout' || priceFilter !== 'all') && (
        <div className="flex-1 flex gap-2 items-center">
          {selectedCategory !== 'Tout' && (
            <span className="px-3 py-1.5 bg-[#FEE4ED] text-[#c9beda] rounded-lg text-xs font-bold">
              {currentCategoryLabel}
            </span>
          )}
          {priceFilter !== 'all' && (
            <span className="px-3 py-1.5 bg-[#FEE4ED] text-[#c9beda] rounded-lg text-xs font-bold">
              {currentPriceLabel}
            </span>
          )}
          <button
            onClick={() => {
              setSelectedCategory('Tout');
              setPriceFilter('all');
            }}
            className="text-xs font-bold text-gray-400 hover:text-[#c9beda] transition-colors"
          >
            إزالة الفلاتر
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryTabs;