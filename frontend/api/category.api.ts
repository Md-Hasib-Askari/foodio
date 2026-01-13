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