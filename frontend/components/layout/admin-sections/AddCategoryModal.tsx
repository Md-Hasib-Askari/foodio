'use client';

import { CgClose } from "react-icons/cg";

interface AddCategoryModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddCategoryModal({
    open,
    onClose,
}: AddCategoryModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-xl rounded-2xl bg-[#FAF8F4] p-8 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-[#1F3D2B]">
                        Add Category
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                    >
                        <CgClose size={20} />
                    </button>
                </div>

                {/* Form */}
                <form className="space-y-6">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Category name"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]"
                        />
                    </div>

                    {/* Action */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="rounded-full bg-[#1F3D2B] px-6 py-2 text-white hover:bg-[#183024]"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
