"use server";

import prisma from "@/lib/prismaClient";
import { Prisma } from "@prisma/client";

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

export const getServicesByCategory = async (
  categoryId: number,
  page: number = 1,
  sort?: string,
  priceRange?: string,
) => {
  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  // Define sorting logic
  const orderBy: Prisma.ServiceOrderByWithRelationInput =
    sort === "rating_desc"
      ? { creator: { sellerRating: "desc" } }
      : { createdAt: "desc" };

  // Define price filter if priceRange is provided
  const priceFilter: Prisma.ServiceWhereInput = priceRange
    ? {
        packages: {
          some: {
            price: {
              gte: new Prisma.Decimal(priceRange.split("-")[0] || 0),
              lte: new Prisma.Decimal(
                priceRange.split("-")[1] || Number.MAX_SAFE_INTEGER,
              ),
            },
          },
        },
      }
    : {};

  // Fetch services and total count concurrently
  const [services, totalCount] = await Promise.all([
    prisma.service.findMany({
      where: { categoryId, ...priceFilter },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePic: true,
            sellerRating: true,
          },
        },
        packages: {
          orderBy: { price: "asc" },
        },
      },
      orderBy,
      skip,
      take: pageSize,
    }),
    prisma.service.count({ where: { categoryId, ...priceFilter } }),
  ]);

  // Handle sorting by price if requested
  const sortedServices = sort?.includes("price")
    ? services.sort((a, b) =>
        sort === "price_asc"
          ? a.packages[0]?.price.comparedTo(b.packages[0]?.price)
          : b.packages[0]?.price.comparedTo(a.packages[0]?.price),
      )
    : services;

  // Convert Decimal prices to strings for serialization
  const serializedServices = sortedServices.map((service) => ({
    ...service,
    packages: service.packages.map((pkg) => ({
      ...pkg,
      price: pkg.price.toString(),
    })),
  }));

  return {
    services: serializedServices,
    totalPages: Math.ceil(totalCount / pageSize),
  };
};

// Récupérer une catégorie par ID
