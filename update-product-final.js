const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'product', '[id]', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Update sizes section - make smaller and horizontally scrollable
const oldSizesSection = `            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Taille</h3>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size: string) => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={\`w-11 h-11 flex items-center justify-center rounded-md border-2 font-bold transition-all \${
                        selectedSize === size ? 'border-[#c9beda] bg-[#FEE4ED] text-[#c9beda] shadow-lg' : 'border-[#d6c9e8] text-gray-500 hover:border-[#c9beda]'
                      }\`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}`;

const newSizesSection = `            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Taille</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {product.sizes.map((size: string) => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={\`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-md border-2 font-bold text-xs transition-all \${
                        selectedSize === size ? 'border-[#c9beda] bg-[#FEE4ED] text-[#c9beda] shadow-lg' : 'border-[#d6c9e8] text-gray-500 hover:border-[#c9beda]'
                      }\`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}`;

content = content.replace(oldSizesSection, newSizesSection);

// Update related products - show all products from same category
const oldFetchQuery = `\`*[_type == "product" && category._ref == $categoryId && _id != $currentProductId] | order(_createdAt desc) [0...4]\``;
const newFetchQuery = `\`*[_type == "product" && category._ref == $categoryId && _id != $currentProductId] | order(_createdAt desc)\``;

content = content.replace(oldFetchQuery, newFetchQuery);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated: all related products + scrollable sizes');
