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
        profilePic: true,
        authUser: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!userProfile) {
      throw new Error("Profil non trouvé");
    }
    return {
      ...userProfile,
      username: userProfile.authUser?.username ?? null,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    throw new Error("Impossible de récupérer le profil utilisateur");
  }
}

// Fonction pour mettre à jour le profil utilisateur
export async function updateUserProfile(data: UserProfile) {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user.user?.email) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw new Error("Utilisateur non authentifié");
    }

    const email = user.user.email;
    const { username, ...profileData } = data;

    // Clean up profile data to exclude undefined or null values
    const cleanProfileData = Object.fromEntries(
      Object.entries(profileData).filter(([, value]) => value != null),
    );

    // Update AuthUser and PersonalProfile within a transaction
    const [updatedAuthUser, updatedProfile] = await prisma.$transaction([
      prisma.authUser.update({
        where: { email },
        data: {
          ...(username != null && { username }), // Only update if username is not null
        },
        select: { username: true },
      }),
      prisma.personalProfile.update({
        where: { userEmail: email },
        data: cleanProfileData,
        select: {
          firstName: true,
          lastName: true,
          address: true,
          birthDate: true,
          phoneNumber: true,
          bio: true,
        },
      }),
    ]);

    // Revalidate the profile path after updating
    revalidatePath(`/profile`);

    return { ...updatedAuthUser, ...updatedProfile };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    throw new Error("Impossible de mettre à jour le profil utilisateur");
  }
}
