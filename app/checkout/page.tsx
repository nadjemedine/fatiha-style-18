"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/components/CartContext';
import { ArrowLeft, ShoppingBag, CheckCircle2, User, Phone, MapPin, Truck, Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { wilayas, yalidinePrices } from '@/lib/algeria-data';

export default function CheckoutPage() {
  const { cart, cartCount, clearCart, updateQuantity, removeFromCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    commune: '',
    deliveryType: 'home' // 'home' or 'office'
  });
  const [availableالبلديةs, setAvailableCommunes] = useState<string[]>([]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Calculate delivery price based on wilaya and delivery type
  const getDeliveryPrice = (type: 'home' | 'office') => {
    const selectedWilaya = wilayas.find(w => w.name === formData.wilaya);
    if (!selectedWilaya) return 0;
    
    const prices = yalidinePrices[selectedWilaya.id];
    if (!prices) return 0;
    
    return type === 'home' ? prices.home : prices.office;
  };

  const homePrice = getDeliveryPrice('home');
  const officePrice = getDeliveryPrice('office');
  const deliveryPrice = formData.deliveryType === 'home' ? homePrice : officePrice;
  const finalTotal = total + deliveryPrice;

  useEffect(() => {
    const selectedWilaya = wilayas.find(w => w.name === formData.wilaya);
    if (selectedWilaya) {
      setAvailableCommunes(selectedWilaya.communes);
      // Removed auto-setting commune when wilaya changes for text input
    } else {
      setAvailableCommunes([]);
    }
  }, [formData.wilaya]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.wilaya) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    try {
      // Send order notification email
      const response = await fetch('/api/orders/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          cart,
          total,
          deliveryPrice,
          finalTotal,
        }),
      });

      if (!response.ok) {
        console.error('Failed to send order notification');
      }

      // Mark order as submitted
      setIsSubmitted(true);
      clearCart();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error submitting order:', error);
      // Still mark as submitted even if email fails
      setIsSubmitted(true);
      clearCart();
      window.scrollTo(0, 0);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 font-ornate italic mb-4">شكراً على طلبك!</h1>
        <p className="text-gray-600 text-lg mb-12 max-w-md mx-auto">
          تم استلام طلبك بنجاح. سيتواصل معك فريقنا قريباً عبر الهاتف لتأكيد التفاصيل.
        </p>
        <Link 
          href="/" 
          className="w-full max-w-sm py-5 bg-[#c9beda] text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md p-4 flex items-center gap-4 border-b border-[#d6c9e8] sticky top-0 z-20">
        <Link href="/" className="p-2 hover:bg-[#FEE4ED] rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 font-ornate italic">Finaliser la commande</h1>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {cart.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-[#d6c9e8] shadow-sm">
            <div className="bg-[#FEE4ED] p-8 rounded-full mb-6">
              <ShoppingBag className="w-16 h-16 text-[#c9beda]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-ornate italic">Votre panier est vide</h2>
            <p className="text-gray-500 mb-8">Commencez vos achats pour ajouter des produits</p>
            <Link 
              href="/" 
              className="px-12 py-4 bg-[#c9beda] text-white rounded-[2rem] font-bold hover:shadow-lg transition-all"
            >
              Voir les produits
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Top: Product List */}
            <div className="bg-white p-6 lg:p-10 rounded-2xl border border-[#d6c9e8] shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 font-ornate italic mb-8">Articles à commander ({cartCount})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${item.color}-${item.size}-${item.fabric}-${index}`} className="flex gap-4 p-4 bg-gray-50 rounded-[2rem] border border-[#d6c9e8]/30 group transition-all hover:shadow-md">
                    <div className="w-24 h-32 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-gray-800 text-lg line-clamp-1">{item.name}</h4>
                          <button 
                            type="button"
                            onClick={() => removeFromCart(item.id, item.color, item.size, item.fabric)}
                            className="p-2 text-red-200 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.color && <span className="text-[10px] bg-[#FEE4ED] text-[#c9beda] px-2 py-0.5 rounded-full font-bold">{item.color}</span>}
                          {item.size && <span className="text-[10px] border border-[#d6c9e8] text-gray-500 px-2 py-0.5 rounded-full font-bold">{item.size}</span>}
                          {item.fabric && <span className="text-[10px] bg-red-50 text-red-400 px-2 py-0.5 rounded-full font-bold italic">{item.fabric}</span>}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 bg-white px-3 py-1.5 rounded-full border border-[#d6c9e8] shadow-sm">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, -1, item.color, item.size, item.fabric)}
                            className="text-[#c9beda] hover:scale-125 transition-transform"
                          >
                            <Minus className="w-3 h-3" strokeWidth={3} />
                          </button>
                          <span className="text-sm font-black text-gray-700 min-w-[1rem] text-center">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, 1, item.color, item.size, item.fabric)}
                            className="text-[#c9beda] hover:scale-125 transition-transform"
                          >
                            <Plus className="w-3 h-3" strokeWidth={3} />
                          </button>
                        </div>
                        <p className="text-[#c9beda] font-black text-lg">{item.price * item.quantity} DA</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Form */}
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-[#d6c9e8] shadow-sm space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 font-ornate italic mb-6 border-b border-gray-50 pb-4">
                    معلومات التوصيل
                  </h2>
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <User className="w-3 h-3" /> Nom et Prénom
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Ex: Ahmed Benali"
                      className="w-full p-4 bg-gray-50 border border-[#d6c9e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c9beda] transition-all font-medium"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Phone className="w-3 h-3" /> رقم الهاتف
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="Ex: 05xx xx xx xx"
                      className="w-full p-4 bg-gray-50 border border-[#d6c9e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c9beda] transition-all font-medium"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  {/* Wilaya & Commune */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Wilaya (58)
                      </label>
                      <select 
                        required
                        className="w-full p-4 bg-gray-50 border border-[#d6c9e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c9beda] transition-all font-medium appearance-none"
                        value={formData.wilaya}
                        onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
                      >
                        <option value="">Sélectionner</option>
                        {wilayas.map(w => (
                          <option key={w.id} value={w.name}>{w.id} - {w.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Commune
                      </label>
                      <input 
                        type="text"
                        required
                        placeholder="Ex: Kouba"
                        className="w-full p-4 bg-gray-50 border border-[#d6c9e8] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#c9beda] transition-all font-medium"
                        value={formData.commune}
                        onChange={(e) => setFormData({...formData, commune: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Delivery Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Truck className="w-3 h-3" /> نوع التوصيل
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, deliveryType: 'home'})}
                        className={`p-4 rounded-2xl border-2 font-bold transition-all ${
                          formData.deliveryType === 'home' ? 'border-[#c9beda] bg-[#FEE4ED] text-[#c9beda]' : 'border-gray-50 text-gray-400 bg-gray-50'
                        }`}
                      >
                        <div className="text-sm">À domicile</div>
                        {formData.wilaya && homePrice > 0 && (
                          <div className="text-xs mt-1 font-bold">{homePrice} DA</div>
                        )}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, deliveryType: 'office'})}
                        className={`p-4 rounded-2xl border-2 font-bold transition-all ${
                          formData.deliveryType === 'office' ? 'border-[#c9beda] bg-[#FEE4ED] text-[#c9beda]' : 'border-gray-50 text-gray-400 bg-gray-50'
                        }`}
                      >
                        <div className="text-sm">Point Relais / Bureau</div>
                        {formData.wilaya && officePrice > 0 && (
                          <div className="text-xs mt-1 font-bold">{officePrice} DA</div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-[#d6c9e8] shadow-sm flex flex-col h-full">
                  <h2 className="text-2xl font-bold text-gray-900 font-ornate italic mb-8 border-b border-gray-50 pb-4">Résumé financier</h2>
                  
                  <div className="mt-auto space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between text-gray-500 font-medium">
                        <span>المجموع الفرعي</span>
                        <span>{total} DA</span>
                      </div>
                      <div className="flex justify-between text-gray-500 font-medium">
                        <span>التوصيل (Yalidine)</span>
                        <span className="text-accent">{deliveryPrice > 0 ? `${deliveryPrice} DA` : 'Sélectionner wilaya'}</span>
                      </div>
                      <div className="h-px bg-gray-100 my-4" />
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">المجموع الكلي</span>
                        <span className="text-3xl font-black text-[#c9beda]">{finalTotal} DA</span>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-6 bg-[#c9beda] text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all transform active:scale-95"
                    >
                      Confirmer la commande (COD)
                    </button>
                  </div>
                </div>

                {/* Secure Checkout Info */}
                <div className="p-6 bg-[#FEE4ED]/20 rounded-[2rem] border border-[#c9beda]/20 flex gap-4 items-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#c9beda]" />
                  </div>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    Paiement à la livraison (Cash on Delivery). Vous payez uniquement lorsque vous recevez votre commande.
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
