import React from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

type MenuItem = {
    name: string;
    category: string;
    price: number;
    status: string;
}

type MenuItemsTableProps = {
    menuItems: MenuItem[];
}

export default function MenuItemsTable({ menuItems }: MenuItemsTableProps) {
    const formatPrice = (price: number) => {
        return `$${price.toFixed(2)}`;
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
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <button className="text-gray-400 hover:text-teal-900 transition">
                                        <FiEdit2 className="w-4 h-4" />
                                    </button>
                                    <button className="text-gray-400 hover:text-red-600 transition">
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
