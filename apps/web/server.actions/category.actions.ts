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
