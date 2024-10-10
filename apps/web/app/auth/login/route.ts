// User Login API - Handles login logic using Google ID

import { NextResponse } from "next/server";
import prismaConnection from "../../../prisma/prismaClient";

export async function POST(request: Request) {
    // Parse the incoming request body
    const body: {
        email: string;
        googleId: string;
        avatarUrl: string;
    } = await request.json();

    const { email, googleId, avatarUrl } = body;

    // Check if email and Google ID are provided
    if (!email || !googleId) {
        return NextResponse.json(
            { error: "Email and Google ID are required" },
            { status: 400 },
        );
    }

    try {
        // Check if the user exists in the database
        const user = await prismaConnection.user.findUnique({
            where: {
                email: email,
            },
        });

        // If user exists, return success response
        if (user) {
            return NextResponse.json({
                message: "User logged in successfully",
                data: user.id,
            });
        } else {
            // If user is not found, return error response
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        }
    } catch (error) {
        // Handle any server errors
        console.error("Error during login:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
