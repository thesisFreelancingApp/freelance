"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
export async function getUserProfile() {
  // Initialize Supabase client
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();
  console.log(user);
  const email = user.user?.email;

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

    return userProfile; // Retourne les données du profil
  } catch (error) {
    console.log("Erreur lors de la récupération du profil:", error);
    throw new Error("Impossible de récupérer le profil utilisateur");
  }
}

export async function updateUserProfile(data: {
  firstName?: string;
  lastName?: string;
  address?: string;
  birthDate?: Date;
  phoneNumber?: string;
  bio?: string;
}) {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase.auth.getUser();
    console.log(user);
    const email = user.user?.email;
    const updatedProfile = await prisma.profile.update({
      where: { userEmail: email },
      data: {
        ...data,
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

    return updatedProfile; // Retourne les données mises à jour du profil
  } catch (error) {
    console.log("Erreur lors de la mise à jour du profil:", error);
    throw new Error("Impossible de mettre à jour le profil utilisateur");
  }
}
