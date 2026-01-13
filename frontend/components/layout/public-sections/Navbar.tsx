'use client';

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import FoodIcon from "../../icons/FoodIcon";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import AccountDropdown from "../user-sections/AccountDropdown";

const routes = [
    { name: "Home", path: "/" },
    { name: "Food Menu", path: "/food-menu" },
    { name: "My Orders", path: "/my-orders" },
];

export default function Navbar() {
    const { isAuthenticated, user } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const handleUserMenuModal = () => {
        if (!isAuthenticated) {
            router.push('/auth/user');
            return;
        } else {
            // Toggle user menu
            setOpen(!open);
            // console.log("Toggle user menu for", user?.name);
        }
    };

    return (
        <nav className="relative max-w-309 mx-auto flex items-center justify-between py-4 z-10">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                    <FoodIcon className="absolute w-5 h-5 text-secondary" />
                </div>
                <span className="text-2xl font-serif font-semibold text-primary">Foodio.</span>
            </div>
            <div className="flex gap-6 items-center">
                {routes.map((route) => (
                    <Link
                        key={route.path}
                        href={route.path}
                        className={`${pathname === route.path
                            ? "px-6 py-2 rounded-full border border-primary text-primary bg-secondary"
                            : "text-gray-600 hover:text-primary"
                            } transition`}
                    >
                        {route.name}
                    </Link>
                ))}
            </div>
            <div className="relative">
                {isAuthenticated ? (
                    <button onClick={() => handleUserMenuModal()} className="px-3 py-3 bg-primary text-white rounded-full flex items-center">
                        <FiUser className="w-5 h-5" />
                    </button>
                ) : (
                    <button onClick={() => handleUserMenuModal()} className="px-6 py-2 bg-primary text-white rounded-full flex items-center gap-2">
                        Sign In <FaArrowRight className="w-4 h-4" />
                    </button>
                )}
                {open && isAuthenticated && (
                    <AccountDropdown open={open} setOpen={setOpen} onClose={() => setOpen(false)} />
                )}
            </div>
        </nav>
    );
}
