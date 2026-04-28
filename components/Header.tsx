"use client";

import React from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const Header = () => {
  const { setIsCartOpen, cartCount, setIsMenuOpen, isSearchOpen, setIsSearchOpen } = useCart();
  const [settings, setSettings] = React.useState<any>(null);

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

  return (
    <header className="sticky top-0 z-50 bg-nav-bg/90 backdrop-blur-md border-b border-accent/20 px-4 py-1 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-1 hover:bg-accent/10 rounded-full transition-colors"
        >
          <Menu className="w-6 h-6 text-accent" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="h-[80px] flex items-center">
          <img 
            src={settings?.logo ? urlFor(settings.logo).url() : "/logo.png"} 
            alt={settings?.storeName || "Fatiha Style 18"} 
            className="h-full w-auto object-contain"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className={`p-1 rounded-full transition-colors ${isSearchOpen ? 'bg-accent/20 text-accent' : 'hover:bg-accent/10'}`}
        >
          <Search className="w-6 h-6 text-accent" strokeWidth={1.5} />
        </button>
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
    </header>
  );
};

export default Header;
