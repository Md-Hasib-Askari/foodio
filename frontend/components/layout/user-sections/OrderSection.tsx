import React from 'react'

const orders = [
    {
        id: "#5b331ea1",
        date: "December 12th, 2025 at 4:33 PM",
        items: [{ name: "Golden Crunch Bites", quantity: 1, price: 24.00 }],
        total: 24.00,
        status: "Pending",
        address: "House-23, Road-23, Jamaica, USA",
        progress: 1
    },
    {
        id: "#5b331ea1",
        date: "December 12th, 2025 at 4:33 PM",
        items: [{ name: "Mediterranean Olive Medley", quantity: 1, price: 24.00 }],
        total: 24.00,
        status: "Completed",
        address: "House-23, Road-23, Jamaica, USA",
        progress: 4
    }
];
export default function OrderSection() {

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'border border-yellow-200 bg-yellow-100 text-yellow-800';
            case 'Preparing':
                return 'border border-blue-200 bg-blue-100 text-blue-800';
            case 'Ready':
                return 'border border-indigo-200 bg-indigo-100 text-indigo-800';
            case 'Completed':
                return 'border border-green-200 bg-green-100 text-green-800';
            default:
                return 'border border-gray-200 bg-gray-100 text-gray-800';
        }
    }

    return (
        <section className="max-w-6xl mx-auto px-8 py-12">
            <h1 className="text-4xl font-serif text-teal-900 mb-8">My Orders</h1>

            <div className="space-y-6">
                {orders.map((order, index) => (
                    <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        {/* Order Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-teal-900 mb-2">Order {order.id}</h2>
                                <p className="text-gray-500 text-sm">Placed on {order.date}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-teal-900">${order.total.toFixed(2)}</span>
                                <span className={`px-4 py-1.5 rounded-lg text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-6 border-b border-b-gray-200 pb-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">ITEMS</h3>
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2">
                                    <span className="text-gray-700">{item.quantity}x {item.name}</span>
                                    <span className="text-gray-500">${item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        {/* Delivery Address */}
                        <div className="mb-6">
                            <span className="text-gray-700">
                                <span className="font-semibold">Delivering to:</span> {order.address}
                            </span>
                        </div>

                        {/* Progress Tracker */}
                        <div className="relative max-w-lg mx-auto">
                            <div className="flex justify-between items-center">
                                {['PENDING', 'PREPARING', 'READY', 'COMPLETED'].map((stage, idx) => (
                                    <div key={idx} className="flex flex-col items-center relative" style={{ width: '25%' }}>
                                        <div className={`w-4 h-4 rounded-full z-10 ${idx < order.progress
                                            ? 'bg-teal-900'
                                            : 'bg-gray-300'
                                            }`} />
                                        <span className={`text-xs mt-2 font-medium ${idx < order.progress
                                            ? 'text-teal-900'
                                            : 'text-gray-400'
                                            }`}>
                                            {stage}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {/* Progress Line */}
                            <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-200 z-0" style={{ transform: 'translateY(-50%)' }}>
                                <div
                                    className="h-full bg-teal-900 transition-all duration-500"
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
