'use client';

import { CgClose } from 'react-icons/cg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addItemValidationSchema } from '@/validators/add-item-validation';

type ItemType = {
    name: string;
    price: number;
    category: string;
    description: string;
    available: boolean;
};

interface EditItemModalProps {
    open: boolean;
    onClose: () => void;
    item: ItemType | null;
}

export default function EditItemModal({ open, onClose, item }: EditItemModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-2xl bg-[#FAF8F4] p-8 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-[#1F3D2B]">Edit Item</h2>
                    <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-200">
                        <CgClose size={20} />
                    </button>
                </div>

                <Formik
                    initialValues={item || {
                        name: '',
                        price: 0,
                        category: '',
                        description: '',
                        available: false,
                    }}
                    validationSchema={addItemValidationSchema}
                    onSubmit={(values) => {
                        console.log('Edit item:', values);
                        onClose();
                    }}
                >
                    {() => (
                        <Form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Name</label>
                                    <Field name="name" className="input" />
                                    <ErrorMessage name="name" component="p" className="error" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Price</label>
                                    <Field name="price" type="number" className="input" />
                                    <ErrorMessage name="price" component="p" className="error" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <Field as="textarea" name="description" rows={3} className="input" />
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="btn-primary">
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
