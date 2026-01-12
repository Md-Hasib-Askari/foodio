import { AuthUser } from "@/types/auth";

export const getUserProfile = async (): Promise<AuthUser | undefined> => {
    try {
        // Placeholder function to simulate fetching user profile
        return {
            id: "123",
            email: "abc@gmail.com",
            role: "USER" as const,
        };
    } catch (error) {
        console.error(error);
    }
}

export const loginAPI = async (email: string, password: string): Promise<AuthUser | undefined> => {
    try {
        // Placeholder function to simulate user login
        return {
            id: "123",
            email,
            role: "USER" as const,
        };
    } catch (error) {
        console.error(error);
    }
}

export const logoutAPI = async (): Promise<void> => {
    try {
        return;
    } catch (error) {
        console.error(error);
    }
}