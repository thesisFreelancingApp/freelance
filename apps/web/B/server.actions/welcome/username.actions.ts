"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

// Check if the username already exists in the AuthUser model
export async function checkUsername(username: string): Promise<boolean> {
  const user = await prisma.authUser.findUnique({
    where: { username },
  });

  return !user; // Returns true if username is available, false if taken
}

// Update the username of an AuthUser based on the user's email
export async function updateUsernameByEmail(
  newUsername: string,
): Promise<boolean> {
  try {
    // Initialize the Supabase client
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user.user?.email) {
      console.log("Error retrieving user:", error);
      return false;
    }

    const email = user.user.email;

    // Update the username in the AuthUser model
    await prisma.authUser.update({
      where: { email },
      data: { username: newUsername },
    });

    return true; // Update successful
  } catch (error) {
    console.log("Error updating username:", error);
    return false; // Returns false if there's an error
  }
}
