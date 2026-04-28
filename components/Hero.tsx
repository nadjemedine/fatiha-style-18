"use client";

import React from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const Hero = () => {
  const [heroData, setHeroData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await client.fetch(`*[_type == "hero"][0]`);
        setHeroData(data);
      } catch (error) {
        console.error('Error fetching hero:', error);
      }
    };
    fetchHero();
  }, []);

  if (!heroData) return null;

  return (
    <section className="relative h-[500px] w-full overflow-hidden mb-12">
      <div className="absolute inset-0">
        <img 
          src={urlFor(heroData.backgroundImage).url()} 
          alt={heroData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg font-ornate italic">
          {heroData.title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
          {heroData.subtitle}
        </p>
        {heroData.ctaText && (
          <a 
            href={heroData.ctaLink || '#'} 
            className="px-8 py-3 bg-accent text-white rounded-full font-bold hover:bg-accent/90 transition-all transform hover:scale-105"
          >
            {heroData.ctaText}
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
