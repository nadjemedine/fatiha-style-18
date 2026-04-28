"use client";

import React from 'react';
import { client } from '@/sanity/lib/client';
import * as LucideIcons from 'lucide-react';

const FeatureCards = () => {
  const [features, setFeatures] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const data = await client.fetch(`*[_type == "feature"]`);
        setFeatures(data);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };
    fetchFeatures();
  }, []);

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="w-10 h-10 text-accent" strokeWidth={1.5} /> : <LucideIcons.Package className="w-10 h-10 text-accent" strokeWidth={1.5} />;
  };
  return (
    <section className="bg-background py-8 border-y border-accent/10 relative overflow-hidden">
      <div className="flex animate-ticker animate-ticker-hover-pause w-fit">
        {[...features, ...features].map((feature, index) => (
          <div 
            key={`${feature._id}-${index}`} 
            className="flex-shrink-0 w-[240px] px-4"
          >
            <div className="bg-white p-6 rounded-[2.5rem] border border-accent/20 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow group">
              <div className="bg-nav-bg p-3 rounded-full shrink-0 group-hover:scale-110 transition-transform">
                {renderIcon(feature.iconName)}
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-gray-800 font-ornate italic tracking-wide mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative Gradient Overlays */}
      <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default FeatureCards;
