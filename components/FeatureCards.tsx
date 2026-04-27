import React from 'react';
import { Truck, HandCoins, RefreshCcw, PackageSearch } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-10 h-10 text-[#2d5a27]" strokeWidth={1.5} />,
    title: "Livraison rapide",
    description: "Nous livrons rapidement partout en Algérie"
  },
  {
    icon: <HandCoins className="w-10 h-10 text-[#2d5a27]" strokeWidth={1.5} />,
    title: "Paiement à la livraison",
    description: "Payez en toute sécurité à la livraison"
  },
  {
    icon: <RefreshCcw className="w-10 h-10 text-[#2d5a27]" strokeWidth={1.5} />,
    title: "Echanges possibles",
    description: "Les échanges sont possibles dans les 24 heures"
  },
  {
    icon: <PackageSearch className="w-10 h-10 text-[#2d5a27]" strokeWidth={1.5} />,
    title: "Suivi de vos commandes",
    description: "Nous suivons vos commandes jusqu'à la livraison"
  }
];

const FeatureCards = () => {
  return (
    <section className="bg-[#f7faf7] py-12 px-4 border-t border-[#ccd9cc]">
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4 sm:gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white p-6 sm:p-10 rounded-[3rem] border border-[#ccd9cc] shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow aspect-square justify-center"
          >
            <div className="bg-[#e2eee2] p-4 rounded-full mb-2">
              {feature.icon}
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
