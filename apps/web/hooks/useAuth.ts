"use client";

// Authentication service: You can create a separate service for handling auth logic
import { useCallback, useState } from "react";

// useAuth hook
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Authenticate user with token
    const authenticate = useCallback(
        async (accessToken: string, refreshToken: string | null) => {
            try {
                // Simulating authentication process (you can add your API calls here)
                // For example, you can store the token in localStorage or perform other auth logic
                localStorage.setItem("accessToken", accessToken);
                if (refreshToken) {
                    localStorage.setItem("refreshToken", refreshToken);
                }
                setIsAuthenticated(true);
            } catch (err) {
                setError("Failed to authenticate");
                console.error("Authentication error:", err);
            }
        },
        [],
    );

    // Logout function
    const logout = useCallback(() => {
        // Remove tokens and reset state
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
    }, []);

    return { isAuthenticated, error, authenticate, logout };
};
