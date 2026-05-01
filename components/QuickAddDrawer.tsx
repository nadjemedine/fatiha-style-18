"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { X, ShoppingBag, Plus, Minus } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';

const QuickAddDrawer = () => {
  const { quickAddProduct, setQuickAddProduct, addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickAddProduct) {
      const fetchFullProduct = async () => {
        setLoading(true);
        try {
          const data = await client.fetch(`*[_type == "product" && _id == $id][0]`, { id: quickAddProduct._id });
          setProduct(data);
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(typeof data.colors[0] === 'string' ? data.colors[0] : data.colors[0].name);
          }
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0]);
          }
        } catch (error) {
          console.error('Error fetching quick add product:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchFullProduct();
    } else {
      setProduct(null);
      setSelectedColor("");
      setSelectedSize("");
      setQuantity(1);
    }
  }, [quickAddProduct]);

  if (!quickAddProduct) return null;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: urlFor(product.image).url(),
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      fabric: product.fabric
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={() => setQuickAddProduct(null)}
      />
      
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl p-8 shadow-2xl animate-slide-up transform transition-transform">
        <button 
          onClick={() => setQuickAddProduct(null)}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-accent border-t-transparent" />
          </div>
        ) : product ? (
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-gray-50 flex items-center justify-center">
                <img src={urlFor(product.image).url()} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-ornate italic">{product.name}</h3>
                {product.fabric && (
                  <p className="text-xs font-bold text-accent uppercase tracking-tighter mt-0.5">Tissu: {product.fabric}</p>
                )}
                <p className="text-2xl font-black text-accent mt-2">{product.price} DA</p>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">اللون: {selectedColor}</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {product.colors.map((color: any, idx: number) => {
                    const colorName = typeof color === 'string' ? color : color.name;
                    return (
                      <button 
                        key={idx}
                        onClick={() => setSelectedColor(colorName)}
                        className={`px-6 py-2 rounded-full border-2 font-bold text-xs transition-all ${
                          selectedColor === colorName ? 'border-accent bg-nav-bg text-accent' : 'border-gray-100 text-gray-400'
                        }`}
                      >
                        {colorName}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-right w-full">المقاس: {selectedSize}</h4>
                </div>
                <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar snap-x snap-proximity">
                  {product.sizes.map((size: string) => {
                    const stockItem = product.stock?.find((s: any) => s.size === size);
                    const isAvailable = !!(stockItem && stockItem.quantity > 0);
                    
                    return (
                      <button 
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl border-2 font-bold text-sm transition-all snap-start relative overflow-hidden ${
                          selectedSize === size 
                            ? 'border-accent bg-nav-bg text-accent shadow-md' 
                            : isAvailable
                              ? 'border-gray-100 text-gray-500 hover:border-accent/30'
                              : 'border-gray-50 text-gray-300 cursor-not-allowed opacity-60 line-through decoration-gray-400 decoration-2'
                        }`}
                      >
                        {size}
                        {!isAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[120%] h-[2px] bg-gray-300 rotate-45" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {(() => {
              const selectedStockItem = product.stock?.find((s: any) => s.size === selectedSize);
              const isSelectedSizeAvailable = !product.stock || (selectedStockItem && selectedStockItem.quantity > 0);
              const isAllOutOfStock = product.sizes && product.sizes.length > 0 && 
                product.sizes.every((size: string) => {
                  const stockItem = product.stock?.find((s: any) => s.size === size);
                  return !stockItem || stockItem.quantity <= 0;
                });

              return (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4 bg-gray-50 px-4 py-3 rounded-2xl border border-accent/10 shrink-0">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:bg-accent/10 rounded-lg transition-colors text-accent disabled:opacity-30"
                      disabled={quantity <= 1 || isAllOutOfStock}
                    >
                      <Minus className="w-5 h-5" strokeWidth={3} />
                    </button>
                    <span className="text-lg font-bold text-gray-700 min-w-[1.5rem] text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:bg-accent/10 rounded-lg transition-colors text-accent disabled:opacity-30"
                      disabled={isAllOutOfStock}
                    >
                      <Plus className="w-5 h-5" strokeWidth={3} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    disabled={!isSelectedSizeAvailable || isAllOutOfStock}
                    className={`flex-1 py-5 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95 text-lg ${
                      !isSelectedSizeAvailable || isAllOutOfStock
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-accent text-white hover:shadow-xl'
                    }`}
                  >
                    <ShoppingBag className="w-6 h-6" />
                    {isAllOutOfStock ? 'نفذ المنتج' : !isSelectedSizeAvailable ? 'غير متوفر' : 'Ajouter'}
                  </button>
                </div>
              );
            })()}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default QuickAddDrawer;
