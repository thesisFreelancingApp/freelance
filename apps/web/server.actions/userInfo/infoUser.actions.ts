import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ProfileStatus = {
  seller: boolean;
  buyer: boolean;
  wallet: boolean;
  isComplete: boolean;
};

export default async function getProfileCompletionStatus(): Promise<ProfileStatus | null> {
  const supabase = createClient();
  const { data: user, error } = await supabase.auth.getUser();
  if (error || !user.user?.id) {
    console.log("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }

  try {
    // Récupérer le profil personnel associé à l'utilisateur
    const personalProfile = await prisma.authUser.findUnique({
      where: { id: user.user.id },
      include: {
        profile: {
          include: {
            seller: true,
            buyer: true,
            wallet: true,
          },
        },
      },
    });

    // Vérifier si le profil personnel est associé
    if (!personalProfile || !personalProfile.profile) {
      return {
        seller: false,
        buyer: false,
        wallet: false,
        isComplete: false,
      };
    }

    const { seller, buyer, wallet } = personalProfile.profile;

    // Définir le statut de chaque élément avec le type ProfileStatus
    const status: ProfileStatus = {
      seller: Boolean(seller),
      buyer: Boolean(buyer),
      wallet: Boolean(wallet),
      isComplete: Boolean(seller && buyer && wallet),
    };

    return status;
  } catch (error) {
    console.error("Erreur lors de la vérification du profil:", error);
    return {
      seller: false,
      buyer: false,
      wallet: false,
      isComplete: false,
    };
  }
}
