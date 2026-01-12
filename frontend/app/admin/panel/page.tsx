'use client';

import AdminSidebar from "@/components/layout/admin-sections/AdminSidebar";
import CategoriesTable from "@/components/layout/admin-sections/CategoriesTable";
import MenuItemsTable from "@/components/layout/admin-sections/MenuItemsTable";
import OrdersTable from "@/components/layout/admin-sections/OrdersTable";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

const menuItems = [
    { name: "Golden Crunch Bites", category: "Appetizers", price: 15, status: 'Available' },
    { name: "Mediterranean Olive Medley", category: "Appetizers", price: 25, status: 'Available' },
    { name: "Citrus Swirl Delights", category: "Desserts", price: 35, status: 'Available' },
    { name: "Creamy Garlic Shrimp Pasta", category: "Main Course", price: 10, status: 'Available' },
];

const categories = [
    { name: "Starters" },
    { name: "Main Courses" },
    { name: "Desserts" }
];

const orders = [
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$24.00", status: "Pending" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Preparing" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Completed" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Ready" },
    { id: "5b331ea1...", date: "Dec 12, 4:33 PM", customer: "John Doe", total: "$56.00", status: "Pending" }
];

type activeViewType = 'menu-items' | 'orders';
type activeTabType = 'items' | 'categories';


export default function AdminDashboard() {
    const [activeView, setActiveView] = useState<activeViewType>('menu-items');
    const [activeTab, setActiveTab] = useState<activeTabType>('items');

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <AdminSidebar activeView={activeView} setActiveView={setActiveView} />


            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {/* Header */}
                <header className="border-b border-gray-200 px-8 py-6">
                    <h1 className="text-3xl font-serif text-primary font-semibold">
                        {activeView === 'menu-items' ? 'Menu Items' : 'Order Management'}
                    </h1>
                </header>

                <div className="p-8">
                    {activeView === 'menu-items' && (
                        <div>
                            {/* Tabs */}
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
                                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full hover:bg-primary-dark transition">
                                    <BiPlus className="w-4 h-4" />
                                    {activeTab === 'items' ? 'Add Item' : 'Add Category'}
                                </button>
                            </div>

                            {/* Menu Items Table */}
                            {activeTab === 'items' && (
                                <MenuItemsTable menuItems={menuItems} />
                            )}

                            {/* Categories Table */}
                            {activeTab === 'categories' && (
                                <CategoriesTable categories={categories} />
                            )}
                        </div>
                    )}

                    {activeView === 'orders' && (
                        <OrdersTable orders={orders} />
                    )}
                </div>
            </main>
        </div>
    )
}
