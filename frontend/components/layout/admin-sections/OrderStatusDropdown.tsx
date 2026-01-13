'use client';

import { ORDER_STATUS } from '@/constants/order-status.enum';
import { useState } from 'react';
import { BiCheck, BiChevronDown } from 'react-icons/bi';
import { Order } from './OrdersTable';
import { updateOrderStatus } from '@/api/order.api';
import { toast } from 'react-toastify';

const STATUSES = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.PREPARING,
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.READY,
];

interface OrderStatusDropdownProps {
    order: Order;
}

export default function OrderStatusDropdown({ order }: OrderStatusDropdownProps) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<string>(order.status);

    const handleStatusChange = async (newStatus: string) => {
        try {
            const success = await updateOrderStatus(order.orderId, newStatus);
            if (success) {
                setStatus(newStatus);
                toast.success('Order status updated successfully');
            } else {
                toast.error('Failed to update order status');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while updating order status');
        } finally {
            setOpen(false);
        }
    }

    return (
        <div className="relative inline-block text-left w-30">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
            >
                {status}
                <BiChevronDown size={16} />
            </button>

            {open && (
                <div className="absolute left-0 z-50 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-lg">
                    {STATUSES.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                handleStatusChange(item);
                            }}
                            className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            <span>{item}</span>
                            {status === item && <BiCheck size={16} />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
