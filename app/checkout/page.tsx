"use client";

import React from 'react';
import { useCart } from '@/components/CartContext';
import { ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, removeFromCart, cartCount } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f7faf7] pb-24">
      {/* Header */}
      <div className="bg-[#e2eee2] p-4 flex items-center gap-4 border-b border-[#ccd9cc] sticky top-0 z-10">
        <Link href="/" className="p-2 hover:bg-[#ccd9cc] rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Mon Panier ({cartCount})</h1>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {cart.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="bg-[#e2eee2] p-8 rounded-full mb-6">
              <ShoppingBag className="w-16 h-16 text-[#2d5a27]" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Votre panier est vide</h2>
            <p className="text-gray-500 mb-8">Commencez vos achats pour ajouter des produits</p>
            <Link 
              href="/" 
              className="px-8 py-3 bg-[#2d5a27] text-white rounded-2xl font-bold hover:shadow-lg transition-all"
            >
              Retour à la boutique
            </Link>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-3xl border border-[#ccd9cc] flex gap-4">
                  <div className="w-24 h-32 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                      <p className="text-[#2d5a27] font-bold text-lg">{item.price} DA</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 bg-[#f7faf7] px-3 py-1 rounded-full border border-[#ccd9cc]">
                        <span className="text-sm font-medium">Quantité: {item.quantity}</span>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-100 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-3xl border border-[#ccd9cc] shadow-sm space-y-4">
              <div className="flex items-center justify-between text-gray-500">
                <span>Sous-total</span>
                <span>{total} DA</span>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Livraison</span>
                <span className="text-[#2d5a27] font-medium">Selon la wilaya</span>
              </div>
              <div className="h-px bg-[#ccd9cc] my-2" />
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-[#2d5a27]">{total} DA</span>
              </div>
              
              <button className="w-full py-5 bg-[#2d5a27] text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-[1.01] transition-all transform active:scale-95 mt-4">
                Confirmer la commande
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
