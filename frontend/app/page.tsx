'use client';

import { useEffect, useState } from "react";
import Navbar from "../components/layout/public-sections/Navbar";
import Hero from "../components/layout/public-sections/Hero";
import Categories, { CategoryType } from "../components/layout/public-sections/Categories";
import MenuGrid from "../components/layout/public-sections/MenuGrid";
import Footer from "../components/layout/public-sections/Footer";
import StarterIcon from "../components/icons/StarterIcon";
import MainCourseIcon from "../components/icons/MainCourseIcon";
import DessertIcon from "../components/icons/DessertIcon";
import { CATEGORIES, ITEMS } from "@/data";

const icons = [
  <StarterIcon className="size-13.5 mb-4.5 mx-auto" />,
  <MainCourseIcon className="size-13.5 mb-4.5 mx-auto" />,
  <DessertIcon className="size-13.5 mb-4.5 mx-auto" />
]

export type ItemType = {
  id: string;
  name: string;
  price: number;
  categoryId: string;
}

const items: ItemType[] = ITEMS;
const categories: CategoryType[] = CATEGORIES.map((cat, index) => ({
  ...cat,
  icon: icons[index]
}));

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
