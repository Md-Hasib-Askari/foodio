'use client';

import FoodIcon from '@/components/icons/FoodIcon';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

type LoginFormDataType = {
    email: string;
    password: string;
}

export default function AdminLoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginFormDataType>({
        email: '',
        password: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        // Handle admin login submission
        console.log('Admin Login Form submitted:', formData);
    };

    return (

        <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Logo and Tagline */}
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                <FoodIcon className="absolute w-5 h-5 text-secondary" />
                            </div>
                            <span className="text-2xl font-serif font-semibold text-primary">Foodio | Admin</span>
                        </div>
                    </div>
                    {/* Admin Login Form */}
                    <div className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="name@example.com"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-900 focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full py-3.5 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition shadow-sm"
                        >
                            Admin Sign In
                        </button>

                        <button
                            onClick={() => router.push(ROUTES.LOGIN)}
                            className="w-full py-3.5 border border-primary text-primary rounded-full font-medium hover:bg-primary-dark transition shadow-sm"
                        >
                            User Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
