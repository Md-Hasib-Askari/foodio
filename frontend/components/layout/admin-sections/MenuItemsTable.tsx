'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import EditItemModal from './EditItemModal';
import DeleteItemModal from './DeleteItemModal';
import { fetchAllMenuItems } from '@/api/menu-item.api';
import { ItemType } from '@/app/page';

interface MenuItemsTableProps {
    newItem?: ItemType | null;
}

export default function MenuItemsTable({ newItem }: MenuItemsTableProps) {
    const [openModal, setOpenModal] = useState<null | 'edit-item' | 'delete-item'>(null);
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
    const [menuItems, setMenuItems] = useState<ItemType[]>([]);

    useEffect(() => {
        (async function () {
            const fetchedItems = await fetchAllMenuItems();
            console.log(fetchedItems);

            if (fetchedItems) {
                setMenuItems(fetchedItems.map((item: any) => ({
                    menuItemId: item.menuItemId,
                    name: item.name,
                    price: Number(item.price),
                    category: item.category?.name || 'Uncategorized',
                    description: item.description,
                    available: item.available
                })));
            }
        })()

    }, [newItem]);

    useEffect(() => {
        console.log('Menu items updated:', menuItems);
    }, [menuItems]);

    const getModal = () => {
        if (!selectedItem) return null;
        switch (openModal) {
            case 'edit-item':
                return <EditItemModal open={true} onClose={() => setOpenModal(null)} item={selectedItem} setMenuItems={setMenuItems} />;
            case 'delete-item':
                return <DeleteItemModal onConfirm={() => { }} open={true} onClose={() => setOpenModal(null)} menuItem={selectedItem} setMenuItems={setMenuItems} />;
            default:
                return null;
        }
    }

    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`;
    }

    const showModal = (type: 'edit-item' | 'delete-item', item: ItemType) => {
        setSelectedItem(item);
        setOpenModal(type);
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
                <thead className="bg-[#FBFAF8] border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {menuItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 text-gray-600">{item.category}</td>
                            <td className="px-6 py-4 text-gray-900">{formatPrice(item.price)}</td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                    {item.available ? 'Available' : 'Unavailable'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => showModal('edit-item', item)} className="text-gray-400 hover:text-teal-900 transition">
                                        <FiEdit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => showModal('delete-item', item)} className="text-gray-400 hover:text-red-600 transition">
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                getModal()
            }
        </div>
    )
}
