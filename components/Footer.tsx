import React from 'react';
import { Globe, Link as LinkIcon, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#e2eee2] border-t border-[#ccd9cc] pt-12 pb-24 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-16">
            <img 
              src="/logo.png" 
              alt="Fatiha Style 18 Logo" 
              className="h-full w-auto object-contain"
            />
          </div>
          <p className="font-ornate italic text-[#2d5a27] text-lg font-medium tracking-wide">
            L'élégance à votre style
          </p>
          <p className="max-w-md text-gray-500 text-sm leading-relaxed mx-auto font-medium">
            Fatiha Style 18 est votre destination privilégiée pour une mode raffinée et moderne. 
            Découvrez nos collections exclusives conçues pour sublimer votre élégance au quotidien.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold text-gray-600 tracking-wider">
          <Link href="/" className="hover:text-[#2d5a27] transition-colors uppercase">Boutique</Link>
          <Link href="/about" className="hover:text-[#2d5a27] transition-colors uppercase">À propos</Link>
          <Link href="/contact" className="hover:text-[#2d5a27] transition-colors uppercase">Contact</Link>
          <Link href="/terms" className="hover:text-[#2d5a27] transition-colors uppercase">Conditions</Link>
          <Link href="/delivery" className="hover:text-[#2d5a27] transition-colors uppercase">Livraison</Link>
        </div>

        {/* Social & Contact */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-[#ccd9cc] text-[#2d5a27] hover:bg-[#2d5a27] hover:text-white transition-all shadow-sm">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-[#ccd9cc] text-[#2d5a27] hover:bg-[#2d5a27] hover:text-white transition-all shadow-sm">
              <LinkIcon className="w-5 h-5" />
            </a>
          </div>
          
          <div className="flex flex-col items-center gap-2 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#2d5a27]" />
              <span>+213 555 00 00 00</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2d5a27]" />
              <span>contact@fatihastyle18.com</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#ccd9cc]/50 w-full">
          <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">
            © 2026 FATIHA STYLE 18. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
