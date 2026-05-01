"use client";

import React from 'react';
import { Menu, Search, ShoppingBag, ChevronDown, Heart, Home } from 'lucide-react';
import { useCart } from './CartContext';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

const Header = () => {
  const { setIsCartOpen, cartCount, setIsMenuOpen, searchTerm, setSearchTerm, favoritesCount } = useCart();
  const [settings, setSettings] = React.useState<any>(null);
  const [isPagesOpen, setIsPagesOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await client.fetch(`*[_type == "settings"][0]`);
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const navPages = [
    { name: "من نحن", path: "/about" },
    { name: "اتصل بنا", path: "/contact" },
    { name: "سياسة التوصيل", path: "/delivery" },
    { name: "الشروط العامة", path: "/terms" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-nav-bg/90 backdrop-blur-md border-b border-accent/20 px-4 py-1">
      {/* Mobile Header */}
      <div className="flex md:hidden items-center justify-between h-[60px]">
        <div className="flex items-center">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-1 hover:bg-accent/10 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6 text-accent" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <Link href="/" className="h-[50px] flex items-center">
            <img 
              src={settings?.logo ? urlFor(settings.logo).url() : "/logo.png"} 
              alt={settings?.storeName || "Fatiha Style"} 
              className="h-full w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-1 hover:bg-accent/10 rounded-full transition-colors relative"
          >
            <ShoppingBag className="w-6 h-6 text-accent" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-0 -right-0 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between h-[80px] max-w-7xl mx-auto">
        {/* Right: Search & Cart (Swapped) */}
        <div className="flex items-center gap-6 flex-1 justify-end order-3">
          <div className="relative max-w-xs w-full">
            <input 
              type="text"
              placeholder="البحث عن منتجات..."
              className="w-full bg-white/50 border border-accent/20 rounded-2xl py-2.5 px-10 focus:outline-none focus:ring-2 focus:ring-accent/30 text-sm font-bold text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/50" strokeWidth={2.5} />
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-3 bg-white border border-accent/10 hover:bg-accent/5 rounded-2xl transition-all relative group shadow-sm"
          >
            <ShoppingBag className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Center: Navigation (Same) */}
        <nav className="flex items-center gap-2 lg:gap-8 px-6 order-2">
          <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-accent/5 hover:text-accent transition-all font-bold group">
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>الرئيسية</span>
          </Link>
          
          <Link href="/favorites" className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-accent/5 hover:text-accent transition-all font-bold group relative">
            <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>المفضلة</span>
            {favoritesCount > 0 && (
              <span className="w-2 h-2 bg-red-500 rounded-full absolute top-1 right-1" />
            )}
          </Link>

          {/* Pages Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPagesOpen(true)}
            onMouseLeave={() => setIsPagesOpen(false)}
          >
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 hover:bg-accent/5 hover:text-accent transition-all font-bold">
              <span>الصفحات</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isPagesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isPagesOpen && (
              <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-2xl shadow-2xl border border-accent/10 py-3 animate-fade-in-up overflow-hidden z-50">
                {navPages.map((page) => (
                  <Link 
                    key={page.path}
                    href={page.path}
                    className="flex items-center justify-between px-6 py-3 text-sm font-bold text-gray-600 hover:bg-nav-bg hover:text-accent transition-colors"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Left: Logo (Swapped) */}
        <div className="flex-1 flex justify-start order-1">
          <Link href="/" className="h-[70px] flex items-center">
            <img 
              src={settings?.logo ? urlFor(settings.logo).url() : "/logo.png"} 
              alt={settings?.storeName || "Fatiha Style"} 
              className="h-full w-auto object-contain"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
