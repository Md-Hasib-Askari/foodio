import Image from 'next/image';
import React, { useState } from 'react'
import ConfirmOrderModal from '../user-sections/ConfirmOrderModal';


export type menuItem = {
    menuItemId: string;
    name: string;
    description: string;
    price: number;
}

type MenuItemProps = {
    item: menuItem;
}

export default function MenuItem({ item }: MenuItemProps) {
    const [open, setOpen] = useState(false);

    return (
        <div
            key={item.name}
            className="bg-secondary rounded-3xl p-6 w-65 relative pt-43"
        >
            <div className="absolute -top-12.5 -left-8.75  flex justify-center mb-6">
                <Image
                    src="/landing-page/hero-dish.png"
                    alt={item.name}
                    width={209}
                    height={209}
                    className="rounded-full"
                />
                {/* <div className='size-55.5 bg-black flex items-center justify-items-center rounded-full p-2.75'>
                    <div className='size-52.25 rounded-full bg-white'></div>
                </div> */}
            </div>

            <h3 className="font-semibold mb-2">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-4">
                {item.description}
            </p>

            <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">${item.price}.00</span>
                <button className="absolute -bottom-5.75 right-0 w-35 h-11.25 bg-primary text-white px-4 py-2 rounded-full rounded-tr-none text-sm" onClick={() => setOpen(true)}>
                    Order Now +
                </button>
                <ConfirmOrderModal orderItem={item} open={open} onClose={() => setOpen(false)} />
            </div>
        </div>
    )
}
