"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

/**
 * Vérifie si l'utilisateur actuellement connecté est Buyer, Seller, ou aucun des deux.
 * @returns Un objet indiquant si l'utilisateur est Buyer, Seller, ou aucun des deux, ou false en cas d'erreur.
 */
export async function checkUserType() {
  try {
    // Initialiser le client Supabase et récupérer l'utilisateur
    const {
      data: { user },
      error,
    } = await createClient().auth.getUser();

    if (error || !user?.email) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return false;
    }

    // Récupérer le profil de l'utilisateur via Prisma
    const profile = await prisma.personalProfile.findUnique({
      where: { userEmail: user.email },
      include: { buyer: true, seller: true },
    });

    if (!profile) {
      console.error("Profil utilisateur non trouvé pour:", user.email);
      return { isBuyer: false, isSeller: false };
    }

    // Retourner les rôles de l'utilisateur
    return {
      isBuyer: Boolean(profile.buyer),
      isSeller: Boolean(profile.seller),
    };
  } catch (error) {
    console.error(
      "Erreur lors de la vérification du rôle de l'utilisateur:",
      error,
    );
    return false;
  }
}
