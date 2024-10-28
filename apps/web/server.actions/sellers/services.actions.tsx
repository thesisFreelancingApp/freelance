"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
// Définition des types pour les paramètres
import { Packages, ServiceData } from "@/types";

export async function createServiceWithCategoryAndPackage(
  serviceData: ServiceData,
  categoryId: number,
  packageData: Packages[], // Acceptation de plusieurs packages sous forme de tableau
) {
  try {
    const {
      data: { user },
      error,
    } = await createClient().auth.getUser();
    if (error || !user?.email) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return false;
    }

    const sellerId = user.id as string; // Typage explicitement défini
    const newService = await prisma.service.create({
      data: {
        name: serviceData.name,
        description: serviceData.description,
        medias: JSON.parse(JSON.stringify(serviceData.medias)),

        tags: serviceData.tags,
        creatorId: sellerId,
        categoryId: categoryId,

        // Création de packages associés
        packages: {
          create: packageData.map((pkg) => ({
            name: pkg.name,
            description: pkg.description,
            price: pkg.price,
            deliveryTime: pkg.deliveryTime,
            revisions: pkg.revisions,
            features: pkg.features,
          })),
        },
      },
      include: {
        category: true,
        packages: true,
      },
    });

    console.log("Service créé avec succès :", newService);
    return newService;
  } catch (error) {
    console.error("Erreur lors de la création du service :", error);
  }
}
