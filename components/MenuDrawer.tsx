"use client";

import React, { useState } from 'react';
import { X, ChevronRight, Store, FileText, LucideIcon, icons } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';

const MenuDrawer = () => {
  const router = useRouter();
  const { isMenuOpen, setIsMenuOpen, setSelectedCategory } = useCart();
  const [activeTab, setActiveTab] = useState<'boutique' | 'pages'>('boutique');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const defaultPages = [
    { title: "من نحن", path: "/about", icon: "Info" },
    { title: "اتصل بنا", path: "/contact", icon: "Phone" },
    { title: "الشروط العامة", path: "/terms", icon: "FileText" },
    { title: "سياسة التوصيل", path: "/delivery", icon: "Truck" }
  ];

  React.useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await client.fetch(`*[_type == "menu"][0].items`);
        if (data && data.length > 0) {
          setMenuItems(data);
        } else {
          setMenuItems(defaultPages);
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
        setMenuItems(defaultPages);
      }
    };
    fetchMenu();
  }, []);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await client.fetch(`*[_type == "category"]{
          _id,
          title,
          "imageUrl": image.asset->url
        }`);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  if (!isMenuOpen) return null;

  // Helper to get icon component
  const getIcon = (iconName: string) => {
    const Icon = (icons as any)[iconName];
    return Icon || FileText;
  };

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative ml-auto h-full w-[80%] sm:w-1/2 bg-background shadow-2xl flex flex-col animate-slide-left border-l border-accent/20">
        <div className="p-4 border-b border-accent/20 bg-nav-bg">
          <div className="flex items-center justify-between mb-6">
            <div className="h-14">
              <img src="/logo.png" alt="Fatiha Style Logo" className="h-full w-auto object-contain" />
            </div>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-accent/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-accent" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex bg-accent/10 p-1 rounded-2xl">
            <button 
              onClick={() => setActiveTab('boutique')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'boutique' ? 'bg-white text-accent shadow-sm' : 'text-gray-500'
              }`}
            >
              <Store className="w-4 h-4" />
              المتجر
            </button>
            <button 
              onClick={() => setActiveTab('pages')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'pages' ? 'bg-white text-accent shadow-sm' : 'text-gray-500'
              }`}
            >
              <FileText className="w-4 h-4" />
              الصفحات
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'boutique' ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <button 
                    key={cat._id}
                    onClick={() => {
                      if (setSelectedCategory) setSelectedCategory(cat.title);
                      setIsMenuOpen(false);
                      router.push('/');
                    }}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className="w-[84px] h-[84px] sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] group-hover:scale-105 border-2 border-transparent group-hover:border-[#FEE4ED]">
                      {cat.imageUrl ? (
                        <img src={cat.imageUrl} alt={cat.title} className="w-full h-full object-cover" />
                      ) : (
                        <Store className="w-8 h-8 text-gray-300" />
                      )}
                    </div>
                    <span className="font-bold text-sm text-gray-700 group-hover:text-accent transition-colors text-center font-ornate">
                      {cat.title}
                    </span>
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                  <Store className="w-12 h-12 mb-3 text-accent" strokeWidth={1} />
                  <p className="text-sm font-medium font-ornate italic text-gray-500">لا توجد تصنيفات حالياً</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = getIcon(item.icon);
                return (
                  <Link 
                    key={index}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-accent/20 group hover:bg-nav-bg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-accent/60 group-hover:text-accent" />
                      <span className="font-bold text-gray-700">{item.title}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-accent transition-colors" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-accent/20 bg-white">
          <p className="text-center text-xs text-gray-400 font-medium tracking-widest uppercase mb-4">Fatiha Style</p>
          <div className="flex justify-center gap-4">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
