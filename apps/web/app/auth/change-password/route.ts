// Update User API - Updates user's password and verification status using email or ID

import prismaConnection from "@/prisma/prismaClient";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        // Parse the request body to extract userId, email, and password
        const {
            userId,
            email,
            password,
        }: { userId?: string; email?: string; password?: string } =
            await req.json();

        // Ensure either email or userId is provided
        if (!email && !userId) {
            return NextResponse.json(
                { error: "Email or User ID is required." },
                { status: 400 },
            );
        }

        // Find the user using either email or userId
        const user = await prismaConnection.user.findUnique({
            where: email ? { email } : { id: userId! }, // Prioritize email, otherwise use userId
        });

        // If user is not found, return an error
        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 },
            );
        }

        // Prepare updated data with emailVerified set to true
        const updatedData: { emailVerified: boolean; password?: string } = {
            emailVerified: true,
        };

        // If password is provided, hash it and add it to the update data
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updatedData.password = hashedPassword;
        }

        // Update the user in the database
        const updatedUser = await prismaConnection.user.update({
            where: email ? { email } : { id: user.id }, // Update by email or ID
            data: updatedData,
        });

        // Return success response with updated user data
        return NextResponse.json({
            message: "User information updated successfully.",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating user information:", error);
        return NextResponse.json(
            { error: "An error occurred while updating user information." },
            { status: 500 },
        );
    }
}
