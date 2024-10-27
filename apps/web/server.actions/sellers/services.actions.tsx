import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";

// Définition des types pour les paramètres
interface ServiceData {
  name: string;
  description?: string;
  images: string[];
  tags: string[];
  creatorId: string;
}

interface PackageData {
  name: string;
  description: string;
  price: Prisma.Decimal;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

export async function createServiceWithCategoryAndPackage(
  serviceData: ServiceData,
  categoryId: number,
  packageData: PackageData,
) {
  try {
    const newService = await prisma.service.create({
      data: {
        name: serviceData.name,
        description: serviceData.description,
        images: serviceData.images,
        tags: serviceData.tags,
        creatorId: serviceData.creatorId,
        categoryId: categoryId,

        // Création du package associé
        packages: {
          create: {
            name: packageData.name,
            description: packageData.description,
            price: packageData.price,
            deliveryTime: packageData.deliveryTime,
            revisions: packageData.revisions,
            features: packageData.features,
          },
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
