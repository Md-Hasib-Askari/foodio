'use client';

import { CgClose } from 'react-icons/cg';

interface DeleteItemModalProps {
    open: boolean;
    onClose: () => void;
    itemName: string;
    onConfirm: () => void;
}

export default function DeleteItemModal({
    open,
    onClose,
    itemName,
    onConfirm,
}: DeleteItemModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex justify-between">
                    <h2 className="text-lg font-semibold text-red-600">Delete Item</h2>
                    <button onClick={onClose}>
                        <CgClose />
                    </button>
                </div>

                <p className="text-sm text-gray-600">
                    Are you sure you want to delete <strong>{itemName}</strong>? This action
                    cannot be undone.
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
