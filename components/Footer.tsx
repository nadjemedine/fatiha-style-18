"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const Footer = () => {
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
    <footer className="bg-nav-bg border-t border-accent/20 pt-12 pb-24 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-16">
            <img 
              src={settings?.logo ? urlFor(settings.logo).url() : "/logo.png"} 
              alt={settings?.storeName || "Fatiha Style Logo"} 
              className="h-full w-auto object-contain"
            />
          </div>
          <p className="font-ornate italic text-accent text-lg font-medium tracking-wide">
            {settings?.storeName || "Fatiha Style"}
          </p>
          <p className="max-w-md text-gray-500 text-sm leading-relaxed mx-auto font-medium">
            {settings?.footerText || "Fatiha Style هي وجهتك المفضلة للأزياء العصرية والأنيقة"}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold text-gray-600 tracking-wider">
          <Link href="/" className="hover:text-accent transition-colors uppercase">المتجر</Link>
          <Link href="/about" className="hover:text-accent transition-colors uppercase">من نحن</Link>
          <Link href="/contact" className="hover:text-accent transition-colors uppercase">اتصل بنا</Link>
          <Link href="/terms" className="hover:text-accent transition-colors uppercase">الشروط</Link>
          <Link href="/delivery" className="hover:text-accent transition-colors uppercase">التوصيل</Link>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            {settings?.socialLinks?.map((link: any, idx: number) => (
              <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-accent/20 text-accent hover:bg-accent hover:text-white transition-all shadow-sm">
                <LucideIcons.Globe className="w-5 h-5" />
              </a>
            ))}
            {(!settings?.socialLinks || settings.socialLinks.length === 0) && (
              <a href="https://www.instagram.com/fatiha_.style18/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-accent/20 text-accent hover:bg-accent hover:text-white transition-all shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            )}
          </div>
          
          <div className="flex flex-col items-center gap-2 text-sm text-gray-500 font-medium">
            {settings?.contactPhone && (
              <div className="flex items-center gap-2">
                <LucideIcons.Phone className="w-4 h-4 text-accent" />
                <span>{settings.contactPhone}</span>
              </div>
            )}
            {settings?.contactEmail && (
              <div className="flex items-center gap-2">
                <LucideIcons.Mail className="w-4 h-4 text-accent" />
                <span>{settings.contactEmail}</span>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-accent/20 w-full">
          <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} {settings?.storeName?.toUpperCase() || "FATIHA STYLE 18"}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
