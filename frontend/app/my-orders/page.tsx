'use client';

import Footer from "@/components/layout/public-sections/Footer";
import Navbar from "@/components/layout/public-sections/Navbar";
import OrderSection from "@/components/layout/user-sections/OrderSection";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyOrders() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push(ROUTES.LOGIN);
            return;
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        return null;
    }

    return (
        <section>
            <Navbar />
            <OrderSection />
            <Footer />
        </section>
    )
}
