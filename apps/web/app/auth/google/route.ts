// Google OAuth API - Handles Google OAuth authentication flow

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const domaine = process.env.NEXT_PUBLIC_DOMAINE as string;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST() {
    try {
        // Start the OAuth process with Google
        const { data: signInData, error: signInError } =
            await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${domaine}/redirect/google`, // Redirect URL after authentication
                },
            });

        // Check if there is an error during sign-in
        if (signInError) throw new Error(signInError.message);

        // Get the authenticated user after sign-in
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // Return the URL to redirect the user for Google authentication
        return NextResponse.json({ url: signInData.url });
    } catch (error) {
        // Handle any errors during the OAuth process
        console.error("Error during Google OAuth:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 400 },
        );
    }
}
