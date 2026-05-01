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
  metadataBase: new URL("https://fatihastyle18.store"),
  title: {
    default: "Fatiha Style | Boutique de moderne couture",
    template: "%s | Fatiha Style",
  },
  description: "فاتيحا ستايل | عنوانك للأناقة والتميز. اكتشفي تشكيلتنا الراقية من أحدث موديلات الخياطة العصرية والتصاميم الفريدة التي تجمع بين الفخامة والجمال لتناسب إطلالتك الساحرة.",
  openGraph: {
    title: "Fatiha Style | Boutique de moderne couture",
    description: "فاتيحا ستايل | عنوانك للأناقة والتميز. اكتشفي تشكيلتنا الراقية من أحدث موديلات الخياطة العصرية.",
    url: "https://fatihastyle18.store",
    siteName: "Fatiha Style",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo Fatiha Style",
      },
    ],
    locale: "ar_DZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fatiha Style | Boutique de moderne couture",
    description: "فاتيحا ستايل | عنوانك للأناقة والتميز. اكتشفي تشكيلتنا الراقية.",
    images: ["/logo.png"],
  },
};

import { CartProvider } from "@/components/CartContext";
import LayoutClient from "@/components/LayoutClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar" dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-cormorant" style={{ direction: 'rtl' }}>
        <CartProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </CartProvider>
      </body>
    </html>
  );
}
