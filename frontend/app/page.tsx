'use client';

import { useEffect, useState } from "react";
import Navbar from "../components/layout/public-sections/Navbar";
import Hero from "../components/layout/public-sections/Hero";
import Categories from "../components/layout/public-sections/Categories";
import MenuGrid from "../components/layout/public-sections/MenuGrid";
import Footer from "../components/layout/public-sections/Footer";
import StarterIcon from "../components/icons/StarterIcon";
import MainCourseIcon from "../components/icons/MainCourseIcon";
import DessertIcon from "../components/icons/DessertIcon";

const categories = [
  {
    categoryId: "1",
    category: "Starters",
    icon: <StarterIcon className="size-13.5 mb-4.5 mx-auto" />,
  },
  {
    categoryId: "2",
    category: "Main Courses",
    icon: <MainCourseIcon className="size-13.5 mb-4.5 mx-auto" />,
  },
  {
    categoryId: "3",
    category: "Desserts",
    icon: <DessertIcon className="size-13.5 mb-4.5 mx-auto" />,
  }
];

const items = [
  { id: "1", name: "Golden Crunch Bites", price: 15, categoryId: "1" },
  { id: "2", name: "Mediterranean Olive Medley", price: 25, categoryId: "1" },
  { id: "3", name: "Spicy Buffalo Wings", price: 18, categoryId: "1" },
  { id: "4", name: "Fresh Garden Salad", price: 12, categoryId: "1" },
  { id: "5", name: "Herb-Roasted Chicken", price: 28, categoryId: "2" },
  { id: "6", name: "Citrus Swirl Delights", price: 35, categoryId: "2" },
  { id: "7", name: "Creamy Garlic Shrimp Pasta", price: 10, categoryId: "2" },
  { id: "8", name: "Grilled Salmon with Lemon Butter", price: 32, categoryId: "2" },
  { id: "9", name: "Classic Tiramisu", price: 30, categoryId: "3" },
  { id: "10", name: "Decadent Chocolate Lava Cake", price: 20, categoryId: "3" },
  { id: "11", name: "Vanilla Bean Panna Cotta", price: 22, categoryId: "3" },
  { id: "12", name: "Fruit Tart with Custard", price: 27, categoryId: "3" },
  { id: "13", name: "Fruit Tart with Custard", price: 27, categoryId: "3" },
];

export type ItemType = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("1");
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);

  useEffect(() => {
    const newItems = items.filter(item => item.categoryId == selectedCategory);
    setFilteredItems(newItems);
  }, [selectedCategory]);

  return (
    <div className="relative overflow-hidden min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Categories categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <MenuGrid items={filteredItems} className="pt-37.5" />
      <Footer />
    </div>
  );
}
