'use client';

import { ChangeEvent, useEffect, useState } from 'react'
import { BiInfoCircle } from 'react-icons/bi'
import FoodIcon from '../../icons/FoodIcon';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

type activeTabType = 'signin' | 'register';

interface LoginFormDataType {
    email: string;
    password: string;
}
interface RegisterFormDataType extends LoginFormDataType {
    fullName: string;
    address: string;
}
type FormDataType = LoginFormDataType & RegisterFormDataType;

export default function AuthSection() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<activeTabType>('register');
    const [formData, setFormData] = useState<FormDataType>({
        fullName: '',
        email: '',
        password: '',
        address: ''
    });

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key.toLowerCase() === 'a') {
            router.push(ROUTES.ADMIN_LOGIN);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown as any);
        return () => {
            window.removeEventListener('keydown', handleKeyDown as any);
        };
    }, []);

    const handleTabChange = (tab: activeTabType) => {
        setFormData({
            fullName: '',
            email: '',
            password: '',
            address: ''
        });
        setActiveTab(tab);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
    };

    return (
        <div className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                <FoodIcon className="absolute w-5 h-5 text-secondary" />
                            </div>
                            <span className="text-2xl font-serif font-semibold text-primary">Foodio.</span>
                        </div>
                        <p className="text-gray-600 text-sm">Premium flavors, delivered.</p>
                    </div>

                    <div className="bg-gray-100 rounded-full p-1 mb-6 flex">
                        <button
                            onClick={() => handleTabChange('signin')}
                            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition ${activeTab === 'signin'
                                ? 'bg-white text-teal-900 shadow-sm'
                                : 'text-gray-600 hover:text-teal-900'
                                }`}
                        >
                            Sign in
                        </button>
                        <button
                            onClick={() => handleTabChange('register')}
                            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition ${activeTab === 'register'
                                ? 'bg-white text-teal-900 shadow-sm'
                                : 'text-gray-600 hover:text-teal-900'
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    {
                        activeTab === 'register' ? (
                            <RegisterForm formData={{
                                fullName: formData.fullName,
                                email: formData.email,
                                password: formData.password,
                                address: formData.address
                            }} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                        ) : (
                            <LoginForm formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                        )
                    }
                </div>

                <div className="mt-6 flex items-center justify-baseline gap-2 text-sm text-gray-500">
                    <BiInfoCircle className="w-5 h-5" />
                    <span>For accessing Admin Panel press A from your keyboard.</span>
                </div>
            </div>
        </div>
    )
}
