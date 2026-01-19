'use client';

import { useEffect, useState } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import FoodIcon from '../../icons/FoodIcon';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ActiveTab = 'signin' | 'register';

export default function AuthSection() {
    const router = useRouter();

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
                    <Tabs defaultValue='login' className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4 rounded-full bg-gray-100">
                            <TabsTrigger className='rounded-full' value="login">Sign In</TabsTrigger>
                            <TabsTrigger className='rounded-full' value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <LoginForm />
                        </TabsContent>
                        <TabsContent value="register">
                            <RegisterForm />
                        </TabsContent>
                    </Tabs>
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
