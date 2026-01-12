import FoodIcon from '@/components/icons/FoodIcon'
import AuthSection from '@/components/layout/public-sections/AuthSection'
import Footer from '@/components/layout/public-sections/Footer'

export default function Login() {
    return (
        <section className="min-h-screen flex flex-col justify-between bg-background text-foreground">
            <nav className="relative max-w-309 w-full mx-auto flex items-center justify-between py-4 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <FoodIcon className="absolute w-5 h-5 text-secondary" />
                    </div>
                    <span className="text-2xl font-serif font-semibold text-primary">Foodio.</span>
                </div>
            </nav>
            <AuthSection />
            <Footer />
        </section>
    )
}
