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
        <h1 className="text-xl font-bold text-gray-900 font-ornate">الشروط والأحكام</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <section className="bg-white p-8 rounded-xl shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">استخدام الموقع</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            بالوصول إلى هذا الموقع، فإنك توافق على شروط الاستخدام الخاصة بنا. محتوى هذا الموقع هو ملك لـ Fatiha Style 18 و محمي بموجب قوانين الملكية الفكرية.
          </p>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-50 rounded-full text-green-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">حماية البيانات</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            نولي اهتمامًا كبيرًا بخصوصية بياناتك الشخصية. يتم استخدام المعلومات التي يتم جمعها عند إجراء طلباتك بشكل حصري لمعالجة هذه الطلبات ولتحسين تجربتك في متجرنا.
          </p>
        </section>

        <section className="bg-white p-8 rounded-xl shadow-sm border border-accent/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-50 rounded-full text-purple-600">
              <Scale className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-ornate italic">الطلبات والدفع</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            أي طلب يتم وضعه عبر موقعنا يعني الموافقة الكاملة على الأسعار ووصف المنتجات المتاحة للبيع.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>يتم الدفع عادةً عند التسليم (الدفع عند الاستلام).</li>
            <li>تظهر الأسعار بالدينار الجزائري (DZD).</li>
            <li>نحتفظ بالحق في إلغاء أو رفض أي طلب في حالة وجود نزاع.</li>
          </ul>
        </section>

        <div className="p-8 bg-gray-50 rounded-xl text-center border border-gray-200">
          <p className="text-sm text-gray-500 italic">
            آخر تحديث : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
