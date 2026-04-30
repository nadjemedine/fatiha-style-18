"use client";

import React from 'react';
import { ChevronLeft, Phone, Mail, Globe, MessageCircle, MapPin } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import { client } from '@/sanity/lib/client';

export default function ContactPage() {
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
    <div className="min-h-screen bg-background pb-24">
      <TopBar />
      <Header />
      
      {/* Page Header */}
      <div className="bg-[#FEE4ED] p-4 flex items-center gap-4 border-b border-[#d6c9e8]">
        <Link href="/" className="p-2 hover:bg-[#d6c9e8] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 font-ornate">Contactez-nous</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4 py-8">
          <h2 className="text-3xl font-bold text-gray-800 font-ornate italic">Nous sommes à votre écoute</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Une question sur un produit ou une commande ? N'hésitez pas à nous contacter via nos différents canaux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Cards */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-accent/10 flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-[#fce6d2] rounded-full text-orange-600">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm mb-1">Téléphone</h3>
              <p className="text-lg font-medium text-accent">{settings?.contactPhone || "+213 (0) 5XX XX XX XX"}</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-accent/10 flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-[#fce6d2] rounded-full text-orange-600">
              <Mail className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm mb-1">Email</h3>
              <p className="text-lg font-medium text-accent">{settings?.contactEmail || "contact@fatihastyle18.com"}</p>
            </div>
          </div>

          <a 
            href={`https://wa.me/${settings?.contactPhone?.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-8 rounded-xl shadow-sm border border-accent/10 flex flex-col items-center text-center space-y-4 hover:bg-green-50 transition-colors"
          >
            <div className="p-4 bg-green-100 rounded-full text-green-600">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm mb-1">WhatsApp</h3>
              <p className="text-lg font-medium text-green-600">Discuter avec nous</p>
            </div>
          </a>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-accent/10 flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-[#FEE4ED] rounded-full text-pink-600">
              <Globe className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm mb-1">Instagram</h3>
              <p className="text-lg font-medium text-pink-600">@fatihastyle18</p>
            </div>
          </div>
        </div>

        <section className="bg-white p-8 rounded-xl shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#fce6d2] rounded-full text-orange-600">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">Notre Boutique</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Venez nous rendre visite dans notre boutique à Alger. Nous serons ravis de vous accueillir et de vous présenter nos collections physiquement.
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="font-bold text-gray-700">Adresse :</p>
            <p className="text-gray-500">Alger, Algérie</p>
          </div>
        </section>
      </div>
      
      <BottomNav />
    </div>
  );
}
