'use client';

import AddCategoryModal from "@/components/layout/admin-sections/AddCategoryModal";
import AddItemModal from "@/components/layout/admin-sections/AddItemModal";
import AdminSidebar from "@/components/layout/admin-sections/AdminSidebar";
import CategoriesTable from "@/components/layout/admin-sections/CategoriesTable";
import MenuItemsTable from "@/components/layout/admin-sections/MenuItemsTable";
import OrdersTable from "@/components/layout/admin-sections/OrdersTable";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

const menuItems = [
    { name: "Golden Crunch Bites", category: "Appetizers", price: 15, description: 'Available', available: true },
    { name: "Mediterranean Olive Medley", category: "Appetizers", price: 25, description: 'Available', available: true },
    { name: "Citrus Swirl Delights", category: "Desserts", price: 35, description: 'Available', available: true },
    { name: "Creamy Garlic Shrimp Pasta", category: "Main Course", price: 10, description: 'Available', available: true },
];

const categories = [
    { name: "Starters" },
    { name: "Main Courses" },
    { name: "Desserts" }
];

const orders = [
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$24.00", status: "Pending", address: "123 Main St, Springfield, IL" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Preparing", address: "456 Elm St, Springfield, IL" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready", address: "789 Oak St, Springfield, IL" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready", address: "101 Pine St, Springfield, IL" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready", address: "202 Maple St, Springfield, IL" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready", address: "303 Birch St, Springfield, IL" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Completed", address: "404 Cedar St, Springfield, IL" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready", address: "505 Walnut St, Springfield, IL" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready", address: "606 Chestnut St, Springfield, IL" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Pending", address: "707 Ash St, Springfield, IL" }
];

type activeViewType = 'menu-items' | 'orders';
type activeTabType = 'items' | 'categories';

export default function AdminDashboard() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [activeView, setActiveView] = useState<activeViewType>('menu-items');
    const [activeTab, setActiveTab] = useState<activeTabType>('items');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModalForm = () => {
        setIsModalOpen(true);
    }

    const getForm = () => {
        switch (activeTab) {
            case 'items':
                return (
                    <AddItemModal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    />
                )
            case 'categories':
                return (
                    <AddCategoryModal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    />
                )
        }
    }


    if (!isAuthenticated) {
        return <div>You are not authorized to view this page.</div>;
    }

    return (
        <div className="flex h-screen">
            <AdminSidebar activeView={activeView} setActiveView={setActiveView} />

            <main className="flex-1 overflow-auto">
                <header className="border-b border-gray-200 px-8 py-6">
                    <h1 className="text-3xl font-serif text-primary font-semibold">
                        {activeView === 'menu-items' ? 'Menu Items' : 'Order Management'}
                    </h1>
                </header>

                <div className="p-8">
                    {activeView === 'menu-items' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex gap-6 bg-[#F2EFE9] px-2 py-2 rounded-full">
                                    <button
                                        onClick={() => setActiveTab('items')}
                                        className={`px-4 py-2 font-medium ${activeTab === 'items'
                                            ? 'bg-white rounded-4xl shadow-sm'
                                            : ''
                                            }`}
                                    >
                                        Menu Items
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('categories')}
                                        className={`px-4 py-2  font-medium ${activeTab === 'categories'
                                            ? 'bg-white rounded-4xl shadow-sm'
                                            : ''
                                            }`}
                                    >
                                        Categories
                                    </button>
                                </div>
                                <button
                                    onClick={() => showModalForm()}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full hover:bg-primary-dark transition">
                                    <BiPlus className="w-4 h-4" />
                                    {activeTab === 'items' ? 'Add Item' : 'Add Category'}
                                </button>
                            </div>

                            {activeTab === 'items' && (
                                <MenuItemsTable menuItems={menuItems} />
                            )}

                            {activeTab === 'categories' && (
                                <CategoriesTable categories={categories} />
                            )}
                        </div>
                    )}

                    {activeView === 'orders' && (
                        <OrdersTable orders={orders} />
                    )}
                </div>
                <div>
                    {isModalOpen && getForm()}
                </div>
            </main>
        </div>
    )
}
