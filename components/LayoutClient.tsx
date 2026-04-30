"use client";

import { usePathname } from "next/navigation";
import FeatureCards from "./FeatureCards";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import MenuDrawer from "./MenuDrawer";
import QuickAddDrawer from "./QuickAddDrawer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    return (
      <div className="flex-1 min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <>
      <div className="flex-1">
        {children}
      </div>
      <FeatureCards />
      <Footer />
      <CartDrawer />
      <MenuDrawer />
      <QuickAddDrawer />
    </>
  );
}
