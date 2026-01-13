import axiosInstance from "./axios.config";

interface menuItem {
    menuItemId: string;
    quantity: number;
}

export async function placeOrder({ menuItemId, quantity }: menuItem): Promise<boolean> {
    try {
        const response = await axiosInstance.post('/orders', {
            orderItems: [{ menuItemId, quantity }]
        });
        return response.status === 201;
    } catch (error) {
        console.error(error);
    }
    return false;
}

export async function getUserOrders(): Promise<any[]> {
    try {
        const response = await axiosInstance.get('/orders/my-orders');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
    return [];
}

export async function getAllOrders(): Promise<any[]> {
    try {
        const response = await axiosInstance.get('/orders');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
    return [];
}