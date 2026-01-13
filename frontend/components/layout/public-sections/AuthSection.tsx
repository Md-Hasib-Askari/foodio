'use client';

import { useEffect, useState } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import FoodIcon from '../../icons/FoodIcon';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

type ActiveTab = 'signin' | 'register';

export default function AuthSection() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<ActiveTab>('signin');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;

            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable
            ) {
                return;
            }

            if (e.key.toLowerCase() === 'a') {
                router.push(ROUTES.ADMIN_LOGIN);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                <FoodIcon className="w-5 h-5 text-secondary" />
                            </div>
                            <span className="text-2xl font-serif font-semibold text-primary">
                                Foodio.
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Premium flavors, delivered.
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-full p-1 flex">
                        <button
                            onClick={() => setActiveTab('signin')}
                            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-200
              ${activeTab === 'signin'
                                    ? 'bg-white text-teal-900 shadow-sm'
                                    : 'text-gray-600 hover:text-teal-900'
                                }`}
                        >
                            Sign in
                        </button>
                        <button
                            onClick={() => setActiveTab('register')}
                            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-200
              ${activeTab === 'register'
                                    ? 'bg-white text-teal-900 shadow-sm'
                                    : 'text-gray-600 hover:text-teal-900'
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {activeTab === 'register' ? <RegisterForm /> : <LoginForm />}
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                    <BiInfoCircle className="w-4 h-4" />
                    <span>
                        Press <kbd className="rounded bg-gray-100 px-1">A</kbd> to access Admin
                        Panel
                    </span>
                </div>
            </div>
        </div>
    );
}
