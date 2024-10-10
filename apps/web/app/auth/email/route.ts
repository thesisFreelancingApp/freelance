// Auth API - Handles user registration and login with Prisma and Supabase

import prismaConnection from "@/prisma/prismaClient";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const domaine = process.env.NEXT_PUBLIC_DOMAINE;

if (!supabaseUrl || !supabaseAnonKey || !domaine) {
    throw new Error("Supabase environment variables are missing.");
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
    try {
        // Parse the request body
        const {
            email,
            password,
            action,
        }: { email: string; password?: string; action: string } =
            await req.json();

        // Validate email input
        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "Valid email is required." },
                { status: 400 },
            );
        }

        // Validate action input
        if (!action || (action !== "register" && action !== "login")) {
            return NextResponse.json(
                { error: "Invalid action. Use 'register' or 'login'." },
                { status: 400 },
            );
        }

        // Handle registration process
        if (action === "register") {
            const tempPassword = password || "temp_Password";

            // Check if the user already exists in Prisma
            const existingUser = await prismaConnection.user.findUnique({
                where: { email },
            });

            if (existingUser) {
                return NextResponse.json(
                    { error: "This email is already registered." },
                    { status: 400 },
                );
            }

            // Create the user in Prisma
            const newUser = await prismaConnection.user.create({
                data: {
                    email,
                    provider: "Email",
                    emailVerified: false,
                },
            });

            // Register the user in Supabase
            const { data, error } = await supabase.auth.signUp({
                email,
                password: tempPassword,
                options: {
                    emailRedirectTo: `${domaine}/redirect/email?email=${newUser.email}`,
                },
            });

            if (error) {
                return NextResponse.json(
                    { error: "Failed to register. Please try again later." },
                    { status: 400 },
                );
            }

            return NextResponse.json({
                message:
                    "Registration successful, a confirmation email has been sent.",
                userId: newUser.id,
            });
        }

        // Handle login process
        if (action === "login") {
            if (!password) {
                return NextResponse.json(
                    { error: "Password is required." },
                    { status: 400 },
                );
            }

            // Check if the user exists in Prisma
            const user = await prismaConnection.user.findUnique({
                where: { email },
            });

            if (!user) {
                return NextResponse.json(
                    { error: "No account found with this email." },
                    { status: 404 },
                );
            }

            // Login the user in Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return NextResponse.json(
                    { error: "Login failed. Please check your credentials." },
                    { status: 400 },
                );
            }

            return NextResponse.json({
                message: "Login successful.",
                session: data.session,
            });
        }
    } catch (error) {
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred.",
            },
            { status: 500 },
        );
    }
}
