import React from 'react';

const categories = [
  "Tout", "Ensembles", "vestes", "Kimonos", "Robes", "Hauts"
];

const CategoryTabs = () => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 px-4 flex gap-3 whitespace-nowrap bg-white">
      {categories.map((category, index) => (
        <button
          key={category}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            index === 0 
              ? 'bg-[#f0f4f8] text-[#1a365d] border border-transparent shadow-sm' 
              : 'bg-transparent text-gray-600 border border-gray-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
