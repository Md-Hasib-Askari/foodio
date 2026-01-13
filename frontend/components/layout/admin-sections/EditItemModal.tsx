'use client';

import { CgClose } from 'react-icons/cg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addItemValidationSchema } from '@/validators/add-item-validation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Category } from './CategoriesTable';
import { fetchCategories } from '@/api/category.api';
import { updateMenuItem } from '@/api/menu-item.api';
import { ItemType } from '@/app/page';
import { toast } from 'react-toastify';

// type ItemType = {
//     name: string;
//     price: number;
//     category: string;
//     description: string;
//     available: boolean;
// };

interface EditItemModalProps {
    open: boolean;
    onClose: () => void;
    item: ItemType | null;
    setMenuItems?: Dispatch<SetStateAction<any[]>>;
}

export default function EditItemModal({ open, onClose, item, setMenuItems }: EditItemModalProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        (async function () {
            const response = await fetchCategories();
            if (response) {
                setCategories(response);
            }
        })()
    }, []);

    if (!open || !item) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-2xl bg-[#FAF8F4] p-8 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-[#1F3D2B]">
                        Edit Item
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-500 hover:bg-gray-200"
                    >
                        <CgClose size={20} />
                    </button>
                </div>

                <Formik
                    initialValues={item}
                    validationSchema={addItemValidationSchema}
                    enableReinitialize
                    onSubmit={async (values) => {
                        values.price = Number(values.price);
                        const response = await updateMenuItem(item.menuItemId, {
                            ...(values.name && { name: values.name }),
                            ...(values.price && { price: Number(values.price) }),
                            ...(values.categoryId && { categoryId: values.categoryId }),
                            ...(values.description && { description: values.description }),
                            available: values.available,
                        });
                        if (response) {
                            response.price = Number(response.price);
                            toast.success(`Item "${response.name}" updated successfully.`);
                            setMenuItems && setMenuItems((prevItems) =>
                                prevItems.map((it) =>
                                    it.menuItemId === response.menuItemId ? response : it
                                )
                            );
                        }
                        onClose();
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium">Name</label>
                                    <Field
                                        name="name"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2
                                        focus:ring-2 focus:ring-[#1F3D2B]"
                                    />
                                    <ErrorMessage name="name" component="p" className="text-xs text-red-500" />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-medium">Price</label>
                                    <Field
                                        name="price"
                                        type="number"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2
                                        focus:ring-2 focus:ring-[#1F3D2B]"
                                    />
                                    <ErrorMessage name="price" component="p" className="text-xs text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium">Category</label>
                                <Field
                                    as="select"
                                    name="categoryId"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2
                                    focus:ring-2 focus:ring-[#1F3D2B]"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="categoryId" component="p" className="text-xs text-red-500" />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium">Description</label>
                                <Field
                                    as="textarea"
                                    rows={4}
                                    name="description"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2
                                    focus:ring-2 focus:ring-[#1F3D2B]"
                                />
                                <ErrorMessage name="description" component="p" className="text-xs text-red-500" />
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <Field type="checkbox" name="available" className="peer sr-only" />
                                    <div
                                        className="peer h-6 w-11 rounded-full bg-gray-300
                                        peer-checked:bg-[#1F3D2B]
                                        after:absolute after:left-1 after:top-1 after:h-4 after:w-4
                                        after:rounded-full after:bg-white after:transition
                                        peer-checked:after:translate-x-5"
                                    />
                                </label>
                                <span className="text-sm font-medium">
                                    Available for Order
                                </span>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-full bg-[#1F3D2B] px-6 py-2 text-white
                                    hover:bg-[#183024] disabled:opacity-50"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
