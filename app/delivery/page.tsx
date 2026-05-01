"use client";

import React from 'react';
import { ChevronRight, Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';
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
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-900 font-ornate">سياسة التوصيل</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <section className="bg-white p-8 rounded-xl shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-50 rounded-full text-orange-600">
              <Truck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">مناطق التوصيل</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            نقوم بالتوصيل في جميع <span className="font-bold text-accent">الولايات الجزائرية  58 </span>. سواء كنت في جيجل، الجزائر العاصمة، وهران، قسنطينة أو في الجنوب، فإننا نبذل قصارى جهدنا لوصول طلباتك إليك بسرعة.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-accent/10 space-y-4">
            <div className="flex items-center gap-3 text-accent transition-colors">
              <Clock className="w-6 h-6" />
              <h3 className="font-bold font-ornate italic text-xl">المدة الزمنية</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>جيجل: 24 ساعة</li>
              <li>• المدن الكبرى: من يوم إلى يومين</li>
              <li>• الولايات الأخرى: من يومين إلى 3 أيام</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-accent/10 space-y-4">
            <div className="flex items-center gap-3 text-accent transition-colors">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="font-bold font-ornate italic text-xl">الضمان</h3>
            </div>
            <p className="text-gray-600">
              يتم تغليف طلباتك بأقصى درجات العناية لتجنب أي تلف أثناء النقل.
            </p>
          </div>
        </div>

        <section className="bg-white p-8 rounded-xl shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-accent/10 rounded-full text-accent">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">تتبع الطلب</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            بعد تأكيد طلبك، سيتصل بك فريق التوصيل لدينا هاتفياً لتأكيد تفاصيل التوصيل والعنوان الدقيق. كما يمكنك الاتصال بنا في أي وقت لمعرفة حالة طلبك.
          </p>
        </section>

        <div className="bg-accent p-8 rounded-xl text-white text-center shadow-lg">
          <h3 className="text-xl font-bold font-ornate italic mb-2">الدفع عند الاستلام</h3>
          <p className="opacity-90">ادفع مقابل مشترياتك بثقة تامة عند استلام طلبك.</p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
