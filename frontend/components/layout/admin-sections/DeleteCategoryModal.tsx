'use client';

interface DeleteCategoryModalProps {
    open: boolean;
    onClose: () => void;
    categoryName: string;
    onConfirm: () => void;
}

export default function DeleteCategoryModal({
    open,
    onClose,
    categoryName,
    onConfirm,
}: DeleteCategoryModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-red-600 mb-3">
                    Delete Category
                </h2>

                <p className="text-sm text-gray-600">
                    Delete <strong>{categoryName}</strong>? Items under this category may be affected.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="btn-secondary">
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="rounded-full bg-red-600 px-4 py-2 text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
