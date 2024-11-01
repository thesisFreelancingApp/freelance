"use server";
import prisma from "@/lib/prismaClient";

export async function getPackageById(packageId: string) {
  try {
    const servicePackage = await prisma.servicePackage.findUnique({
      where: {
        id: packageId,
      },
      include: {
        service: {
          include: {
            creator: true,
          },
        },
      },
    });

    if (!servicePackage) {
      throw new Error("Package not found");
    }

    return servicePackage;
  } catch (error) {
    console.error("Error fetching package by ID:", error);
    throw new Error("Failed to fetch package by ID");
  }
}
