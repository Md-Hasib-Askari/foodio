'use client';

import { BiUpload } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addItemValidationSchema } from '@/validators/add-item-validation';
import { createMenuItem } from '@/api/menu-item.api';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { fetchCategories } from '@/api/category.api';
import { Category } from './CategoriesTable';

interface AddItemModalProps {
    open: boolean;
    onClose: () => void;
    setNewItem: (item: any) => void;
}

type AddItemFormValues = {
    name: string;
    price: number | '';
    category: string;
    description: string;
    image: File | null;
    available: boolean;
};

export default function AddItemModal({ open, onClose, setNewItem }: AddItemModalProps) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        (async function () {
            const fetchedCategories = await fetchCategories();
            if (fetchedCategories) {
                setCategories(fetchedCategories.map((cat: any) => ({
                    categoryId: cat.categoryId,
                    name: cat.name
                })));
            }
        })()
    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-2xl bg-[#FAF8F4] p-8 shadow-xl">
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

                <Formik<AddItemFormValues>
                    initialValues={{
                        name: '',
                        price: '',
                        category: '',
                        description: '',
                        image: null,
                        available: true,
                    }}
                    validationSchema={addItemValidationSchema}
                    onSubmit={async (values) => {
                        const response = await createMenuItem({
                            name: values.name,
                            price: Number(values.price),
                            categoryId: values.category,
                            description: values.description,
                            imageUrl: values.image ? URL.createObjectURL(values.image) : '',
                            available: values.available,
                        });

                        if (response) {

                            toast.success("Menu item added successfully");
                            onClose();
                            setNewItem(response);
                        }

                        console.log('Add item submit:', values);
                    }}
                >
                    {({ setFieldValue, values, isSubmitting }) => (
                        <Form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium">Name</label>
                                    <Field
                                        name="name"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1F3D2B]"
                                    />
                                    <ErrorMessage name="name" component="p" className="text-xs text-red-500" />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-medium">Price</label>
                                    <Field
                                        name="price"
                                        type="number"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1F3D2B]"
                                    />
                                    <ErrorMessage name="price" component="p" className="text-xs text-red-500" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium">Category</label>
                                <Field
                                    as="select"
                                    name="category"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1F3D2B]"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="category" component="p" className="text-xs text-red-500" />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium">Description</label>
                                <Field
                                    as="textarea"
                                    rows={4}
                                    name="description"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1F3D2B]"
                                />
                                <ErrorMessage name="description" component="p" className="text-xs text-red-500" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Image</label>

                                <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 text-center hover:bg-gray-50">
                                    <BiUpload className="mb-2 text-gray-500" />
                                    <p className="text-sm font-medium">
                                        Drag or click <span className="font-semibold">here</span> to upload
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Size must be maximum 2mb. Supported formats : PNG & JPEG
                                    </p>
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.currentTarget.files?.[0] || null;
                                            setFieldValue('image', file);
                                        }}
                                    />
                                </label>

                                <ErrorMessage name="image" component="p" className="text-xs text-red-500" />
                            </div>

                            {values.image && (
                                <div className="flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2">
                                    <span className="text-sm text-gray-600">
                                        {values.image.name}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setFieldValue('image', null)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <CgClose size={16} />
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center gap-3">
                                <label className="relative inline-flex cursor-pointer items-center">
                                    <Field type="checkbox" name="available" className="peer sr-only" />
                                    <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-[#1F3D2B]
                    after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full
                    after:bg-white after:transition peer-checked:after:translate-x-5" />
                                </label>
                                <span className="text-sm font-medium">Available for Order</span>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-full bg-[#1F3D2B] px-6 py-2 text-white hover:bg-[#183024]
                  disabled:opacity-50"
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
