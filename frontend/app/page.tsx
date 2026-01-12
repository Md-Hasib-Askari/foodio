import Navbar from "../components/layout/public-sections/Navbar";
import Hero from "../components/layout/public-sections/Hero";
import Categories from "../components/layout/public-sections/Categories";
import MenuGrid from "../components/layout/public-sections/MenuGrid";
import Footer from "../components/layout/public-sections/Footer";

const items = [
  { name: "Golden Crunch Bites", price: 15 },
  { name: "Mediterranean Olive Medley", price: 25 },
  { name: "Citrus Swirl Delights", price: 35 },
  { name: "Creamy Garlic Shrimp Pasta", price: 10 },
];

export default function Home() {

  return (
    <div className="relative overflow-hidden min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Categories />
      <MenuGrid items={items} className="pt-37.5" />
      <Footer />
    </div>
  );
}
