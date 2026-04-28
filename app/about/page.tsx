"use client";

import React from 'react';
import { ChevronLeft, Info } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar />
      <Header />
      
      {/* Page Header */}
      <div className="bg-[#FEE4ED] p-4 flex items-center gap-4 border-b border-[#d6c9e8]">
        <Link href="/" className="p-2 hover:bg-[#d6c9e8] rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 font-ornate">À propos de nous</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#FEE4ED] rounded-full text-accent">
              <Info className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">Notre Histoire</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            Bienvenue chez <span className="font-bold text-accent">Fatiha Style 18</span>, votre destination de mode privilégiée à Alger. 
            Depuis notre création, nous nous efforçons de proposer des collections qui marient élégance traditionnelle et modernité audacieuse.
          </p>
        </section>

        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-accent/10">
          <h2 className="text-2xl font-bold text-gray-800 font-ornate italic mb-6">Notre Mission</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Nous croyons que chaque vêtement raconte une histoire. Notre mission est d'accompagner chaque femme dans l'expression de sa personnalité à travers des pièces uniques, conçues avec passion et souci du détail. 
            Nous sélectionnons rigoureusement nos tissus pour vous garantir une qualité irréprochable et un confort optimal.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-accent/5 p-8 rounded-[2rem] border border-accent/10">
            <h3 className="text-xl font-bold text-accent font-ornate mb-4">Qualité Artisanale</h3>
            <p className="text-gray-600">Chaque pièce est sélectionnée pour son excellence et son style intemporel.</p>
          </div>
          <div className="bg-accent/5 p-8 rounded-[2rem] border border-accent/10">
            <h3 className="text-xl font-bold text-accent font-ornate mb-4">Service Client</h3>
            <p className="text-gray-600">Une équipe dévouée pour vous conseiller et répondre à toutes vos envies de mode.</p>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
