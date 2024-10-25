"use server";
import prisma from "@/lib/prismaClient";
export async function getUserProfile() {
  // Initialize Supabase client

  const username = "user2aa6888e-3309-4f6d-8bfe-9e9da004ce6a";

  try {
    const userProfile = await prisma.profile.findUnique({
      where: { username: username },
      select: {
        firstName: true,
        lastName: true,
        address: true,
        birthDate: true,
        phoneNumber: true,
        username: true,
        userEmail: true,
        bio: true,
      },
    });

    if (!userProfile) {
      throw new Error("Profil non trouvé");
    }

    return userProfile; // Return profile data
  } catch (error) {
    console.log("Erreur lors de la récupération du profil:", error);
    throw new Error("Impossible de récupérer le profil utilisateur");
  }
}
