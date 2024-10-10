// Email Verification API - Updates user's emailVerified status

import prismaConnection from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        // Parse the request body to extract userId
        const { userId }: { userId: string } = await req.json();

        // Validate that userId is provided
        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required." },
                { status: 400 },
            );
        }

        // Update the user to set emailVerified to true
        const updatedUser = await prismaConnection.user.update({
            where: {
                id: userId, // Use userId to identify the user
            },
            data: {
                emailVerified: true, // Set emailVerified to true
            },
        });

        // Return success response after update
        return NextResponse.json({
            message: "Email verified successfully.",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error verifying email:", error);
        return NextResponse.json(
            { error: "An error occurred while verifying the email." },
            { status: 500 },
        );
    }
}
