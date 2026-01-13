import React, { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import OrderStatusDropdown from './OrderStatusDropdown';
import OrderDetailsModal from './OrderDetails';

export type OrderItem = {
    name: string;
    quantity: number;
    price: number;
}

export type Order = {
    id: string;
    date: string;
    customer: string;
    total: string;
    status: string;
    address: string;
    items?: OrderItem[];
}

type OrdersTableProps = {
    orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
    const [openOrder, setOpenOrder] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const showDetails = (order: Order) => {
        setSelectedOrder(order);
        setOpenOrder(true);
    }

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
                                <OrderStatusDropdown />
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => showDetails(order)}
                                    className="bg-[#E6E2D8] px-4 py-2 hover:bg-[#E6E2D3] rounded-lg transition border-2 border-gray-300">
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                openOrder && selectedOrder && (
                    <OrderDetailsModal order={selectedOrder} open={openOrder} onClose={() => setOpenOrder(false)} />
                )
            }
        </div>
    )
}
