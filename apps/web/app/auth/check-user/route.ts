// Check User Existence API - Verifies if a user exists by email

import { NextResponse } from "next/server";
import prismaConnection from "../../../prisma/prismaClient";

export async function POST(request: Request) {
    try {
        // Parse the request body
        const { email }: { email: string } = await request.json();

        // Validate that the email is provided
        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 },
            );
        }

        // Check if the user exists in the database
        const user = await prismaConnection.user.findUnique({
            where: {
                email: email,
            },
        });

        // Return the result based on whether the user exists
        return NextResponse.json({ exists: !!user });
    } catch (error) {
        console.error("Error checking user:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
