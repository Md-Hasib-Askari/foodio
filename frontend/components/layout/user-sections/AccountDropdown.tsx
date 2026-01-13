'use client';

import { BiCheck, BiLogOut } from 'react-icons/bi';

interface AccountDropdownProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
}

export default function AccountDropdown({ open, setOpen, onClose }: AccountDropdownProps) {

    return (
        <div className="absolute mt-2 right-0 z-50 inline-block text-left">
            {open && (
                <div className="w-48 rounded-xl border border-gray-200 bg-white shadow-lg">
                    <button className="flex w-full items-center justify-between rounded-t-xl px-4 py-2 text-sm hover:bg-gray-100">
                        <span>My Account</span>
                        {/* <BiCheck size={16} /> */}
                    </button>

                    <button className="flex w-full items-center justify-between rounded-t-xl px-4 py-2 text-sm hover:bg-gray-100">
                        <span>Orders</span>
                        <BiCheck size={16} />
                    </button>

                    <div className="my-1 h-px bg-gray-200" />

                    <button className="flex w-full items-center gap-2 rounded-b-xl px-4 py-2 text-sm text-red-500 hover:bg-red-50" onClick={onClose}>
                        <BiLogOut size={16} />
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
