"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { ProfessionalProfile } from "@prisma/client";

interface UserProfile {
  firstName?: string | null;
  lastName?: string | null;
  address?: string | null;
  birthDate?: Date | null;
  phoneNumber?: string | null;
  username?: string | null;
  userEmail?: string | null;
  bio?: string | null;
  professionalProfile?: ProfessionalProfile | null;
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

export async function getUserProfileByUsername(
  username: string,
): Promise<UserProfile | null> {
  try {
    const userProfile = await prisma.authUser.findUnique({
      where: {
        username: username,
      },
      include: {
        profile: {
          include: {
            seller: {
              include: {
                professionalProfile: true,
              },
            },
            buyer: {
              include: {
                professionalProfile: true,
              },
            },
          },
        },
      },
    });

    return userProfile;
  } catch (error) {
    console.error("Error fetching user profile by username:", error);
    return null;
  }
}

export async function getAllUserProfile(): Promise<UserProfile[] | null> {
  try {
    const userProfiles = await prisma.authUser.findMany({
      include: {
        profile: {
          include: {
            seller: true,
          },
        },
      },
    });

    // Map each user profile to the UserProfile type
    const mappedUserProfiles: UserProfile[] = userProfiles.map(
      (userProfile) => ({
        firstName: userProfile.profile?.firstName,
        lastName: userProfile.profile?.lastName,
        address: userProfile.profile?.address,
        birthDate: userProfile.profile?.birthDate,
        phoneNumber: userProfile.profile?.phoneNumber,
        username: userProfile.username,
        userEmail: userProfile.email,
        bio: userProfile.profile?.bio,
        rating: userProfile.profile?.seller?.sellerRating,
      }),
    );

    return mappedUserProfiles;
  } catch (error) {
    console.error("Error fetching all user profiles:", error);
    return null;
  }
}
