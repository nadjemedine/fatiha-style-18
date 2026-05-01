"use client";

import React from 'react';
import { ChevronRight, Info } from 'lucide-react';
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
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 font-ornate">من نحن</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <section className="bg-white p-8 rounded-xl shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#FEE4ED] rounded-full text-accent">
              <Info className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">تاريخنا</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            مرحبًا بكم في <span className="font-bold text-accent">Fatiha Style</span>، وجهتكم الإلكترونية المفضلة للأزياء، مقرنا في جيجل ونحن فخورون بخدمتكم وتوفير التوصيل لكافة الولايات الجزائرية.
            منذ تأسيسنا، نسعى جاهدين لتقديم مجموعات تجمع بين الأناقة التقليدية والحداثة الجريئة.
          </p>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-sm border border-accent/10">
          <h2 className="text-2xl font-bold text-gray-800 font-ornate italic mb-6">رسالتنا</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            نؤمن بأن كل قطعة ملابس تحكي قصة. رسالتنا هي مساعدة كل امرأة على التعبير عن شخصيتها من خلال قطع فريدة، مصممة بحب واهتمام بالتفاصيل.
            نختار أقمشتنا بعناية فائقة لضمان جودة لا تشوبها شائبة وراحة مثلى.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-accent/5 p-8 rounded-xl border border-accent/10">
            <h3 className="text-xl font-bold text-accent font-ornate mb-4">الحرفية والجودة</h3>
            <p className="text-gray-600">يتم اختيار كل قطعة بدقة لتميزها وأسلوبها الخالد.</p>
          </div>
          <div className="bg-accent/5 p-8 rounded-xl border border-accent/10">
            <h3 className="text-xl font-bold text-accent font-ornate mb-4">خدمة العملاء</h3>
            <p className="text-gray-600">فريق متفانٍ لتقديم الاستشارات والإجابة على جميع رغباتكم المتعلقة بالموضة.</p>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
