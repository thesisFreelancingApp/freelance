// User Registration API - Handles new user creation and registration logic

import { NextResponse } from "next/server";
import prismaConnection from "../../../prisma/prismaClient";

export async function POST(request: Request) {
    // Parse the incoming request body
    const body: {
        email: string;
        fullname: string;
        avatarUrl: string;
        providerId: string;
        provider: string;
        emailVerified: boolean;
    } = await request.json();

    const { email, fullname, avatarUrl, providerId, provider, emailVerified } =
        body;

    // Check for required fields
    if (!providerId || !provider) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 },
        );
    }

    try {
        // Create a new user in the database
        const newUser = await prismaConnection.user.create({
            data: {
                email,
                display_name: fullname,
                profile_pic: avatarUrl,
                providerId,
                provider,
                emailVerified,
            },
        });

        // Return success response with new user data
        return NextResponse.json({
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        // Handle unique email constraint error
        if (
            (error as { code: string; meta?: { target: string } }).code ===
                "P2002" &&
            (error as { code: string; meta?: { target: string } }).meta
                ?.target === "User_email_key"
        ) {
            return NextResponse.json(
                { error: "This email is already registered" },
                { status: 409 },
            );
        }

        // Handle general server errors
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
