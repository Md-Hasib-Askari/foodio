import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import Categories from "./components/layout/Categories";
import MenuGrid from "./components/layout/MenuGrid";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Categories />
      <MenuGrid />
      <Footer />
    </div>
  );
}
