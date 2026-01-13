'use client';

import { CgClose } from "react-icons/cg";
import { Order } from "./OrdersTable";

interface OrderDetailsModalProps {
    order: Order;
    open: boolean;
    onClose: () => void;
}

export default function OrderDetailsModal({
    order,
    open,
    onClose,
}: OrderDetailsModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-2xl bg-[#FAF8F4] p-8 shadow-xl">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-[#1F3D2B]">
                            Order Details
                        </h2>
                        <p className="mt-1 text-lg font-medium text-[#1F3D2B]">
                            #{order.id}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                    >
                        <CgClose size={20} />
                    </button>
                </div>

                <div className="mb-6">
                    <p className="mb-1 text-sm font-medium">Address</p>
                    <p className="text-gray-600">
                        {order.address}
                    </p>
                </div>

                <hr className="mb-6 border-gray-300" />

                <div className="mb-6">
                    <p className="mb-4 text-lg font-semibold">Items</p>

                    {
                        order.items?.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-gray-700">
                                <span>{item.quantity}x {item.name}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))
                    }
                    {/* TODO: MAKE Items DYNAMIC */}

                    <div className="flex items-center justify-between text-gray-700">
                        <span>1x Pan-Seared Scallops</span>
                        <span>$24.00</span>
                    </div>
                </div>

                <hr className="mb-6 border-gray-300" />

                <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">Total</span>
                    <span className="text-2xl font-bold">{order.total}</span>
                </div>
            </div>
        </div>
    );
}
