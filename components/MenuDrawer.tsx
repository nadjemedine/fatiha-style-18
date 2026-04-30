"use client";

import React, { useState } from 'react';
import { X, ChevronRight, Store, FileText } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';

const MenuDrawer = () => {
  const { isMenuOpen, setIsMenuOpen } = useCart();
  const [activeTab, setActiveTab] = useState<'boutique' | 'pages'>('boutique');

  if (!isMenuOpen) return null;

  const categories: string[] = [];

  const pages = [
    { name: "من نحن", path: "/about" },
    { name: "اتصل بنا", path: "/contact" },
    { name: "الشروط العامة", path: "/terms" },
    { name: "سياسة التوصيل", path: "/delivery" }
  ];

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
              <img src="/logo.png" alt="Fatiha Style 18 Logo" className="h-full w-auto object-contain" />
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

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'boutique' ? (
            <div className="space-y-2">
            <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
              <Store className="w-12 h-12 mb-3 text-accent" strokeWidth={1} />
              <p className="text-sm font-medium font-ornate italic text-gray-500">التصنيفات ستكون متاحة قريباً</p>
            </div>
            </div>
          ) : (
            <div className="space-y-2">
              {pages.map((page) => (
                <Link 
                  key={page.name}
                  href={page.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-accent/20 group hover:bg-nav-bg transition-colors"
                >
                  <span className="font-bold text-gray-700">{page.name}</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-accent transition-colors" />
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-accent/20 bg-white">
          <p className="text-center text-xs text-gray-400 font-medium tracking-widest uppercase mb-4">Fatiha Style 18</p>
          <div className="flex justify-center gap-4">
            {/* Social icons could go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
