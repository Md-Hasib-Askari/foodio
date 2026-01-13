'use client';

import FoodIcon from '@/components/icons/FoodIcon'
import AdminLoginForm from '@/components/layout/admin-sections/AdminLoginForm'
import Footer from '@/components/layout/public-sections/Footer'
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';

export default function AdminAuthSection() {
    const router = useRouter();

    return (
        <section className="min-h-screen flex flex-col justify-between bg-background text-foreground">
            <nav className="relative max-w-309 w-full mx-auto flex items-center justify-between py-4 z-10">
                <div onClick={() => router.push(ROUTES.HOME)} className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <FoodIcon className="absolute w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-2xl font-serif font-semibold text-primary">Foodio.</span>
                </div>
            </nav>
            <AdminLoginForm />
            <Footer />
        </section>
    )
}
