'use client';

import { getUserProfile, loginAPI, logoutAPI } from "@/api/user.api";
import { AuthUser } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<AuthUser>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const isAuthenticated = !!user;

    // Fetch user profile 
    useEffect(() => {
        (async () => {
            try {
                const user = await getUserProfile();
                setUser(user ?? null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = async (email: string, password: string) => {
        const user = await loginAPI(email, password);
        setUser(user ?? null);

        if (!user) {
            throw new Error("Login failed");
        }

        return user;
    }

    const logout = async () => {
        await logoutAPI();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}