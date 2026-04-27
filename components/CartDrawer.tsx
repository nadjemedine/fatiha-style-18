"use client";

import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, cartCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative ml-auto h-full w-[80%] sm:w-1/2 bg-[#f7faf7] shadow-2xl flex flex-col animate-slide-left border-l border-[#ccd9cc]">
        <div className="flex items-center justify-between p-4 border-b border-[#ccd9cc] bg-[#e2eee2]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2d5a27]" />
            <h2 className="text-lg font-bold text-gray-900">Panier ({cartCount})</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-[#ccd9cc] rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-[#2d5a27]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag className="w-16 h-16 mb-4 text-[#2d5a27]" />
              <p className="text-gray-500 font-medium">Le panier est actuellement vide</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-white rounded-2xl border border-[#ccd9cc] group">
                <div className="w-20 h-24 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                    <p className="text-[#2d5a27] font-bold mt-1">{item.price} DA</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Quantité: {item.quantity}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
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
          <div className="p-4 border-t border-[#ccd9cc] bg-[#e2eee2] space-y-4 pb-8">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Total</span>
              <span className="text-xl font-bold text-[#2d5a27]">
                {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} DA
              </span>
            </div>
            <button className="w-full py-4 bg-[#2d5a27] text-white rounded-2xl font-bold hover:shadow-lg transition-all transform active:scale-[0.98]">
              Commander
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
