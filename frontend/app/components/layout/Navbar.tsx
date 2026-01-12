import { FaArrowRight, FaUtensilSpoon } from "react-icons/fa";

export default function Navbar() {
    return (
        <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-8 py-4 z-10">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <FaUtensilSpoon className="w-5 h-5 text-primary" />

                    {/* <FaUtensilSpoon className="w-5 h-5 text-white" /> */}
                </div>
                <span className="text-2xl font-serif font-semibold text-primary">Foodio.</span>
            </div>
            <div className="flex gap-6 items-center">
                <a href="#" className="px-6 py-2 rounded-full border border-primary text-primary bg-secondary transition">Home</a>
                <a href="#" className="text-gray-600 hover:text-primary transition">Food Menu</a>
                <a href="#" className="text-gray-600 hover:text-primary transition">My Orders</a>
            </div>
            <div>
                <button className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition flex items-center gap-2">
                    Sign In <FaArrowRight className="w-4 h-4" />
                </button>
            </div>
        </nav>
    );
}
