'use client';

import { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';

interface ConfirmOrderModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ConfirmOrderModal({
    open,
    onClose,
}: ConfirmOrderModalProps) {
    const [qty, setQty] = useState(1);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-3xl rounded-2xl bg-[#FAF8F4] p-10 shadow-xl">
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                    <h2 className="text-2xl font-semibold text-[#1F3D2B]">
                        Are you sure want to buy?
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                    >
                        <CgClose size={20} />
                    </button>
                </div>

                {/* Items */}
                <div className="mb-10">
                    <p className="mb-4 text-sm text-gray-500">Items</p>

                    <div className="flex items-center justify-between">
                        <span className="text-lg font-medium">
                            Golden Crunch Bites
                        </span>

                        {/* Quantity Control */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setQty((q) => Math.max(1, q - 1))}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1F3D2B] text-[#1F3D2B]"
                            >
                                <BiMinus size={16} />
                            </button>

                            <div className="flex h-9 w-12 items-center justify-center rounded-lg border border-gray-300 text-sm font-medium">
                                {qty}
                            </div>

                            <button
                                onClick={() => setQty((q) => q + 1)}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1F3D2B] text-[#1F3D2B]"
                            >
                                <BiPlus size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-6">
                    <button
                        onClick={onClose}
                        className="rounded-full border-2 border-[#1F3D2B] px-10 py-3 text-[#1F3D2B] hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        className="rounded-full bg-[#1F3D2B] px-10 py-3 text-white hover:bg-[#183024]"
                    >
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    );
}
