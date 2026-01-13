import axiosInstance from "./axios.config";

export const fetchCategories = async () => {
    try {
        const response = await axiosInstance.get("/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const fetchTopCategories = async (): Promise<any[]> => {
    try {
        const response = await axiosInstance.get("/categories/top-categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories with items:", error);
        throw error;
    }

}

export const createCategory = async (name: string) => {
    try {
        const response = await axiosInstance.post("/categories", { name });
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
}

export const updateCategory = async (categoryId: string, name: string) => {
    try {
        const response = await axiosInstance.patch(`/categories/${categoryId}`, { name });
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
}

export const deleteCategory = async (categoryId: string) => {
    try {
        const response = await axiosInstance.delete(`/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
}