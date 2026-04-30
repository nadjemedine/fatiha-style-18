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
    default: "فاتيحا ستايل 18",
    template: "%s | Boutique fatihastyle 18",
  },
  description: "متجر أزياء راقية وأنيقة في الجزائر. اكتشف مجموعاتنا الحصرية من الملابس التقليدية والعصرية.",
  openGraph: {
    title: "Boutique fatihastyle 18",
    description: "متجر أزياء راقية وأنيقة في الجزائر. اكتشف مجموعاتنا الحصرية.",
    url: "https://fatihastyle18.store",
    siteName: "Boutique fatihastyle 18",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "شعار فاتيحا ستايل 18",
      },
    ],
    locale: "ar_DZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boutique fatihastyle 18",
    description: "متجر أزياء راقية وأنيقة في الجزائر.",
    images: ["/logo.png"],
  },
};

import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import MenuDrawer from "@/components/MenuDrawer";
import Footer from "@/components/Footer";
import FeatureCards from "@/components/FeatureCards";
import QuickAddDrawer from "@/components/QuickAddDrawer";

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
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <div className="flex-1">
            {children}
          </div>
          <FeatureCards />
          <Footer />
          <CartDrawer />
          <MenuDrawer />
          <QuickAddDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
