"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AuthForm() {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Handle email input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // Handle Sign In with email
    const handleSignInWithEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post("/api/auth/email-login", {
                email,
            });
            if (response.data.status === "ok") {
                router.push("/dashboard?status=ok");
            } else if (response.data.status === "created") {
                router.push("/dashboard?status=created");
            }
        } catch (err) {
            setError((err as Error).message);
        }
    };

    // Handle Google OAuth
    const handleGoogleAuth = async () => {
        try {
            const response = await axios.post("/api/auth/google-login");
            const { url } = response.data;

            const authWindow = window.open(
                url,
                "authWindow",
                "width=500,height=600",
            );

            if (authWindow) {
                const timer = setInterval(() => {
                    if (authWindow.closed) {
                        clearInterval(timer);
                        router.push("/dashboard?status=ok");
                    }
                }, 500);
            }
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="max-w-md p-8 mx-auto text-black bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-center">
                Welcome to FreelanceHub
            </h2>
            <p className="mb-6 text-center text-gray-600">
                Sign in with your email or Google account
            </p>

            {/* Formulaire pour la connexion par email */}
            <form
                onSubmit={handleSignInWithEmail}
                className="space-y-4"
            >
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                    Continue with Email
                </button>
            </form>

            {/* Bouton pour la connexion Google */}
            <div className="mt-6 text-center">
                <Button
                    onClick={handleGoogleAuth}
                    buttonText="Sign in with Google"
                    color="red"
                />
            </div>

            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
    );
}

// Button Component
interface ButtonProps {
    onClick: () => void;
    buttonText: string;
    color: string;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    buttonText,
    color = "blue",
}) => (
    <button
        className={`px-4 py-2 rounded-lg bg-${color}-600 text-white`}
        onClick={onClick}
    >
        {buttonText}
    </button>
);

// Input Component
interface InputProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, type, value, onChange }) => (
    <div>
        <label className="block text-gray-700">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
    </div>
);
