import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
                    <span className="text-lg sm:text-xl font-serif font-semibold text-teal-900">
                        Foodio.
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                        © 2026 Foodio Inc.
                    </span>
                </div>

                <div className="flex gap-6 sm:gap-8 text-xs sm:text-sm text-gray-600">
                    <a href="#" className="hover:text-teal-900 transition">
                        Privacy
                    </a>
                    <a href="#" className="hover:text-teal-900 transition">
                        Terms
                    </a>
                    <a href="#" className="hover:text-teal-900 transition">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
}
