import Navbar from '../../components/layout/public-sections/Navbar'
import AllMenu from '../../components/layout/public-sections/AllMenu'
import Footer from '@/components/layout/public-sections/Footer'

export default function FoodMenu() {
    return (
        <div className="relative min-h-screen bg-background text-foreground">
            <Navbar />
            <AllMenu />
            <Footer />
        </div>
    )
}
