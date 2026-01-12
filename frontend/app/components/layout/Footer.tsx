import React from 'react'

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 py-8 px-8 mt-16">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-serif font-semibold text-teal-900">Foodio.</span>
                    <span className="text-sm text-gray-500">© 2026 Foodio Inc.</span>
                </div>
                <div className="flex gap-8 text-sm text-gray-600">
                    <a href="#" className="hover:text-teal-900 transition">Privacy</a>
                    <a href="#" className="hover:text-teal-900 transition">Terms</a>
                    <a href="#" className="hover:text-teal-900 transition">Contact</a>
                </div>
            </div>
        </footer>
    )
}
