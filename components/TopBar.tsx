"use client";

import React, { useState, useEffect } from 'react';

const TopBar = () => {
  const announcements = [
    "Bienvenue à Fatiha Style 18 Boutique",
    "Livraison Rapide 58 Wilayas",
    "Paiement à la livraison"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
        setIsFading(false);
      }, 500); // Half second for fade out
    }, 4000); // Show each for 4 seconds

    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <div className="w-full bg-[#dce8dc] py-2 text-center border-b border-[#ccd9cc] overflow-hidden">
      <div className={`transition-all duration-500 transform ${isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        <p className="text-xs sm:text-sm font-medium text-[#2d5a27] tracking-[0.2em] font-ornate italic uppercase">
          ✧ {announcements[currentIndex]} ✧
        </p>
      </div>
    </div>
  );
};

export default TopBar;
