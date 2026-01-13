import { AuthUser } from "@/types/auth";
import axiosInstance from "./axios.config";

interface RegisterDto {
    email: string;
    password: string;
    fullName: string;
    address: string;
}

export const registerAPI = async (registerDto: RegisterDto): Promise<boolean> => {
    try {
        const response = await axiosInstance.post('/auth/register', registerDto);
        return response.status === 201;
    } catch (error) {
        console.error(error);
    }
    return false;
}

export const verifyUserAPI = async (): Promise<AuthUser | undefined> => {
    try {
        const user = await axiosInstance.get('/auth/verify');
        if (!user || !user.data.success) {
            return undefined;
        }
        return {
            id: user.data.data.userId,
            email: user.data.data.email,
            role: user.data.data.role,
            isAdmin: user.data.data.role === "ADMIN"
        };
    } catch (error) {
        console.error(error);
    }
}


interface LoginDto {
    email: string;
    password: string;
}

export const loginAPI = async (loginDto: LoginDto): Promise<AuthUser | undefined> => {
    const { email, password } = loginDto;
    try {
        const user = await axiosInstance.post('/auth/login', { email, password });
        if (!user || !user.data.success) {
            return undefined;
        }

        const token = user.data.accessToken;
        // Store the token in localStorage or cookies as needed
        localStorage.setItem('authToken', token);

        return {
            id: user.data.data.userId,
            email: email,
            role: user.data.data.role,
            isAdmin: user.data.data.role === "ADMIN"
        };
    } catch (error) {
        console.error(error);
    }
}

export const logoutAPI = async (): Promise<void> => {
    try {
        localStorage.removeItem('authToken');
        return;
    } catch (error) {
        console.error(error);
    }
}