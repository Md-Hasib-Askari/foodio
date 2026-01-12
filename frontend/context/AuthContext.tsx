'use client';

import { getUserProfile, loginAPI, logoutAPI } from "@/api/user.api";
import { AuthUser } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const isAuthenticated = !!user;

    // Fetch user profile 
    useEffect(() => {
        (async () => {
            const user = await getUserProfile();
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        })();
    }, []);

    const login = async (email: string, password: string) => {
        const user = await loginAPI(email, password);
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    }

    const logout = async () => {
        await logoutAPI();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
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