'use client';

import { BiCheck } from "react-icons/bi";

interface SuccessToastProps {
    message: string;
}

export default function SuccessToast({
    message,
}: SuccessToastProps) {
    return (
        <div>
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 aspect-square items-center justify-center rounded-full bg-green-600">
                    <BiCheck size={18} className="text-white" />
                </div>

                <p className="text-base font-medium text-[#1F3D2B]">
                    {message}
                </p>
            </div>
        </div>
    );
}
