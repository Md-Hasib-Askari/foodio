import FoodIcon from '@/components/icons/FoodIcon'
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { BiLogOut, BiMenu, BiShoppingBag } from 'react-icons/bi';

interface AdminSidebarProps {
    activeView: 'menu-items' | 'orders';
    setActiveView: (view: 'menu-items' | 'orders') => void;
}

export default function AdminSidebar({ activeView, setActiveView }: AdminSidebarProps) {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push(ROUTES.ADMIN_LOGIN);
    }

    return (
        <aside className="w-64 bg-[#FBFAF8] border-r border-gray-200 flex flex-col">
            <div className="p-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <FoodIcon className="absolute w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-serif font-semibold text-primary">Foodio.</span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <button
                    onClick={() => setActiveView('menu-items')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeView === 'menu-items'
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <BiMenu className="w-5 h-5" />
                    <span className="font-medium">Menu Items</span>
                </button>
                <button
                    onClick={() => setActiveView('orders')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeView === 'orders'
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <BiShoppingBag className="w-5 h-5" />
                    <span className="font-medium">Orders</span>
                </button>
            </nav>

            <div className="mx-4 py-3 border-t border-gray-200">
                <button onClick={() => handleLogout()} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition">
                    <BiLogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    )
}
