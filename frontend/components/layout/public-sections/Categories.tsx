'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type CategoryType = {
    categoryId: string;
    category: string;
    icon: React.ReactElement;
}
interface CategoriesProps {
    categories: CategoryType[];
    selectedCategory: string;
    setSelectedCategory: Dispatch<SetStateAction<string>>;
}


export default function Categories({ categories, selectedCategory, setSelectedCategory }: CategoriesProps) {
    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
    }

    return (
        <section className="py-16 max-w-309 mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-serif text-teal-900 mb-4">Curated Categories</h2>
                <p className="text-gray-600">Explore our diverse menu of culinary delights.</p>
            </div>
            <div className="flex flex-row justify-center gap-6">
                {
                    categories.map((cat) => (
                        <div onClick={() => handleCategoryChange(cat.categoryId)} key={cat.category} className={`${cat.categoryId === selectedCategory ? "bg-secondary shadow-xl" : "bg-[#FBFAF8]"} rounded-tl-2xl rounded-br-2xl py-4 px-15 text-center hover:shadow-lg transition cursor-pointer`}>
                            {cat.icon}
                            <h3 className="text-xl font-semibold text-primary">{cat.category}</h3>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}
