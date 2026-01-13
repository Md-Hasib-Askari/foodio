import axiosInstance from "./axios.config";

export async function fetchMenuItems(categoryId: string) {
    try {
        const response = await axiosInstance.get(`/menu-items/category/${categoryId}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching menu items:", error);
        throw error;
    }
}