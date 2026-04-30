"use client";

import React from 'react';
import { ChevronLeft, ShieldCheck, Scale, FileText } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar />
      <Header />
      
      {/* Page Header */}
      <div className="bg-[#FEE4ED] p-4 flex items-center gap-4 border-b border-[#d6c9e8]">
        <Link href="/" className="p-2 hover:bg-[#d6c9e8] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 font-ornate">Conditions Générales</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <section className="bg-white p-8 rounded-xl shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">Utilisation du Site</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            En accédant à ce site, vous acceptez nos conditions d'utilisation. Le contenu de ce site est la propriété de Fatiha Style 18 et est protégé par les lois sur la propriété intellectuelle.
          </p>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-50 rounded-full text-green-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">Protection des Données</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Nous accordons une grande importance à la confidentialité de vos données personnelles. Les informations collectées lors de vos commandes sont utilisées exclusivement pour le traitement de celles-ci et pour améliorer votre expérience sur notre boutique.
          </p>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-50 rounded-full text-purple-600">
              <Scale className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">Commandes et Paiements</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            Toute commande passée sur notre site implique l'acceptation intégrale des prix et descriptions des produits disponibles à la vente.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Le paiement s'effectue généralement à la livraison (Cash on Delivery).</li>
            <li>Les prix sont affichés en Dinars Algériens (DZD).</li>
            <li>Nous nous réservons le droit d'annuler ou de refuser toute commande en cas de litige.</li>
          </ul>
        </section>

        <div className="p-8 bg-gray-50 rounded-xl text-center border border-gray-200">
          <p className="text-sm text-gray-500 italic">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
