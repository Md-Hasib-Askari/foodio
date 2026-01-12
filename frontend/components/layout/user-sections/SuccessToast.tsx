'use client';

import { BiCheck } from "react-icons/bi";

interface SuccessToastProps {
    message: string;
    visible: boolean;
}

export default function SuccessToast({
    message,
    visible,
}: SuccessToastProps) {
    if (!visible) return null;

    return (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
            <div className="flex items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
                    <BiCheck size={18} className="text-white" />
                </div>

                <p className="text-base font-medium text-[#1F3D2B]">
                    {message}
                </p>
            </div>
        </div>
    );
}
