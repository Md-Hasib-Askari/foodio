import React, { Dispatch, useEffect, useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import EditCategoryModal from './EditCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import { fetchCategories } from '@/api/category.api';

export type Category = {
    categoryId: string;
    name: string;
}

interface CategoriesTableProps {
    newCategory?: Category | null;
}

export default function CategoriesTable({ newCategory }: CategoriesTableProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [openModal, setOpenModal] = useState<null | 'edit-category' | 'delete-category'>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        (async function () {
            const fetchedCategories = await fetchCategories();
            if (fetchedCategories) {
                setCategories(fetchedCategories.map((cat: any) => ({
                    categoryId: cat.categoryId,
                    name: cat.name
                })));
            }
        })()
    }, [newCategory]);

    const showModal = (type: 'edit-category' | 'delete-category', category: Category) => {
        setSelectedCategory(category);
        setOpenModal(type);
    }

    const getModal = () => {
        switch (openModal) {
            case 'edit-category':
                return <EditCategoryModal open={true} onClose={() => setOpenModal(null)} category={selectedCategory!} setCategories={setCategories} />;
            case 'delete-category':
                return <DeleteCategoryModal onConfirm={() => { }} open={true} onClose={() => setOpenModal(null)} category={selectedCategory!} setCategories={setCategories} />;
            default:
                return null;
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-scroll">
            <table className="w-full">
                <thead className="bg-[#FBFAF8] border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {categories.map((category, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-900">{category.name}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => showModal('edit-category', category)}
                                        className="text-gray-400 hover:text-teal-900 transition">
                                        <FiEdit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => showModal('delete-category', category)}
                                        className="text-gray-400 hover:text-red-600 transition">
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {getModal()}
        </div>
    )
}
