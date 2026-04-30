"use client";

import React, { useState, use, useEffect } from 'react';
import { ShoppingBag, CreditCard, ChevronLeft, Star, Ruler, Plus, Minus } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [variantImage, setVariantImage] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(`*[_type == "product" && _id == $id][0]`, { id: resolvedParams.id });
        setProduct(data);
        if (data?.sizes?.[0]) setSelectedSize(data.sizes[0]);
        if (data?.colors?.[0]) {
          const firstColor = data.colors[0];
          const firstName = typeof firstColor === 'string' ? firstColor : firstColor.name;
          const firstImage = typeof firstColor === 'string' ? null : firstColor.image;
          setSelectedColor(firstName);
          if (firstImage) setVariantImage(firstImage);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-base font-bold text-gray-800 mb-4">Produit non trouvé</h1>
        <Link href="/" className="px-4 py-2 bg-accent text-white rounded-xl font-bold">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  const allImages = [product.image, ...(product.gallery || [])];

  const handleAddToCart = () => {
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

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header spacing */}
      <div className="h-4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#c9beda] font-bold text-sm mb-6 hover:underline">
          <ChevronLeft className="w-4 h-4" />
          Retour à la boutique
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white border border-[#d6c9e8] shadow-sm">
              <img 
                src={urlFor(variantImage || allImages[activeImage]).url()} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {allImages.map((img: any, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => {
                    setActiveImage(idx);
                    setVariantImage(null);
                  }}
                  className={`w-16 aspect-[3/4] rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                    !variantImage && activeImage === idx ? 'border-[#c9beda] shadow-md' : 'border-[#d6c9e8] opacity-60'
                  }`}
                >
                  <img src={urlFor(img).url()} alt="" className="w-full h-full object-cover" />
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
              <h1 className="text-2xl font-bold text-gray-900 font-ornate italic mb-2 tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-end gap-3">
                <p className="text-xl font-bold text-[#c9beda]">{product.price} DA</p>
                {product.originalPrice && (
                  <p className="text-xl text-gray-400 line-through font-medium mb-[2px]">{product.originalPrice} DA</p>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed font-medium">
              {product.description}
            </p>

            {/* Fabric & Measurements */}
            {(product.fabric || product.measurements) && (
              <div className="flex flex-col gap-4 p-6 bg-gray-50 rounded-lg border border-[#d6c9e8]">
                {product.fabric && (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0">Tissu:</span>
                    <span className="px-4 py-1.5 bg-[#FEE4ED] text-[#c9beda] rounded-full font-bold text-sm shadow-sm border border-[#c9beda]/20">
                      {product.fabric}
                    </span>
                  </div>
                )}
                {product.measurements && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Ruler className="w-3 h-3" />
                      Détails des mesures (القياسات):
                    </h3>
                    <p className="text-sm text-gray-600 bg-white p-4 rounded-md border border-[#d6c9e8]/50 whitespace-pre-line leading-relaxed">
                      {product.measurements}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Couleur: {selectedColor}</h3>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color: any) => {
                    const colorName = typeof color === 'string' ? color : color.name;
                    const colorImage = typeof color === 'string' ? null : color.image;
                    return (
                      <button 
                        key={colorName}
                        onClick={() => {
                          setSelectedColor(colorName);
                          if (colorImage) setVariantImage(colorImage);
                          else setVariantImage(null);
                        }}
                        className={`px-4 py-2.5 rounded-full border-2 font-bold text-sm transition-all ${
                          selectedColor === colorName ? 'border-[#c9beda] bg-[#FEE4ED] text-[#c9beda]' : 'border-[#d6c9e8] text-gray-400'
                        }`}
                      >
                        {colorName}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Taille</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {product.sizes.map((size: string) => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-md border-2 font-bold text-xs transition-all ${
                        selectedSize === size ? 'border-[#c9beda] bg-[#FEE4ED] text-[#c9beda] shadow-lg' : 'border-[#d6c9e8] text-gray-500 hover:border-[#c9beda]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 items-stretch mt-4">
              {/* Actions */}
              <div className="flex-1 flex flex-col gap-4">
                <button 
                  onClick={handleBuyNow}
                  className="w-full py-3 bg-[#c9beda] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-xl transition-all transform active:scale-[0.98] text-sm shadow-[0_10px_20px_-10px_rgba(201,190,218,0.5)]"
                >
                  <CreditCard className="w-4 h-4" />
                  Commander maintenant
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-white border-2 border-[#c9beda] text-[#c9beda] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#FEE4ED] transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Ajouter au panier
                </button>
              </div>

              {/* Vertical Quantity Selector */}
              <div className="flex flex-col items-center justify-between bg-gray-50 rounded-xl border border-[#d6c9e8] p-2 w-20 shrink-0">
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#c9beda] hover:bg-[#FEE4ED] shadow-sm transition-all active:scale-90"
                >
                  <Plus className="w-4 h-4" strokeWidth={3} />
                </button>
                <span className="text-base font-black text-gray-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-full text-[#c9beda] hover:bg-[#FEE4ED] shadow-sm transition-all active:scale-90 disabled:opacity-30 disabled:pointer-events-none"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts categoryId={product.category?._ref} currentProductId={product._id} />
      </div>
    </div>
  );
};

const RelatedProducts = ({ categoryId, currentProductId }: { categoryId?: string; currentProductId: string }) => {
  const [relatedProducts, setRelatedProducts] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    if (!categoryId) return;
    
    const fetchRelated = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "product" && category._ref == $categoryId && _id != $currentProductId] | order(_createdAt desc)`,
          { categoryId, currentProductId }
        );
        setRelatedProducts(data);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };
    fetchRelated();
  }, [categoryId, currentProductId]);

  if (relatedProducts.length === 0) return null;

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-gray-900 font-ornate italic mb-8 text-center">
        Produits similaires
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {relatedProducts.map((product) => (
          <Link key={product._id} href={`/product/${product._id}`}>
            <div className="group block bg-white rounded-xl border border-[#d6c9e8]/20 overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="aspect-[3/4] bg-gray-50">
                <img 
                  src={urlFor(product.image).url()} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-sm font-bold text-gray-800 font-ornate italic line-clamp-1 mb-1">
                  {product.name}
                </h3>
                <p className="text-base font-bold text-[#c9beda]">{product.price} DA</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
