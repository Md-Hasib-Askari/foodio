import React from 'react'

interface LoginFormProps {
    formData: {
        email: string;
        password: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
}

export default function LoginForm({ formData, handleInputChange, handleSubmit }: LoginFormProps) {
    return (
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
                Sign In
            </button>
        </div>
    )
}
