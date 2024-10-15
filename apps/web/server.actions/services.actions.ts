"use server";

import prisma from "@/lib/prismaClient";

// Récupérer un service par ID
export const getServiceById = async (id: number) => {
  const service = await prisma.service.findUnique({
    where: { id },
    include: { ratings: true, category: true },
  });
  return service;
};

// Créer un nouveau service
export const createService = async (data: {
  name: string;
  price: string;
  categoryId: number;
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
export const getFeaturedGigs = async (limit = 3) => {
  const services = await prisma.service.findMany({
    take: limit,
    include: { ratings: true },
    orderBy: { id: "desc" },
  });
  return services;
};
