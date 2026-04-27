"use client";

import React, { useState, use } from 'react';
import { ShoppingBag, CreditCard, ChevronLeft, Star, Ruler } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Noir');
  const [activeImage, setActiveImage] = useState(0);

  // Dummy product data
  const product = {
    id: resolvedParams.id,
    name: "Robe de soirée élégante",
    price: 8500,
    description: "Une robe de soirée magnifique conçue avec des tissus de haute qualité. Parfaite pour vos occasions spéciales, alliant confort et élégance absolue. Cette pièce unique saura mettre en valeur votre silhouette avec raffinement.",
    images: [
      "/product1.png",
      "/product2.png",
      "/product1.png",
    ],
    colors: ["Noir", "Émeraude", "Beige"],
    sizes: ["S", "M", "L", "XL"]
  };

  const handleAddToCart = () => {
    addToCart({
      id: Number(product.id),
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#f7faf7] pb-32">
      {/* Header spacing */}
      <div className="h-4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#2d5a27] font-bold text-sm mb-6 hover:underline">
          <ChevronLeft className="w-4 h-4" />
          Retour à la boutique
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-white border border-[#ccd9cc] shadow-sm">
              <img 
                src={product.images[activeImage]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === idx ? 'border-[#2d5a27] shadow-md' : 'border-[#ccd9cc] opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                <span className="text-xs text-gray-400 font-bold ml-2">(48 avis)</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 font-ornate italic mb-2 tracking-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-[#2d5a27]">{product.price} DA</p>
            </div>

            <p className="text-gray-600 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Colors */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Couleur: {selectedColor}</h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2.5 rounded-full border-2 font-bold text-sm transition-all ${
                      selectedColor === color ? 'border-[#2d5a27] bg-[#e2eee2] text-[#2d5a27]' : 'border-[#ccd9cc] text-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Taille</h3>
                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-[#2d5a27] transition-colors">
                  <Ruler className="w-3 h-3" />
                  Guide des tailles
                </button>
              </div>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl border-2 font-bold transition-all ${
                      selectedSize === size ? 'border-[#2d5a27] bg-[#2d5a27] text-white shadow-lg' : 'border-[#ccd9cc] text-gray-500 hover:border-[#2d5a27]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-4">
              <button 
                onClick={handleBuyNow}
                className="w-full py-5 bg-[#2d5a27] text-white rounded-3xl font-bold flex items-center justify-center gap-3 hover:shadow-xl transition-all transform active:scale-[0.98] text-lg shadow-[0_10px_20px_-10px_rgba(45,90,39,0.5)]"
              >
                <CreditCard className="w-6 h-6" />
                Commander maintenant
              </button>
              <button 
                onClick={handleAddToCart}
                className="w-full py-5 bg-white border-2 border-[#2d5a27] text-[#2d5a27] rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-[#e2eee2] transition-all"
              >
                <ShoppingBag className="w-6 h-6" />
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
