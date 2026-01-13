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

export async function fetchAllMenuItems() {
    try {
        const response = await axiosInstance.get('/menu-items');
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Error fetching all menu items:", error);
        throw error;
    }
}

export async function createMenuItem(itemData: any) {
    try {
        const response = await axiosInstance.post('/menu-items', itemData);
        return response.data;
    } catch (error) {
        console.error("Error creating menu item:", error);
        throw error;
    }
}