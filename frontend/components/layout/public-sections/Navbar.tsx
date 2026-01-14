'use client';

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import FoodIcon from "../../icons/FoodIcon";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FiMenu, FiUser, FiX } from "react-icons/fi";
import { useState } from "react";
import AccountDropdown from "../user-sections/AccountDropdown";
import { ROUTES } from "@/constants/routes";

const routes = [
    { name: "Home", path: ROUTES.HOME },
    { name: "Food Menu", path: ROUTES.MENU },
    { name: "My Orders", path: ROUTES.ORDERS },
];

export default function Navbar() {
    const { isAuthenticated, user } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleUserMenuModal = () => {
        if (!isAuthenticated) {
            router.push(ROUTES.LOGIN);
            return;
        } else {
            setOpen(!open);
        }
    };

    return (
        <nav className="relative max-w-309 mx-auto flex items-center justify-between py-4 px-4 sm:px-6 xl:px-0 z-10">
            <div
                onClick={() => router.push(ROUTES.HOME)}
                className="flex items-center gap-2 cursor-pointer shrink-0"
            >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center relative">
                    <FoodIcon className="absolute w-5 h-5 text-secondary" />
                </div>
                <span className="text-xl sm:text-2xl font-serif font-semibold text-primary">
                    Foodio.
                </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-4 lg:gap-6 items-center">
                {routes.map((route) => (
                    <Link
                        key={route.path}
                        href={route.path}
                        className={`${pathname === route.path
                            ? "px-5 py-2 rounded-full border border-primary text-primary bg-secondary"
                            : "text-gray-600 hover:text-primary"
                            } transition whitespace-nowrap`}
                    >
                        {route.name}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-2 relative shrink-0">
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 rounded-lg text-primary"
                >
                    {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>

                {isAuthenticated ? (
                    <button
                        onClick={() => handleUserMenuModal()}
                        className="p-3 bg-primary text-white rounded-full flex items-center"
                    >
                        <FiUser className="w-5 h-5" />
                    </button>
                ) : (
                    <button
                        onClick={() => handleUserMenuModal()}
                        className="hidden sm:flex px-6 py-2 bg-primary text-white rounded-full items-center gap-2"
                    >
                        Sign In <FaArrowRight className="w-4 h-4" />
                    </button>
                )}

                {open && isAuthenticated && (
                    <AccountDropdown
                        open={open}
                        setOpen={setOpen}
                        onClose={() => setOpen(false)}
                    />
                )}
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-t shadow-md md:hidden">
                    <div className="flex flex-col gap-2 p-4">
                        {routes.map((route) => (
                            <Link
                                key={route.path}
                                href={route.path}
                                onClick={() => setMobileOpen(false)}
                                className={`${pathname === route.path
                                    ? "px-4 py-2 rounded-lg bg-secondary text-primary border border-primary"
                                    : "px-4 py-2 text-gray-600 hover:text-primary"
                                    } transition`}
                            >
                                {route.name}
                            </Link>
                        ))}

                        {!isAuthenticated && (
                            <button
                                onClick={() => {
                                    handleUserMenuModal();
                                    setMobileOpen(false);
                                }}
                                className="mt-2 px-4 py-2 bg-primary text-white rounded-full flex items-center justify-center gap-2"
                            >
                                Sign In <FaArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
