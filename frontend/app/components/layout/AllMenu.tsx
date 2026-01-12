import Footer from './Footer';
import MenuGrid from './MenuGrid'

const items = [
    { name: "Golden Crunch Bites", price: 15 },
    { name: "Mediterranean Olive Medley", price: 25 },
    { name: "Citrus Swirl Delights", price: 35 },
    { name: "Creamy Garlic Shrimp Pasta", price: 10 },
    { name: "Golden Crunch Bites", price: 15 },
    { name: "Mediterranean Olive Medley", price: 25 },
    { name: "Citrus Swirl Delights", price: 35 },
    { name: "Creamy Garlic Shrimp Pasta", price: 10 },
    { name: "Golden Crunch Bites", price: 15 },
    { name: "Mediterranean Olive Medley", price: 25 },
    { name: "Citrus Swirl Delights", price: 35 },
    { name: "Creamy Garlic Shrimp Pasta", price: 10 },
];

export default function AllMenu() {
    return (
        <section className="py-16">
            <div className='max-w-309 mx-auto'>
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-serif text-teal-900 mb-4">Our Menu</h2>
                    <p className="text-gray-600">Discover our selection of premium dishes, crafted with passion.</p>
                </div>
                <div className="flex justify-center gap-4 mb-24">
                    <button className="px-8 py-3 bg-teal-900 text-white rounded-full hover:bg-teal-800 transition">
                        All
                    </button>
                    <button className="px-8 py-3 bg-white text-gray-700 rounded-full border border-gray-300 hover:border-teal-900 hover:text-teal-900 transition">
                        Starters
                    </button>
                    <button className="px-8 py-3 bg-white text-gray-700 rounded-full border border-gray-300 hover:border-teal-900 hover:text-teal-900 transition">
                        Main Courses
                    </button>
                    <button className="px-8 py-3 bg-white text-gray-700 rounded-full border border-gray-300 hover:border-teal-900 hover:text-teal-900 transition">
                        Desserts
                    </button>
                </div>
            </div>
            <MenuGrid items={items} />
            <Footer />
        </section>
    )
}
