"use client";

// Google OAuth Redirect Component - Handles user authentication or registration after Google OAuth

import axiosInstance from "@/axiosInstance";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const GoogleRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        // Function to handle OAuth response and authenticate/register user
        const handleOAuthResponse = async () => {
            try {
                // Retrieve OAuth session
                const { data: sessionData, error } =
                    await supabase.auth.getSession();

                if (error || !sessionData.session) {
                    console.error("Error retrieving session:", error);
                    return;
                }

                const user = sessionData.session.user;
                if (user && user.email) {
                    console.log("User info:", user);

                    // Check if the user exists via your API
                    const { data } = await axiosInstance.post(
                        "/auth/check-user",
                        {
                            email: user.email,
                        },
                    );

                    if (data.exists) {
                        // User exists, log in the user
                        const loggedInUser = await axiosInstance.post(
                            "/auth/login",
                            {
                                email: user.email,
                                googleId: user.id,
                                providerId: user.id,
                                avatarUrl: user.user_metadata.avatar_url,
                            },
                        );

                        console.log("loggedInUser", loggedInUser);
                        // Redirect to dashboard after login
                        router.push(`/hello?user=${loggedInUser.data.data}`);
                    } else {
                        // User does not exist, register the user
                        const registeredUser = await axiosInstance.post(
                            "/auth/registerGoogle",
                            {
                                email: user.email,
                                fullName: user.user_metadata.full_name,
                                avatarUrl: user.user_metadata.avatar_url,
                                providerId: user.id,
                                googleId: user.id,
                                provider: user.app_metadata.provider,
                                emailVerified:
                                    user.user_metadata.email_verified,
                                role: user.role,
                            },
                        );

                        console.log("registered", registeredUser);
                        // Redirect to dashboard after registration
                        router.push(
                            `/hello?user=${registeredUser.data.user.id}`,
                        );
                    }
                }
            } catch (error) {
                console.error("Error in OAuth flow:", error);
            }
        };

        handleOAuthResponse();
    }, [router]);

    return (
        <div>
            <h1>Authenticating with Google...</h1>
        </div>
    );
};

export default GoogleRedirect;
