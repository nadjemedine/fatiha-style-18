"use client";

import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative mr-auto h-full w-[80%] sm:w-1/2 bg-background shadow-2xl flex flex-col animate-slide-right border-r border-accent/20">
        <div className="flex items-center justify-between p-4 border-b border-accent/20 bg-nav-bg">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold text-gray-900">السلة ({cartCount})</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-accent/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-accent" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag className="w-16 h-16 mb-4 text-accent" />
              <p className="text-gray-500 font-medium">السلة فارغة حالياً</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${item.color}-${item.size}-${index}`} className="flex gap-4 p-3 bg-white rounded-2xl border border-accent/20 group">
                <div className="w-20 h-24 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                    <div className="flex gap-2 items-center mt-0.5">
                      {item.color && (
                        <span className="text-[10px] bg-nav-bg text-accent px-2 py-0.5 rounded-full font-bold">
                          {item.color}
                        </span>
                      )}
                      {item.size && (
                        <span className="text-[10px] border border-accent/20 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                          {item.size}
                        </span>
                      )}
                      {item.fabric && (
                        <span className="text-[10px] bg-red-50 text-red-400 px-2 py-0.5 rounded-full font-bold italic">
                          {item.fabric}
                        </span>
                      )}
                    </div>
                    <p className="text-accent font-bold mt-1">{item.price} DA</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-gray-50 px-2 py-1 rounded-xl border border-accent/10">
                      <button 
                        onClick={() => updateQuantity(item.id, -1, item.color, item.size, item.fabric)}
                        className="p-1 hover:bg-accent/10 rounded-md transition-colors text-accent"
                      >
                        <Minus className="w-3 h-3" strokeWidth={3} />
                      </button>
                      <span className="text-xs font-bold text-gray-700 min-w-[1.2rem] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1, item.color, item.size, item.fabric)}
                        className="p-1 hover:bg-accent/10 rounded-md transition-colors text-accent"
                      >
                        <Plus className="w-3 h-3" strokeWidth={3} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.color, item.size, item.fabric)}
                      className="p-1.5 text-red-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-accent/20 bg-nav-bg space-y-4 pb-8">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">المجموع</span>
              <span className="text-xl font-bold text-accent">
                {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} DA
              </span>
            </div>
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-4 bg-accent text-white rounded-2xl font-bold hover:shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center"
            >
              اطلب الآن
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
