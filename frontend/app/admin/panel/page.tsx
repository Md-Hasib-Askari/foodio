'use client';

import { ItemType } from "@/app/page";
import AddCategoryModal from "@/components/layout/admin-sections/AddCategoryModal";
import AddItemModal from "@/components/layout/admin-sections/AddItemModal";
import AdminSidebar from "@/components/layout/admin-sections/AdminSidebar";
import CategoriesTable from "@/components/layout/admin-sections/CategoriesTable";
import MenuItemsTable from "@/components/layout/admin-sections/MenuItemsTable";
import OrdersTable from "@/components/layout/admin-sections/OrdersTable";
import { CategoryType } from "@/components/layout/public-sections/Categories";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";

type activeViewType = 'menu-items' | 'orders';
type activeTabType = 'items' | 'categories';

export default function AdminDashboard() {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();
    const [activeView, setActiveView] = useState<activeViewType>('menu-items');
    const [activeTab, setActiveTab] = useState<activeTabType>('items');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState<CategoryType | null>(null);
    const [newItem, setNewItem] = useState<ItemType | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const showModalForm = () => setIsModalOpen(true);

    const getForm = () => {
        switch (activeTab) {
            case 'items':
                return (
                    <AddItemModal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        setNewItem={(item) => setNewItem(item)}
                    />
                );
            case 'categories':
                return (
                    <AddCategoryModal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        setNewCategory={(category) => setNewCategory(category)}
                    />
                );
        }
    };

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            router.push('/auth/admin');
        }
    }, [isAuthenticated, loading, router]);

    if (!isAuthenticated || loading) return null;

    return (
        <div className="flex h-screen flex-col lg:flex-row">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div
                className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-64
                transform bg-white
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}
            >
                <AdminSidebar
                    activeView={activeView}
                    setActiveView={(view) => {
                        setActiveView(view);
                        setSidebarOpen(false); // auto-close on mobile
                    }}
                />
            </div>

            <main className="flex-1 overflow-x-hidden h-screen">
                <header className="border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-md border border-gray-200"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif text-primary font-semibold">
                        {activeView === 'menu-items'
                            ? 'Menu Items'
                            : 'Order Management'}
                    </h1>
                </header>

                <div className="p-4 sm:p-6 lg:p-8">
                    {activeView === 'menu-items' && (
                        <div className="">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                <div className="flex gap-2 bg-[#F2EFE9] p-1 rounded-full w-fit">
                                    <button
                                        onClick={() => setActiveTab('items')}
                                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'items'
                                            ? 'bg-white rounded-full shadow-sm'
                                            : ''
                                            }`}
                                    >
                                        Menu Items
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('categories')}
                                        className={`px-4 py-2 text-sm font-medium ${activeTab === 'categories'
                                            ? 'bg-white rounded-full shadow-sm'
                                            : ''
                                            }`}
                                    >
                                        Categories
                                    </button>
                                </div>

                                <button
                                    onClick={showModalForm}
                                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full hover:bg-primary-dark transition text-sm"
                                >
                                    <BiPlus className="w-4 h-4" />
                                    {activeTab === 'items'
                                        ? 'Add Item'
                                        : 'Add Category'}
                                </button>
                            </div>

                            <div className="">
                                {activeTab === 'items' && (
                                    <MenuItemsTable newItem={newItem} />
                                )}
                                {activeTab === 'categories' && (
                                    <CategoriesTable newCategory={newCategory} />
                                )}
                            </div>
                        </div>
                    )}

                    {activeView === 'orders' && (
                        <div className="overflow-x-auto">
                            <OrdersTable />
                        </div>
                    )}
                </div>

                {isModalOpen && getForm()}
            </main>
        </div>
    );
}
