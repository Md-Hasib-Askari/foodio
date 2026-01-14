'use client';

import MenuGrid from './MenuGrid';
import { ItemType } from '@/app/page';
import { CategoryType } from './Categories';
import { useEffect, useState } from 'react';
import { fetchCategories } from '@/api/category.api';
import { fetchMenuItems } from '@/api/menu-item.api';

export default function AllMenu() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [items, setItems] = useState<ItemType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
    const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);

    useEffect(() => {
        (async function () {
            const categories = await fetchCategories();
            setCategories(categories);

            if (categories.length > 0) {
                const allItems: ItemType[] = [];
                for (const category of categories) {
                    const categoryItems = await fetchMenuItems(category.categoryId);
                    allItems.push(...categoryItems);
                }
                setItems(allItems);
                setFilteredItems(allItems);
            }
        })();
    }, []);

    useEffect(() => {
        (async function () {
            if (selectedCategory === 'all') {
                setFilteredItems(items);
            } else {
                const newItems = await fetchMenuItems(selectedCategory);
                setFilteredItems(newItems);
            }
        })();
    }, [selectedCategory]);

    return (
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-0">
            <div className="max-w-309 mx-auto">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-teal-900 mb-4">
                        Our Menu
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Discover our selection of premium dishes, crafted with passion.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 md:mb-24">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`
                            px-5 sm:px-8 py-2 sm:py-3
                            rounded-full border border-gray-300
                            hover:border-primary transition
                            text-sm sm:text-base
                            ${selectedCategory === 'all'
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700'}
                        `}
                    >
                        All
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.categoryId}
                            onClick={() => setSelectedCategory(cat.categoryId)}
                            className={`
                                px-5 sm:px-8 py-2 sm:py-3
                                rounded-full border border-gray-300
                                hover:border-primary transition
                                text-sm sm:text-base
                                ${selectedCategory === cat.categoryId
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-gray-700'}
                            `}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <MenuGrid items={filteredItems} />
        </section>
    );
}
