'use client';

import FoodIcon from '@/components/icons/FoodIcon';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { adminLoginValidationSchema } from '@/validators/admin-login-validation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

type AdminLoginFormDataType = {
    email: string;
    password: string;
};

export default function AdminLoginForm() {
    const { login } = useAuth();
    const router = useRouter();

    return (
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                <FoodIcon className="w-5 h-5 text-secondary" />
                            </div>
                            <span className="text-xl sm:text-2xl font-serif font-semibold text-primary">
                                Foodio | Admin
                            </span>
                        </div>
                    </div>

                    <Formik<AdminLoginFormDataType>
                        initialValues={{ email: '', password: '' }}
                        validationSchema={adminLoginValidationSchema}
                        onSubmit={async (values) => {
                            const user = await login(values.email, values.password);
                            if (user && user.isAdmin) {
                                router.push(ROUTES.ADMIN_DASHBOARD);
                                return;
                            } else {
                                toast.error("You do not have admin access");
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4 sm:space-y-5">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Email
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full px-4 py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl
                                        focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-transparent transition"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="p"
                                        className="text-xs text-red-500"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className="w-full px-4 py-3 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl
                                        focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="text-xs text-red-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-2 sm:py-2.5 bg-primary text-white  text-sm rounded-full font-medium
                                    hover:bg-primary-dark transition shadow-sm disabled:opacity-50"
                                >
                                    Admin Sign In
                                </button>

                                <button
                                    type="button"
                                    onClick={() => router.push(ROUTES.LOGIN)}
                                    className="w-full py-2 sm:py-2.5 border border-primary text-sm text-primary rounded-full font-medium
                                    hover:bg-primary-dark hover:text-white transition shadow-sm"
                                >
                                    User Sign In
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
