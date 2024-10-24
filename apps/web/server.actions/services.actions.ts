"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

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
      packages: true,
    },
  });
  return service;
};

// Créer un nouveau service
export const createService = async (data: {
  name: string;
  description: string;
  categoryId: number;
  images: string[];
  tags: string[];
  packages: {
    basic: {
      name: string;
      description: string;
      price: number;
      deliveryTime: number;
      revisions: number;
      features: string[];
    };
    standard: {
      name: string;
      description: string;
      price: number;
      deliveryTime: number;
      revisions: number;
      features: string[];
    };
    premium: {
      name: string;
      description: string;
      price: number;
      deliveryTime: number;
      revisions: number;
      features: string[];
    };
  };
}) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to create a service");
  }

  const service = await prisma.service.create({
    data: {
      name: data.name,
      description: data.description,
      categoryId: data.categoryId,
      creatorId: user.id,
      images: data.images,
      tags: data.tags,
      packages: {
        create: [
          { ...data.packages.basic },
          { ...data.packages.standard },
          { ...data.packages.premium },
        ],
      },
    },
    include: {
      packages: true,
    },
  });
  return service;
};

// Mettre à jour un service
export const updateService = async (
  id: number,
  data: Partial<{
    name: string;
    description: string;
    categoryId: number;
    images: string[];
    tags: string[];
  }>,
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
      packages: true,
    },
    orderBy: { id: "desc" },
  });

  // Convert Decimal to string for each package price
  return services.map((service) => ({
    ...service,
    packages: service.packages.map((pkg) => ({
      ...pkg,
      price: pkg.price.toString(), // Convert Decimal to string
    })),
  }));
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
      packages: true,
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
      packages: true,
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
      packages: true,
    },
  });
  return services;
};

export const getRelatedServices = async (
  categoryId: number,
  currentServiceId: number,
  limit = 3,
) => {
  const services = await prisma.service.findMany({
    where: {
      categoryId: categoryId,
      id: { not: currentServiceId },
    },
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
      packages: true,
    },
  });

  return services.map((service) => ({
    ...service,
    packages: service.packages.map((pkg) => ({
      ...pkg,
      price: pkg.price.toString(),
    })),
  }));
};
