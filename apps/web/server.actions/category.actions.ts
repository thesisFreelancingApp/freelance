"use server";

import prisma from "@/lib/prismaClient";

// Récupérer une catégorie par ID
export const getCategoryById = async (id: number) => {
  const category = await prisma.categoryHierarchy.findUnique({
    where: { id },
    include: { children: true },
  });
  return category;
};

// Créer une nouvelle catégorie
export const createCategory = async (data: { name: string; level: number }) => {
  const category = await prisma.categoryHierarchy.create({
    data,
  });
  return category;
};

// Mettre à jour une catégorie
export const updateCategory = async (
  id: number,
  data: Partial<{ name: string; description: string }>,
) => {
  const category = await prisma.categoryHierarchy.update({
    where: { id },
    data,
  });
  return category;
};

// Supprimer une catégorie
export const deleteCategory = async (id: number) => {
  const category = await prisma.categoryHierarchy.delete({
    where: { id },
  });
  return category;
};

// Get a category by its name (if needed)
export const searchServices = async (
  query: string,
  categoryId: number | null = null,
) => {
  const services = await prisma.service.findMany({
    where: {
      AND: [
        {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        categoryId ? { categoryId: categoryId } : {},
      ],
    },
    include: { ratings: true, category: true },
  });
  return services;
};

export const getCategories = async () => {
  return prisma.categoryHierarchy.findMany({
    where: { level: 1 },
    include: {
      children: {
        include: {
          children: true,
        },
      },
    },
  });
};

export const getCategoryByName = async (name: string) => {
  return prisma.categoryHierarchy.findFirst({
    where: { name: { equals: name, mode: "insensitive" } },
    include: { parent: true, children: true },
  });
};

export const getServicesByCategory = async (categoryId: number) => {
  return prisma.service.findMany({
    where: { categoryId },
    include: {
      creator: {
        select: {
          firstName: true,
          lastName: true,
          profilePic: true,
          sellerRating: true,
        },
      },
      ratings: true,
      packages: {
        select: { price: true },
        orderBy: { price: "asc" },
        take: 1,
      },
    },
  });
};

// Récupérer une catégorie par ID
