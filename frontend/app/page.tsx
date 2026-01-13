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
import { fetchTopCategories } from "@/api/category.api";

const icons = [
  <StarterIcon className="size-13.5 mb-4.5 mx-auto" />,
  <MainCourseIcon className="size-13.5 mb-4.5 mx-auto" />,
  <DessertIcon className="size-13.5 mb-4.5 mx-auto" />
]

export type ItemType = {
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  categoryId: string;
  imageUrl: string;
  available: boolean;
}

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);

  // fetch categories from API
  useEffect(() => {
    (async () => {
      const topCategoriesFromApi = await fetchTopCategories();
      const menuItems = topCategoriesFromApi.reduce((acc: ItemType[], cat: any) => {
        const itemsForCategory = cat.menuItems.map((item: any) => ({
          menuItemId: item.menuItemId,
          name: item.name,
          price: item.price,
          description: item.description,
          imageUrl: item.imageUrl,
          categoryId: cat.categoryId
        }));
        return acc.concat(itemsForCategory);
      }, []);

      const categoriesWithIcons: CategoryType[] = topCategoriesFromApi.map((cat: any, index: number) => ({
        categoryId: cat.categoryId,
        name: cat.name,
        icon: icons[index]
      }));

      setCategories(categoriesWithIcons);
      setItems(menuItems);
      setFilteredItems(menuItems);
    })();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = items.filter(item => item.categoryId === selectedCategory);
      console.log(filtered);
      console.log(items);

      setFilteredItems(filtered);
    }
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
