"use server";

import prisma from "@/lib/prismaClient";

// Récupérer une évaluation par ID
export const getRatingById = async (id: number) => {
  const rating = await prisma.rating.findUnique({
    where: { id },
    include: {
      buyer: {
        select: {
          firstName: true,
          lastName: true,
          profilePic: true,
        },
      },
      seller: {
        select: {
          firstName: true,
          lastName: true,
          profilePic: true,
        },
      },
      service: true,
    },
  });
  return rating;
};

// Créer une nouvelle évaluation
export const createRating = async (data: {
  buyerId: string;
  sellerId: string;
  serviceId: number;
  rating: number;
  review?: string;
}) => {
  const newRating = await prisma.rating.create({
    data,
  });
  return newRating;
};

// Mettre à jour une évaluation
export const updateRating = async (
  id: number,
  data: Partial<{ rating?: number; review?: string }>
) => {
  const updatedRating = await prisma.rating.update({
    where: { id },
    data,
  });
  return updatedRating;
};

// Supprimer une évaluation
export const deleteRating = async (id: number) => {
  const deletedRating = await prisma.rating.delete({
    where: { id },
  });
  return deletedRating;
};

// Récupérer toutes les évaluations
export const getAllRatings = async () => {
  const ratings = await prisma.rating.findMany({
    include: {
      buyer: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      seller: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      service: true,
    },
  });
  return ratings;
};
