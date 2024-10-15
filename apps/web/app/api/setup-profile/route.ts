import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient"; // Adjust the path to your Prisma instance

export async function POST(req: Request) {
  const {
    id,
    first_name,
    last_name,
    display_name,
    phone,
    username,
    bio,
    is_buyer,
    is_seller,
  } = await req.json(); // Extract username from the request body

  if (
    !id || // TODO: UPDATE THIS AS SOON AS POSSIBLE TO USE UR SESSION USER ID, AND CAREFULLY CHECK IT
    !first_name ||
    !last_name ||
    !display_name ||
    !phone ||
    !username ||
    !bio ||
    typeof is_seller !== "boolean" ||
    typeof is_buyer !== "boolean"
  ) {
    return NextResponse.json(
      { message: "Missing 1 or more fields" },
      { status: 400 }
    );
  }

  // Check if the username already exists
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    // Username already exists
    return NextResponse.json(
      { message: "Username already exists" },
      { status: 403 }
    );
  }

  // If it doesn't exist, update the username of the user
  try {
    // Assuming you have a way to identify which user to update
    const updateProfile = await prisma.user.update({
      where: { id: id }, // Replace with actual user id
      data: {
        username,
        first_name,
        last_name,
        display_name,
        phone_number: phone,
        bio,
        is_buyer,
        is_seller,
        updated_at: new Date(), // Update the timestamp
      },
    });

    // Return a success response with the updated user info
    return NextResponse.json(
      { message: "Profile updated successfully", user: updateProfile },
      { status: 200 }
    );
  } catch (error) {
    // Handle any errors during user update
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
