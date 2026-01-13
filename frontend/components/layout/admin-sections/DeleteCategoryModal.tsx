'use client';

import { deleteCategory } from "@/api/category.api";
import { toast } from "react-toastify";

interface DeleteCategoryModalProps {
    open: boolean;
    onClose: () => void;
    category: { categoryId: string; name: string } | null;
    setCategories?: React.Dispatch<React.SetStateAction<any[]>>;
    onConfirm: () => void;
}

export default function DeleteCategoryModal({
    open,
    onClose,
    category,
    onConfirm,
    setCategories
}: DeleteCategoryModalProps) {

    const handleDelete = async () => {
        if (!category) return;
        const response = await deleteCategory(category.categoryId);
        if (response) {
            toast.success(`Category "${category.name}" deleted successfully.`);
            if (setCategories) {
                setCategories((prevCategories) =>
                    prevCategories.filter((cat) => cat.categoryId !== category.categoryId)
                );
            }
        }
        onConfirm();
        onClose();
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-red-600 mb-3">
                    Delete Category
                </h2>

                <p className="text-sm text-gray-600">
                    Delete <strong>{category?.name}</strong>? Items under this category may be affected.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="btn-secondary">
                        Cancel
                    </button>
                    <button
                        onClick={() => handleDelete()}
                        className="rounded-full bg-red-600 px-4 py-2 text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
