'use client';

import { CgClose } from 'react-icons/cg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addCategoryValidationSchema } from '@/validators/add-category-validation';

interface EditCategoryModalProps {
    open: boolean;
    onClose: () => void;
    category: { name: string };
}

export default function EditCategoryModal({
    open,
    onClose,
    category,
}: EditCategoryModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-xl rounded-2xl bg-[#FAF8F4] p-8 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-[#1F3D2B]">
                        Edit Category
                    </h2>
                    <button onClick={onClose}>
                        <CgClose size={20} />
                    </button>
                </div>

                <Formik
                    initialValues={category}
                    validationSchema={addCategoryValidationSchema}
                    onSubmit={(values) => {
                        console.log('Edit category:', values);
                        onClose();
                    }}
                >
                    <Form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <Field name="name" className="input" />
                            <ErrorMessage name="name" component="p" className="error" />
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="btn-primary">
                                Save
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}
