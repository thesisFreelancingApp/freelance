"use server";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { Prisma } from "@prisma/client";
// Définition des types pour les paramètres
interface ServiceData {
  name: string;
  description?: string;
  images: string[];
  tags: string[];
}

interface PackageData {
  name: string;
  description: string;
  price: Prisma.Decimal;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

// Modification pour accepter plusieurs packages
export async function createServiceWithCategoryAndPackage(
  serviceData: ServiceData,
  categoryId: number,
  packageData: PackageData[],
) {
  try {
    const {
      data: { user },
      error,
    } = await createClient().auth.getUser();
    if (error || !user?.email) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return false;
    }
    const sellerid = user?.id as string;
    const newService = await prisma.service.create({
      data: {
        name: serviceData.name,
        description: serviceData.description,
        images: serviceData.images,
        tags: serviceData.tags,
        creatorId: sellerid,
        categoryId: categoryId,

        // Création de plusieurs packages associés
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
