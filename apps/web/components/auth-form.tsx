"use client";

import axiosInstance from "@/axiosInstance";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { FaGoogle, FaSpinner } from "react-icons/fa";
const domaine = process.env.NEXT_PUBLIC_DOMAINE;

export default function AuthForm() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginView, setIsLoginView] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleAuth = async (authType: "google" | "email") => {
        setLoading(true);
        setErrorMessage("");

        try {
            const { data } = await axiosInstance.post(
                `${domaine}/auth/${authType}`,
                {
                    email,
                    password: authType === "email" ? password : undefined,
                    action: isLoginView ? "login" : "register",
                },
            );

            if (data.url) {
                window.location.href = data.url;
            } else if (data.message && !isLoginView) {
                setIsRegistered(true);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(
                    error.response?.data?.error || "Une erreur est survenue.",
                );
            } else if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Une erreur inconnue est survenue.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (isRegistered) {
        return (
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-center text-green-600">
                        Inscription réussie !
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-center">
                        Vérifiez votre email pour confirmer votre inscription et
                        vous connecter.
                    </CardDescription>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>
                    {isLoginView ? "Connexion" : "Inscription"}
                </CardTitle>
                <CardDescription>
                    {isLoginView
                        ? "Connectez-vous à votre compte"
                        : "Créez un nouveau compte"}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {errorMessage && (
                    <Alert variant="destructive">
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
                {!isLoginView && (
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleAuth("google")}
                        disabled={loading}
                    >
                        {loading ? (
                            <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <FaGoogle className="w-4 h-4 mr-2" />
                        )}
                        S'inscrire avec Google
                    </Button>
                )}
                {!isLoginView && (
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="px-2 bg-background text-muted-foreground">
                                Ou
                            </span>
                        </div>
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {isLoginView && (
                    <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                )}
                <Button
                    className="w-full bg-primary"
                    onClick={() => handleAuth("email")}
                    disabled={loading || !email || (isLoginView && !password)}
                >
                    {loading && (
                        <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    {isLoginView ? "Se connecter" : "S'inscrire avec Email"}
                </Button>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-center text-muted-foreground">
                    {isLoginView ? "Pas de compte ?" : "Déjà un compte ?"}{" "}
                    <Button
                        variant="link"
                        className="p-0"
                        onClick={() => setIsLoginView(!isLoginView)}
                    >
                        {isLoginView ? "S'inscrire" : "Se connecter"}
                    </Button>
                </p>
            </CardFooter>
        </Card>
    );
}
