import Image from 'next/image';
import { useState } from 'react';
import ConfirmOrderModal from '../user-sections/ConfirmOrderModal';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

export type menuItem = {
    menuItemId: string;
    name: string;
    description: string;
    price: number;
};

type MenuItemProps = {
    item: menuItem;
};

export default function MenuItem({ item }: MenuItemProps) {
    const { isAuthenticated } = useAuth();
    const [open, setOpen] = useState(false);

    const handleOrderNow = () => {
        if (!isAuthenticated) {
            toast.error("Please login to place an order.");
            return;
        }
        setOpen(true);
    };

    return (
        <div
            key={item.name}
            className="
                bg-secondary rounded-3xl
                p-5 sm:p-6
                w-full sm:w-72 md:w-65
                relative
                pt-32 sm:pt-36 md:pt-43
            "
        >
            <div className="absolute -top-10 sm:-top-12 -left-4 sm:-left-8.75 flex justify-center">
                <Image
                    src="/landing-page/hero-dish.png"
                    alt={item.name}
                    width={209}
                    height={209}
                    className="rounded-full w-36 sm:w-44 md:w-52.25 h-auto"
                />
            </div>

            <h3 className="font-semibold mb-2 text-base sm:text-lg">
                {item.name}
            </h3>

            <p className="text-sm text-gray-500 mb-6">
                {item.description}
            </p>

            <div className="flex items-center justify-between">
                <span className="font-semibold text-base sm:text-lg">
                    ${item.price}.00
                </span>

                <button
                    className="
                        absolute -bottom-5.75 right-0
                        w-32 sm:w-35
                        h-10 sm:h-11.25
                        bg-primary text-white
                        px-4 py-2
                        rounded-full rounded-tr-none
                        text-xs sm:text-sm
                    "
                    onClick={handleOrderNow}
                >
                    Order Now +
                </button>

                <ConfirmOrderModal
                    orderItem={item}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </div>
        </div>
    );
}
