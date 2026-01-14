'use client';

import { Dispatch, SetStateAction } from "react";

export type CategoryType = {
    categoryId: string;
    name: string;
    icon?: React.ReactElement;
}

interface CategoriesProps {
    categories: CategoryType[];
    selectedCategory: string | null;
    setSelectedCategory: Dispatch<SetStateAction<string | null>>;
}

export default function Categories({
    categories,
    selectedCategory,
    setSelectedCategory
}: CategoriesProps) {

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    return (
        <section className="py-12 md:py-16 max-w-309 mx-auto px-4 sm:px-6 lg:px-0">
            <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-teal-900 mb-4">
                    Curated Categories
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                    Explore our diverse menu of culinary delights.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {categories.map((cat) => (
                    <div
                        key={cat.categoryId}
                        onClick={() => handleCategoryChange(cat.categoryId)}
                        className={`
                            ${cat.categoryId === selectedCategory
                                ? "bg-secondary shadow-xl"
                                : "bg-[#FBFAF8]"
                            }
                            rounded-tl-2xl rounded-br-2xl
                            py-4 px-6 sm:px-10 md:px-15
                            text-center hover:shadow-lg transition
                            cursor-pointer
                            min-w-35
                        `}
                    >
                        {cat.icon && (
                            <div className="flex justify-center mb-2">
                                {cat.icon}
                            </div>
                        )}
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary">
                            {cat.name}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
