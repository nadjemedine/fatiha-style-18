"use client";

import React from 'react';
import { ChevronLeft, Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar />
      <Header />
      
      {/* Page Header */}
      <div className="bg-[#FEE4ED] p-4 flex items-center gap-4 border-b border-[#d6c9e8]">
        <Link href="/" className="p-2 hover:bg-[#d6c9e8] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 font-ornate">Politique de Livraison</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-50 rounded-full text-orange-600">
              <Truck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">Zones de Livraison</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            Nous livrons dans les <span className="font-bold text-accent">58 wilayas</span> d'Algérie. Que vous soyez à Alger, Oran, Constantine ou dans le sud, nous faisons tout pour que vos articles vous parviennent rapidement.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-accent/10 space-y-4">
            <div className="flex items-center gap-3 text-accent transition-colors">
              <Clock className="w-6 h-6" />
              <h3 className="font-bold font-ornate italic text-xl">Délais</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Alger : 24h à 48h</li>
              <li>• Grandes villes : 2 à 4 jours</li>
              <li>• Autres Wilayas : 3 à 7 jours</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-accent/10 space-y-4">
            <div className="flex items-center gap-3 text-accent transition-colors">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="font-bold font-ornate italic text-xl">Garantie</h3>
            </div>
            <p className="text-gray-600">
              Vos articles sont emballés avec le plus grand soin pour éviter tout dommage durant le transport.
            </p>
          </div>
        </div>

        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-accent/10 rounded-full text-accent">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">Suivi de commande</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Une fois votre commande validée, notre service logistique vous contactera par téléphone pour confirmer les détails de la livraison et l'adresse exacte. Vous pouvez également nous contacter à tout moment pour connaître le statut de votre colis.
          </p>
        </section>

        <div className="bg-accent p-8 rounded-[2rem] text-white text-center shadow-lg">
          <h3 className="text-xl font-bold font-ornate italic mb-2">Paiement à la livraison</h3>
          <p className="opacity-90">Réglez vos achats en toute confiance dès réception de votre colis.</p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
