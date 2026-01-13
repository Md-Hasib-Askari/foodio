import React, { useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi';
import OrderStatusDropdown from './OrderStatusDropdown';
import OrderDetailsModal from './OrderDetails';
import { getAllOrders } from '@/api/order.api';

export type OrderItem = {
    name: string;
    quantity: number;
    price: number;
}

export type Order = {
    orderId: string;
    date: string;
    customer: string;
    total: string;
    status: string;
    address: string;
    items?: OrderItem[];
}

export default function OrdersTable() {
    const [openOrder, setOpenOrder] = useState<boolean>(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        (async function () {
            const fetchedOrders = await getAllOrders();
            console.log(fetchedOrders);

            if (fetchedOrders) {
                setOrders(fetchedOrders.map((order: any) => ({
                    orderId: order.orderId,
                    date: new Date(order.orderDate).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                    customer: order.user.fullName,
                    total: order.orderItems.reduce((acc: number, item: any) => acc + (item.priceAtOrder * item.quantity), 0).toFixed(2),
                    status: order.status,
                    address: order.user.address,
                    items: order.orderItems.map((item: any) => ({
                        name: item.menuItem.name,
                        quantity: item.quantity,
                        price: item.priceAtOrder,
                    })),
                })));
            }
        })();

    }, []);

    const showDetails = (order: Order) => {
        setSelectedOrder(order);
        setOpenOrder(true);
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200">
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
                            <td className="px-6 py-4 text-gray-900">{order.orderId}</td>
                            <td className="px-6 py-4 text-gray-600">{order.date}</td>
                            <td className="px-6 py-4 text-gray-900">{order.customer}</td>
                            <td className="px-6 py-4 text-gray-900">${order.total}</td>
                            <td className="px-6 py-4">
                                <OrderStatusDropdown order={order} />
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
