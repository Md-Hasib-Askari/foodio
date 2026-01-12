import React from 'react'
import { BiChevronDown } from 'react-icons/bi';

type Order = {
    id: string;
    date: string;
    customer: string;
    total: string;
    status: string;
}

type OrdersTableProps = {
    orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
                <thead className="bg-[#FBFAF8] border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {orders.map((order, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-900">{order.id}</td>
                            <td className="px-6 py-4 text-gray-600">{order.date}</td>
                            <td className="px-6 py-4 text-gray-900">{order.customer}</td>
                            <td className="px-6 py-4 text-gray-900">{order.total}</td>
                            <td className="px-6 py-4">
                                <button className="w-30 flex justify-between items-center gap-2 px-4 py-2 bg-[#FBFAF8] border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition">
                                    {order.status}
                                    <BiChevronDown className="w-4 h-4" />
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                <button className="bg-[#E6E2D8] px-4 py-2 hover:bg-[#E6E2D3] rounded-lg transition border-2 border-gray-300">
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
