"use client";

// Email Verification Component - Allows users to verify their email and change their password

import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// Initialize Supabase Client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
);

export default function VerifyEmail() {
    // Retrieve email from query parameters
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const tempPassword = "temp_Password";

    // State variables for handling UI and form input
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordUpdated, setPasswordUpdated] = useState(false);

    // Login with the temporary password when email is provided
    useEffect(() => {
        if (email) {
            handleLoginWithTempPassword(email, tempPassword);
        }
    }, [email]);

    // Function to handle login using a temporary password
    const handleLoginWithTempPassword = async (
        email: string,
        password: string,
    ) => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                setMessage("Failed to login with temp password.");
                console.error("Error logging in:", error);
            } else {
                setMessage(
                    "Logged in successfully! You can now change your password.",
                );
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setMessage("Failed to log in.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle password change
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match! Please try again.");
            return;
        }

        setLoading(true);
        try {
            // Update password with Supabase
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });
            if (error) {
                setMessage("Failed to update password with Supabase.");
                console.error("Error updating password:", error);
            } else {
                // Make a PUT request to update password in the backend
                const response = await axios.put("/api/auth/change-password", {
                    newPassword: newPassword,
                });

                if (response.status === 200) {
                    setMessage("Password updated successfully!");
                    setPasswordUpdated(true);
                } else {
                    setMessage("Failed to update password via API.");
                    console.error("Error in PUT request:", response.data);
                }
            }
        } catch (error) {
            console.error("Error updating password:", error);
            setMessage("Failed to update password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-[350px] mx-auto mt-10">
            <CardHeader>
                <CardTitle>Email Verification</CardTitle>
                <CardDescription>
                    Verify your email and set a new password
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center">
                        <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                ) : (
                    <>
                        {message && (
                            <Alert className="mb-4">
                                <AlertTitle>Status</AlertTitle>
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        )}
                        {message && !passwordUpdated && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">
                                        New Password
                                    </Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        placeholder="Enter your new password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        placeholder="Confirm your new password"
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
            {message && !passwordUpdated && !loading && (
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={handleChangePassword}
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                                {/* Loading Icon */}
                                Changing Password...
                            </div>
                        ) : (
                            "Change Password"
                        )}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
