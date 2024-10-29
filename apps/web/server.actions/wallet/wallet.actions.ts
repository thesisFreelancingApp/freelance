"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

// Définition de l'action serveur pour créer un wallet
export async function createWallet() {
  try {
    const {
      data: { user },
      error,
    } = await createClient().auth.getUser();
    if (error || !user?.email) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return false;
    }

    const userId = user.id as string;
    const newWallet = await prisma.wallet.create({
      data: {
        owner: { connect: { id: userId } },
        balance: 0.0,
        currency: "TND",
      },
    });

    // Convert Decimal fields to number before returning
    return {
      ...newWallet,
      balance: newWallet.balance.toNumber(),
    };
  } catch (error) {
    console.error("Erreur lors de la création du wallet:", error);
    throw new Error("Erreur lors de la création du wallet");
  }
}

// Définition de l'action serveur pour vérifier l'existence d'un wallet
export async function checkWallet() {
  try {
    const {
      data: { user },
      error,
    } = await createClient().auth.getUser();
    if (error || !user?.id) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return false;
    }

    const userId = user.id as string;
    const existingWallet = await prisma.wallet.findUnique({
      where: { ownerId: userId },
    });

    // Check if wallet exists before accessing properties
    if (existingWallet) {
      return {
        ...existingWallet,
        balance: existingWallet.balance.toNumber(),
      };
    } else {
      return null; // or any response you prefer when the wallet doesn't exist
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du wallet:", error);
    throw new Error("Erreur lors de la vérification du wallet");
  }
}
