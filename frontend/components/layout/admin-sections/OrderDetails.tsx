'use client';

import { CgClose } from "react-icons/cg";

interface OrderDetailsModalProps {
    open: boolean;
    onClose: () => void;
}

export default function OrderDetailsModal({
    open,
    onClose,
}: OrderDetailsModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-2xl bg-[#FAF8F4] p-8 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-[#1F3D2B]">
                            Order Details
                        </h2>
                        <p className="mt-1 text-lg font-medium text-[#1F3D2B]">
                            #5b331ea1-49af-422e-ba46-4e94ca95294c
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                    >
                        <CgClose size={20} />
                    </button>
                </div>

                {/* Address */}
                <div className="mb-6">
                    <p className="mb-1 text-sm font-medium">Address</p>
                    <p className="text-gray-600">
                        House:23, Road:23, Jamaica, USA
                    </p>
                </div>

                <hr className="mb-6 border-gray-300" />

                {/* Items */}
                <div className="mb-6">
                    <p className="mb-4 text-lg font-semibold">Items</p>

                    <div className="flex items-center justify-between text-gray-700">
                        <span>1x Pan-Seared Scallops</span>
                        <span>$24.00</span>
                    </div>
                </div>

                <hr className="mb-6 border-gray-300" />

                {/* Total */}
                <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold">Total</span>
                    <span className="text-2xl font-bold">$24.00</span>
                </div>
            </div>
        </div>
    );
}
