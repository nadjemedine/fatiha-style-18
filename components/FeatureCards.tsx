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
    <section className="bg-background py-12 px-4 border-t border-accent/20">
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 sm:gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white p-6 sm:p-10 rounded-[3rem] border border-accent/20 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow aspect-square justify-center"
          >
            <div className="bg-nav-bg p-4 rounded-full mb-2">
              {renderIcon(feature.iconName)}
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-bold text-gray-800 font-ornate italic tracking-wide mb-1">
                {feature.title}
              </h3>
              <p className="text-[10px] sm:text-sm text-gray-500 font-medium leading-tight">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
