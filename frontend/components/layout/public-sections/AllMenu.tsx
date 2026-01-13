'use client';

import { CATEGORIES, ITEMS } from '@/data';
import Footer from './Footer';
import MenuGrid from './MenuGrid'
import { ItemType } from '@/app/page';
import { CategoryType } from './Categories';
import { useState } from 'react';

const categories: CategoryType[] = CATEGORIES;
const items: ItemType[] = ITEMS;

export default function AllMenu() {
    const [selectedCategory, setSelectedCategory] = useState<string>('1');
    const [filteredItems, setFilteredItems] = useState<ItemType[]>(items);

    const handleCategoryClick = (categoryId: string) => {
        if (categoryId === 'all') {
            setFilteredItems(items);
            setSelectedCategory('all');
        } else {
            const newItems = items.filter(item => item.categoryId === categoryId);
            setFilteredItems(newItems);
            setSelectedCategory(categoryId);
        }
    };

    return (
        <section className="py-16">
            <div className='max-w-309 mx-auto'>
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-serif text-teal-900 mb-4">Our Menu</h2>
                    <p className="text-gray-600">Discover our selection of premium dishes, crafted with passion.</p>
                </div>
                <div className="flex justify-center gap-4 mb-24">
                    <button onClick={() => handleCategoryClick('all')} className={`px-8 py-3 rounded-full border border-gray-300 hover:border-primary transition ${selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>
                        All
                    </button>
                    {
                        categories.map((cat) => (
                            <button key={cat.categoryId} onClick={() => handleCategoryClick(cat.categoryId)} className={`px-8 py-3 rounded-full border border-gray-300 hover:border-primary transition ${selectedCategory === cat.categoryId ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>
                                {cat.category}
                            </button>
                        ))
                    }
                </div>
            </div>
            <MenuGrid items={filteredItems} />
        </section>
    )
}
