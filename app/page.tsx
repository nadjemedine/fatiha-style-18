import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import ProductGrid from "@/components/ProductGrid";
import BottomNav from "@/components/BottomNav";
import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";
import CategoryTabs from "@/components/CategoryTabs";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <SearchBar />
      
      <Hero />
      <CategoryTabs />
      
      <div className="max-w-7xl mx-auto py-8">
        <ProductGrid />
      </div>

      <BottomNav />
    </main>
  );
}
