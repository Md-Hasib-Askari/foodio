'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerValidationSchema } from '@/validators/register-validation';
import { registerAPI } from '@/api/user.api';
import { toast } from 'react-toastify';

export default function RegisterForm() {
  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        password: '',
        address: '',
      }}
      validationSchema={registerValidationSchema}
      onSubmit={async (values, { resetForm }) => {
        console.log('Register submit:', values);
        try {
          const response = await registerAPI(values);
          if (response) {
            toast.success('Registration successful! You can now log in.');
            resetForm();
          } else {
            toast.error('Registration failed. Please try again.');
          }
        } catch (error) {
          toast.error('An error occurred. Please try again.');
        }


      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="space-y-1">
            <Field
              name="fullName"
              placeholder="Full name"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-teal-900/20 focus:outline-none"
            />
            <ErrorMessage
              name="fullName"
              component="p"
              className="text-xs text-red-500"
            />
          </div>

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

          <div className="space-y-1">
            <Field
              name="address"
              placeholder="Address"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-teal-900/20 focus:outline-none"
            />
            <ErrorMessage
              name="address"
              component="p"
              className="text-xs text-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-teal-900 py-2.5 text-white text-sm font-medium
            transition active:scale-[0.98] disabled:opacity-50"
          >
            Create account
          </button>
        </Form>
      )}
    </Formik>
  );
}
