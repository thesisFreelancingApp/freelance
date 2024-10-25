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
}

export async function getUserProfile(): Promise<UserProfile | null> {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();
  if (error || !user.user?.email) {
    console.log("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }

  const email = user.user.email;

  try {
    const userProfile = await prisma.personalProfile.findUnique({
      where: { userEmail: email },
      include: {
        authUser: true,
      },
    });

    if (!userProfile) {
      throw new Error("Profil non trouvé");
    }

    return userProfile;
  } catch (error) {
    console.log("Erreur lors de la récupération du profil:", error);
    throw new Error("Impossible de récupérer le profil utilisateur");
  }
}

export async function updateUserProfile(data: UserProfile) {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();

    if (error || !user.user?.email) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw new Error("Utilisateur non authentifié");
    }

    const email = user.user.email;
    const { userEmail, ...profileData } = data;
    const cleanProfileData = Object.fromEntries(
      Object.entries(profileData).filter(([_, v]) => v !== undefined),
    );

    const updatedProfile = await prisma.personalProfile.update({
      where: { userEmail: email },
      data: {
        ...cleanProfileData,
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
    revalidatePath(`/profile`);
    return updatedProfile;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    throw new Error("Impossible de mettre à jour le profil utilisateur");
  }
}

export async function getUserProfileByUsername(username: string): Promise<UserProfile | null> {
  try {
    const userProfile = await prisma.personalProfile.findFirst({
      where: {
        authUser: {
          username: username,
        },
      },
      include: {
        authUser: true, // Include authUser to access its fields if needed
      },
    });
    return userProfile || null;
  } catch (error) {
    console.error("Error fetching user profile by username:", error);
    return null;
  }
}
  
