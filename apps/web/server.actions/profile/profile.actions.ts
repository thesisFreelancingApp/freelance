"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

interface UserProfile {
  firstName?: string | null;
  lastName?: string | null;
  address?: string | null;
  birthDate?: Date | null;
  phoneNumber?: string | null;
  username?: string | null;
  userEmail?: string | null;
  bio?: string | null;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  // Initialize Supabase client
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();
  if (error || !user.user?.email) {
    console.log("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }

  const email = user.user.email;

  try {
    const userProfile = await prisma.profile.findUnique({
      where: { userEmail: email },
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

export async function updateUserProfile(data: UserProfile) {
  try {
    // Initialiser le client Supabase
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user.user?.email) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw new Error("Utilisateur non authentifié");
    }

    const email = user.user.email;

    // Exclure `userEmail` de `data` car il ne doit pas être modifié
    const { userEmail, ...profileData } = data;

    // Filtrer les champs non définis avant l'update
    const cleanProfileData = Object.fromEntries(
      Object.entries(profileData).filter(([_, v]) => v !== undefined),
    );

    // Mise à jour du profil utilisateur dans la base de données avec Prisma
    const updatedProfile = await prisma.profile.update({
      where: { userEmail: email }, // Utiliser l'email de l'utilisateur authentifié pour la mise à jour
      data: {
        ...cleanProfileData, // Propager les autres champs (firstName, lastName, etc.)
      },
      select: {
        firstName: true,
        lastName: true,
        address: true,
        birthDate: true,
        phoneNumber: true,
        bio: true,
      },
    });

    return updatedProfile; // Retourner les données mises à jour du profil
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    throw new Error("Impossible de mettre à jour le profil utilisateur");
  }
}
