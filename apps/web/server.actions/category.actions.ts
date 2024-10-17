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
export const searchServices = async (query: string, categoryId: number | null = null) => {
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

export const getCategories = async (takeNum: number|null = null) => {
  const categories = await prisma.categoryHierarchy.findMany({
    where: { level: 1 },  // You can adjust this depending on your structure (e.g., fetch only top-level categories)
    include: {
      children: true,  // Include subcategories in the result
    },
    take: takeNum || undefined,
  });
  return categories;
};

// Récupérer une catégorie par ID

