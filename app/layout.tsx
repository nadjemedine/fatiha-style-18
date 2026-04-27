import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Fatiha Style 18",
  description: "Modern E-Commerce Store",
};

import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import MenuDrawer from "@/components/MenuDrawer";
import Footer from "@/components/Footer";
import FeatureCards from "@/components/FeatureCards";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <div className="flex-1">
            {children}
          </div>
          <FeatureCards />
          <Footer />
          <CartDrawer />
          <MenuDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
