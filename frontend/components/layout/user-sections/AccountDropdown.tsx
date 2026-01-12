'use client';

import { useState } from 'react';
import { BiCheck, BiLogOut } from 'react-icons/bi';

export default function AccountDropdown() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block text-left ml-100">
            {/* Trigger */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
                My Account
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-lg">
                    {/* Orders */}
                    <button className="flex w-full items-center justify-between rounded-t-xl px-4 py-2 text-sm hover:bg-gray-100">
                        <span>Orders</span>
                        <BiCheck size={16} />
                    </button>

                    <div className="my-1 h-px bg-gray-200" />

                    {/* Sign out */}
                    <button className="flex w-full items-center gap-2 rounded-b-xl px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                        <BiLogOut size={16} />
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
