"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

export async function updateProfileWithEmail(profileData: {
  firstName?: string;
  lastName?: string;
  address?: string;
  birthDate?: Date;
  phoneNumber?: string;
  bio?: string;
}): Promise<boolean> {
  try {
    // Initialiser le client Supabase
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user.user?.email) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return false;
    }

    const email = user.user.email;

    // Mise à jour du profil dans la table PersonalProfile
    await prisma.personalProfile.update({
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
    const userProfile = await prisma.personalProfile.findUnique({
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
