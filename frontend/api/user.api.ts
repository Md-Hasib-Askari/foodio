import { AuthUser } from "@/types/auth";

export const getUserProfile = async (): Promise<AuthUser | undefined> => {
    try {
        // Placeholder function to simulate fetching user profile
        return {
            id: "123",
            email: "abc@gmail.com",
            role: "ADMIN" as const,
            isAdmin: true
        };
    } catch (error) {
        console.error(error);
    }
}

export const loginAPI = async (email: string, password: string): Promise<AuthUser | undefined> => {
    try {
        // Placeholder function to simulate user login
        // return;
        return {
            id: "123",
            email,
            role: "ADMIN" as const,
            isAdmin: true
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