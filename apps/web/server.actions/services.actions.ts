"use server";

import prisma from "@/lib/prismaClient";

// Récupérer un service par ID
export const getServiceById = async (id: number) => {
  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      ratings: {
        include: {
          buyer: {
            select: {
              firstName: true,
              lastName: true,
              profilePic: true,
            },
          },
        },
      },
      category: true,
      creator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profilePic: true,
          sellerRating: true,
        },
      },
      buyers: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  // console.log("service", service);
  return service;
};

// Créer un nouveau service
export const createService = async (data: {
  name: string;
  price: string;
  description: string;
  categoryId: number;
  creatorId: string;
  deliveryTime: number;
  revisions: number;
  features: string[];
  images: string[];
  tags: string[];
}) => {
  const service = await prisma.service.create({
    data,
  });
  return service;
};

// Mettre à jour un service
export const updateService = async (
  id: number,
  data: Partial<{ name: string; price: string }>,
) => {
  const service = await prisma.service.update({
    where: { id },
    data,
  });
  return service;
};

// Supprimer un service
export const deleteService = async (id: number) => {
  const service = await prisma.service.delete({
    where: { id },
  });
  return service;
};

// Récupérer les services en vedette
export const getFeaturedServices = async (limit = 3) => {
  const services = await prisma.service.findMany({
    take: limit,
    include: {
      ratings: true,
      creator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profilePic: true,
          sellerRating: true,
        },
      },
      category: true,
    },
    orderBy: { id: "desc" },
  });
  return services;
};

// Get all services (gigs)
export const getAllServices = async () => {
  const services = await prisma.service.findMany({
    include: {
      ratings: true,
      category: true,
      creator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profilePic: true,
          sellerRating: true,
        },
      },
    },
  });
  return services;
};

// Search services
export const searchServices = async (
  query: string,
  categoryId: number | null = null,
) => {
  const services = await prisma.service.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
      ...(categoryId && { categoryId }),
    },
    include: {
      ratings: true,
      category: true,
      creator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profilePic: true,
          sellerRating: true,
        },
      },
    },
  });
  return services;
};

// Get services by category
export const getServicesByCategory = async (categoryId: number) => {
  const services = await prisma.service.findMany({
    where: { categoryId },
    include: {
      ratings: true,
      category: true,
      creator: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profilePic: true,
          sellerRating: true,
        },
      },
    },
  });
  return services;
};
