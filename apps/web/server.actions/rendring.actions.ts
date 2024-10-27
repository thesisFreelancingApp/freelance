import { createClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkUserProfileStatus() {
  try {
    // Initialisation de Supabase
    const supabase = createClient();

    // Récupération de l'utilisateur authentifié
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user.user?.email) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }

    const email = user.user.email;

    // Requête pour récupérer l'utilisateur et ses relations
    const checkUser = await prisma.authUser.findUnique({
      where: { email: email },
      include: {
        profile: {
          include: {
            seller: { include: { professionalProfile: true } },
            buyer: { include: { professionalProfile: true } },
          },
        },
      },
    });

    if (!checkUser) {
      throw new Error("Utilisateur non trouvé");
    }

    // Initialisation des informations de retour
    const status = {
      role: checkUser.role,
      isSeller: !!checkUser.profile?.seller,
      isBuyer: !!checkUser.profile?.buyer,
      personalIsCompleted: false,
      professionalIsCompleted: false,
    };

    // Vérification de la complétion du profil personnel
    if (checkUser.profile) {
      status.personalIsCompleted = !!(
        checkUser.profile.firstName &&
        checkUser.profile.lastName &&
        checkUser.profile.profilePic &&
        checkUser.profile.bio &&
        checkUser.profile.birthDate &&
        checkUser.profile.phoneNumber &&
        checkUser.profile.address
      );
    }

    // Vérification de la complétion du profil professionnel pour Seller
    if (status.isSeller && checkUser.profile?.seller?.professionalProfile) {
      const profProfile = checkUser.profile.seller.professionalProfile;
      status.professionalIsCompleted = !!(
        profProfile.personalWebsite &&
        profProfile.occupations &&
        profProfile.companyName &&
        profProfile.type &&
        profProfile.sector &&
        profProfile.profession &&
        profProfile.experienceYears &&
        profProfile.skills &&
        profProfile.language &&
        profProfile.timeZone
      );
    }
    // Vérification de la complétion du profil professionnel pour Buyer
    else if (status.isBuyer && checkUser.profile?.buyer?.professionalProfile) {
      const profProfile = checkUser.profile.buyer.professionalProfile;
      status.professionalIsCompleted = !!(
        profProfile.personalWebsite &&
        profProfile.occupations &&
        profProfile.companyName &&
        profProfile.type &&
        profProfile.sector &&
        profProfile.profession &&
        profProfile.experienceYears &&
        profProfile.skills &&
        profProfile.language &&
        profProfile.timeZone
      );
    }

    return status;
  } catch (err) {
    console.error("Erreur dans checkUserProfileStatus:", err);
    throw err;
  }
}
