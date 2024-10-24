"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface UserProfile {
  firstName?: string | null;
  lastName?: string | null;
  address?: string | null;
  birthDate?: Date | null;
  phoneNumber?: string | null;
  username?: string | null;
  userEmail?: string | null;
  bio?: string | null;
  profilePic?: string | null; // Ajouté selon le schéma mis à jour
}

// Fonction pour récupérer le profil utilisateur
export async function getUserProfile(): Promise<UserProfile | null> {
  // Initialisation du client Supabase
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();

  if (error || !user?.user?.email) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }

  const email = user.user.email;

  try {
    const userProfile = await prisma.personalProfile.findUnique({
      where: { userEmail: email },
      select: {
        firstName: true,
        lastName: true,
        address: true,
        birthDate: true,
        phoneNumber: true,

        userEmail: true,
        bio: true,
        profilePic: true, // Sélectionne les nouveaux champs du schéma mis à jour
      },
    });

    if (!userProfile) {
      throw new Error("Profil non trouvé");
    }

    return userProfile;
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    throw new Error("Impossible de récupérer le profil utilisateur");
  }
}

// Fonction pour mettre à jour le profil utilisateur
export async function updateUserProfile(data: UserProfile) {
  try {
    // Initialisation du client Supabase
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user?.user?.email) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw new Error("Utilisateur non authentifié");
    }

    const email = user.user.email;

    // Exclure le champ `userEmail` des données soumises car il ne doit pas être modifié
    const { userEmail, ...profileData } = data;

    // Nettoyer les données en supprimant les champs indéfinis avant la mise à jour
    const cleanProfileData = Object.fromEntries(
      Object.entries(profileData).filter(
        ([_, v]) => v !== undefined && v !== null,
      ),
    );

    // Mise à jour du profil utilisateur dans la base de données via Prisma
    const updatedProfile = await prisma.personalProfile.update({
      where: { userEmail: email },
      data: {
        ...cleanProfileData, // Mise à jour des champs fournis (firstName, lastName, etc.)
      },
      select: {
        firstName: true,
        lastName: true,
        address: true,
        birthDate: true,
        phoneNumber: true,
        bio: true,
        profilePic: true, // Ajout du champ profilePic
      },
    });

    // Revalidation du cache de la page de profil
    revalidatePath(`/profile`);
    return updatedProfile;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    throw new Error("Impossible de mettre à jour le profil utilisateur");
  }
}
