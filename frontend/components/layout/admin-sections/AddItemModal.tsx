'use client';

import { BiUpload } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

interface AddItemModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddItemModal({
    open,
    onClose,
}: AddItemModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-2xl bg-[#FAF8F4] p-8 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-[#1F3D2B]">
                        Add New Item
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                    >
                        <CgClose size={20} />
                    </button>
                </div>

                <form className="space-y-6">
                    {/* Name & Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1F3D2B]"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">Price</label>
                            <input
                                type="text"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1F3D2B]"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Category</label>
                        <select className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1F3D2B]">
                            <option>Starters</option>
                            <option>Main Course</option>
                            <option>Desserts</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1F3D2B]"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">Image</label>

                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 text-center hover:bg-gray-50">
                            <BiUpload className="mb-2 text-gray-500" />
                            <p className="text-sm font-medium">
                                Drag or click <span className="font-semibold">here</span> to upload
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Size must be maximum 2mb. Supported formats : PNG & JPEG
                            </p>
                            <input type="file" className="hidden" />
                        </label>
                    </div>

                    {/* Uploaded File */}
                    <div className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2">
                        <span className="text-sm text-gray-600">
                            1. Dish_image.png
                        </span>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-red-500"
                        >
                            <CgClose size={16} />
                        </button>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-3">
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" defaultChecked className="peer sr-only" />
                            <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-[#1F3D2B] after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5" />
                        </label>
                        <span className="text-sm font-medium">Available for Order</span>
                    </div>

                    {/* Action */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="rounded-full bg-[#1F3D2B] px-6 py-2 text-white hover:bg-[#183024]"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
