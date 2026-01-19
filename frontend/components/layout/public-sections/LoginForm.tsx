'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginValidationSchema } from '@/validators/login-validation';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
    const { login, user } = useAuth();
    const router = useRouter();

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
                try {
                    await login(values.email, values.password);
                    router.push(ROUTES.HOME);
                } catch (error) {
                    toast.error('Invalid email or password.');
                    setStatus('Invalid email or password');
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div className="space-y-1">
                        <Field
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-teal-900/20 focus:outline-none"
                        />
                        <ErrorMessage
                            name="email"
                            component="p"
                            className="text-xs text-red-500"
                        />
                    </div>

                    <div className="space-y-1">
                        <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-teal-900/20 focus:outline-none"
                        />
                        <ErrorMessage
                            name="password"
                            component="p"
                            className="text-xs text-red-500"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-teal-900 py-2.5 text-white text-sm font-medium
            transition active:scale-[0.98] disabled:opacity-50"
                    >
                        Sign in
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
