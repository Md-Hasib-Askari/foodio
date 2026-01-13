'use client';

import { getUserOrders } from '@/api/order.api';
import { ORDER_STATUS } from '@/constants/order-status.enum';
import { ORDERS } from '@/data';
import { useEffect, useState } from 'react';

const getOrderStatus = (status: string) => {
    switch (status) {
        case ORDER_STATUS.PENDING:
            return 1;
        case ORDER_STATUS.PREPARING:
            return 2;
        case ORDER_STATUS.READY:
            return 3;
        case ORDER_STATUS.COMPLETED:
            return 4;
        default:
            return 0;
    }
}

interface OrderType {
    orderId: string;
    orderDate: string;
    items: { name: string; quantity: number; price: number }[];
    totalAmount: number;
    status: string;
    address: string;
    progress: number;
}

export default function OrderSection() {
    const [orders, setOrders] = useState<OrderType[]>([]);

    useEffect(() => {
        (async function () {
            const fetchedOrders = await getUserOrders();
            console.log(fetchedOrders);

            setOrders(fetchedOrders.map((order) => ({
                ...order,
                progress: getOrderStatus(order.status),
            })));
        })();
    }, []);

    useEffect(() => {
        console.log(orders);
    }, [orders]);


    const getStatusColor = (status: string) => {
        switch (status) {
            case ORDER_STATUS.PENDING:
                return 'border border-yellow-200 bg-yellow-100 text-yellow-800';
            case ORDER_STATUS.PREPARING:
                return 'border border-blue-200 bg-blue-100 text-blue-800';
            case ORDER_STATUS.READY:
                return 'border border-indigo-200 bg-indigo-100 text-indigo-800';
            case ORDER_STATUS.COMPLETED:
                return 'border border-green-200 bg-green-100 text-green-800';
            default:
                return 'border border-gray-200 bg-gray-100 text-gray-800';
        }
    }

    return (
        <section className="max-w-6xl mx-auto px-8 py-12">
            <h1 className="text-4xl font-serif text-primary mb-8">My Orders</h1>

            <div className="space-y-6">
                {orders.map((order, index) => (
                    <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-primary mb-2">Order #{order.orderId}</h2>
                                <p className="text-gray-500 text-sm">Placed on {order.orderDate}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-primary">${order.totalAmount.toFixed(2)}</span>
                                <span className={`px-4 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        <div className="mb-6 border-b border-b-gray-200 pb-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">ITEMS</h3>
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2">
                                    <span className="text-gray-700">{item.quantity}x {item.name}</span>
                                    <span className="text-gray-500">${Number(item.price).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mb-6">
                            <span className="text-gray-700">
                                <span className="font-semibold">Delivering to:</span> {order.address}
                            </span>
                        </div>

                        <div className="relative max-w-lg mx-auto">
                            <div className="flex justify-between items-center">
                                {Object.values(ORDER_STATUS).map((stage, idx) => (
                                    <div key={idx} className="flex flex-col items-center relative" style={{ width: '25%' }}>
                                        <div className={`w-4 h-4 rounded-full z-10 ${idx < order.progress
                                            ? 'bg-primary'
                                            : 'bg-gray-300'
                                            }`} />
                                        <span className={`text-xs mt-2 font-medium ${idx < order.progress
                                            ? 'text-primary'
                                            : 'text-gray-400'
                                            }`}>
                                            {stage}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-200 z-0" style={{ transform: 'translateY(-50%)' }}>
                                <div
                                    className="h-full bg-primary transition-all duration-500"
                                    style={{ width: `${((order.progress - 1) / 3) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
