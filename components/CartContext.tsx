"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
  fabric?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, color?: string, size?: string, fabric?: string) => void;
  updateQuantity: (id: string, delta: number, color?: string, size?: string, fabric?: string) => void;
  clearCart: () => void;
  cartCount: number;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  favoritesCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceFilter: string;
  setPriceFilter: (price: string) => void;
  quickAddProduct: any | null;
  setQuickAddProduct: (product: any | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [priceFilter, setPriceFilter] = useState("all");
  const [quickAddProduct, setQuickAddProduct] = useState<any | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const savedFavorites = localStorage.getItem('favorites');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    setIsHydrated(true);
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isHydrated]);

  // Persist favorites to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isHydrated]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => 
        i.id === item.id && i.color === item.color && i.size === item.size && i.fabric === item.fabric
      );
      if (existing) {
        return prev.map((i) => 
          (i.id === item.id && i.color === item.color && i.size === item.size && i.fabric === item.fabric) 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        );
      }
      return [...prev, { ...item }];
    });
    setIsCartOpen(true);
    setQuickAddProduct(null); // Close quick add if it was open
  };

  const removeFromCart = (id: string, color?: string, size?: string, fabric?: string) => {
    setCart((prev) => prev.filter((item) => 
      !(item.id === id && item.color === color && item.size === size && item.fabric === fabric)
    ));
  };

  const updateQuantity = (id: string, delta: number, color?: string, size?: string, fabric?: string) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id && item.color === color && item.size === size && item.fabric === fabric) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const favoritesCount = favorites.length;

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, clearCart, cartCount, 
      favorites, toggleFavorite, isFavorite, favoritesCount,
      isCartOpen, setIsCartOpen,
      isMenuOpen, setIsMenuOpen,
      searchTerm, setSearchTerm,
      isSearchOpen, setIsSearchOpen,
      selectedCategory, setSelectedCategory,
      priceFilter, setPriceFilter,
      quickAddProduct, setQuickAddProduct,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
