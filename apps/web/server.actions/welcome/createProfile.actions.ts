"use server";
import prisma from "@/lib/prismaClient";

export async function updateProfileWithEmail(
  email: string,
  profileData: {
    firstName?: string;
    lastName?: string;
    address?: string;
    birthDate?: Date;
    phoneNumber?: string;
    bio?: string;
  },
): Promise<boolean> {
  try {
    await prisma.profile.update({
      where: { userEmail: email },
      data: {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        address: profileData.address,
        birthDate: profileData.birthDate,
        phoneNumber: profileData.phoneNumber,
        bio: profileData.bio,
      },
    });

    return true; // Mise à jour réussie
  } catch (error) {
    console.log("Erreur lors de la mise à jour du profil:", error);
    return false; // En cas d'erreur, retourne false
  }
}

export async function getUserProfile(email: string) {
  try {
    const userProfile = await prisma.profile.findUnique({
      where: { userEmail: email },
      select: {
        firstName: true,
        lastName: true,
        address: true,
        birthDate: true,
        phoneNumber: true,
        bio: true,
      },
    });

    if (!userProfile) {
      throw new Error("Profil non trouvé");
    }

    return userProfile; // Retourne les données du profil
  } catch (error) {
    console.log("Erreur lors de la récupération du profil:", error);
    throw new Error("Impossible de récupérer le profil utilisateur");
  }
}
