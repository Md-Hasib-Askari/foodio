'use client';

import { CgClose } from 'react-icons/cg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addCategoryValidationSchema } from '@/validators/add-category-validation';

interface AddCategoryModalProps {
    open: boolean;
    onClose: () => void;
}

type AddCategoryFormValues = {
    name: string;
};

export default function AddCategoryModal({
    open,
    onClose,
}: AddCategoryModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-xl rounded-2xl bg-[#FAF8F4] p-8 shadow-xl">
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

                <Formik<AddCategoryFormValues>
                    initialValues={{ name: '' }}
                    validationSchema={addCategoryValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('Add category:', values);
                        setSubmitting(false);
                        onClose();
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium">Name</label>
                                <Field
                                    name="name"
                                    placeholder="Category name"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3
                  focus:outline-none focus:ring-2 focus:ring-[#1F3D2B]"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="p"
                                    className="text-xs text-red-500"
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-full bg-[#1F3D2B] px-6 py-2 text-white
                  hover:bg-[#183024] disabled:opacity-50"
                                >
                                    Add
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
